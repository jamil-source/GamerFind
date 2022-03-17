import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/Member';
import { faUser, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { MembersService } from 'src/app/shared/services/members.service';
import { ToastrService } from 'ngx-toastr';
import { PresenceService } from 'src/app/shared/services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  faUser = faUser;
  faHeart = faHeart;
  faEnvelope = faEnvelope;

  constructor(private memberService: MembersService, private toastr: ToastrService, public presence: PresenceService) { }

  ngOnInit(): void {
  }

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe(() => {
      this.toastr.success(`You have liked ${member.userName}`);
    }, error => {
      this.toastr.error(error.error);
    })
  }

}
