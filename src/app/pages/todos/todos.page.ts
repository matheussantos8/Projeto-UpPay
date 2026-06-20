import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, helpCircleOutline, chevronForwardOutline, 
  cashOutline, cardOutline, walletOutline, bagHandleOutline, receiptOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, CommonModule, FormsModule, RouterLink]
})
export class TodosPage implements OnInit {

  constructor() {
    addIcons({ 
      arrowBackOutline, helpCircleOutline, chevronForwardOutline, 
      cashOutline, cardOutline, walletOutline, bagHandleOutline, receiptOutline 
    });
  }

  ngOnInit() {}
}