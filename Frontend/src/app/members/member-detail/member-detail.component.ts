import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/Member';
import { MembersService } from 'src/app/shared/services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  member: Member;

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMemberDetail();
  }

  getMemberDetail(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('userName')).subscribe(res => {
      this.member = res;
    })
  }

}
