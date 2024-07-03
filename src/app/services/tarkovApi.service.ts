import { Injectable } from '@angular/core';
import { request, gql } from 'graphql-request';
import { HideoutItem } from '../models/hideout-item.model';

@Injectable({
  providedIn: 'root',
})
export class tarkovApiService {
  private BASE_URL = 'https://api.tarkov.dev/graphql';

  getTarkovItem(itemName: string, itemId : string): Promise<any> {
    const query = gql`
    {
      items(name: "${itemName}") {
        id
        name
        shortName
        iconLink
      }
    }
    `;

    return request(this.BASE_URL, query)
      .then((data) => data)
      .catch((error) => {
        throw new Error(`Error fetching items: ${error.message}`);
      });
  }

  getHideoutStations(lang: string = 'fr'): Promise<HideoutItem> {
    const query = gql`
      {
        hideoutStations(lang :${lang}){
            id
            name
            imageLink          
            levels{          
              level
              stationLevelRequirements{
                station{
                  name
                }
                level             
              }
              itemRequirements{
                quantity    
                  item{
                id
                name
                iconLink
              }
              }
            }
          }
      }
      `;

    return request<HideoutItem>(this.BASE_URL, query)
      .then((data) => data)
      .catch((error) => {
        throw new Error(`Error fetching items: ${error.message}`);
      });
  }
}
