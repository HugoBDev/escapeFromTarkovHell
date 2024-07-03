import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HideoutItem, Item } from '../../models/hideout-item.model';
import { tarkovApiService } from '../../services/tarkovApi.service';
import { NgClass } from '@angular/common';
import { HideoutDetailService } from '../../services/hideout-detail.service';
import { CartComponent } from '../../components/cart/cart.component';
import { LoginService } from '../../services/login.service';
import { LoaderComponent } from '../../components/loader/loader.component';


@Component({
  selector: 'app-hideout-page',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterOutlet, NgClass, CartComponent, LoaderComponent],
  templateUrl: './hideout-page.component.html',
  styleUrl: './hideout-page.component.scss',
})
export class HideoutPageComponent {
  hideoutItems: HideoutItem[] = [];
  showRequiredItem: boolean = false;
  cartItems : Item[] = []

  constructor(
    private tarkovApiService: tarkovApiService,
    private router: Router,
    private hideoutDetailService: HideoutDetailService,
    private loginService : LoginService
  ) {}

  ngOnInit(): void {
   
    
  



    this.tarkovApiService
      .getHideoutStations()
      .then((data: HideoutItem) => {
       

        const hideoutStations = data.hideoutStations;
        hideoutStations.forEach((hideoutStations: any) => {
          hideoutStations.currentStationLvl = 0;
          this.hideoutItems.push(hideoutStations);
        });

        //! Ici on trie le tableau pour obtenir en 1er les stations constructibles//
        const buildableStations: HideoutItem[] = this.hideoutItems.filter(
          (station: HideoutItem) => this.isBuildable(station)
        );
        const notBuildableStations: HideoutItem[] = this.hideoutItems.filter(
          (station: HideoutItem) => !this.isBuildable(station)
        );
        this.hideoutItems = [...buildableStations, ...notBuildableStations];
        //!------------------------------------------------------------------------------------//
      })
      .catch((e) => console.error(e));


  }

  //*------------------- Méthode permettant de récupérer un item et de le stocker---------------------//
  
  getItem(item: HideoutItem) {
    if(this.loginService.isLogged()){
      this.hideoutDetailService.setSelectedItem(item);
      this.router.navigate(['/station-details']);
    }else{
      this.router.navigate(['/login'])
    }
  }

  //*------------------------------------------------------------------------------------//

  isBuildable(station: HideoutItem): boolean {
    if (
      station.levels[station.currentStationLvl].stationLevelRequirements
        .length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }
}
