import { User } from "./User";

export class UserParams {
    gameType: string;
    minAge = 18;
    maxAge = 100;
    pageNumber = 1;
    pageSize = 12;

    constructor(user: User) {
        this.gameType = user.gameType;
        if(!user.gameType){
            this.gameType = "PVE & PVP";
        }
    }
}