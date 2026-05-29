import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Country } from '../../interfaces/character.interface';
import { HeaderComponent } from '../../components/header/header';
import { HeroComponent } from '../../components/hero/hero';
import { CardComponent } from '../../components/card/card';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeroComponent, CardComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);

  items = signal<Country[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    setTimeout(() => {
      this.apiService.getItems().subscribe({
        next: (countries) => {
          this.items.set(countries);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar la lista de países.');
          this.loading.set(false);
        }
      });
    }, 2000);
  }
}
