import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/Member';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/shared/services/account.service';
import { MembersService } from 'src/app/shared/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService) { 
    this.accountService.loggedInUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getLoggedInMember();
  }

  getLoggedInMember(){
    this.memberService.getMember(this.user.userName).subscribe(member => {
      this.member = member;
    })
  }

}
