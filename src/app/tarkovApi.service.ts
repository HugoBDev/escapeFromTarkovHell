import { Injectable } from '@angular/core';
import { request, gql } from 'graphql-request';

@Injectable({
  providedIn: 'root'
})
export class tarkovApiService {

  private BASE_URL = 'https://api.tarkov.dev/graphql';

  tarkovApi(itemName : string) : Promise<any> {
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


    return request(this.BASE_URL,query) 
      .then(data => data)
      .catch(error=> {
        throw new Error(`Error fetching items: ${error.message}`)
      })
    }

    getHideoutStations(lang : string = 'fr') : Promise<any>{
      const query = gql`
      {
        hideoutStations(lang : ${lang}){
          name
          imageLink
        }
      }
      `;

      return request(this.BASE_URL,query)
      .then(data => data )
      .catch(error=> {
        throw new Error(`Error fetching items: ${error.message}`)
      })
    }
    
  }