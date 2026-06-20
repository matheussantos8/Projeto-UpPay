import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonToolbar, IonButton, 
  IonIcon, IonTitle, IonButtons 
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  chevronForwardOutline, 
  helpCircleOutline,
  cashOutline, 
  listOutline, 
  cardOutline, 
  trendingUpOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-ajuda-home',
  templateUrl: './ajuda-home.page.html',
  styleUrls: ['./ajuda-home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonButton, IonIcon, 
    IonTitle, IonButtons, CommonModule, FormsModule, RouterLink
  ]
})
export class AjudaHomePage implements OnInit {
  topicoAberto: number | null = null;

  constructor() { 
    addIcons({ 
      'arrow-back-outline': arrowBackOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'help-circle-outline': helpCircleOutline,
      'cash-outline': cashOutline,
      'list-outline': listOutline,
      'card-outline': cardOutline,
      'trending-up-outline': trendingUpOutline
    });
  }

  ngOnInit() { }

  alternarTopico(index: number) {
    this.topicoAberto = this.topicoAberto === index ? null : index;
  }
}