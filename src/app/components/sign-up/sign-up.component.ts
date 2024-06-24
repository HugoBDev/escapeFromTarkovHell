import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {


  constructor(private loginService: LoginService) {}

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });


  onSubmit(){
    this.loginService.login(this.signUpForm.value).subscribe({
      next : (res) => {console.log(res);
      },
      error : (e) => {console.error(e)
        sessionStorage.setItem('tarkovToken', e.error.text)
      }
    })
  }
}
