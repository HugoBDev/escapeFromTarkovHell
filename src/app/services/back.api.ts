import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environnement } from '../../../.env/env';
import { User } from '../models/user.model';
import { UserDataService } from './user.data.service';
import { Item, StationItem } from '../models/tarkovApi.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class BackApiService {
  
  apiUrl = environnement.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  
  }



  loadStationRequirementById(stationId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/stations/${stationId}`)
      .pipe(map((res) => res));
  }

  loadAllStationsByLvl(level: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/stations/level/${level}`)
      .pipe(map((res) => res));
  }
}
