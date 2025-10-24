// pix-copy.js - Versão 100% síncrona e confiável para SPA

function copyPIX(id) {
    const pixElement = document.getElementById(id);
    
    if (!pixElement) {
        console.error('Elemento PIX não encontrado com o ID:', id);
        return;
    }
    
    // 1. Extrai a chave do texto (CNPJ/Chave)
    const pixKey = pixElement.textContent.replace('PIX: ', '').trim();
    
    let copySuccessful = false;
    
    // --- TENTATIVA SÍNCRONA e Consistente (Funciona com execCommand) ---
    try {
        // Cria um campo de texto temporário
        const tempInput = document.createElement('input');
        tempInput.value = pixKey;
        document.body.appendChild(tempInput);
        
        // Seleciona e copia
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // Para mobile
        document.execCommand('copy'); 
        
        // Limpeza
        document.body.removeChild(tempInput);
        copySuccessful = true;
        
    } catch (err) {
        // Se a cópia síncrona falhou (raro em navegadores modernos, mas possível)
        console.error('Erro fatal ao copiar PIX:', err);
        copySuccessful = false;
    }
    
    // --- Feedback ao Usuário ---
    if (copySuccessful) {
        alert('Chave PIX copiada com sucesso: ' + pixKey);
    } else {
        alert('Falha ao copiar a chave PIX. Por favor, copie manualmente: ' + pixKey);
    }
}