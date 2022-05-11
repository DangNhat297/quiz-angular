import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }
  ngOnInit(): void {

  }

  toggle: boolean = false;

  toggleSidebar(){
    this.toggle = !this.toggle
  }

  signOut(){
    this.authService.logout()
  }

}
