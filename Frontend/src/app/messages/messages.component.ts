import { Component, OnInit } from '@angular/core';
import { Message } from '../models/Message';
import { Pagination } from '../models/Pagination';
import { MessageService } from '../shared/services/message.service';
import { faEnvelope, faEnvelopeOpen, faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  container = "Unread";
  pageNumber = 1;
  pageSize = 6;
  faEnvelope = faEnvelope;
  faEnvelopeOpen = faEnvelopeOpen;
  faPaperPlane = faPaperPlane;
  faTrash = faTrash;
  loading = false;


  constructor(private messageService: MessageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMessages()
  }

  getMessages() {
    this.loading = true
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(res => {
      this.messages = res.result;
      this.pagination = res.pagination;
      this.loading = false;
    }, err => {
      this.toastr.error(err.error)
    })
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    }, err => {
      this.toastr.error(err.error)
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page
      this.getMessages();
    }
  }

}
