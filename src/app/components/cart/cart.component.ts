import { Component, Input } from '@angular/core';
import { Item } from '../../models/hideout-item.model';
import { HideoutDetailService } from '../../services/hideout-detail.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  items: Item[] = [];

  constructor(private hideoutDetailService: HideoutDetailService) {}

  ngOnInit(): void {
    this.hideoutDetailService.getCart().subscribe({
      next: (items) => {
        this.items = items;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  deleteItem(id: string) {
    this.hideoutDetailService.deleteCartItem(id).subscribe({
      next: (res) => {
        console.log("L'item " + id + " a bien été retiré:", res);
      },
      error: (e) => console.error("Erreur lors de la suppression de l'item:", e)
    });
  }

  deleteAll(){
    this.hideoutDetailService.clearCart().subscribe({
      next : (res) => {
        console.log('la liste à été clear');
        
      },
      error : (e) => console.error(e)
      
    })
  }

}
