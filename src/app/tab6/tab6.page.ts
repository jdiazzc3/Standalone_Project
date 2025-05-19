import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiServiceService } from '../services/api-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab6Page {
  private apiService = inject(ApiServiceService);

  heroes: any[] = [];
  selectedHero: any = null;
  heroImages: any[] = [];

  newHero: any = {
    nombre: '',
    bio: '',
    img: '',
    aparicion: '',
    casa: ''
  };

  editMode = false;
  editingHeroId: string | null = null;

  ngOnInit() {
    this.loadHeroes();
  }

  loadHeroes() {
    this.apiService.getHeroes().subscribe(data => this.heroes = data);
    this.clearSelection();
  }

  selectHero(hero: any) {
    this.selectedHero = hero;
    this.apiService.getImagesByHeroId(hero.id).subscribe(images => {
      this.heroImages = images;
    });
  }

  clearSelection() {
    this.selectedHero = null;
    this.heroImages = [];
    this.cancelEdit();
  }

  createHero() {
    this.apiService.createHero(this.newHero).subscribe(() => {
      this.loadHeroes();
      this.resetForm();
    });
  }

  editHero(hero: any) {
    this.editMode = true;
    this.editingHeroId = hero.id;
    this.newHero = { ...hero };
  }

  saveHero() {
    if (this.editMode && this.editingHeroId) {
      this.apiService.updateHero(this.editingHeroId, this.newHero).subscribe(() => {
        this.loadHeroes();
        this.resetForm();
      });
    } else {
      this.createHero();
    }
  }

  deleteHero(id: string) {
    this.apiService.deleteHero(id).subscribe(() => this.loadHeroes());
  }

  cancelEdit() {
    this.editMode = false;
    this.editingHeroId = null;
    this.resetForm();
  }

  private resetForm() {
    this.newHero = { nombre: '', bio: '', img: '', aparicion: '', casa: '' };
    this.editMode = false;
    this.editingHeroId = null;
  }
}
