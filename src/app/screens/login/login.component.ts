import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private socialService: SocialAuthService,
    private authService: AuthService,
    private route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  loginSuccess: boolean = true

  user = this.fb.group({
    email: new FormControl(''),
    password: new FormControl('')
  })

  login(){
    this.loginSuccess = true
    this.authService.login(this.user.value)
      .subscribe(res => {
        if(res){
          // this.route.navigate(['/'])
          window.location.href = '/'
        } else {
          this.loginSuccess = false
        }
      })
  }

  signInWithGoogle(){
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        this.authService.loginWithGoogle(res)
          .subscribe(res => {
            window.location.href = '/'
            // this.route.navigate(['/'])
          })
      })
  }

}
