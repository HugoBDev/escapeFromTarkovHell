import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HideoutItem } from './models/hideout-item.model';
import { tarkovApiService } from './tarkovApi.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  hideoutItems : HideoutItem[] = []
  title = 'escapeFromTarkovHell';


  constructor(private tarkovApiService  : tarkovApiService){
}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   this.tarkovApiService.getHideoutStations()
   .then(data => {
    console.log(data);
    
    const hideoutStations =  data.hideoutStations
   hideoutStations.forEach((hideoutStations : any) => {
    this.hideoutItems.push(hideoutStations)
   })
    
  })
   .catch((e) => console.error(e))
    
    
  }

}