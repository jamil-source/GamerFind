import { Component, OnInit } from '@angular/core';
import { Message } from '../models/Message';
import { Pagination } from '../models/Pagination';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  container: 'Unread'
  pageNumber = 1;
  pageSize = 6;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessages()
  }

  getMessages() {
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(res => {
      this.messages = res.result;
      this.pagination = res.pagination;
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page
      this.getMessages();
    }
  }

}
