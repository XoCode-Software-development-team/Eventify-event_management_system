import { Observable, interval, map, of, startWith } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string, intervalSeconds: number = 60): Observable<string> {
    if (!value) return of(''); // Return an observable containing an empty string

    const date = new Date(value);
    
    // Emit the date string initially
    return interval(intervalSeconds * 1000).pipe(
      startWith(0),
      map(() => this.getTimeAgo(date))
    );
  }
  
  private getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 10) {
      return 'just now';
    } else if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 2) {
      return 'a minute ago';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 2) {
      return 'an hour ago';
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 2) {
      return 'yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return new Date(date).toLocaleDateString(); // Fallback to local date format
    }
  }
}


