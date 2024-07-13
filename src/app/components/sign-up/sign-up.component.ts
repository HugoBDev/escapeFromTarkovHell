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
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgClass, NgStyle],
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-in/sign-in.component.scss', './sign-up.component.scss'],
})
export class SignUpComponent {
  //! Register: Première connexion

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
    consent: new FormControl(false, [
      Validators.requiredTrue,
    ]),
  });

  pwdSecurityLevel: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  securityAdvices: string[] = [
    '',
    'Et si vous mettiez un mot de passe plus long ?',
    'C\'est déjà un peu mieux ! Une Majuscule ?',
    'Et si vous mettiez autre chose qu\'une lettre ?',
    'On commence à parler là ! Encore un petit effort',
    'Parfait ! Votre mot de passe est SUPER fort !',
  ]
  inputErrorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.createAccount(this.signUpForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.loginService.login(res);
        this.router.navigate(['']);
      },
      error: (e:HttpErrorResponse) => {
        console.error(e.message);
        if(e.status === 409) {
          this.inputErrorMessage = 'Ce nom d\'utilisateur est déjà utilisé';
        } else {
          const elements:HTMLCollectionOf<HTMLInputElement> =  document.getElementsByClassName('input') as HTMLCollectionOf<HTMLInputElement>
          if(elements && elements.length > 0) {
            // itérer sur les éléments et ajouter une classe
            for(let i = 0; i < elements.length; i++) {
              elements.item(i)!.classList.add('error'); 
            }

            this.inputErrorMessage = 'Oups, quelque chose ne va pas ...';
          }
        }
      },
    });
  }

  ngOnInit(): void {
    this.signUpForm.get('password')?.valueChanges.subscribe({
      next: (value: string) => {

        const errorInput:HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName('input password error') as HTMLCollectionOf<HTMLInputElement>
        if(errorInput.length > 0) {
          errorInput.item(0)!.classList.remove('error');
        }

        const length: number = value.length;
        const hasNumber: boolean = /\d/.test(value);
        const hasUpper: boolean = /[A-Z]/.test(value);
        const hasLower: boolean = /[a-z]/.test(value);
        const hasSpecial: boolean = /[^A-Za-z0-9]/.test(value);
        let securityLevel: number = 0;
        if (hasLower && hasUpper) securityLevel += 1;
        if (hasNumber) securityLevel += 1;
        if (hasSpecial) securityLevel += 1;
        if (length >= 4 && length < 8) {
          securityLevel += 1;
        } else if (length >= 8) {
          securityLevel += 2;
        }
        let sl: number[] = [];
        for (let i = 0; i < securityLevel; i++) {
          sl.push(i);
        }
        this.pwdSecurityLevel.next(sl);
      },
    });


    this.signUpForm.get('username')?.valueChanges.subscribe({
      next: (value: string) => {
        this.inputErrorMessage = '';
        const errorInput:HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName('input username error') as HTMLCollectionOf<HTMLInputElement>
        if(errorInput.length > 0) {
          errorInput.item(0)!.classList.remove('error');
        }
      }
    })
  }
}
