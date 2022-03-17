import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]>

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUsersAsAdmin()
  }

  getUsersAsAdmin(){
    this.adminService.getUsersAsAdmin().subscribe(users => {
      this.users = users;
      console.log(this.users)
    })
  }

}
