import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private studentService: StudentService) { }
  listStudents: Array<any> = [];
  ngOnInit(): void {
    this.studentService.getList()
      .subscribe(res => {
        this.listStudents = res.map((item:any) => {
          item.role = item.roles.map((item:any) => item.name).join(',')
          return item
        })
      })
  }

  deleteStudent(student: any){
    Swal.fire({
      text: "Bạn có chắc chắn muốn xóa sinh viên này?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa ngay',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.removeStudent(student)
          .subscribe(res => {
            Swal.fire(
              'Thành công',
              'Đã xóa sinh viên ra khỏi hệ thống',
              'success'
            )
            let idx = -1;
            this.listStudents.forEach((item:any, index:number) => {
              if(item.id == student.id){
                idx = index
                return
              }
            })
            this.listStudents.splice(idx, 1)
          })
      }
    })
  }

}
