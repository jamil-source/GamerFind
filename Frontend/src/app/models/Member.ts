import { Photo } from "./Photo";

export interface Member {
    id:          number;
    userName:    string;
    photoUrl:    string;
    age:         number;
    created:     Date;
    lastActive:  Date;
    gameType:    string;
    description: string;
    lookingFor:  string;
    interests:   string;
    city:        string;
    country:     string;
    photos:      Photo[];
}


