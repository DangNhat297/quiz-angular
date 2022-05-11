import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private uploadService: UploadImageService,
    private fb: FormBuilder,
    private http: HttpClient,
    private studentService: StudentService,
    private route: Router
  ) { }

  file: any
  submitted: boolean = false

  ngOnInit(): void {
  }
  user = this.fb.group({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      
    ]),
    password: new FormControl('', Validators.required),
    avatar: new FormControl('')
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

  register(){
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
            schoolfee: 10000,
          }
          this.studentService.insert(newUser)
            .subscribe(res => {
              if(res){
                Swal.fire(
                  'Thành công!',
                  'Đăng ký tài khoản thành công',
                  'success'
                )
                setTimeout(() => {
                  this.route.navigate(['/login'])
                },1500)
              }
            })
        }
      })
  }

}
