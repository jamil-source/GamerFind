import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/Member';
import { faUser, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
