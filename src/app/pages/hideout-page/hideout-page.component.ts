import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HideoutItem, Item } from '../../models/hideout-item.model';
import { tarkovApiService } from '../../services/tarkovApi.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { CartComponent } from '../../components/cart/cart.component';
import { HideoutStationItemComponent } from '../../components/hideout-station-item/hideout-station-item.component';
import { BehaviorSubject } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
  ],
  templateUrl: './hideout-page.component.html',
  styleUrl: './hideout-page.component.scss',
})
export class HideoutPageComponent {
  stations$: BehaviorSubject<HideoutItem[]> = new BehaviorSubject<
    HideoutItem[]
  >([]);
  hidelockedStation: FormControl = new FormControl(null);

  constructor(private tarkovApiService: tarkovApiService) {
    this.tarkovApiService
      .getHideoutStations()
      .then((data: HideoutItem) => {
        this.stations$.next(data.hideoutStations);
      })
      .catch((e) => console.error(e));
  }

  isLocked(station: HideoutItem): boolean {
    return station.levels[0].stationLevelRequirements.length > 0 ? false : true;
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
