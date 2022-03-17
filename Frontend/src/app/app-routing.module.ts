import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { ErrorComponent } from './error/error.component';
import { GamerListsComponent } from './gamer-lists/gamer-lists.component';
import { HomeComponent } from './home/home.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnsavedChangesGuard } from './shared/guards/unsaved-changes.guard';
import { MemberDetailsResolver } from './shared/resolvers/member-details.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
  {path: 'members/:userName', component: MemberDetailComponent, canActivate: [AuthGuard], resolve: {member: MemberDetailsResolver}},
  {path: 'member/edit', component: MemberEditComponent, canActivate: [AuthGuard], canDeactivate: [UnsavedChangesGuard]},
  {path: 'gamer-lists', component: GamerListsComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: '**', component: ErrorComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
