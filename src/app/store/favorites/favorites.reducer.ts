import { createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite } from './favorites.actions';

export interface FavoritesState {
  favorites: any[];
}

export const initialState: FavoritesState = {
  favorites: []
};

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { personaje }) => ({
    ...state,
    favorites: [...state.favorites, personaje]
  })),
  on(removeFavorite, (state, { id }) => ({
    ...state,
    favorites: state.favorites.filter(personaje => personaje.id !== id)
  }))
);