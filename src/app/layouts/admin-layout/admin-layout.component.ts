import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: [
    './admin-layout.component.css'
  ]
})
export class AdminLayoutComponent implements OnInit {
  constructor(private authService: AuthService) { }
  // hideLoading: boolean = true
  ngOnInit(): void {

    // setTimeout(() => {
    //   this.hideLoading = true
    // },2000)

  }

  signOut(){
    this.authService.logout()
  }

}
