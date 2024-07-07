import { Component, Input } from "@angular/core";
import { Level } from "../../../models/hideout-item.model";
import { BehaviorSubject } from "rxjs";
import { AsyncPipe, NgClass } from "@angular/common";
import { Station } from "../../../models/tarkovApi.model";

@Component({
    selector:'app-station-item-tooltip',
    standalone:true,
    imports:[NgClass, AsyncPipe],
    styleUrl:'./station-item-tooltip.component.scss',
    template:`

<div id="station-item-tooltip" [ngClass]="(visible | async) ? 'show-tooltip' :'hide-tooltip'">
@if (station.stationItems.length > 0) {
        @for (item of station.stationItems; track item) {
            <div class="requiered-item">
                <img [src]="item.item.iconLink" alt="">
                <span>{{item.quantity}}</span>
            </div>
        }
    }
    @else {
        <p>not item require.</p>
    }

    <span id="triangle"></span>
</div>



    `
})

export class StationItemTooltipComponent{
@Input() station!:Station; 
@Input() visible:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
}