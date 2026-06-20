import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonHeader, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { arrowBackOutline, trendingUpOutline, trendingDownOutline, logoBitcoin, logoUsd, logoEuro } from 'ionicons/icons';

@Component({
  selector: 'app-investimento',
  templateUrl: './investimento.page.html',
  styleUrls: ['./investimento.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonHeader, IonToolbar, IonButton, CommonModule, FormsModule, RouterLink, HttpClientModule]
})
export class InvestimentoPage implements OnInit {
  
  moedasMercado: any[] = [];

  constructor(private http: HttpClient) {
    addIcons({ arrowBackOutline, trendingUpOutline, trendingDownOutline, logoBitcoin, logoUsd, logoEuro });
  }

  ngOnInit() {
    this.carregarCotacoes();
  }

  carregarCotacoes() {
    const url = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL';

    this.http.get(url).subscribe((res: any) => {
      this.moedasMercado = [
        { 
          nome: 'Bitcoin', 
          sigla: 'BTC', 
          valor: Number(res.BTCBRL.bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 
          variacao: parseFloat(res.BTCBRL.pctChange) >= 0 ? `+${res.BTCBRL.pctChange}%` : `${res.BTCBRL.pctChange}%`, 
          alta: parseFloat(res.BTCBRL.pctChange) >= 0, 
          icone: 'logo-bitcoin' 
        },
        { 
          nome: 'Dólar Comercial', 
          sigla: 'USD', 
          valor: Number(res.USDBRL.bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 
          variacao: parseFloat(res.USDBRL.pctChange) >= 0 ? `+${res.USDBRL.pctChange}%` : `${res.USDBRL.pctChange}%`, 
          alta: parseFloat(res.USDBRL.pctChange) >= 0, 
          icone: 'logo-usd'
        },
        { 
          nome: 'Euro', 
          sigla: 'EUR', 
          valor: Number(res.EURBRL.bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 
          variacao: parseFloat(res.EURBRL.pctChange) >= 0 ? `+${res.EURBRL.pctChange}%` : `${res.EURBRL.pctChange}%`, 
          alta: parseFloat(res.EURBRL.pctChange) >= 0, 
          icone: 'logo-euro' 
        }
      ];
    }, error => {
      console.error('Erro ao buscar dados da API', error);
    });
  }
}