import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonToolbar, IonAvatar, IonIcon, 
  IonButton, IonTabs, IonTabBar, IonTabButton, IonLabel 
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { FinanceiroService } from '../../services/transacao'; 
import { addIcons } from 'ionicons';
import { 
  helpCircleOutline, eyeOutline, eyeOffOutline, homeOutline, 
  bagHandleOutline, gridOutline, cashOutline, cardOutline, 
  trendingUpOutline, ribbonOutline, shieldCheckmarkOutline, walletOutline, personOutline, businessOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonAvatar, IonIcon, 
    IonButton, IonTabBar, IonTabButton, IonLabel, 
    CommonModule, FormsModule, RouterLink
  ]
})
export class HomePage implements OnInit, OnDestroy {
  exibirSaldo: boolean = false;
  saldoValor: string = 'R$ 0,00'; 
  nomeUsuario: string = 'carregando...'; 
  noticiaAtual: any;
  private intervalId: any;

  private listaNoticias = [
    {
      titulo: 'Como começar a poupar hoje',
      descricao: 'Separe pelo menos 10% do que você recebe logo no início do mês para criar sua reserva.',
      icone: 'wallet-outline',
      corFundo: 'linear-gradient(135deg, #2d3e48 0%, #526a77 100%)'
    },
    {
      titulo: 'Segurança com seu Pix',
      descricao: 'Nunca compartilhe senhas ou códigos recebidos por SMS. O UpPay nunca pede seus dados por ligação.',
      icone: 'shield-checkmark-outline',
      corFundo: 'linear-gradient(135deg, #442d34 0%, #6e454f 100%)'
    },
    {
      titulo: 'Entenda os Juros Compostos',
      descricao: 'Fazer pequenos investimentos mensais pode render muito mais no longo prazo do que guardar tudo de uma vez.',
      icone: 'trending-up-outline',
      corFundo: 'linear-gradient(135deg, #1e382b 0%, #355e48 100%)'
    },
    {
      titulo: 'Vantagens do Cartão Virtual',
      descricao: 'Use o cartão virtual para compras online. Ele traz mais segurança e pode ser alterado a qualquer momento.',
      icone: 'ribbon-outline',
      corFundo: 'linear-gradient(135deg, #322543 0%, #533e6c 100%)'
    }
  ];

  constructor(private auth: Auth, private financeiroService: FinanceiroService) { 
    addIcons({personOutline,helpCircleOutline,walletOutline,businessOutline,bagHandleOutline,homeOutline,gridOutline,eyeOutline,eyeOffOutline,cashOutline,cardOutline,trendingUpOutline,ribbonOutline,shieldCheckmarkOutline});
  }

  ngOnInit() {
    onAuthStateChanged(this.auth, async (usuarioAtual) => {
      if (usuarioAtual) {
        this.nomeUsuario = usuarioAtual.displayName || usuarioAtual.email?.split('@')[0] || 'Usuário';
        await this.carregarSaldoReal();
      } else {
        this.nomeUsuario = 'usuário';
        this.saldoValor = 'R$ 0,00';
      }
    });

    this.atualizarBannerPorHora();
    this.intervalId = setInterval(() => {
      this.atualizarBannerPorHora();
    }, 60000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async ionViewWillEnter() {
    if (this.auth.currentUser) {
      await this.carregarSaldoReal();
    }
  }

  async carregarSaldoReal() {
    try {
      const saldo = await this.financeiroService.obterSaldo();
      this.saldoValor = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } catch (erro) {
      console.error('Erro ao carregar saldo na Home:', erro);
      this.saldoValor = 'R$ 0,00';
    }
  }

  atualizarBannerPorHora() {
    const horaAtual = new Date().getHours();
    const indice = horaAtual % this.listaNoticias.length;
    this.noticiaAtual = this.listaNoticias[indice];
  }
}