import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadImageService,
    private http: HttpClient,
    private studentService: StudentService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  file: any
  submitted: boolean = false

  user = this.fb.group({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required),
    avatar: new FormControl(''),
    schoolfee: new FormControl(10000, Validators.required),
    isAdmin: new FormControl(false)
  })

  get registerFormControl() {
    return this.user.controls;
  }

  uploadFile(event: any){
    this.user.patchValue({
      avatar: 'Đang tải file...'
    })
    this.file = event.target.files[0];
    if(this.file){
      this.uploadService.upload(this.file)
      .subscribe(res => {
        this.user.patchValue({
          avatar: res.data.link
        })
      })
    } else {
      this.user.patchValue({
        avatar: ''
      })
    }
  }

  addStudent(){
    this.submitted = true
    if(this.user.value.avatar == ''){
      this.user.patchValue({
        avatar: 'http://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png'
      })
    }
    this.http.get<any>(`${environment.user_api}?email=${this.user.value.email}`)
      .subscribe(res => {
        if(res.length > 0){
          this.registerFormControl['email'].setErrors({
            'exist': true
          })
        }
        if(this.user.valid){
          let newUser = {
            fullname: this.user.value.fullname,
            googleId: null,
            email: this.user.value.email,
            password: this.user.value.password,
            avatar: this.user.value.avatar,
            marks: [],
            roles: [
              {
                name: "member"
              }
            ],
            schoolfee: this.user.value.schoolfee,
          }
          if(this.user.value.isAdmin) newUser.roles.push({name: "admin"})
          this.studentService.insert(newUser)
            .subscribe(res => {
              if(res){
                Swal.fire(
                  'Thành công!',
                  'Đăng ký tài khoản thành công',
                  'success'
                )
                setTimeout(() => {
                  this.route.navigate(['/admin/sinh-vien'])
                },1500)
              }
            })
        }
      })
  }

}
