import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getByID(id: number): Observable<any>{
    return this.http.get<any>(`${environment.subject_api}/${id}`)
  }

  getList(searchKeyword = ''): Observable<any>{
    return this.http.get<any>(`${environment.subject_api}?Name_like=${searchKeyword}`)
  }

  getByCode(code: string): Observable<any>{
    return this.http.get<any>(`${environment.subject_api}/${code}`)
  }

  addQuestion(subject: string, question: any): Observable<any>{
    return this.http.post<any>(`${environment.baseAPIURL}/${subject}`, question)
  }

  updateQuestion(subject: string, question: any): Observable<any>{
    return this.http.put<any>(`${environment.baseAPIURL}/${subject}/${question.id}`, question)
  }

  deleteQuestion(subject: string, questionID: number): Observable<any>{
    return this.http.delete<any>(`${environment.baseAPIURL}/${subject}/${questionID}`)
  }

}
