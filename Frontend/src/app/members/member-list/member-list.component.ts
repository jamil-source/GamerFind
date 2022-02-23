import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/Member';
import { Paginated, Pagination } from 'src/app/models/Pagination';
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
  pageNumber = 1;
  pageSize = 12;



  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(res => {
      this.paginated.result = res.body;
      if (res.headers.get("Pagination")) {
        this.paginated.pagination = JSON.parse(res.headers.get("Pagination"));
      }
      this.members = this.paginated.result
      this.pagination = this.paginated.pagination;

    }, error => {
      console.log(error)
      this.toastr.error("Unauthorized")
    })
  }

}
