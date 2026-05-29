import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Country, CountryDetail } from '../interfaces/character.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getItems(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.baseUrl}/all?fields=name,capital,flags`
    );
  }

  getItemByName(name: string): Observable<CountryDetail> {
    return this.http
      .get<CountryDetail[]>(
        `${this.baseUrl}/name/${encodeURIComponent(name)}?fields=name,flags,capital,maps,population`
      )
      .pipe(map((res) => res[0]));
  }
}
