import { Component, Input } from "@angular/core";
import { Level } from "../../../models/hideout-item.model";
import { BehaviorSubject } from "rxjs";
import { AsyncPipe, NgClass } from "@angular/common";

@Component({
    selector:'app-station-item-tooltip',
    standalone:true,
    imports:[NgClass, AsyncPipe],
    styleUrl:'./station-item-tooltip.component.scss',
    template:`

<div id="station-item-tooltip" [ngClass]="(visible | async) ? 'show-tooltip' :'hide-tooltip'">
@if (level.itemRequirements.length > 0) {
        @for (item of level.itemRequirements; track item) {
            <div class="requiered-item">
                <img [src]="item.item.iconLink" alt="">
                <span>{{item.quantity}}</span>
            </div>
        }
    }
    @else {
        <p>not item require</p>
    }
</div>



    `
})

export class StationItemTooltipComponent{
@Input() level!:Level; 
@Input() visible:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
}