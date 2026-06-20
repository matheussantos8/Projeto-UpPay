import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonItem, IonSelect, IonSelectOption, IonIcon } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'; 
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, IonItem, IonSelect, IonSelectOption, IonIcon, CommonModule, FormsModule, RouterLink]
})
export class LoginPage implements OnInit {
  tipoEntrada: string = 'email';
  campoIdentificador: string = ''; 
  senha: string = '';
  
  mostrarSenha: boolean = false;

  constructor(private auth: Auth, private router: Router) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {}

  formatarCPF(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    this.campoIdentificador = valor;
    event.target.value = valor;
  }

  async realizarLogin() {
    if (!this.campoIdentificador || !this.senha) {
      alert('Por favor, preencha as credenciais.');
      return;
    }

    let emailParaLogin = this.campoIdentificador;

    if (this.tipoEntrada === 'cpf') {
      alert('O login por CPF exigirá integração com o Firestore. Use a opção E-mail por enquanto.');
      return;
    }

    try {
      const credencial = await signInWithEmailAndPassword(this.auth, emailParaLogin, this.senha);
      console.log('Usuário logado com sucesso:', credencial.user);
      
      this.router.navigate(['/home']); 
    } catch (erro: any) {
      console.error('Erro ao logar:', erro);
      this.tratarErrosLogin(erro.code);
    }
  }

  tratarErrosLogin(codigo: string) {
    switch (codigo) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        alert('E-mail/CPF ou senha incorretos.');
        break;
      default:
        alert('Erro ao tentar entrar. Verifique sua conexão.');
    }
  }
}