import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FinanceiroService } from '../../services/transacao';
import { addIcons } from 'ionicons';
import { 
  helpCircleOutline, gameControllerOutline, playCircleOutline, 
  carOutline, fastFoodOutline, arrowBackOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, CommonModule, FormsModule, RouterLink]
})
export class ShopPage implements OnInit {
  saldoValor: string = 'R$ 0,00';

  produtos = [
    { id: 1, nome: 'PlayStation Store', icone: 'game-controller-outline', categoria: 'games', categoriaExibicao: 'Jogos', precoMinimo: 30, corFundo: '#003791' },
    { id: 2, nome: 'Netflix', icone: 'play-circle-outline', categoria: 'streaming', categoriaExibicao: 'Filmes & Séries', precoMinimo: 25, corFundo: '#E50914' },
    { id: 3, nome: 'Uber Pay', icone: 'car-outline', categoria: 'transporte', categoriaExibicao: 'Viagens', precoMinimo: 20, corFundo: '#000000' },
    { id: 4, nome: 'iFood Card', icone: 'fast-food-outline', categoria: 'comida', categoriaExibicao: 'Delivery', precoMinimo: 15, corFundo: '#EA1D2C' }
  ];

  constructor(private auth: Auth, private financeiroService: FinanceiroService) {
    addIcons({ helpCircleOutline, gameControllerOutline, playCircleOutline, carOutline, fastFoodOutline, arrowBackOutline });
  }

  async ngOnInit() {
    await this.carregarSaldo();
  }

  async ionViewWillEnter() {
    await this.carregarSaldo();
  }

  async carregarSaldo() {
    try {
      if (this.auth.currentUser) {
        const saldo = await this.financeiroService.obterSaldo();
        this.saldoValor = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
    } catch (erro) {
      console.error('Erro ao buscar saldo no Shop:', erro);
    }
  }

  filtrarCategoria(categoria: string) {
    console.log('Filtrar por:', categoria);
  }

  comprarProduto(produto: any) {
    alert(`Comprar Gift Card do ${produto.nome}`);
  }
}