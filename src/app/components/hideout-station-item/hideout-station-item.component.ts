import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HideoutItem } from '../../models/hideout-item.model';
import { LoginService } from '../../services/login.service';
import { HideoutDetailService } from '../../services/hideout-detail.service';
import { Router } from '@angular/router';
import { StationItemTooltipComponent } from './station-item-tooltip/station-item-tooltip.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hideout-station-item',
  standalone: true,
  imports: [NgClass, StationItemTooltipComponent],
  styleUrl: './hideout-station-item.component.scss',
  template: `
    <div
      (mouseenter)="startShowTooltip()"
      (mouseleave)="hideTooltip()"
      [ngClass]="
        isBuildable(station) ? 'active-hideout-item' : 'disabled-hideout-item'
      "
      (click)="getItem(station)"
    >

    @if(station.levels.length > 0){
      <app-station-item-tooltip [visible]="visible"
        [level]="station.levels[station.currentStationLvl]"
      ></app-station-item-tooltip>
    }


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
  @Input() station!: HideoutItem;
  visible:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private loginService: LoginService,
    private hideoutDetailService: HideoutDetailService,
    private router: Router
  ) {}
 
  private hoverTimeout: any;

  startShowTooltip() {
    this.clearHoverTimeout();
    this.hoverTimeout = setTimeout(() => {
        this.visible.next(true)      
    }, 500); // délai 
  }
  
  hideTooltip() {
    this.visible.next(false)    
    this.clearHoverTimeout();

  }

  private clearHoverTimeout() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  getItem(item: HideoutItem) {
    if (this.loginService.isLogged()) {
      this.hideoutDetailService.setSelectedItem(item);
      this.router.navigate(['/station-details']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  isBuildable(station: HideoutItem): boolean {
    return station.levels[station.currentStationLvl].stationLevelRequirements
      .length > 0
      ? false
      : true;
  }

  ngOnInit(): void {
    // TODO Station Current Level est faux ici ! a changer par la vrai valeur en bdd.
    // car ici la valeur de station.currentStationLvl n'est pas informé et donc
    // retourne undefined !
    this.station.currentStationLvl = 0;    
  }
}
