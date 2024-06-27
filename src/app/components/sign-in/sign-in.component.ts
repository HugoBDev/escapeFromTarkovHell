import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  //! Log in, j'ai déjà un compte
  constructor(private loginService: LoginService, private router : Router) {}
  signInForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });


  onSubmit(){
    this.loginService.login(this.signInForm.value).subscribe({
      next : (res) => {
        sessionStorage.setItem('tarkovToken', res.token)
        console.log(res); 
        this.router.navigate([''])
      
      },
      error : (e) => {console.error(e)}
    })
  }
}
