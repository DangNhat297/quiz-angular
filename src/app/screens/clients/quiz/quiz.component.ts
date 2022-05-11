import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private http: HttpClient,
    private subjectService: SubjectService,
    private questionService: QuestionService,
    private authService: AuthService,
    private studentService: StudentService
  ) { }
  user_select_answers: Array<any> = []
  active: number = 1;
  // id: number = 0;
  code: string = '';
  // subject: any = {};
  listQuestions: Array<any> = []; // tạo 1 mảng rỗng // mảng chính
  ngOnInit(): void {
    this.router.params.subscribe(par => {
      this.code = par['code'];
    })
    this.getQuestions()
  }

  getQuestions(){
    this.questionService.ofSubject(this.code)
      .subscribe(res => {
        // console.log(res.length)
        let arr: Array<number> = this.getDistinctNumberArr((res.length >= 10) ? 10 : res.length, res.length)
        this.listQuestions = arr.map(index => res[index])
        // console.log(this.listQuestions)
      })
  }

  private getDistinctNumberArr(amount = 10, max = 80){
    let arr: Array<number> = []
    while(arr.length < amount){
      const rand = Math.floor(Math.random() * max)
      if(!arr.includes(rand)) arr.push(rand)
    }
    return arr
  }

  confirmQuiz(){
    Swal.fire({
      text: "Bạn có chắc chắn muốn nộp bài?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Nộp ngay',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        let correctAns = 0
        this.user_select_answers.forEach((el) => {
          let q = this.listQuestions.find(item => item.id == el.qId)
          if(q.AnswerId == el.aId) correctAns++
        })
        const score = (correctAns*10/this.listQuestions.length).toFixed(2)
        let user = this.authService.getUser()
        let indx = -1;
        user.marks.forEach((m:any, i: number) => {
          if(m.subject == this.code){
            indx = i;
            return;
          }
        })
        if(indx == -1){
          user.marks.push({
            subject: this.code,
            score: Number(score)
          });
        }else{
          user.marks[indx].score = Number(score);
        }
        this.studentService.update(user)
          .subscribe(res => {
            if(res){
              this.authService.updateCurrentUser(user)
              this.route.navigate([`/quiz/${this.code}/ket-qua`])
            }

          })
      }
    })
  }

  selectAnswer(qId: number, aId: number){
    let i = -1
    this.user_select_answers.forEach((el, index) => {
      if(el.qId == qId){
        i = index;
      }
    })
    if(i == -1){
      this.user_select_answers.push({
        qId, aId
      })
    } else {
      this.user_select_answers[i].aId = aId
    }
    console.log(this.user_select_answers)
  }

}
