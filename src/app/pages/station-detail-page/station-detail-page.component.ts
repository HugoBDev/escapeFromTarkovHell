import { Component } from '@angular/core';
import { HideoutItem } from '../../models/hideout-item.model';
import { HideoutDetailService } from '../../services/hideout-detail.service';

@Component({
  selector: 'app-station-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './station-detail-page.component.html',
  styleUrl: './station-detail-page.component.scss'
})
export class StationDetailPageComponent {
stationDetail! : HideoutItem

constructor(private hideoutDetailService : HideoutDetailService){}

ngOnInit() :void {
this.stationDetail = this.hideoutDetailService.getSelectedItem()
console.log(this.stationDetail);

}
}
