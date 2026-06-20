import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonItem, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router'; 
import { FinanceiroService } from '../../services/transacao'; 
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { addIcons } from 'ionicons';
import { paperPlaneOutline, arrowBackOutline, helpCircleOutline, chevronForwardOutline, cameraOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, IonItem, IonIcon, CommonModule, FormsModule, RouterLink]
})
export class PagamentoPage implements OnInit, OnDestroy {
  chaveDestinatario: string = ''; 
  valorTransferencia: number | null = null; 
  valorPagar: string = ''; 
  isScanning: boolean = false;

  constructor(private financeiroService: FinanceiroService, private router: Router) {
    addIcons({ arrowBackOutline, helpCircleOutline, chevronForwardOutline, cameraOutline, paperPlaneOutline });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.pararEscaneamento();
  }

  ionViewWillLeave() {
    this.pararEscaneamento();
  }

  async comecarEscaneamento() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (!status.granted) {
        alert('Permissão de câmera negada.');
        return;
      }

      this.isScanning = true;
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');

      const resultado = await BarcodeScanner.startScan();

      if (resultado.hasContent && resultado.content) {
        this.processarDadosQrCode(resultado.content);
      }
      
      this.pararEscaneamento();
    } catch (erro) {
      console.error('Erro no scanner:', erro);
      this.pararEscaneamento();
    }
  }

  pararEscaneamento() {
    this.isScanning = false;
    document.querySelector('body')?.classList.remove('scanner-active');
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  processarDadosQrCode(conteudo: string) {
    if (!conteudo.startsWith('uppay-pix:')) {
      alert('QR Code inválido para o UpPay!');
      return;
    }

    try {
      const partePrincipal = conteudo.replace('uppay-pix:', '');
      const [email, queryParams] = partePrincipal.split('?');
      
      const urlParams = new URLSearchParams(queryParams);
      const valorStr = urlParams.get('valor') || '';

      this.chaveDestinatario = email;

      if (valorStr) {
        const valorNum = parseFloat(valorStr.replace(',', '.'));
        this.valorTransferencia = valorNum;

        let valorFormatado = valorNum.toFixed(2).replace('.', ',');
        valorFormatado = valorFormatado.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        this.valorPagar = 'R$ ' + valorFormatado;
      }
    } catch (erro) {
      alert('Erro ao processar dados do QR Code.');
    }
  }

  async enviarPix() {
    if (!this.chaveDestinatario || !this.valorTransferencia || this.valorTransferencia <= 0) {
      alert('Por favor, preencha a chave Pix e um valor válido.');
      return;
    }

    try {
      await this.financeiroService.transferirPix(this.chaveDestinatario, this.valorTransferencia);
      alert('Pix enviado com sucesso!');
      this.router.navigate(['/extrato']); 
    } catch (erro: any) {
      console.error('Erro na transferência:', erro);
      alert(erro.message || 'Ocorreu um erro ao realizar a transferência.');
    }
  }

  verificarChaveColada() {
    if (this.chaveDestinatario.trim().startsWith('uppay-pix:')) {
      this.processarDadosQrCode(this.chaveDestinatario);
    }
  }

  formatarMoeda(event: any) {
    let rawValor = event.target.value.replace(/\D/g, ''); 
    if (rawValor.length > 0) {
      this.valorTransferencia = parseFloat(rawValor) / 100;

      let valorFormatado = (parseFloat(rawValor) / 100).toFixed(2);
      valorFormatado = valorFormatado.replace('.', ',');
      valorFormatado = valorFormatado.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      
      event.target.value = 'R$ ' + valorFormatado;
    } else {
      event.target.value = '';
      this.valorTransferencia = null; 
    }
    
    this.valorPagar = event.target.value;
  }
}