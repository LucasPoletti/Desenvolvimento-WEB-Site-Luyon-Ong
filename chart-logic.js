// chart-logic.js

let recursosChart; // Variável para armazenar a instância do gráfico
    
// Dados para os gráficos
const dataPie = {
    labels: ['Oficina de Pintura', 'Teatro Comunitário', 'Música para Todos', 'Apoio Administrativo'],
    datasets: [{
        data: [5000, 3000, 2000, 2500],
        backgroundColor: ['#0077cc', '#ff9900', '#24b36b', '#999999'] 
    }]
};

const dataBar = {
    labels: ['Materiais Artísticos', 'Salários Monitores', 'Aluguel Espaço', 'Marketing/Captação'],
    datasets: [{
        label: 'Gastos por Categoria (R$)',
        data: [4000, 5000, 3500, 1500],
        backgroundColor: '#0077cc', 
    }]
};

function renderRecursosChart(type, data) {
    const ctxRecursosElement = document.getElementById('chart-recursos');
    if (!ctxRecursosElement) return; // Sai se o canvas não estiver no DOM

    // Destrói o gráfico anterior antes de criar um novo (necessário pelo Chart.js)
    if (recursosChart) {
        recursosChart.destroy(); 
    }
    
    const ctxRecursos = ctxRecursosElement.getContext('2d');
    recursosChart = new Chart(ctxRecursos, {
        type: type,
        data: data,
        options: { 
            responsive: true,
            plugins: { legend: { position: type === 'pie' ? 'right' : 'top' } }
        }
    });
}

function toggleChart(type) {
    const pieBtn = document.getElementById('toggle-pie');
    const barBtn = document.getElementById('toggle-bar');

    if (type === 'pie') {
        renderRecursosChart('pie', dataPie);
        if (pieBtn) pieBtn.classList.add('active');
        if (barBtn) barBtn.classList.remove('active');
    } else if (type === 'bar') {
        renderRecursosChart('bar', dataBar);
        if (barBtn) barBtn.classList.add('active');
        if (pieBtn) pieBtn.classList.remove('active');
    }
}

// Inicialização dos Gráficos (Será chamada após o carregamento do DOM)
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o primeiro gráfico de recursos como Pie
    // A função toggleChart() já tem a lógica de verificação
    toggleChart('pie'); 
    
    // Gráfico de linha - Voluntários
    const ctxVoluntariosElement = document.getElementById('chart-voluntarios');
    if (ctxVoluntariosElement) {
        new Chart(ctxVoluntariosElement.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan','Fev','Mar','Abr','Mai','Jun'],
                datasets: [{
                    label: 'Voluntários Ativos',
                    data: [12, 15, 18, 20, 22, 25],
                    borderColor: '#ff9900', // Laranja de destaque para a linha
                    backgroundColor: 'rgba(255,153,0,0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: { responsive: true }
        });
    }
});