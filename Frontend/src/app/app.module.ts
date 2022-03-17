import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { GamerListsComponent } from './gamer-lists/gamer-lists.component';
import { MessagesComponent } from './messages/messages.component';
import { ErrorComponent } from './error/error.component';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { MemberPhotoHandlerComponent } from './members/member-photo-handler/member-photo-handler.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormTextHandlerComponent } from './shared/form-handler/form-text-handler/form-text-handler.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimeagoModule } from 'ngx-timeago';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminComponent } from './admin/admin/admin.component';
import { IsAdminDirective } from './shared/directives/is-admin.directive';
import { UserManagementComponent } from './admin/admin/user-management/user-management.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from './shared/modals/roles-modal/roles-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    GamerListsComponent,
    MessagesComponent,
    ErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    MemberPhotoHandlerComponent,
    FormTextHandlerComponent,
    MemberMessagesComponent,
    AdminComponent,
    IsAdminDirective,
    UserManagementComponent,
    RolesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    FontAwesomeModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TimeagoModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
