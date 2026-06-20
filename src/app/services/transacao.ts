import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { 
  Firestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  runTransaction 
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  constructor(private firestore: Firestore, private auth: Auth) {}

  async obterSaldo(): Promise<number> {
    const userId = this.auth.currentUser?.uid;
    if (!userId) {
      console.warn('obterSaldo: Nenhum usuário autenticado no Auth.');
      return 0;
    }
  
    try {
      const userDocRef = doc(this.firestore, 'usuarios', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const dados = userDoc.data();
        console.log(`Saldo recuperado para o UID ${userId}:`, dados['saldo']);
        return dados['saldo'] || 0;
      }
      
      console.warn(`Documento do usuário ${userId} não existe no Firestore.`);
      return 0;
    } catch (erro) {
      console.error('Erro ao obter saldo no Firestore:', erro);
      return 0;
    }
  }

  async transferirPix(emailDestinatario: string, valor: number): Promise<void> {
    const remetenteId = this.auth.currentUser?.uid;
    const remetenteEmail = this.auth.currentUser?.email;
    if (!remetenteId || !remetenteEmail) throw new Error('Usuário não autenticado');
  
    const emailFormatado = emailDestinatario.trim().toLowerCase();
  
    if (remetenteEmail.toLowerCase() === emailFormatado) {
      throw new Error('Você não pode transferir para si mesmo');
    }
  
    const usuariosRef = collection(this.firestore, 'usuarios');
    const q = query(usuariosRef, where('email', '==', emailFormatado));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      throw new Error(`Destinatário não encontrado com o e-mail: ${emailFormatado}`);
    }

    const destinatarioDoc = querySnapshot.docs[0];
    const destinatarioId = destinatarioDoc.id;

    const remetenteRef = doc(this.firestore, 'usuarios', remetenteId);
    const destinatarioRef = doc(this.firestore, 'usuarios', destinatarioId);
    const transacoesRef = collection(this.firestore, 'transacoes');
    const novaTransacaoRef = doc(transacoesRef);

    await runTransaction(this.firestore, async (transaction) => {
      const remetenteSnap = await transaction.get(remetenteRef);
      const destinatarioSnap = await transaction.get(destinatarioRef);

      if (!remetenteSnap.exists()) throw new Error('Remetente não encontrado no banco');
      if (!destinatarioSnap.exists()) throw new Error('Destinatário não encontrado no banco');

      const saldoRemetenteAtual = remetenteSnap.data()['saldo'] || 0;
      const saldoDestinatarioAtual = destinatarioSnap.data()['saldo'] || 0;

      if (saldoRemetenteAtual < valor) throw new Error('Saldo insuficiente');

      transaction.update(remetenteRef, { saldo: saldoRemetenteAtual - valor });
      transaction.update(destinatarioRef, { saldo: saldoDestinatarioAtual + valor });

      transaction.set(novaTransacaoRef, {
        remetenteId,
        remetenteEmail,
        destinatarioId,
        destinatarioEmail: emailFormatado,
        valor,
        data: new Date().toISOString(),
        tipo: 'Pix'
      });
    });
  }

  async obterExtrato(): Promise<any[]> {
    const userId = this.auth.currentUser?.uid;
    if (!userId) return [];

    const transacoesRef = collection(this.firestore, 'transacoes');
    
    const qEnviados = query(transacoesRef, where('remetenteId', '==', userId));
    const qRecebidos = query(transacoesRef, where('destinatarioId', '==', userId));

    const [snapEnviados, snapRecebidos] = await Promise.all([
      getDocs(qEnviados),
      getDocs(qRecebidos)
    ]);

    const lista: any[] = [];

    snapEnviados.forEach(doc => {
      const dados = doc.data();
      const dataFormatada = typeof dados['data'] === 'string' ? new Date(dados['data']) : dados['data'].toDate();
      
      lista.push({
        tipo: 'Pix Enviado',
        nome: dados['destinatarioEmail'],
        valor: `-R$ ${dados['valor'].toFixed(2).replace('.', ',')}`,
        data: dataFormatada.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' }),
        entrada: false,
        timestamp: dataFormatada
      });
    });

    snapRecebidos.forEach(doc => {
      const dados = doc.data();
      const dataFormatada = typeof dados['data'] === 'string' ? new Date(dados['data']) : dados['data'].toDate();
      
      lista.push({
        tipo: 'Pix Recebido',
        nome: dados['remetenteEmail'],
        valor: `R$ ${dados['valor'].toFixed(2).replace('.', ',')}`,
        data: dataFormatada.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' }),
        entrada: true,
        timestamp: dataFormatada
      });
    });

    return lista.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}