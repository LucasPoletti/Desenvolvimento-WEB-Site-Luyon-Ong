document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");
    const successMessage = document.getElementById("successMessage");

    // Máscaras simples
    const telefone = document.getElementById("telefone");
    telefone.addEventListener("input", e => {
        e.target.value = e.target.value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/g, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2');
    });

    const cpf = document.getElementById("cpf");
    cpf.addEventListener("input", e => {
        e.target.value = e.target.value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    });

    const cep = document.getElementById("cep");
    cep.addEventListener("input", e => {
        e.target.value = e.target.value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2');
    });

    // Validação
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;
        form.querySelectorAll("input[required]").forEach(input => {
            const errorMessage = input.nextElementSibling;
            if (!input.value.trim()) {
                errorMessage.style.display = "block";
                valid = false;
            } else {
                errorMessage.style.display = "none";
            }
        });

        if (valid) {
            successMessage.style.display = "block";
            form.reset();
            setTimeout(() => successMessage.style.display = "none", 3000);
        }
    });
});
