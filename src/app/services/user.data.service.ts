import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    constructor(private router: Router) { }       

    getUserData() : User | null {
        const tarkovUserData = sessionStorage.getItem('tarkovUser');
        if(!tarkovUserData) {
            this.router.navigate(['/login']);
            return null
        } else {
            return JSON.parse(tarkovUserData);
        }
    }


    setUserData(data : User) : void {
        sessionStorage.setItem('tarkovUser', JSON.stringify(data));
    }

}
