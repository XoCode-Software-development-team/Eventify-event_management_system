import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
import { Notification } from 'src/app/Interfaces/interfaces';
import { baseApiUrl } from 'src/environments/environment';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private url = baseApiUrl.Url;
  private HUB_URL = 'https://localhost:7164/notificationHub'; // Change to your SignalR hub URL

  popupToggle: boolean = false;
  private dialogRef: MatDialogRef<NotificationBoxComponent> | null = null;
  private notificationBadgeSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  notificationBadge$ = this.notificationBadgeSubject.asObservable();
  private notificationUpdateSubject: Subject<Notification> = new Subject<Notification>();
  notificationUpdates$ = this.notificationUpdateSubject.asObservable();
  private hubConnection: signalR.HubConnection | null = null;

  constructor(private _matDialog: MatDialog, private _http: HttpClient) {
    this.startSignalRConnection();
  }

  startSignalRConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.HUB_URL)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection established');
        this.registerSignalREvents();
        this.sendUserIdToServer();
      })
      .catch((err) => console.error('SignalR connection error:', err));
  }

  private sendUserIdToServer() {
    const userId = 'a0e3d4f5-8d53-4fb1-b36d-7316a31a4a41'; // Replace with your actual user ID
    this.hubConnection
      ?.invoke('SendNotificationCount', userId)
      .catch((err) => console.error('Failed to send user ID to server:', err));
  }

  private registerSignalREvents() {
    this.hubConnection?.on('ReceiveNotificationCount', (unreadCount: number) => {
      console.log('Received notification count from server:', unreadCount);
      this.notificationBadgeSubject.next(unreadCount); // Update the badge count
    });

    this.hubConnection?.on('ReceiveNotification', (notification: Notification) => {
      console.log('Received new notification from server:', notification);
      this.notificationUpdateSubject.next(notification); // Emit new notification
    });
  }

  getNotifications(
    pageNumber: number,
    pageSize: number
  ): Observable<Notification[]> {
    return this._http.get<Notification[]>(
      `${this.url}/api/notifications/?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  markAsRead(notificationId: number): Observable<any> {
    return this._http.put<any>(
      `${this.url}/api/notifications/${notificationId}`,
      null
    );
  }

  markAllRead(): Observable<any> {
    return this._http.put<any>(
      `${this.url}/api/notifications/markAllRead/`,
      null
    );
  }

  clearAll(): Observable<any> {
    return this._http.delete(`${this.url}/api/notifications/deleteAll`);
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this._http.delete(
      `${this.url}/api/notifications/delete/${notificationId}`
    );
  }

  openPopup() {
    if (!this.popupToggle) {
      this.dialogRef = this._matDialog.open(NotificationBoxComponent, {
        width: '500px',
        height: '50%',
        position: { top: '165px', right: '130px' },
      });
      this.popupToggle = true;

      this.dialogRef.afterClosed().subscribe(() => {
        this.popupToggle = false;
        this.dialogRef = null;
      });
    } else if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
