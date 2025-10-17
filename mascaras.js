document.addEventListener("DOMContentLoaded", () => {
    
    // --- FUNÇÕES DE VALIDAÇÃO ESPECÍFICAS ---

    function validateEmail(email) {
        // Regex para validar formato básico do email: algo@algo.algo, sem múltiplos @
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        // Remove tudo que não for dígito
        const digits = phone.replace(/\D/g, '');
        // Valida 10 dígitos (fixo, com DDD) ou 11 dígitos (celular, com nono dígito)
        return digits.length === 10 || digits.length === 11; 
    }
    
    // --- MÁSCARAS ---
    
    // Tenta obter os campos de telefone, independentemente do ID (telefone ou phone)
    const phones = [
        document.getElementById("telefone"), // ID do cadastro.html
        document.getElementById("phone")     // ID do contato.html
    ].filter(el => el != null); // Filtra apenas elementos existentes

    phones.forEach(phone => {
        phone.addEventListener("input", e => {
            let value = e.target.value.replace(/\D/g, ''); // Remove não-dígitos
            
            // Aplica a máscara (XX) XXXXX-XXXX
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
        });
    });

    // Máscaras de CPF e CEP (Mantidas)
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
        const successMessage = form.id === "cadastroForm" ? 
            document.getElementById("successMsg") : 
            document.getElementById("successMessageContato");
            
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let valid = true;
            
            // 1. Validação de campos obrigatórios (vazios)
            form.querySelectorAll("input[required], textarea[required]").forEach(input => {
                const errorMessage = input.nextElementSibling;
                if (!input.value.trim()) {
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
                    errorMessage.style.display = "none";
                }
            }
            
            // 3. Validação de Telefone (Formato/Dígitos)
            const phoneInput = form.querySelector('#phone') || form.querySelector('#telefone');
            if (phoneInput) {
                const isRequired = phoneInput.hasAttribute('required');
                const errorMessage = phoneInput.nextElementSibling;

                if (phoneInput.value.trim().length > 0 || isRequired) {
                    if (!validatePhone(phoneInput.value)) {
                        errorMessage.textContent = `O telefone deve ter 10 ou 11 dígitos (com DDD).`;
                        errorMessage.style.display = "block";
                        valid = false;
                    } else {
                        errorMessage.style.display = "none";
                    }
                } else {
                     // Campo opcional não preenchido
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
            } else {
                if (successMessage) successMessage.style.display = "none";
            }
        });
    });
});