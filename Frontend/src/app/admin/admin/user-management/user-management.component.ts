import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/User';
import { RolesModalComponent } from 'src/app/shared/modals/roles-modal/roles-modal.component';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]>
  bsModalRef: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersAsAdmin()
  }

  getUsersAsAdmin() {
    this.adminService.getUsersAsAdmin().subscribe(users => {
      this.users = users;
      console.log(this.users)
    })
  }

  openModalForRoles() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
