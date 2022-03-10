import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './helpers/paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([])
  messageThread$ = this.messageThreadSource.asObservable()

  constructor(private http: HttpClient) { }

  createHubConnection(user: User, otherUserName: string) {
    this.hubConnection = new HubConnectionBuilder().withUrl(`${this.hubUrl}message?user=${otherUserName}`, {
      accessTokenFactory: () => user.token
    }).withAutomaticReconnect().build()

    this.hubConnection.start().catch(err => console.log(err));

    this.hubConnection.on("ReceiveMessageThread", messages => {
      this.messageThreadSource.next(messages);
    })
  }

  stopHubConnection() {
    this.hubConnection.stop();
  }

  getMessages(pageNumber, pageSize, container) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(`${this.baseUrl}messages`, params, this.http);
  }

  getMessageThread(userName: string) {
    return this.http.get<Message[]>(`${this.baseUrl}messages/thread/${userName}`)
  }

  sendMessage(userName: string, content: string) {
    return this.http.post<Message>(`${this.baseUrl}messages`, { receiverUsername: userName, content })
  }

  deleteMessage(id: number) {
    return this.http.delete(`${this.baseUrl}messages/${id}`)
  }
}
