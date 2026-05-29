import { Component, input } from '@angular/core';
import { UpperCasePipe, DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-hero',
  imports: [UpperCasePipe, DecimalPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {
  title = input.required<string>();
  total = input.required<number>();
  loading = input<boolean>(false);

  get totalValid(): boolean {
    return !isNaN(this.total()) && this.total() >= 0;
  }
}
