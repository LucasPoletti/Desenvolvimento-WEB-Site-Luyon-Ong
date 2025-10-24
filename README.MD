# 🌟 Luyon — Site Institucional para Projetos Sociais (ONG)

## Visão Geral do Projeto

O Luyon é um site institucional desenvolvido para uma organização social fictícia focada em transformar vidas através da arte. O projeto demonstra o domínio dos fundamentos web, design responsivo, e uma arquitetura moderna.

**Arquitetura:** O projeto utiliza uma arquitetura **Single Page Application (SPA)** para a maioria das páginas de conteúdo estático (`Início`, `Sobre`, `Projetos`, `Voluntariado`, `Blog`), garantindo navegação rápida e sem recarga. Páginas com alta interatividade ou APIs de segurança (`Doações`, `Transparência`) foram mantidas como Multi-Página para garantir 100% de funcionalidade.

---

## 🚀 Funcionalidades Principais e Páginas

O site é composto por páginas com estrutura modular:

| Página | Arquitetura | Destaques Técnicos |
| :--- | :--- | :--- |
| **`index.html`** | SPA Shell | Ponto de entrada que carrega todo o conteúdo via JavaScript. |
| **`sobre.html`** | SPA Módulo | Conteúdo enriquecido com linha do tempo e propósito. |
| **`projetos.html`** | SPA Módulo | Uso de Grid Layouts e Cards estilizados para exibir iniciativas. |
| **`voluntariado.html`** | SPA Módulo | Utiliza **Modals** para descrição de projetos (Lógica em `modals.js`). |
| **`doacoes.html`** | Multi-Página | Implementa a funcionalidade **"Copiar Chave PIX"** de forma síncrona (Lógica em `pix-copy.js`). |
| **`transparencia.html`**| Multi-Página | Dashboard de impacto utilizando a biblioteca **Chart.js** para gráficos interativos. |
| **`blog.html`** | SPA Módulo | Uso de Modals para exibição do corpo das matérias. |
| **`cadastro.html`** | Multi-Página | **Formulário Completo de Voluntariado** com validação robusta. |

---

## 🛠️ Tecnologias Utilizadas (Macro 2 e Macro 3)

* **HTML5:** Estrutura semântica completa e acessível.
* **CSS3:** Sistema de design baseado em **Variáveis CSS (`:root`)**, Layouts Flexbox e Grid para responsividade (5 Pontos de Interrupção).
* **JavaScript (JS Puro):**
    * **SPA (Single Page Application):** Lógica de roteamento (`spa.js`) para carregar módulos (`*-content.html`).
    * **Validação/Máscaras:** Implementação de máscaras para **CPF, Telefone e CEP** (em `mascaras.js`).
    * **Funcionalidades Modulares:** `modals.js` (pop-ups), `pix-copy.js` (cópia síncrona).
* **Chart.js:** Biblioteca externa para renderização dinâmica dos gráficos na página de Transparência.

---

## ⚙️ Como Rodar o Projeto Localmente

1.  **Clone o repositório:**
    ```bash
    git clone [INSERIR O LINK DO SEU REPOSITÓRIO]
    ```
2.  **Inicie o Servidor:** Use a extensão "Live Server" no VS Code (clique com o botão direito em `index.html` e selecione **Open with Live Server**).

---

**Link do Projeto (GitHub Pages):**

**(Insira aqui o link que será gerado pelo GitHub Pages)**