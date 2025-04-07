import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAllFavorites } from '../store/favorites/favorites.selectors';
import { CharacterListComponent } from '../components/character-list/character-list.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    CharacterListComponent
  ],
})
export class Tab3Page {
  favoritos$: Observable<any[]>;

  constructor(private store: Store) {
    // Transforma el observable para que siempre emita un array
    this.favoritos$ = this.store.select(selectAllFavorites).pipe(
      map(favoritos => favoritos || []) // Si es null, devuelve un array vacío
    );
  }
}