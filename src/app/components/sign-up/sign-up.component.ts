import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-in/sign-in.component.scss', './sign-up.component.scss'],
})
export class SignUpComponent {
  //! Register: Première connexion

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
  });

  pwdSecurityLevel: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.createAccount(this.signUpForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.loginService.login(res);
        this.router.navigate(['']);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.signUpForm.get('password')?.valueChanges.subscribe({
      next: (value:string) => {

        const length: number = value.length;
        const hasNumber: boolean = /\d/.test(value);
        const hasUpper: boolean = /[A-Z]/.test(value);
        const hasLower: boolean = /[a-z]/.test(value);
        const hasSpecial: boolean = /[^A-Za-z0-9]/.test(value); 
        let securityLevel: number = 0;
        if(hasLower && hasUpper) securityLevel += 1;
        if(hasNumber) securityLevel += 1;
        if(hasSpecial) securityLevel += 1;
        if (length >= 4 && length < 8) {
          securityLevel += 1;
        } else if (length >= 8) {
          securityLevel += 2;
        }
        let sl: number[] = [];
        for(let i = 0; i < securityLevel; i++) {
          sl.push(i);          
        }
        this.pwdSecurityLevel.next(sl);
      },
    });
  }
}
