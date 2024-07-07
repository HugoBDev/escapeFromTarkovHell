import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    constructor() { }       

    getUserData() : Promise<User>  {
        const tarkovUserData = sessionStorage.getItem('tarkovUser');
        return tarkovUserData ? JSON.parse(tarkovUserData) : null;
    }


    setUserData(data : User) : void {
        sessionStorage.setItem('tarkovUser', JSON.stringify(data));
    }

}
