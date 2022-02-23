import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/Member';
import { Pagination } from 'src/app/models/Pagination';
import { MembersService } from 'src/app/shared/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 12;

  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers(){
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(result =>{
      this.members = result.result;
      this.pagination = result.pagination;
    }, error => {
      console.log(error)
      this.toastr.error("Unauthorized")
    })
  }

}
