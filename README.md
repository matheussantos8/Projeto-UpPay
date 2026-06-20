# Projeto-UpPay
# 📱 UpPay - Mobile Banking Application

O **UpPay** é uma aplicação de mobile banking moderna e responsiva desenvolvida em **Ionic** com **Angular** (Standalone Components) e integrada ao **Firebase**. O projeto simula a experiência completa de uma carteira digital, com foco em alta performance, design fluido e UI/UX premium no modo escuro.

---

## 🚀 Funcionalidades Principais

* **🔐 Autenticação Segura:** Login e gerenciamento de sessões de usuários integrados em tempo real com o Firebase Auth.
* **💰 Dashboard Dinâmica:** Exibição de saldo em tempo real com opção de ocultar/mostrar valores para privacidade do usuário.
* **⚡ Área Pix Completa:** * Envio e recebimento de transferências financeiras.
    * **Leitor Inteligente:** Campo único que aceita chaves tradicionais e processa automaticamente códigos complexos de "Pix Copia e Cola".
    * **Scanner de Câmera:** Interface integrada e estilizada para leitura de QR Code em tempo real.
* **🛒 UpPay Shop:** Marketplace integrado de Gift Cards (PlayStation, Netflix, Uber, iFood) com exibição automática baseada no saldo disponível.
* **📈 Simulador de Empréstimos:** Sistema interativo com cálculo automático de parcelas, projeção de juros compostos a.m. e histórico de contratos ativos.
* **💳 Gestão de Cartões:** Interface interativa para alternar entre cartões Físicos e Virtuais, gerenciamento de limite de crédito por barra de progresso, máscara de segurança e bloqueio temporário.
* **📰 Banner de Finanças Inteligente:** Carrossel de dicas financeiras e segurança digital que se atualiza de forma automatizada a cada 1 hora com base no relógio do sistema.
* **❓ Central de Ajuda Contextual:** Páginas de suporte completas com menus expansíveis organizados em formato Sanfona (Accordion) para melhorar a experiência do usuário.

---

## 🛠️ Tecnologias Utilizadas

* **Framework Principal:** Ionic Framework & Angular (v17+ com standalone components).
* **Backend & Data:** Firebase Authentication & Firestore (para serviços financeiros e controle de saldo).
* **Estilização:** SCSS/SASS avançado utilizando CSS Variables e animações fluidas (`@keyframes`).
* **Ícones e Vetores:** Ionicons nativos.
* **Gerenciamento de Estado:** Ciclos de vida do Ionic (`ionViewWillEnter`) e Angular (`ngOnInit`, `ngOnDestroy`) para precisão em processos assíncronos.
