import {
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Item } from '../../../models/hideout-item.model';
import { HideoutDetailService } from '../../../services/hideout-detail.service';
import { BackApiService } from '../../../services/back.api';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  styleUrl: './cart-item.component.scss',
  template: `
    <div id="cart-item">
      <div #cartWrapper id="cart-wrapper">
        <p>x{{ item.quantity }}</p>
        <img [src]="item.iconLink" [alt]="item.name + ' icon.'" />
        <div>
          <div #itemName id="name">
            <span #crossOut></span>
            {{ item.name }}
          </div>
          <div id="goal">Vent lvl 2</div>
        </div>
        <button id="found-btn" (click)="foundClick()">found!</button>
        <button class="stealth" (click)="deleteClick(item.tarkovId)">delete</button>
      </div>
    </div>
  `,
})
export class CartItemComponent {
  @Input() item!: Item;
  @ViewChild('cartWrapper', { static: true }) cartItemRef!: ElementRef;
  @ViewChild('crossOut', { static: true }) crossOutRef!: ElementRef;
  @ViewChild('itemName', { static: true }) itemNameRef!: ElementRef;

  constructor(private hideoutDetailService: HideoutDetailService, private backApiService: BackApiService) {}

  deleteClick(tarkovItemId : string) {
    console.log(tarkovItemId);
    
    
    
    // 1- Cible les éléments à animer
    const cartElement: HTMLElement = this.cartItemRef.nativeElement;

    this.backApiService.deleteUserItem(tarkovItemId).subscribe({
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
