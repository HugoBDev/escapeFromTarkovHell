import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { StationItemTooltipComponent } from './station-item-tooltip/station-item-tooltip.component';
import { BehaviorSubject } from 'rxjs';
import { Station } from '../../models/tarkovApi.model';

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
        isBuildable(station) ? 'disabled-hideout-item' :'active-hideout-item' 
      "
      
    >

    <!-- @if(station.stationLvlRequirements.length > 0){
      <app-station-item-tooltip [visible]="visible"
        [level]="station.levels[station.currentStationLvl]"
      ></app-station-item-tooltip>
    } -->


      @if(!isBuildable(station)){
      <div class="current-lvl">
        {{ station.level }}
      </div>
      }
      <img [src]="station.imageLink" alt="" />
      <p>{{ station.name }}</p>
    </div>
  `,
})
export class HideoutStationItemComponent {
  @Input() station!: Station;
  visible:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
   
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

  // getItem(item: HideoutItem) {
  //   if (this.loginService.isLogged()) {
  //     this.hideoutDetailService.setSelectedItem(item);
  //     this.router.navigate(['/station-details']);
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

  isBuildable(station: Station): boolean {
     const isBuildable = station.stationLvlRequirements.length > 0;

    return isBuildable;
  }

  ngOnInit(): void {
    // TODO Station Current Level est faux ici ! a changer par la vrai valeur en bdd.
    // car ici la valeur de station.currentStationLvl n'est pas informé et donc
    // retourne undefined !
    // this.station.currentStationLvl = 0;    
  }
}
