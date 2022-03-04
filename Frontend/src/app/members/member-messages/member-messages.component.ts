import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @Input() messages: Message[];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  

}
