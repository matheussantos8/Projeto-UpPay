import { Component, OnInit } from '@angular/core';
import { FinanceiroService } from '../../services/transacao';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  arrowBackCircleOutline, 
  eyeOutline, 
  eyeOffOutline, 
  searchOutline, 
  arrowDownCircleOutline, 
  arrowUpCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.page.html',
  styleUrls: ['./extrato.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink]
})
export class ExtratoPage implements OnInit {
  exibirSaldo: boolean = false;
  saldoValor: string = 'R$ 0,00';
  extratoExpandido: boolean = false;
  
  transacoesResumo: any[] = [];
  historicoCompleto: any[] = [];

  constructor(private financeiroService: FinanceiroService) {
    addIcons({ 
      'arrow-back-circle-outline': arrowBackCircleOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline,
      'search-outline': searchOutline,
      'arrow-down-circle-outline': arrowDownCircleOutline,
      'arrow-up-circle-outline': arrowUpCircleOutline
    });
  }

  async ngOnInit() {
    try {
      const saldo = await this.financeiroService.obterSaldo();
      this.saldoValor = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      this.historicoCompleto = await this.financeiroService.obterExtrato();
      
      this.transacoesResumo = this.historicoCompleto.slice(0, 4);
    } catch (erro) {
      console.error('Erro ao carregar dados do extrato:', erro);
    }
  }
}