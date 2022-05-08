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
    })
  }

  openModalForRoles(user) {
    const configModal = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, configModal);
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      }
      if(rolesToUpdate){
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles]
        })
      }
    })
  }

  private getRolesArray(user) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: "Admin", value: "Admin" },
      { name: "Member", value: "Member" }
    ]

    availableRoles.forEach(role => {
      let match = false
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          match = true
          role.checked = true
          roles.push(role)
          break;
        }
      }
      if(!match){
        role.checked = false
        roles.push(role)
      }
    })
    return roles
  }

}
