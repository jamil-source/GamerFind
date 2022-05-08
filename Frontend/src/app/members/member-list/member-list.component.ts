import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/Member';
import { Paginated, Pagination } from 'src/app/models/Pagination';
import { User } from 'src/app/models/User';
import { UserParams } from 'src/app/models/UserParams';
import { AccountService } from 'src/app/shared/services/account.service';
import { MembersService } from 'src/app/shared/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  paginated: Paginated<Member[]> = new Paginated<Member[]>();
  userParams: UserParams;
  user: User;
  gameTypeChoose = [{ value: "PVE", display: "PVE" }, { value: "PVP", display: "PVP" }, { value: "PVE&PVP", display: "PVE & PVP" }]

  constructor(private memberService: MembersService, private toastr: ToastrService, private accountService: AccountService) {
    this.accountService.loggedInUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers() {
    this.memberService.getMembers(this.userParams).subscribe(res => {
      this.paginated.result = res.body;
      if (res.headers.get("Pagination")) {
        this.paginated.pagination = JSON.parse(res.headers.get("Pagination"));
      }
      this.members = this.paginated.result
      this.pagination = this.paginated.pagination;
    }, error => {
      this.toastr.error("Unauthorized")
    })
  }

  resetFilter(){
    this.userParams = new UserParams(this.user)
    this.getAllMembers();
  }

  changePage(event) {
    this.userParams.pageNumber = event.page;
    this.getAllMembers();
  }

}
