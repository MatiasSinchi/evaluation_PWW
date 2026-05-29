import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ItemCacheService } from '../../services/item-cache.service';
import { CountryDetail } from '../../interfaces/character.interface';
import { HeaderComponent } from '../../components/header/header';
import { HeroComponent } from '../../components/hero/hero';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-detail',
  imports: [HeaderComponent, HeroComponent, FooterComponent, DecimalPipe],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private cacheService = inject(ItemCacheService);

  country = signal<CountryDetail | null>(null);
  loading = signal<boolean>(true);
  total = signal<number>(NaN);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name') ?? '';
    const totalParam = this.route.snapshot.queryParamMap.get('total');

    this.total.set(totalParam !== null ? Number(totalParam) : NaN);

    const cached = this.cacheService.get(name);
    if (cached) {
      this.country.set(cached);
      this.loading.set(false);
      return;
    }

    setTimeout(() => {
      this.apiService.getItemByName(name).subscribe({
        next: (detail) => {
          this.country.set(detail);
          this.cacheService.save(name, detail);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el detalle del país.');
          this.loading.set(false);
        }
      });
    }, 2000);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
