import { Injectable } from '@angular/core';
import { CountryDetail } from '../interfaces/character.interface';

@Injectable({ providedIn: 'root' })
export class ItemCacheService {
  save(name: string, item: CountryDetail): void {
    try {
      localStorage.setItem(`item-cache-${name}`, JSON.stringify(item));
    } catch {
      // localStorage not available
    }
  }

  get(name: string): CountryDetail | null {
    try {
      const raw = localStorage.getItem(`item-cache-${name}`);
      return raw ? (JSON.parse(raw) as CountryDetail) : null;
    } catch {
      return null;
    }
  }
}
