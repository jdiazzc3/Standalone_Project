import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {IonAvatar, IonItem, IonLabel} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { addFavorite, removeFavorite } from 'src/app/store/favorites/favorites.actions';
import { selectAllFavorites } from 'src/app/store/favorites/favorites.selectors';
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IonAvatar,
    IonItem,
    IonLabel
  ]
})
export class CharacterListComponent  implements OnInit {

  @Input() personajes: any[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  favorites$ = this.store.select(selectAllFavorites);
  constructor(private store: Store) {}

  toggleFavorite(personaje: any) {
    console.log('Toggle favorito para:', personaje); // Agrega este log para verificar
    this.favorites$.pipe(take(1)).subscribe(favorites => {
      const isFavorite = favorites.some(fav => fav.id === personaje.id);
      const updatedPersonaje = { ...personaje, favorito: !isFavorite };
  
      if (isFavorite) {
        this.store.dispatch(removeFavorite({ id: personaje.id }));
      } else {
        this.store.dispatch(addFavorite({ personaje: updatedPersonaje }));
      }
    });
  }

  isFavorite(personaje: any): boolean {
    let isFavorite = false;
    this.favorites$.pipe(take(1)).subscribe(favorites => {
      isFavorite = favorites.some(fav => fav.id === personaje.id);
    });
    return isFavorite;
  }
  
  ngOnInit() {
    this.favorites$.subscribe(favorites => {
      console.log('Favoritos actuales:', favorites); // Verifica si el store está funcionando
    });
  }
}
