import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonIcon, IonButton, IonItem, IonInput, 
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons 
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, helpCircleOutline, chevronForwardOutline, 
  closeOutline, copyOutline 
} from 'ionicons/icons';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-receber-pagamento',
  templateUrl: './receber-pagamento.page.html',
  styleUrls: ['./receber-pagamento.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonIcon, IonButton, IonItem, IonInput, 
    IonModal, IonHeader, IonToolbar, IonTitle, IonButtons,
    CommonModule, FormsModule, RouterLink
  ]
})
export class ReceberPagamentoPage implements OnInit {
  valorReceber: string = '';
  isModalOpen: boolean = false;
  stringPixCopiaECola: string = '';

  @ViewChild('qrcodeCanvas', { static: false }) canvas!: ElementRef;

  constructor(private auth: Auth) {
    addIcons({ 
      arrowBackOutline, helpCircleOutline, chevronForwardOutline, 
      closeOutline, copyOutline 
    });
  }

  ngOnInit() {}

  formatarMoeda(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    
    if (valor.length > 0) {
      valor = (parseFloat(valor) / 100).toFixed(2);
      valor = valor.replace('.', ',');
      valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      event.target.value = 'R$ ' + valor;
    } else {
      event.target.value = '';
    }
    this.valorReceber = event.target.value;
  }

  async gerarCobranca() {
    const usuarioLogado = this.auth.currentUser;
    if (!usuarioLogado) return;

    const valorLimpo = this.valorReceber.replace('R$ ', '').trim();
    const dadosPix = {
      recebedor: usuarioLogado.displayName || 'Usuário UpPay',
      chave: usuarioLogado.email,
      valor: valorLimpo || 'A definir pelo pagador',
      timestamp: new Date().getTime()
    };

    this.stringPixCopiaECola = `uppay-pix:${dadosPix.chave}?valor=${valorLimpo}&id=${dadosPix.timestamp}`;
    this.isModalOpen = true;

    setTimeout(() => {
      if (this.canvas && this.canvas.nativeElement) {
        QRCode.toCanvas(
          this.canvas.nativeElement, 
          this.stringPixCopiaECola, 
          { width: 250, margin: 2 }, 
          (error) => {
            if (error) console.error(error);
          }
        );
      }
    }, 150);
  }

  copiarChave() {
    navigator.clipboard.writeText(this.stringPixCopiaECola);
    alert('Código Pix Copia e Cola copiado!');
  }
}