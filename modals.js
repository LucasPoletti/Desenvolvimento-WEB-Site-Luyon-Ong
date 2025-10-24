// modals.js

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        // Evita a rolagem do corpo da página principal enquanto o modal está aberto
        document.body.style.overflow = 'hidden'; 
        // Define o foco no modal para acessibilidade
        modal.focus();
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        // Restaura a rolagem do corpo da página
        document.body.style.overflow = 'auto'; 
    }
}

// Lógica de fechamento: Ao clicar fora ou usar ESC (Melhoria de usabilidade/acessibilidade)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Fechar ao clicar no fundo escuro
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    }
    
    // 2. Fechar ao usar a tecla ESC
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            // Fecha o primeiro modal visível encontrado
            const visibleModal = document.querySelector('.modal[style*="display: flex"]');
            if (visibleModal) {
                closeModal(visibleModal.id);
            }
        }
    });
});