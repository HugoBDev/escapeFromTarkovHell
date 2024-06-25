import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss','../sign-in/sign-in.component.scss']
})
export class SignUpComponent {
//! Register: Première connexion

  constructor(private loginService: LoginService) {}

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  onSubmit() {
    this.loginService.createAccount(this.signUpForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
