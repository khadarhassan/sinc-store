import { Injectable } from '@angular/core';
import { User } from './types';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  sessionKey = 'user';

  constructor() {}

  getSession() {
    if (!sessionStorage.getItem(this.sessionKey)) {
      return null;
    }

    const session = JSON.parse(sessionStorage.getItem(this.sessionKey) || '');

    return session;
  }

  setItem(user: User) {
    sessionStorage.setItem(this.sessionKey, JSON.stringify(user));
  }
}
