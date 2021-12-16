import { Organization } from './../models/organization';
import { User } from './../models/user';
import { IUser } from './../models/iuser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, subscribeOn, tap } from 'rxjs/operators';
import { AdsService } from './ads.service';

const USER_URL = 'http://localhost:3000/users';
const ORGANIZATION_URL = 'http://localhost:3000/organizations';

export enum Roles {
  USER = 'user',
  ORGANIZATION = 'organization',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  role: Roles;
  isLoggedIn = false;
  loggedInUser: IUser;
  users: User[];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.http.get<User[]>(USER_URL).subscribe((users) => {
      this.users = users;

      // test only delete later.
      // this.loggedInUser = users[0];
      // this.isLoggedIn = true;
      // this.role = Roles.USER;
    });
  }

  login(email: string, password: string, loginRole: string): boolean {
    if (loginRole == Roles.USER) {
      this.userLogin(email, password);
    } else {
      this.organizationLogin(email, password);
    }

    return this.isLoggedIn;
  }

  userLogin(email: string, password: string) {
    this.getUsersData().subscribe((users) => {
      let filteredUsers = users.filter(
        (user) => user.email === email && user.password === password
      );

      if (filteredUsers.length !== 0) {
        this.isLoggedIn = true;
        this.role = Roles.USER;
        this.loggedInUser = filteredUsers[0];
      }
    });
  }

  organizationLogin(email: string, password: string) {
    this.getOrganizationData().subscribe((orgs) => {
      let filteredOrgs = orgs.filter(
        (user) => user.email === email && user.password === password
      );

      if (filteredOrgs.length !== 0) {
        this.isLoggedIn = true;
        this.role = Roles.ORGANIZATION;
        this.loggedInUser = filteredOrgs[0];
      }
    });
  }

  logout() {
    this.role = null;
    this.isLoggedIn = false;
    this.loggedInUser = null;
  }

  EditData(name, pass) {
    this.loggedInUser.name = name;
    this.loggedInUser.password = pass;
  }

  updateUserData(name, password) {
    let updatedUser = { ...this.loggedInUser, name, password };

    this.http
      .put<User>(
        USER_URL + `/${this.loggedInUser.id}`,
        updatedUser,
        this.httpOptions
      )
      .subscribe((_) => (this.loggedInUser = updatedUser));
  }

  deleteAccount() {
    let url = this.role === Roles.USER ? USER_URL : ORGANIZATION_URL;

    this.http.delete<IUser>(url + `/${this.loggedInUser.id}`).subscribe((_) => {
      this.logout();
    });
  }

  private getUsersData(): Observable<User[]> {
    return this.http.get<User[]>(USER_URL);
  }

  private getOrganizationData(): Observable<Organization[]> {
    return this.http.get<Organization[]>(ORGANIZATION_URL);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
