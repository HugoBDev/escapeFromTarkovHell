import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StationDetailPageComponent } from './pages/station-detail-page/station-detail-page.component';
import { HideoutPageComponent } from './pages/hideout-page/hideout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo : '/hideout',
    pathMatch : 'full'
  },
  {
    path: 'hideout',
    component: HideoutPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
    children: [
      {
        path: '',
        component: SignInComponent,
      },
      {
        path: 'register',
        component: SignUpComponent,
      },
    ],
  },
  {
    path: 'station-details',
    component: StationDetailPageComponent,
  },
];
