import {
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { BackApiService } from '../../../services/back.api';
import { Item } from '../../../models/tarkovApi.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  styleUrl: './cart-item.component.scss',
  template: `
    <div id="cart-item">
      <div #cartWrapper id="cart-wrapper">
        <!-- <p>x{{ item.quantity }}</p> -->
        <img [src]="item.iconLink" [alt]="item.name + ' icon.'" />
        <div>
          <div #itemName id="name">
            <span #crossOut></span>
            {{ item.name }}
          </div>
          <div id="goal">Vent lvl 2</div>
        </div>
        <button id="found-btn" (click)="foundClick()">found!</button>
        <button class="stealth" (click)="deleteClick(item.id)">delete</button>
      </div>
    </div>
  `,
})
export class CartItemComponent {
  @Input() item!: Item;
  @ViewChild('cartWrapper', { static: true }) cartItemRef!: ElementRef;
  @ViewChild('crossOut', { static: true }) crossOutRef!: ElementRef;
  @ViewChild('itemName', { static: true }) itemNameRef!: ElementRef;

  constructor( private cartService: CartService) {}

  deleteClick(itemId : number) {
    console.log(this.item);
    
    
    
    // 1- Cible les éléments à animer
    const cartElement: HTMLElement = this.cartItemRef.nativeElement;

    this.cartService.deleteUserCartItem(itemId).subscribe({
      next: (value) => {
        // 2 - ajoute là class 'animation sur l'element ciblé à animer
        cartElement.classList.add('deleted');
      },
      error: (err) => {
        // 2 - ajoute là class 'animation sur l'element ciblé à animer
        cartElement.classList.add('delete-error');
        console.error(err)
      },
    });
  }

  foundClick() {
    // 1 - Cible les éléments à animer
    const crossOutElement: HTMLElement = this.crossOutRef.nativeElement;
    const itemNameElement: HTMLElement = this.itemNameRef.nativeElement;
    const cartElement: HTMLElement = this.cartItemRef.nativeElement;

    //TODO: Ajouter methode pour confirmer comme trouvé

    // 2 - ajoute là class 'animation sur l'element ciblé à animer
    crossOutElement.classList.add('cross-out');
    itemNameElement.classList.add('item-name-found');
    cartElement.classList.add('deleted-delay')
  }
}
