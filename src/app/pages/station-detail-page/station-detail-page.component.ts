import { Component } from '@angular/core';
import {
  HideoutItem,
  Item,
  ItemRequirement,
} from '../../models/hideout-item.model';
import { HideoutDetailService } from '../../services/hideout-detail.service';
import { AsyncPipe } from '@angular/common';
import { CartComponent } from '../../components/cart/cart.component';
import { BackApiService } from '../../services/back.api';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-station-detail-page',
  standalone: true,
  imports: [AsyncPipe, CartComponent],
  templateUrl: './station-detail-page.component.html',
  styleUrl: './station-detail-page.component.scss',
})
export class StationDetailPageComponent {
  stationDetail!: HideoutItem;
  itemsRequired: ItemRequirement[] = [];
  itemCart: Item[] = [];
  constructor(private hideoutDetailService: HideoutDetailService,private  backApiService: BackApiService, private loginService : LoginService) {}

  ngOnInit(): void {
    this.stationDetail = this.hideoutDetailService.getSelectedItem();
    this.itemsRequired =
      this.stationDetail.levels[
        this.stationDetail.currentStationLvl
      ].itemRequirements;

    this.showCart();
  }

 

  addToCart(item : any){
    console.log(item);
    const id = item.item.id;
    const user = this.loginService.getUserData();
    
    this.backApiService.addToCart(id, user).subscribe({
      next: (response) => {       
        console.log(id);
        console.log("l'objet à bien été ajouté au panier:",id);
        this.showCart()
      },
      error: (e) =>
        console.error("cette object n'a pas pu etre ajouté au panier:", e),
    })
  }

  showCart() {
    
      this.backApiService.getCart().subscribe({
        next: (items) => {
          this.itemCart = items;
        },
        error: (e) => console.error("Erreur lors de la récupération du panier:", e),
      });
    
  }


  
}
