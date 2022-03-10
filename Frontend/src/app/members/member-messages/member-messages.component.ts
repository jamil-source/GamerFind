import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/models/Message';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() userName: string;
  content: string;

  constructor(public messageService: MessageService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  sendMessage() {
    this.messageService.sendMessage(this.userName, this.content).then(() => {
      this.messageForm.reset();
    }, err => {
      this.toastr.error(err.error)
    })
  }



}
