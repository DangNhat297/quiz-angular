import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomeComponent } from './screens/clients/home/home.component';
import { QuizComponent } from './screens/clients/quiz/quiz.component';
import { SubjectComponent } from './screens/clients/subject/subject.component';
import { FinalComponent } from './screens/clients/final/final.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { StudentComponent } from './screens/admin/student/student.component';
import { AddStudentComponent } from './screens/admin/add-student/add-student.component';
import { EditStudentComponent } from './screens/admin/edit-student/edit-student.component';
import { AddSubjectComponent } from './screens/admin/add-subject/add-subject.component';
import { EditSubjectComponent } from './screens/admin/edit-subject/edit-subject.component';
import { QuestionComponent } from './screens/admin/question/question.component';
import { SubjectComponent as AdminSubjectComponent } from './screens/admin/subject/subject.component';
import { HistoryComponent } from './screens/clients/history/history.component';
import { RegisterComponent } from './screens/register/register.component';
import { MemberGuard } from './roles/member.guard';
import { AdminGuard } from './roles/admin.guard';
import { IsLoggingGuard } from './roles/is-logging.guard';
import { TestComponent } from './screens/test/test.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggingGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsLoggingGuard]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [MemberGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'mon-hoc',
        component: SubjectComponent
      },
      {
        path: 'quiz/:code',
        component: QuizComponent
      },
      {
        path: 'quiz/:code/ket-qua',
        component: FinalComponent
      },
      {
        path: 'lich-su',
        component: HistoryComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'sinh-vien',
        component: StudentComponent
      },
      {
        path: 'sinh-vien/add',
        component: AddStudentComponent
      },
      {
        path: 'sinh-vien/edit/:id',
        component: EditStudentComponent
      },
      {
        path: 'mon-hoc',
        component: AdminSubjectComponent
      },
      {
        path: 'mon-hoc/add',
        component: AddSubjectComponent
      },
      // {
      //   path: 'mon-hoc/edit/:id',
      //   component: EditSubjectComponent
      // },
      {
        path: 'mon-hoc/:code/cau-hoi',
        component: QuestionComponent
      }
    ]
  },
  {
    path: 'test/:id/:id1/:id2',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MemberGuard, AdminGuard, IsLoggingGuard]
})
export class AppRoutingModule { }
