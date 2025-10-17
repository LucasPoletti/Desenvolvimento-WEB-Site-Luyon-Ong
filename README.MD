# 🌟 Luyon — Site Institucional para Projetos Sociais (ONG)

## Visão Geral do Projeto

O Luyon é um site institucional desenvolvido para uma organização social fictícia focada em **transformar vidas de crianças e jovens** através de oficinas de arte, música e teatro.

Este projeto foi construído com base nos fundamentos do Desenvolvimento Web, priorizando **estrutura semântica**, **acessibilidade** e **design responsivo** para garantir uma experiência de usuário limpa e moderna.

A identidade visual é consistente, utilizando as cores **Azul (`#0077cc`)** para confiança e **Laranja (`#ff9900`)** para destaque e ações (CTAs).

---

## 🚀 Funcionalidades Principais e Páginas

O site é composto por páginas estáticas ricas em conteúdo e interatividade:

| Página | Descrição | Destaques Técnicos |
| :--- | :--- | :--- |
| **`index.html`** | Página Inicial / Landing Page | Design unificado e chamadas de ação claras (Doar, Voluntariar). |
| **`projetos.html`** | Detalhes sobre as oficinas (Pintura, Música, Teatro). | Uso de Grid Layouts e Cards estilizados. |
| **`sobre.html`** | Missão, Visão, Valores e História da organização. | Estrutura semântica (`<section>`, `<h2>`) para clareza. |
| **`cadastro.html`** | **Formulário Complexo de Voluntariado.** | Reúne todos os requisitos da atividade (campos de endereço, agrupamento lógico, validação robusta). |
| **`contato.html`** | Formulário simples de contato e localização via Google Maps. | Validação de campo e mensagens de sucesso no topo. |
| **`doacoes.html`** | Página para incentivar doações via PIX. | Botão de "Copiar PIX" funcional via JavaScript. |
| **`transparencia.html`**| **Dashboard de Impacto e Finanças.** | Uso do Chart.js para gráficos interativos (Toggle Pie/Bar) e KPIs de impacto. |
| **`blog.html`** | Notícias e histórias dos projetos. | Uso de Modals (pop-ups) para exibir o corpo completo das matérias (simulando um CMS). |

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica completa (`<header>`, `<main>`, `<section>`, `<footer>`).
* **CSS3:** Estilização baseada em **Variáveis CSS (`:root`)** para manutenção centralizada, Layouts Flexbox e Grid para responsividade.
* **JavaScript (JS Puro):**
    * Máscaras de entrada para **CPF, Telefone e CEP**.
    * Validação de formulários (campos vazios e checagem de formato de E-mail/Telefone).
    * Lógica para Modals (pop-ups) e Dashboard Interativo (Toggle de gráficos).
* **Chart.js:** Biblioteca para renderização dinâmica dos gráficos de dados na página de Transparência.

---

## ⚙️ Como Rodar o Projeto Localmente

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/LucasPoletti/Desenvolvimento-WEB-Site-Luyon-Ong.git](https://github.com/LucasPoletti/Desenvolvimento-WEB-Site-Luyon-Ong.git)
    ```
2.  **Abra a pasta:**
    ```bash
    cd Desenvolvimento-WEB-Site-Luyon-Ong
    ```
3.  **Abra o arquivo:**
    Abra o arquivo `index.html` diretamente no seu navegador ou utilize a extensão "Live Server" no VS Code.

---

**Link do Projeto (GitHub Pages):**

**(Insira aqui o link que será gerado pelo GitHub Pages)**