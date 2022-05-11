import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from 'src/app/services/question.service';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private subjectService: SubjectService,
    private questionService: QuestionService,
    private fb: FormBuilder
  ) { }
  // id: number = 0;
  code: string = ''
  listQuestions: Array<any> = [];
  ngOnInit(): void {
    this.router.params.subscribe(res => {
      this.code = res['code'];
    })
    this.getQuestions()
  }
  getQuestions(){
    this.questionService.ofSubject(this.code)
      .subscribe(res => {
        this.listQuestions = res
        console.log(this.listQuestions)
      })
  }
  question = this.fb.group({
    id: (''),
    Text: (''),
    Marks: (1),
    AnswerId: (''),
    IndexCorrect: (''),
    Answers: this.fb.array([])
  })
  escapeHTML(text: string) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
  }
  getHTML(obj: any = {}, answerId: number){
    let html: string = '';
    html += this.escapeHTML(obj['Text'])
    if(answerId == Number(obj['id'])) html += `<small class="badge bg-primary">Đáp án</small>`
    return html
  }
  private randomNumber(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // question: any = {}
  get Answers(): FormArray{
    return this.question.get('Answers') as FormArray
  }

  editQuestion(question: any){
    this.question.patchValue({
      id: question.id,
      Text: question.Text,
      Marks: question.Marks,
      AnswerId: question.AnswerId,
      IndexCorrect: question.Answers.findIndex((item:any) => item.id == question.AnswerId)
    })
    this.Answers.clear()
    question.Answers.forEach((item:any) => {
      this.Answers.push(
        this.fb.group({
          id: item.id,
          Text: item.Text
        })
      )
    })
  }

  addAnswer(){
    this.Answers.push(this.fb.group({
      id: this.randomNumber(100000, 999999),
      Text: ''
    }))
  }

  deleteAnswer(index: any){
    this.Answers.removeAt(index)
    this.question.patchValue({
      IndexCorrect: this.Answers.value.findIndex((item:any) => item.id == this.question.value.AnswerId)
    })
  }

  deleteQuestion(qId: number){
    Swal.fire({
      text: "Bạn có chắc chắn muốn xóa câu hỏi?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa ngay',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectService.deleteQuestion(this.code, qId)
          .subscribe(res => {
            this.getQuestions()
          })
      }
    })
  }

  addQuestion(){
    this.question.patchValue({
      id: '',
      Text: '',
      Marks: 1,
      AnswerId: '',
      IndexCorrect: -1
    })
    this.Answers.clear()
  }

  saveQuestion(){
    // console.log(this.question)
    // return
    let saveQuestion = {
      id: this.question.value.id,
      Text: this.question.value.Text,
      Marks: this.question.value.Marks,
      AnswerId: this.question.value.IndexCorrect != -1 ? this.question.value.Answers[this.question.value.IndexCorrect].id : null,
      Answers: this.question.value.Answers
    }
    // console.log(saveQuestion)
    // return
    if(this.question.value.id != ''){
      this.subjectService.updateQuestion(this.code, saveQuestion)
        .subscribe(res => {
          console.log(res)
          this.getQuestions()
        })
    } else {
      this.subjectService.addQuestion(this.code, saveQuestion)
        .subscribe(res => {
          console.log(res)
          this.getQuestions()
        })
    }
  }


}
