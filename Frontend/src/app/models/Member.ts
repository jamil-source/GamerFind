import { Photo } from "./Photo";

export interface Member {
    id:          number;
    userName:    string;
    photoUrl:    string;
    age:         number;
    created:     Date;
    lastActive:  Date;
    gameType:    string;
    interests:   string;
    lookingFor:  string;
    city:        string;
    country:     string;
    photos:      Photo[];
}


