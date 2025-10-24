// mascara.js - Corrigido para execução imediata no SPA

(function() {
    
    // --- FUNÇÕES DE VALIDAÇÃO ESPECÍFICAS ---

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const digits = phone.replace(/\D/g, '');
        // Valida 10 dígitos (fixo, com DDD) ou 11 dígitos (celular, com nono dígito)
        return digits.length === 10 || digits.length === 11; 
    }
    
    // --- FUNÇÃO PRINCIPAL DE INICIALIZAÇÃO ---
    
    function initializeMasksAndValidation() {
        
        // --- MÁSCARAS DE TELEFONE ---
        
        const phones = [
            document.getElementById("telefone"), // ID do cadastro.html
            document.getElementById("phone")     // ID do contato.html
        ].filter(el => el != null); // Filtra apenas elementos existentes

        phones.forEach(phone => {
            // Remove listener existente para evitar duplicação (importante no SPA)
            phone.removeEventListener("input", applyPhoneMask); 
            
            // Define a função de máscara
            function applyPhoneMask(e) {
                let value = e.target.value.replace(/\D/g, ''); // Remove não-dígitos
                let formattedValue = '';
                if (value.length > 0) {
                    formattedValue = `(${value.substring(0, 2)}`;
                }
                if (value.length > 2) {
                    formattedValue += `) ${value.substring(2, 7)}`;
                }
                if (value.length > 7) {
                    formattedValue += `-${value.substring(7, 11)}`;
                }
                e.target.value = formattedValue;
            }

            phone.addEventListener("input", applyPhoneMask);
        });

        // --- MÁSCARAS DE CPF e CEP ---
        
        const cpf = document.getElementById("cpf");
        if (cpf) {
            cpf.addEventListener("input", e => {
                e.target.value = e.target.value
                    .replace(/\D/g, '')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            });
        }
        
        const cep = document.getElementById("cep");
        if (cep) {
            cep.addEventListener("input", e => {
                e.target.value = e.target.value
                    .replace(/\D/g, '')
                    .replace(/(\d{5})(\d)/, '$1-$2');
            });
        }

        // --- PROCESSAMENTO DO SUBMIT PARA AMBOS OS FORMULÁRIOS ---
        
        const forms = [
            document.getElementById("cadastroForm"), 
            document.getElementById("contactForm")
        ].filter(el => el != null); // Captura ambos os formulários (se existirem)

        forms.forEach(form => {
            // Remove listener de submit existente para evitar múltiplas execuções
            form.removeEventListener("submit", handleSubmit); 

            function handleSubmit(e) {
                e.preventDefault();
                let valid = true;
                
                const successMessage = form.id === "cadastroForm" ? 
                    document.getElementById("successMessage") : // ID correto para Cadastro
                    document.getElementById("successMessageContato"); // ID correto para Contato
                    
                // 1. Validação de campos obrigatórios (vazios)
                form.querySelectorAll("input[required], textarea[required], select[required]").forEach(input => {
                    const errorMessage = input.nextElementSibling;
                    if (!input.value.trim() || input.value === "") { // Adicionado checagem para <select>
                        if (errorMessage) errorMessage.style.display = "block";
                        valid = false;
                    } else {
                        if (errorMessage) errorMessage.style.display = "none";
                    }
                });
                
                // 2. Validação de Email (Formato)
                const emailInput = form.querySelector('input[type="email"]');
                if (emailInput && emailInput.value.trim()) {
                    const errorMessage = emailInput.nextElementSibling;
                    if (!validateEmail(emailInput.value)) {
                        errorMessage.textContent = "Por favor, insira um e-mail válido (ex: seu@email.com).";
                        errorMessage.style.display = "block";
                        valid = false;
                    } else {
                        // Se for válido, esconde o erro, caso estivesse visível por outra falha
                        errorMessage.style.display = "none";
                    }
                }
                
                // 3. Validação de Telefone (Formato/Dígitos)
                const phoneInput = form.querySelector('#phone') || form.querySelector('#telefone');
                if (phoneInput) {
                    const isRequired = phoneInput.hasAttribute('required');
                    const errorMessage = phoneInput.nextElementSibling;
                    const value = phoneInput.value.replace(/\D/g, ''); // Apenas dígitos para validação

                    if (value.length > 0 || isRequired) {
                        if (!validatePhone(phoneInput.value)) {
                            errorMessage.textContent = `O telefone deve ter 10 ou 11 dígitos (com DDD).`;
                            errorMessage.style.display = "block";
                            valid = false;
                        } else {
                            errorMessage.style.display = "none";
                        }
                    } else {
                        errorMessage.style.display = "none";
                    }
                }
                
                // --- FIM DAS VALIDAÇÕES ---
                
                if (valid) {
                    if (successMessage) {
                        successMessage.style.display = "block";
                        setTimeout(() => successMessage.style.display = "none", 4000);
                    }
                    form.reset();
                    // Garante que o estado volte ao normal
                    form.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
                } else {
                    if (successMessage) successMessage.style.display = "none";
                }
            } // Fim da função handleSubmit

            form.addEventListener("submit", handleSubmit);
        });
    } // Fim da função initializeMasksAndValidation
    
    // Chamada imediata da função
    initializeMasksAndValidation();
    
    // O fechamento imediato da IIFE (Immediately Invoked Function Expression)
    // garante que o script se execute assim que for injetado.
})();