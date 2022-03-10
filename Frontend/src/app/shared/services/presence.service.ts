import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;

  constructor(private toastr: ToastrService) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder().withUrl(`${this.hubUrl}presence`, {
      accessTokenFactory: () => user.token
    }).withAutomaticReconnect().build();
    this.hubConnection.start().catch(err => console.log(err))
    
    this.hubConnection.on('UserIsOnline', username => {
      this.toastr.info(`${username} has connected`);
    })

    this.hubConnection.on('UserIsOffline', username => {
      this.toastr.info(`${username} has disconnected`);
    })
  }

  stopHubConnection(){
    this.hubConnection.stop().catch(err => console.log(err))
  }
}
