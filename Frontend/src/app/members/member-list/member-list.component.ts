import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/Member';
import { MembersService } from 'src/app/shared/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: Member[];

  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers(){
    this.memberService.getMembers().subscribe(result =>{
      this.members = result
    }, error => {
      console.log(error)
      this.toastr.error(error.error)
    })
  }

}
