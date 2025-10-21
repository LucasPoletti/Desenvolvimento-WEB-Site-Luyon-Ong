document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão e a lista UL dentro da NAV (usando o ID)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('main-nav').querySelector('ul'); 
    
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