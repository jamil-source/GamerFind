import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/Member';

@Component({
  selector: 'app-member-photo-handler',
  templateUrl: './member-photo-handler.component.html',
  styleUrls: ['./member-photo-handler.component.scss']
})
export class MemberPhotoHandlerComponent implements OnInit {
  @Input() member: Member;

  constructor() { }

  ngOnInit(): void {
  }

}
