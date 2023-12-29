import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class AlertService {
    private alertSource = new BehaviorSubject<{message: string, timeoutId: any}>({message: "", timeoutId: null});

    alertMessage = this.alertSource.asObservable();

 constructor() { }

 showAlert(message: string, timeout: number = 20000) {
  // Clear any existing timeout
  if (this.alertSource.value.timeoutId !== null) {
    clearTimeout(this.alertSource.value.timeoutId);
  }

  // Set a new timeout
  const timeoutId = setTimeout(() => {
    this.clearAlert();
  }, timeout);

  // Update the alert source
  this.alertSource.next({message, timeoutId});
 }

 clearAlert() {
  // Clear the timeout
  if (this.alertSource.value.timeoutId !== null) {
    clearTimeout(this.alertSource.value.timeoutId);
  }

  // Clear the alert
  this.alertSource.next({message: "", timeoutId: null});
 }
}
