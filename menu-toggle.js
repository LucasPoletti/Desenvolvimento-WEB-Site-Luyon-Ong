document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão de sanduíche
    const menuToggle = document.querySelector('.menu-toggle');
    // Seleciona a lista de navegação (o que será aberto/fechado) dentro de #main-nav
    const navMenu = document.getElementById('main-nav') ? document.getElementById('main-nav').querySelector('ul') : null; 
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Adiciona/Remove a classe 'open' para mostrar/esconder o menu (CSS)
            navMenu.classList.toggle('open');
            // Adiciona/Remove a classe 'active' para o efeito 'X' no botão (CSS)
            menuToggle.classList.toggle('active');
            
            // Atualiza o atributo de acessibilidade aria-expanded
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
});