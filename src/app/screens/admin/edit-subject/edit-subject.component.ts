import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private subjectService: SubjectService
  ) { }
  id: number = 0;
  subject: any = {
    id: 0,
    Code: '',
    Name: '',
    Logo: ''
  }
  ngOnInit(): void {
    this.router.params.subscribe(res => this.id = Number(res['id']))
    this.subjectService.getByID(this.id)
      .subscribe(res => this.subject = res)
  }

}
