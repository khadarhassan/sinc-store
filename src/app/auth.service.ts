import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './types';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://fakestoreapi.com/users ';

  constructor(private http: HttpClient, private router: Router) {}

  signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.get(this.url).pipe(
      map((res) => {
        const userList = res as User[];
        const user = userList.find(
          (user) => user.email === email && user.password === password
        );
        return user;
      })
    );
  }

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
