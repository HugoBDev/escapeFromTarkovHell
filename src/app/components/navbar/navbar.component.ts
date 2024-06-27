import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private loginService: LoginService) {}
  menuPages: string[] = ['quests', 'hideout', 'shopping list'];



  logout() {
    this.loginService.logout();
  }
}
