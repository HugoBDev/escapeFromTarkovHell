import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  //! Log in, j'ai déjà un compte
  constructor(private loginService: LoginService, private router: Router) {}
  signInForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  usernameErrorMessage: string = '';
  passwordErrorMessage: string = '';

  onSubmit() {
    this.loginService
      .login(this.signInForm.value)
      .then(() => {})
      .catch((e) => {
        console.error(e);

        const elements: HTMLCollectionOf<HTMLInputElement> =
          document.getElementsByClassName(
            'input'
          ) as HTMLCollectionOf<HTMLInputElement>;
        if (elements && elements.length > 0) {
          // itérer sur les éléments et ajouter une classe
          for (let i = 0; i < elements.length; i++) {
            elements.item(i)!.classList.add('error');
          }

          switch (e.status) {
            default: {
              this.usernameErrorMessage =
                "Nom d'utilisateur ou mot de passe incorrect";
              this.passwordErrorMessage =
                "Nom d'utilisateur ou mot de passe incorrect";
              break;
            }

            case 500: {
              this.usernameErrorMessage = 'Oups, quelque chose ne va pas ...';
              this.passwordErrorMessage = 'Oups, quelque chose ne va pas ...';
              break;
            }
          }
        }
      });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.signInForm.get('username')?.valueChanges.subscribe({
      next: (value: string) => {
        this.usernameErrorMessage = '';
      },
    });
    this.signInForm.get('password')?.valueChanges.subscribe({
      next: (value: string) => {
        this.passwordErrorMessage = '';
      },
    });
  }
}
