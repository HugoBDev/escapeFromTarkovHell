import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from '../../pages/login-page/login-page.component';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';

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
    email: new FormControl(),
    password: new FormControl(),
  });


  onSubmit(){
    this.loginService.login(this.signInForm.value).subscribe({
      next : (res) => {console.log(res);
      },
      error : (e) => {console.error(e)
        sessionStorage.setItem('tarkovToken', e.error.text)
      }
    })
  }
}
