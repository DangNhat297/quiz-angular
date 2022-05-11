import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  user:any = {}
  roles: Array<any> = []
  score: Array<any> = []
  avgScore: any = 0
  ngOnInit(): void {
    this.user = this.authService.getUser()
    this.roles = this.user.roles.map((item:any) => item.name)
    this.score = this.user.marks.map((item:any) => item.score)
    // console.log(this.score)
    for(let i = 0;i < this.score.length;i++){
      this.avgScore += Number(this.score[i])
    }
    this.avgScore = isNaN(this.avgScore/this.score.length) ? 0 : (this.avgScore/this.score.length).toFixed(2)
    // console.log(this.roles)
  }

}
