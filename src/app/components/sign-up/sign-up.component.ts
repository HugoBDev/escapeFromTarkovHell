import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss','../sign-in/sign-in.component.scss']
})
export class SignUpComponent {
//! Register: Première connexion

  constructor(private loginService: LoginService, private router : Router) {}

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  onSubmit() {
    this.loginService.createAccount(this.signUpForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate([''])
       
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
