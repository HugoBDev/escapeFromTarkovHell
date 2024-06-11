import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HideoutItem } from '../../models/hideout-item.model';
import { tarkovApiService } from '../../services/tarkovApi.service';
import { NgClass } from '@angular/common';
import { HideoutDetailService } from '../../services/hideout-detail.service';
@Component({
  selector: 'app-hideout-page',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterOutlet, NgClass],
  templateUrl: './hideout-page.component.html',
  styleUrl: './hideout-page.component.scss'
})
export class HideoutPageComponent {
  hideoutItems: HideoutItem[] = [];
  showRequiredItem: boolean = false;

  constructor(private tarkovApiService: tarkovApiService, private router : Router, private hideoutDetailService : HideoutDetailService) {}
  ngOnInit(): void {
    this.tarkovApiService
      .getHideoutStations()
      .then((data: HideoutItem) => {
        console.log(data);

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
  getItem(item: HideoutItem) {
    this.hideoutDetailService.setSelectedItem(item)
    this.router.navigate(['/station-details'])
  }

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
