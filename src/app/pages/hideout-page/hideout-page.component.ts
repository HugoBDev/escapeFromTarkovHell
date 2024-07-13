import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { CartComponent } from '../../components/cart/cart.component';

import { HideoutStationItemComponent } from '../../components/hideout-station-item/hideout-station-item.component';
import { BehaviorSubject } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BackApiService } from '../../services/back.api';
import {  Station } from '../../models/tarkovApi.model';
import { UserDataService } from '../../services/user.data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-hideout-page',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    RouterModule,
    RouterOutlet,
    NgClass,
    CartComponent,
    HideoutStationItemComponent,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './hideout-page.component.html',
  styleUrl: './hideout-page.component.scss',
})
export class HideoutPageComponent {
  @Output() stationItem : EventEmitter<Station> = new EventEmitter<Station>();
  stations$: BehaviorSubject<Station[]> = new BehaviorSubject<
    Station[]
  >([]);
  hidelockedStation: FormControl = new FormControl(null);

  constructor(
    private backApiService: BackApiService,
    private userDataService : UserDataService
  ) {

    this.backApiService.loadAllStationsByLvl(1).subscribe({
      next: (stations) => {
        stations.forEach((station : Station) => {
          this.stations$.next(stations)
          this.stationItem.emit(station)
          
        })
      },
      error: (e) => console.error(e),
    });
  }

  ngOnInit(): void {
   this.userDataService.getUserData()
  }

  isLocked(station: Station): boolean {
    return station.stationLvlRequirements.length > 0 ? false : true;
  }

  showAllStation() {
    this.hidelockedStation.setValue(false);
  }

  isHoverVisible: boolean = false;
  isAnimate: boolean = false;
  private hoverTimeout: any;

  startShowTooltip() {
    this.clearHoverTimeout();
    this.hoverTimeout = setTimeout(() => {
      this.isHoverVisible = true;
      this.isAnimate = true;
    }, 500); // délai en millisecondes avant l'affichage
  }

  hideTooltip() {
    this.clearHoverTimeout();
    this.isHoverVisible = false;
    this.isAnimate = false;
  }

  private clearHoverTimeout() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }
}
