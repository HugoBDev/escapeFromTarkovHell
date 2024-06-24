import { Component } from '@angular/core';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [SignInComponent, SignUpComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
