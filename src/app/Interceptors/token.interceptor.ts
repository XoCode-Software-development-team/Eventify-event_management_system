import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';
import { ToastService } from '../Services/toast.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../Models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private _auth: AuthenticationService,
    private _toast: ToastService,
    private _router: Router
  ) {}

  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._auth.getToken();

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // this._toast.showMessage('Token is expired. Please login again!','warning' );
            // this._router.navigate(['login']);

            //handle 
            return this.handleUnAuthorizedError(request,next);
          }
        }

        return throwError(() => err.error);
      })
    );
  }

  handleUnAuthorizedError(request: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();

    tokenApiModel.accessToken = this._auth.getToken()!;
    tokenApiModel.refreshToken = this._auth.getRefreshToken()!;

    return this._auth.renewToken(tokenApiModel).pipe(
      switchMap((data: TokenApiModel) => {

        this._auth.storeRefreshToken(data.refreshToken);
        this._auth.storeToken(data.accessToken);

        request = request.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` },
        });

        return next.handle(request);

      }),
      catchError((err)=> {

        return throwError(()=> {
          console.log(err);
          this._toast.showMessage('Token is expired. Please login again!','warning' );
          this._router.navigate(['login']);

        })
      })
    );
  }
}
