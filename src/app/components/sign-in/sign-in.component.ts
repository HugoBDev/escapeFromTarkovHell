import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  //! Log in, j'ai déjà un compte
  constructor(private loginService: LoginService) {}
  signInForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });


  onSubmit(){
    this.loginService.login(this.signInForm.value).subscribe({
      next : (res) => {
        sessionStorage.setItem('tarkovToken', res.token)
        console.log(res); 
      },
      error : (e) => {console.error(e)}
    })
  }
}
