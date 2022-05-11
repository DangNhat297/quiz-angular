import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  insert(user: any): Observable<any>{
    return this.http.post<any>(`${environment.user_api}`, {...user})
  }

  update(user: any): Observable<any>{
    return this.http.patch<any>(`${environment.user_api}/${user.id}`, {...user})
  }

  getByID(id: number): Observable<any>{
    return this.http.get<any>(`${environment.user_api}/${id}`)
  }

  getList(): Observable<any>{
    return this.http.get<any>(`${environment.user_api}`)
  }

  removeStudent(user: any): Observable<any>{
    return this.http.delete<any>(`${environment.user_api}/${user.id}`)
  }
}
