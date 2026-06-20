import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton, IonItem, IonInput } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { FinanceiroService } from '../../services/transacao';
import { addIcons } from 'ionicons';
import { arrowBackOutline, helpCircleOutline, documentTextOutline } from 'ionicons/icons';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.page.html',
  styleUrls: ['./emprestimos.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, IonItem, IonInput, CommonModule, FormsModule, RouterLink]
})
export class EmprestimosPage implements OnInit {
  valorMascarado: string = '';
  valorSimulado: number = 0;
  parcelasSelecionadas: number = 12;
  opcoesParcelas: number[] = [6, 12, 18, 24, 36];
  emprestimosAtivos: any[] = [];

  constructor(private financeiroService: FinanceiroService, private router: Router) {
    addIcons({ arrowBackOutline, helpCircleOutline, documentTextOutline });
  }

  ngOnInit() {}

  formatarMoeda(event: any) {
    let rawValor = event.target.value.replace(/\D/g, ''); 
    if (rawValor.length > 0) {
      this.valorSimulado = parseFloat(rawValor) / 100;
      let valorFormatado = (parseFloat(rawValor) / 100).toFixed(2);
      valorFormatado = valorFormatado.replace('.', ',');
      valorFormatado = valorFormatado.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      event.target.value = 'R$ ' + valorFormatado;
    } else {
      event.target.value = '';
      this.valorSimulado = 0;
    }
    this.valorMascarado = event.target.value;
  }

  selecionarParcela(opcao: number) {
    this.parcelasSelecionadas = opcao;
  }

  calcularParcela(): string {
    const totalComJuros = this.valorSimulado * Math.pow(1 + 0.0499, this.parcelasSelecionadas);
    const valorParcela = totalComJuros / this.parcelasSelecionadas;
    return valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  calcularTotal(): string {
    const totalComJuros = this.valorSimulado * Math.pow(1 + 0.0499, this.parcelasSelecionadas);
    return totalComJuros.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  async contratarEmprestimo() {
    if (this.valorSimulado <= 0) return;

    try {
      this.emprestimosAtivos.push({
        id: Date.now(),
        valor: this.valorSimulado,
        parcelas: this.parcelasSelecionadas,
        data: new Date().toLocaleDateString('pt-BR')
      });

      alert('Empréstimo contratado com sucesso! O valor foi adicionado ao seu saldo.');
      this.valorMascarado = '';
      this.valorSimulado = 0;
      this.router.navigate(['/home']);
    } catch (erro) {
      alert('Erro ao processar empréstimo.');
    }
  }
}