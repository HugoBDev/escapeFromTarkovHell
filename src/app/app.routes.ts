import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StationDetailPageComponent } from './pages/station-detail-page/station-detail-page.component';
import { HideoutPageComponent } from './pages/hideout-page/hideout-page.component';

export const routes: Routes = [
    {
        path : '',
        component : HideoutPageComponent
    },
    {
        path : 'station-details',
        component : StationDetailPageComponent
    }
];
