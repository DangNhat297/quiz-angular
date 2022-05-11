import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadImageService } from 'src/app/services/upload-image.service';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private studentService: StudentService,
    private route: Router,
    private fb: FormBuilder,
    private uploadService: UploadImageService
  ) { }

  id: number = 0
  file: any 
  submitted = false
  avatarOld: string = ''
  user = this.fb.group({
    id: new FormControl(''),
    fullname: new FormControl(''),
    email: new FormControl(''),
    avatar: new FormControl(''),
    schoolfee: new FormControl(10000, Validators.required),
    isAdmin: new FormControl(false)
  })
  ngOnInit(): void {
    this.router.params.subscribe(res => {
      this.id = Number(res['id'])
    })
    this.studentService.getByID(this.id)
      .subscribe(res => {
        console.log(res)
        this.avatarOld = res.avatar
        this.user.patchValue({
          id: res.id,
          fullname: res.fullname,
          email: res.email,
          avatar: res.avatar,
          schoolfee: res.schoolfee,
          isAdmin: (res.roles.filter((permission: any) => permission.name == 'admin').length > 0) ? true : false
        })
      })
  }

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
        avatar: this.avatarOld
      })
    }
  }

  saveStudent(){
    this.submitted = true
    if(this.user.valid){
      let newUser = {
        id: this.user.value.id,
        avatar: this.user.value.avatar,
        roles: [
          {
            name: "member"
          }
        ],
        schoolfee: this.user.value.schoolfee,
      }
      if(this.user.value.isAdmin) newUser.roles.push({name: "admin"})
      this.studentService.update(newUser)
        .subscribe(res => {
          // console.log(res)
          // return
          if(res){
            this.route.navigate(['/admin/sinh-vien'])
          }
        })
    }
  }
  
}
