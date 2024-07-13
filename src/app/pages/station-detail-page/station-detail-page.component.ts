import { Component,  inject } from '@angular/core';
import {
  
  Item,
 
} from '../../models/hideout-item.model';
import { AsyncPipe } from '@angular/common';
import { CartComponent } from '../../components/cart/cart.component';
import { BackApiService } from '../../services/back.api';
import { Station } from '../../models/tarkovApi.model';
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
  station : Station | null = null
  
  itemCart: Item[] = [];
  constructor(private  backApiService: BackApiService) {
     this.stationId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
   this.backApiService.loadStationRequirementById(this.stationId).subscribe({
     next: (station) => {
      this.station = station;
     
     },
     error: (e) =>
       console.error("Erreur lors de la création de la requête:", e),
   })

    this.showCart();
  }

 
  addToCart(itemId : number, quantity : number){
    this.backApiService.addToCart(itemId, quantity).subscribe({
      next: (res) => {
        console.log(res);
        
      }
    })
  }
  // addToCart(item : any){
  //   console.log(item);
  //   const id = item.item.id;
  //   const user = this.loginService.getUserData();
    
  //   this.backApiService.addToCart(id, user).subscribe({
  //     next: (response) => {       
  //       console.log(id);
  //       console.log("l'objet à bien été ajouté au panier:",id);
  //       this.showCart()
  //     },
  //     error: (e) =>
  //       console.error("cette object n'a pas pu etre ajouté au panier:", e),
  //   })
  // }

  showCart() {
    
      this.backApiService.getCart().subscribe({
        next: (items) => {
          this.itemCart = items;
        },
        error: (e) => console.error("Erreur lors de la récupération du panier:", e),
      });
    
  }


  
}
