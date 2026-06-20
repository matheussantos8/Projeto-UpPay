import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'pagamento',
    loadComponent: () => import('./pages/pagamento/pagamento.page').then( m => m.PagamentoPage)
  },
  {
    path: 'pix',
    loadComponent: () => import('./pages/pix/pix.page').then( m => m.PixPage)
  },
  {
    path: 'extrato',
    loadComponent: () => import('./pages/extrato/extrato.page').then( m => m.ExtratoPage)
  },
  {
    path: 'investimento',
    loadComponent: () => import('./pages/investimento/investimento.page').then( m => m.InvestimentoPage)
  },
  {
    path: 'ajuda-home',
    loadComponent: () => import('./pages/ajuda-home/ajuda-home.page').then( m => m.AjudaHomePage)
  },
  {
    path: 'receber-pagamento',
    loadComponent: () => import('./pages/receber-pagamento/receber-pagamento.page').then( m => m.ReceberPagamentoPage)
  },
  {
    path: 'ajuda-pagar-pix',
    loadComponent: () => import('./pages/ajuda-pagar-pix/ajuda-pagar-pix.page').then( m => m.AjudaPagarPixPage)
  },
  {
    path: 'ajuda-receber-pix',
    loadComponent: () => import('./pages/ajuda-receber-pix/ajuda-receber-pix.page').then( m => m.AjudaReceberPixPage)
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop.page').then( m => m.ShopPage)
  },
  {
    path: 'todos',
    loadComponent: () => import('./pages/todos/todos.page').then( m => m.TodosPage)
  },
  {
    path: 'cartoes',
    loadComponent: () => import('./pages/cartoes/cartoes.page').then( m => m.CartoesPage)
  },
  {
    path: 'emprestimos',
    loadComponent: () => import('./pages/emprestimos/emprestimos.page').then( m => m.EmprestimosPage)
  },
];
