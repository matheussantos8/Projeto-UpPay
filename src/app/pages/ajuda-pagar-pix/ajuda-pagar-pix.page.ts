import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, chevronForwardOutline, cameraOutline, copyOutline, phonePortraitOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ajuda-pagar-pix',
  templateUrl: './ajuda-pagar-pix.page.html',
  styleUrls: ['./ajuda-pagar-pix.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, CommonModule, FormsModule, RouterLink]
})
export class AjudaPagarPixPage implements OnInit {
  topicoAberto: number | null = null;

  constructor() {
    addIcons({ arrowBackOutline, chevronForwardOutline, cameraOutline, copyOutline, phonePortraitOutline });
  }

  ngOnInit() {}

  alternarTopico(index: number) {
    this.topicoAberto = this.topicoAberto === index ? null : index;
  }
}