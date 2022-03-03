import { Component, OnInit } from '@angular/core';
import { Member } from '../models/Member';
import { MembersService } from '../shared/services/members.service';

@Component({
  selector: 'app-gamer-lists',
  templateUrl: './gamer-lists.component.html',
  styleUrls: ['./gamer-lists.component.scss']
})
export class GamerListsComponent implements OnInit {
  members: Partial<Member[]>
  constructor(private memberService: MembersService) { }
  header: string = "liked";

  ngOnInit(): void {
    this.getLikes("liked");
  }

  getLikes(likedOrLikedBy) {
    this.memberService.getLikes(likedOrLikedBy).subscribe(res => {
      this.members = res;
    })
    if (likedOrLikedBy === "liked") {
      this.header = "liked"
    } else {
      this.header = "likedBy"
    }
  }

}
