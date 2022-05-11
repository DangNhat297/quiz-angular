import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(localStorage.getItem('login_user') || "{}"));
  constructor(
    private authService: SocialAuthService,
    private http: HttpClient,
    private router: Router,
    private studentService: StudentService
  ) { }

  login(user: any): Observable<any>{
    return this.http.get<any>(`${environment.user_api}?email=${user.email}&password=${user.password}`)
      .pipe(
        map(item => {
          if(item.length > 0){
            localStorage.setItem('login_user', JSON.stringify(item[0]))
            return item[0]
          }
          return null
        })
      )
  }

  loginWithGoogle(user: any): Observable<any>{
    return this.http.get<any>(`${environment.user_api}?email=${user.email}`)
      .pipe(
        map(item => {
          // console.log(item)
          if(item.length > 0){
            if(item[0].googleId == ''){
              item[0].googleId = user.googleId
            }
            item[0].fullname = user.name
            item[0].avatar = user.photoUrl
            localStorage.setItem('login_user', JSON.stringify(item[0]))
            this.studentService.update(item[0])
            return item[0]
          } else {
            let info = {
              fullname: user.name,
              googleId: user.id,
              email: user.email,
              avatar: user.photoUrl,
              marks: [],
              schoolfee: 10000,
              roles: [
                {
                  "name": "member"
                }
              ]
            }           
            this.studentService.insert(info)
              .subscribe(res => {
                localStorage.setItem('login_user', JSON.stringify(res))
                console.log(res)
              })
          }
          // return null
        })
      )
  }

  logout(): void{
    localStorage.removeItem('login_user')
    this.router.navigate(['/login'])
  }

  getUser(){
    return this.loggedInUser.value
  }

  updateCurrentUser(user: any){
    localStorage.setItem('login_user', JSON.stringify(user))
  }
}
