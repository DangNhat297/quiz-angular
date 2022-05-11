import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private subjectService: SubjectService
    ) { }
  listSubjects: Array<any> = [];
  ngOnInit(): void {
    this.subjectService.getList()
      .subscribe(res => this.listSubjects = res)
  }

}
