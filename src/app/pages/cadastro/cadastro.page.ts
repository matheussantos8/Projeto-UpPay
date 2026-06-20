import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonItem, IonIcon } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, updateProfile} from '@angular/fire/auth';
import { addIcons } from 'ionicons';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, IonItem, IonIcon, CommonModule, FormsModule, RouterLink]
})
export class CadastroPage implements OnInit {
  nome: string = '';
  cpf: string = '';
  email: string = '';
  senha: string = '';
  
  mostrarSenha: boolean = false;

  constructor(private auth: Auth, private router: Router, private firestore: Firestore) {
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
    this.cpf = valor;
    event.target.value = valor;
  }

  async realizarCadastro() {
    if (!this.email || !this.senha || !this.nome || !this.cpf) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const credencial = await createUserWithEmailAndPassword(this.auth, this.email, this.senha);
      
      await updateProfile(credencial.user, {
        displayName: this.nome
      });

     
      await setDoc(doc(this.firestore, `usuarios/${credencial.user.uid}`), {
        nome: this.nome,
        cpf: this.cpf,
        email: this.email,
        chavePix: this.email, 
        saldo: 1000.00        
      });
  
      console.log('Usuário criado e perfil atualizado:', credencial.user);
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/home']);
    } catch (erro: any) {
      console.error('Erro ao cadastrar:', erro);
      this.tratarErrosFirebase(erro.code);
    }
  }

  tratarErrosFirebase(codigo: string) {
    switch (codigo) {
      case 'auth/email-already-in-use':
        alert('Este e-mail já está sendo utilizado.');
        break;
      case 'auth/invalid-email':
        alert('O formato do e-mail inserido é inválido.');
        break;
      case 'auth/weak-password':
        alert('A senha precisa ter pelo menos 6 caracteres.');
        break;
      default:
        alert('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
    }
  }
}