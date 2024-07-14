import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TitleCasePipe, RouterLink, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLogged$ : Observable<boolean>
  menuPages: string[] = ['quests', 'hideout', 'shopping list'];
  tarkovUserName : string  = ''

  constructor(private loginService: LoginService) {
    this.isLogged$ = this.loginService.isUserLogged$;
    this.isLogged$.subscribe({
      next : (res)=> {
        if(res){
          console.log(res);
          
          this.tarkovUserName = loginService.getUserData().username
        } 
      }
    })
  }



  logout() {
    this.loginService.logout();
  }
}
