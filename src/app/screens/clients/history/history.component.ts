import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private subjectService: SubjectService
  ) { }
  // listSubject: Array<any> = []
  mySubject: Array<any> = []
  ngOnInit(): void {
    let user = this.authService.getUser()
    console.log(user)
    this.subjectService.getList()
      .subscribe(res => {
        // this.listSubject = res
        // console.log(res)
        this.mySubject = user.marks.map((item:any) => {
          // console.log(item)
          let obj = res.find((s:any) => s.Code == item.subject)
          // console.log(obj)
          obj.score = item.score
          return obj
        })
        // console.log(this.mySubject)
      })
  }

}
