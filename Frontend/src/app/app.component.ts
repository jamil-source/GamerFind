import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'GamerFind';
  users: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.get('https://localhost:5001/api/users').subscribe(res => {
        this.users = res
      }, error => {
        console.log(error);
      })
  }
}
