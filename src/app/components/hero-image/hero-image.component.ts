import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, 
  IonButton, IonIcon, IonChip, IonLabel } from '@ionic/angular/standalone';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { calendar, eye, trash, create, personCircle, business } from 'ionicons/icons';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonImg, IonButton, IonIcon, IonChip, IonLabel]
})
export class HeroImageComponent implements OnInit {
  @Input() imageData: any;
  heroName: string = '';
  heroDetails: any = null;
  showFallbackIcon: boolean = false;
  
  constructor(
    private apiService: ApiServiceService,
    private router: Router
  ) {
    addIcons({ calendar, eye, trash, create, personCircle, business });
  }

  ngOnInit() {
    // Check if image URL is empty or invalid
    if (!this.imageData?.imageUrl || this.imageData.imageUrl === '') {
      this.showFallbackIcon = true;
    }
    
    // Get hero details if we have a heroeId
    if (this.imageData?.heroeId) {
      this.apiService.getHero(this.imageData.heroeId).subscribe({
        next: (hero) => {
          this.heroDetails = hero;
          this.heroName = hero.nombre || 'Unknown Hero';
          console.log('Hero details loaded:', hero);
        },
        error: (err) => {
          console.error('Error loading hero details', err);
          this.heroName = 'Unknown Hero';
        }
      });
    }
  }

  onImageError(event: Event): void {
    this.showFallbackIcon = true;
    
    // Hide the img element that failed to load
    const imgElement = event.target as HTMLImageElement;
    if (imgElement) {
      imgElement.style.display = 'none';
    }
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  }

  viewHeroDetails() {
    if (this.imageData?.heroeId) {
      this.router.navigate(['/hero-details', this.imageData.heroeId]);
    }
  }

  deleteImage() {
    if (confirm('Are you sure you want to delete this image?')) {
      this.apiService.deleteHeroImage(this.imageData._id).subscribe({
        next: () => {
          // Notify parent component or refresh list
          window.location.reload();
        },
        error: (err) => {
          console.error('Error deleting image', err);
          alert('Failed to delete image. Please try again.');
        }
      });
    }
  }
}