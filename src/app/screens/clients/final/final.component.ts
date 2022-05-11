import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SubjectService } from 'src/app/services/subject.service';
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private subjectService: SubjectService,
    private authService: AuthService
  ) { }
  code: string = ''
  subject: any = {}
  user: any = {}

  ngOnInit(): void {
    this.router.params.subscribe(res => {
      this.code = res['code']
      console.log(this.code)
    })
    this.subjectService.getList()
      .subscribe(res => {
        this.subject = res.find((item:any) => item.Code == this.code)
        console.log(this.subject)
      })
    this.user = this.authService.getUser()
  }
  
  getScore(): number{
    let s = this.user.marks.find((item:any) => item.subject == this.code)
    return s.score
  }

}
