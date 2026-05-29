import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../../interfaces/character.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class CardComponent {
  item = input.required<Country>();
  total = input.required<number>();

  private router = inject(Router);

  navigate(): void {
    this.router.navigate(['/details', this.item().name.common], {
      queryParams: { total: this.total() }
    });
  }
}
