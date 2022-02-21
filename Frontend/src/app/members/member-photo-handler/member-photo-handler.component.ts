import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/Member';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/shared/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-photo-handler',
  templateUrl: './member-photo-handler.component.html',
  styleUrls: ['./member-photo-handler.component.scss']
})
export class MemberPhotoHandlerComponent implements OnInit {
  @Input() member: Member;
  uploader: FileUploader;
  baseUrl = environment.apiUrl;
  loggedInuser: User;

  constructor(private accountService: AccountService) {
    this.accountService.loggedInUser$.pipe(take(1)).subscribe(user => this.loggedInuser = user);
  }

  ngOnInit(): void {
    this.photoUploader();
  }

  photoUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}users/upload-photo`,
      authToken: `Bearer ${this.loggedInuser.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    })

    this.uploader.onBeforeUploadItem = (file) => {
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }

}
