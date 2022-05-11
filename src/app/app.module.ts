import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomeComponent } from './screens/clients/home/home.component';
import { SubjectComponent } from './screens/clients/subject/subject.component';
import { QuizComponent } from './screens/clients/quiz/quiz.component';
import { FinalComponent } from './screens/clients/final/final.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './screens/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { StudentComponent } from './screens/admin/student/student.component';
import { AddStudentComponent } from './screens/admin/add-student/add-student.component';
import { EditStudentComponent } from './screens/admin/edit-student/edit-student.component';
import { AddSubjectComponent } from './screens/admin/add-subject/add-subject.component';
import { EditSubjectComponent } from './screens/admin/edit-subject/edit-subject.component';
import { QuestionComponent } from './screens/admin/question/question.component';
import { SubjectComponent as AdminSubjectComponent } from './screens/admin/subject/subject.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HistoryComponent } from './screens/clients/history/history.component';
import { RegisterComponent } from './screens/register/register.component';
import { TestComponent } from './screens/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    HomeComponent,
    SubjectComponent,
    QuizComponent,
    FinalComponent,
    AdminLayoutComponent,
    LoginComponent,
    DashboardComponent,
    StudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    AddSubjectComponent,
    EditSubjectComponent,
    QuestionComponent,
    AdminSubjectComponent,
    HistoryComponent,
    RegisterComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GOOGLE_CLIENT_ID
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
