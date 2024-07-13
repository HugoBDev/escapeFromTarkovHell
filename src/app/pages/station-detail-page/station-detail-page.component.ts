import { Component,  inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { CartComponent } from '../../components/cart/cart.component';
import { BackApiService } from '../../services/back.api';
import { Item, Station } from '../../models/tarkovApi.model';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-station-detail-page',
  standalone: true,
  imports: [AsyncPipe, CartComponent,RouterModule],
  templateUrl: './station-detail-page.component.html',
  styleUrl: './station-detail-page.component.scss',
})
export class StationDetailPageComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  stationId : number = 0
  station! : Station 
  
  itemCart: Item[] = [];
  constructor(private  backApiService: BackApiService) {
     this.stationId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
   this.backApiService.loadStationRequirementById(this.stationId).subscribe({
     next: (station) => {
      console.log(station);
      
      this.station = station;
     
     },
     error: (e) =>
       console.error("Erreur lors de la création de la requête:", e),
   })
  }

 
  addToCart(itemId : number, quantity : number){
    this.backApiService.addToCart(itemId, quantity).subscribe({
      next: (res) => {
        console.log(res)
        this.showCart()
        
      }
    })
  }


  showCart() {
    
      this.backApiService.cartItems$.subscribe({
        next: (items) => {
          this.itemCart = items;
        },
        error: (e) => console.error("Erreur lors de la récupération du panier:", e),
      });
    
  }


  
}
