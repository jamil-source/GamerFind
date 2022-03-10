import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Member } from "src/app/models/Member";
import { MembersService } from "../services/members.service";

@Injectable({
    providedIn: 'root'
})
export class MemberDetailsResolver implements Resolve<Member>{

    constructor(private memberService: MembersService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Member> {
        return this.memberService.getMember(route.paramMap.get("userName"));
    }

}