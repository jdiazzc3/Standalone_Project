import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from '../components/character-list/character-list.component';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonInfiniteScroll,   
    IonInfiniteScrollContent,
    CommonModule,
    CharacterListComponent
  ]
})
export class Tab2Page implements OnInit {

  personajes: any[] = [];
  url_next: string = '';

  constructor(private bd: ApiServiceService) {}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  async cargarPersonajes() {
    await this.bd.getPersonajes().toPromise().then((resp: any) => {
      this.personajes = resp.results.map((personaje: any) => ({
        ...personaje,
        favorito: false // Inicializa la propiedad favorito
      }));
      console.log("MISPERSONAJES", this.personajes);
      this.url_next = resp.info.next;
      console.log("SIGUIENTE", this.url_next);
    });
  }

  async cargarPersonajesSiguientes() {
    await this.bd.getMasPersonajes(this.url_next).toPromise().then((resp: any) => {
      let masPersonajes = resp.results.map((personaje: any) => ({
        ...personaje,
        favorito: false // Inicializa la propiedad favorito
      }));
      this.personajes.push(...masPersonajes);
      this.url_next = resp.info.next;
      console.log("SIGUIENTE", this.url_next);
    });
  }

  onIonInfinite(ev: any) {
    if (this.url_next !== null) {
      this.cargarPersonajesSiguientes();
    }
    setTimeout(() => {
      ev.target.complete();
    }, 3000);
  }

}
