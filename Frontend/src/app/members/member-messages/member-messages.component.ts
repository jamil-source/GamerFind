import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { MessageService } from 'src/app/shared/services/message.service';
import { faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userName: string
  messages: Message[];
  faClock = faClock

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessageThread();
  }

  getMessageThread(){
    this.messageService.getMessageThread(this.userName).subscribe(res => {
      this.messages = res
      console.log(this.messages)
    })
  }

}
