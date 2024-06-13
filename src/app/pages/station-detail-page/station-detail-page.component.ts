import { Component } from '@angular/core';
import {
  HideoutItem,
  Item,
  ItemRequirement,
  Level,
} from '../../models/hideout-item.model';
import { HideoutDetailService } from '../../services/hideout-detail.service';

@Component({
  selector: 'app-station-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './station-detail-page.component.html',
  styleUrl: './station-detail-page.component.scss',
})
export class StationDetailPageComponent {
  stationDetail!: HideoutItem;
  itemsRequired: ItemRequirement[] = [];
  itemCart: ItemRequirement[] = [];
  constructor(private hideoutDetailService: HideoutDetailService) {}

  ngOnInit(): void {
    this.stationDetail = this.hideoutDetailService.getSelectedItem();
    this.itemsRequired =
      this.stationDetail.levels[
        this.stationDetail.currentStationLvl
      ].itemRequirements;
  }

  addToCart(item: ItemRequirement) {
    sessionStorage.setItem('testkey', JSON.stringify(item));
    this.itemCart.push(item);
    console.log(this.itemCart);
    console.log(JSON.parse(sessionStorage.getItem('testkey')!));
  }


  addAllToCart() {
    this.itemsRequired.forEach((item) => {
      this.addToCart(item)
    });
  }
}
