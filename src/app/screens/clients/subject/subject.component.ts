import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  listSubjects: Array<any> = [];
  constructor(private http: HttpClient, private subjectService: SubjectService) { }

  ngOnInit(): void {

    this.subjectService.getList()
      .subscribe(res => {
        this.listSubjects = res
      })

  }


}
