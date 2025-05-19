import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment  } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
  URL_RM = environment.URL_RM;

  getPersonajes(): any {

    let url = `${environment.URL_RM}/character`;


    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('PERSONAJES_RK', res);
        return res;
      })
    );
  }

  getPersonaje(url: string ): any {
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        // console.log('PERSONAJE_RK', res);
        return res;
      })
    );
  }

  getPersonajePorId(id: number): Observable<any> {
    return this.getPersonajes().pipe(
      map((res: any) => {
        return res.results.find((personaje: any) => personaje.id === id);
      })
    );
  }

  getMasPersonajes(url:string):any{

    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('PERSONAJES_RK',res);
        return res;
      })
    );
 
  }

  getEpisodios(): any {
    let url = `${this.URL_RM}/episode`;

    return this.http.get(url, {}).pipe(
      map((res: any) => {
        // console.log('EPISODIOS_RK', res);
        return res;
      })
    );
  }

  getEpisodio(id: string): any {
    let url = `${this.URL_RM}/episode/${id}`;

    return this.http.get(url, {}).pipe(
      map((res: any) => {
        // console.log('EPISODIO_RK', res);
        return res;
      })
    );
  }

  getHeroes(): Observable<any> {
    const url = environment.URL_HEROES;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // GET a single hero by ID
  getHero(id: string): Observable<any> {
    const url = `${environment.URL_HEROES}/${id}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // POST to create a new hero
  createHero(hero: any): Observable<any> {
    const url = environment.URL_HEROES;
    return this.http.post(url, hero).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // PUT to update a hero
  updateHero(id: string, heroData: any): Observable<any> {
    const url = `${environment.URL_HEROES}/${id}`;
    return this.http.put(url, heroData).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // DELETE a hero
  deleteHero(id: string): Observable<any> {
    const url = `${environment.URL_HEROES}/${id}`;
    return this.http.delete(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // GET a single image by ID
  getImagesByHeroId(heroId: string): Observable<any> {
    const url = `${environment.URL_MULTIMEDIA}/hero/${heroId}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // GET all hero images (collection of all images)
  getHeroImages(): Observable<any> {
    const url = environment.URL_MULTIMEDIA;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  // DELETE an image
  deleteHeroImage(id: string): Observable<any> {
    const url = `${environment.URL_MULTIMEDIA}/${id}`;
    return this.http.delete(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
