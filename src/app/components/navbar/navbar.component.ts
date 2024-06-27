import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TitleCasePipe, RouterLink, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLogged : BehaviorSubject<boolean>
  menuPages: string[] = ['quests', 'hideout', 'shopping list'];
  tarkovUserName : string  = ''

  constructor(private loginService: LoginService) {
    this.isLogged = loginService.userLogged
    this.isLogged.subscribe({
      next : (res)=> {
        if(res){
          this.tarkovUserName = loginService.getUserData().username
        } 

      }
    })
  }



  logout() {
    this.loginService.logout();
  }
}
