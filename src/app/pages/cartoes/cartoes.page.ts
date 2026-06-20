import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton, IonToggle } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, helpCircleOutline, hardwareChipOutline, eyeOutline, 
  eyeOffOutline, lockOpenOutline, settingsOutline, chevronForwardOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.page.html',
  styleUrls: ['./cartoes.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, IonToggle, CommonModule, FormsModule, RouterLink]
})
export class CartoesPage implements OnInit {
  tipoCartao: 'virtual' | 'fisico' = 'virtual';
  mostrarDados: boolean = false;
  nomeUsuario: string = 'Carregando...';

  constructor(private auth: Auth) {
    addIcons({ 
      arrowBackOutline, helpCircleOutline, hardwareChipOutline, eyeOutline, 
      eyeOffOutline, lockOpenOutline, settingsOutline, chevronForwardOutline 
    });
  }

  ngOnInit() {
    onAuthStateChanged(this.auth, (usuarioAtual) => {
      if (usuarioAtual) {
        this.nomeUsuario = usuarioAtual.displayName || usuarioAtual.email?.split('@')[0] || 'Titular';
      } else {
        this.nomeUsuario = 'Titular';
      }
    });
  }
}