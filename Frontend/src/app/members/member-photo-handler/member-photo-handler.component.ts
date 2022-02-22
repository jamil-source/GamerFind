import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/Member';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/shared/services/account.service';
import { environment } from 'src/environments/environment';
import { faTrash, faUpload, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MembersService } from 'src/app/shared/services/members.service';
import { Photo } from 'src/app/models/Photo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-photo-handler',
  templateUrl: './member-photo-handler.component.html',
  styleUrls: ['./member-photo-handler.component.scss']
})
export class MemberPhotoHandlerComponent implements OnInit {
  @Input() member: Member;
  uploader: FileUploader;
  baseUrl = environment.apiUrl;
  user: User;
  hasBaseDropZoneOver = false;
  faUpload = faUpload;
  faTrash = faTrash;
  faCheck = faCheck;


  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.loggedInUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.photoUploader();
  }

  photoUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}users/upload-photo`,
      authToken: `Bearer ${this.user.token}`,
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
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
        if (photo.mainPhoto) {
          this.user.photoUrl = photo.url
          this.member.photoUrl = photo.url
          this.accountService.setLoggedInUser(this.user)
        }
      }
    }
  }

  fileOverBase(event) {
    this.hasBaseDropZoneOver = event;
  }

  putMainPhoto(photo: Photo) {
    this.memberService.updateMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setLoggedInUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        p.mainPhoto && (p.mainPhoto = false);
        p.id === photo.id && (p.mainPhoto = true);
      })
    }, err => {
      this.toastr.error(err.error)
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(photo => photo.id !== photoId);
    }, err => {
      this.toastr.error(err.error)
    })
  }

}
