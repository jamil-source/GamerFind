import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder().withUrl(`${this.hubUrl}presence`, {
      accessTokenFactory: () => user.token
    }).withAutomaticReconnect().build();
    this.hubConnection.start().catch(err => console.log(err))

    this.hubConnection.on('UserIsOnline', userName => {
      this.toastr.info(`${userName} has connected`);
    })

    this.hubConnection.on('UserIsOffline', userName => {
      this.toastr.info(`${userName} has disconnected`);
    })

    this.hubConnection.on("GetOnlineUsers", (userNames: string[]) => {
      this.onlineUsersSource.next(userNames);
    })

    this.hubConnection.on("NewMessageReceived", ({ userName }) => {
      this.toastr.info(`${userName} sent you a message!`).onTap.pipe(take(1)).subscribe(() => this.router.navigateByUrl(`/members/${userName}?tab=2`))
    })
  }

  stopHubConnection() {
    this.hubConnection.stop().catch(err => console.log(err))
  }
}
