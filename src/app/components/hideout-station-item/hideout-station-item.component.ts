import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HideoutItem } from '../../models/hideout-item.model';
import { LoginService } from '../../services/login.service';
import { HideoutDetailService } from '../../services/hideout-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hideout-station-item',
  standalone: true,
  imports: [NgClass],
  styleUrl: './hideout-station-item.component.scss',
  template: `
    <div
      [ngClass]="isBuildable(station) ? 'active-hideout-item' : 'disabled-hideout-item'"
      (click)="getItem(station)"
    >
      @if(isBuildable(station)){
      <div class="current-lvl">
        {{ station.currentStationLvl }}
      </div>
      }
      <img [src]="station.imageLink" alt="" />
      <p>{{ station.name }}</p>
    </div>
  `,
})


export class HideoutStationItemComponent {
  @Input() station: any;

  constructor(
    private loginService: LoginService,
    private hideoutDetailService: HideoutDetailService,
    private router: Router
  ) {}

  getItem(item: HideoutItem) {
    if (this.loginService.isLogged()) {
      this.hideoutDetailService.setSelectedItem(item);
      this.router.navigate(['/station-details']);
    } else {
      this.router.navigate(['/login']);
    }
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
