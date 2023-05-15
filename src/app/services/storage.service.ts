import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

const USER_KEY = 'token';

const httpOptions = {
  headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  authUrl: string;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.authUrl='http://localhost:8081/auth';
  }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(token: any): Observable<any> {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(token));
    return of(null);
  }

  public getToken(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user) return JSON.parse(user).token;
    return null;
  }

  getUserFromToken(): Observable<any> {
    const token = this.getToken();
    if (token!=null) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const username = decodedToken.sub;
      return this.getUserByUsername(username).pipe(
        map((user) => {
          const newUser = new User();
          newUser.username = user.username;
          newUser.firstname = user.firstname;
          newUser.lastname = user.lastname;
          newUser.phoneNumber = user.phoneNumber;
          newUser.role=user.role;
          return newUser;
        }),
        catchError(() => of(null))
      );
    }
    return of(null);
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  loginUser(username: string, password: string) {
    return this.http.post(this.authUrl+'/authenticate',{'username':username,'password':password}, httpOptions)
    .pipe(
      catchError(error => {
        throw 'Wrong username or password';
      })
    )
  }

  public registerUser(user: User) : Observable<any> {
    return this.http.post(this.authUrl+'/register',JSON.stringify(user),httpOptions);
  }

  public getUserByUsername(username: string) : Observable<User> {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("username",username)
    return this.http.get<User>(this.authUrl+"/"+username,httpOptions);
  }

   getUserDetails(): User{
    const token = this.getToken();
    var payload;
    const user = new User();
    if(token!=null) {
      payload = token.split(".")[1]
      payload = window.atob(payload)
      this.getUserByUsername(JSON.parse(payload).sub)
          .subscribe(data => {
            user.firstname=data.firstname
            user.lastname=data.lastname
            user.phoneNumber=data.phoneNumber
            user.username=data.username
            user.role=data.role;            
          });
          return user;  
    }
    else return new User(); 
  }

}
