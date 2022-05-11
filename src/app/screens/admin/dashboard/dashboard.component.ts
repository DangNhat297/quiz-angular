import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private studentService: StudentService
  ) { }
  listStudents: Array<any> = []
  listSubjects: Array<any> = []
  ngOnInit(): void {
    this.subjectService.getList()
      .subscribe(res => this.listSubjects = res)
    this.studentService.getList()
      .subscribe(res => this.listStudents = res)
  }

}
