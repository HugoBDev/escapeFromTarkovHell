import { Component, Input } from '@angular/core';
import { Item } from '../../models/hideout-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
@Input() items! : Item[]
storeItems : Item[] = []







}
