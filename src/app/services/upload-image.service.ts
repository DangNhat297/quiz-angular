import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http: HttpClient) { }

  upload(file: any): Observable<any>{
    // Create form data
    const formData = new FormData()
    let headers = new HttpHeaders()
  headers = headers.set('Authorization', 'Client-ID aca6d2502f5bfd8');    
    // Store form name as "file" with file data
    formData.append("image", file, file.name)
    return this.http.post(environment.imgur_api, formData, { headers: headers })
  }
}
