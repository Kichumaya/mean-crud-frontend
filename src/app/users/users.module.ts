import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: UserFormComponent },
  { path: 'edit/:id', component: UserFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [UserListComponent, UserFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MaterialModule
  ]
})
export class UsersModule {}
