import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AccountService } from '../services/account.service';

@Directive({
  selector: '[appIsAdmin]'
})
export class IsAdminDirective implements OnInit {
  @Input() appIsAdmin: string[];
  user: User;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private accountService: AccountService) {
    this.accountService.loggedInUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      console.log(user)
    })
  }
  ngOnInit(): void {
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear()
      return;
    }

    if (this.user?.roles.some(r => this.appIsAdmin.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear()
    }
  }

}
