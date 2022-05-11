import { Component, Input, OnInit } from '@angular/core';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  constructor(private uploadService: UploadImageService) { }
  urlResult: string = ''
  ngOnInit(): void {
  }
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file = null; // Variable to store file
  uploadFile(event: any){
    this.urlResult = 'Đang tải file...'
    this.file = event.target.files[0];
    if(this.file){
      this.uploadService.upload(this.file)
      .subscribe(res => {
        this.urlResult = res.data.link
      })
    } else {
      this.urlResult = ''
    }
  }

}
