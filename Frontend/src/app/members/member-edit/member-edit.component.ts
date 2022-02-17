import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  @ViewChild("editForm") editForm: NgForm;
  member: Member;
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.loggedInUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getLoggedInMember();
  }

  getLoggedInMember() {
    this.memberService.getMember(this.user.userName).subscribe(member => {
      this.member = member;
    })
  }

  updateMemberInfo() {
    console.log(this.member);
    this.toastr.success("Update")
    // reset form state, resets save button to disable
    this.editForm.reset(this.member)
  }

}
