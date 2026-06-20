import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, chevronForwardOutline, keyOutline, repeatOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.page.html',
  styleUrls: ['./pix.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, CommonModule, FormsModule, RouterLink]
})
export class PixPage implements OnInit {
  constructor() {
    addIcons({ arrowBackOutline, chevronForwardOutline, keyOutline, repeatOutline });
  }
  ngOnInit() {}
}