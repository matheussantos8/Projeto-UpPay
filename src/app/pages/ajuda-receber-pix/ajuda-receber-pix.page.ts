import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, chevronForwardOutline, cashOutline, shareSocialOutline, qrCodeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ajuda-receber-pix',
  templateUrl: './ajuda-receber-pix.page.html',
  styleUrls: ['./ajuda-receber-pix.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, CommonModule, FormsModule, RouterLink]
})
export class AjudaReceberPixPage implements OnInit {
  topicoAberto: number | null = null;

  constructor() {
    addIcons({ arrowBackOutline, chevronForwardOutline, cashOutline, shareSocialOutline, qrCodeOutline });
  }

  ngOnInit() {}

  alternarTopico(index: number) {
    this.topicoAberto = this.topicoAberto === index ? null : index;
  }
}