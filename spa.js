document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('spa-content');
    const navLinks = document.querySelectorAll('#main-nav a');
    
    // --- CORREÇÃO ESSENCIAL PARA GITHUB PAGES ---
    // Determina o BASE_PATH (o nome do repositório) apenas se não estiver na raiz do domínio
    const PATH_NAME = window.location.pathname;
    const BASE_PATH = PATH_NAME.includes('Desenvolvimento-WEB-Site-Luyon-Ong') 
        ? '/Desenvolvimento-WEB-Site-Luyon-Ong/'
        : '/';
    // --- FIM CORREÇÃO BASE_PATH ---
    

    // --- FUNÇÕES DE UTILIDADE ---

    // 1. Atualiza a classe 'active' no menu de navegação
    function updateActiveMenu(currentUrl) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        navLinks.forEach(link => {
            const linkUrl = link.getAttribute('href');
            // Checa a URL exata ou o link de index na raiz
            if (currentUrl === linkUrl || (currentUrl === '/' && linkUrl === 'index.html') || (currentUrl === 'index.html' && linkUrl === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // 2. Fecha o menu hamburguer (se houver)
    function closeMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navUl = document.getElementById('main-nav')?.querySelector('ul'); 
        if (menuToggle && navUl && navUl.classList.contains('open')) {
            navUl.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // 3. Reexecuta scripts (CORREÇÃO DE CACHE CRÍTICA PARA CHART.JS e PIX COPY)
    function reExecuteScripts(targetElement) {
        targetElement.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            
            // --- CORREÇÃO: Cache-Busting CRÍTICA (Macro 3) ---
            if (oldScript.src) {
                let src = oldScript.src;
                // Remove qualquer parâmetro de cache-busting antigo
                src = src.replace(/\?v=\d+$/, ''); 
                // Adiciona o timestamp para forçar o navegador a recarregar o script
                newScript.src = `${src}?v=${Date.now()}`;
            }
            // --- FIM CORREÇÃO ---
            
            if (oldScript.text) {
                newScript.text = oldScript.text;
            }
            
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    // 4. Manipulador de clique para links DENTRO do conteúdo (CORREÇÃO DE ROTEAMENTO)
    function handleContentLinkClick(e) {
        let url = e.currentTarget.getAttribute('href'); 
        
        if (!url || url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:')) {
            return;
        }
        
        e.preventDefault(); 

        if (url === 'index.html' || url === '/') {
            url = 'index-content.html';
        } else if (url.endsWith('.html')) {
            url = url.replace('.html', '-content.html');
        } else {
            // Se não for um link de navegação interno, usa o comportamento padrão
            window.location.href = e.currentTarget.getAttribute('href');
            return;
        }

        // Chama loadContent com a URL de conteúdo correta
        loadContent(url);
    }

    // 5. Anexa listener aos links injetados
    function attachContentListeners() {
        const contentLinks = contentArea.querySelectorAll('a');
        
        contentLinks.forEach(link => {
            link.removeEventListener('click', handleContentLinkClick);
            link.addEventListener('click', handleContentLinkClick);
        });
    }

    // --- FUNÇÃO PRINCIPAL DE CARREGAMENTO ---

    function loadContent(contentFilename) {
        // CORREÇÃO CRÍTICA: Precede o nome do arquivo com o BASE_PATH
        const fetchUrl = BASE_PATH + contentFilename; 

        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar: ${response.status} - Arquivo ${fetchUrl}`);
                }
                return response.text();
            })
            .then(html => {
                
                contentArea.innerHTML = html; 

                // Lógica de URL para o history.pushState
                let historyUrl = contentFilename.replace('-content.html', '.html');
                if (contentFilename === 'index-content.html') {
                    historyUrl = 'index.html';
                }
                
                // CORREÇÃO: Usa o BASE_PATH na URL de histórico
                history.pushState(null, '', BASE_PATH + historyUrl);
                
                // Atualizações
                updateActiveMenu(historyUrl);
                reExecuteScripts(contentArea);
                attachContentListeners(); 
                closeMenu(); 

            })
            .catch(error => {
                console.error("Erro no carregamento do conteúdo:", error);
                // Mensagem de erro amigável (agora usa o fetchUrl corrigido)
                contentArea.innerHTML = `<h2 style="color: var(--erro); text-align: center;">Erro de Carregamento SPA</h2>
                                        <p style="text-align: center;">Não foi possível carregar o módulo de conteúdo. Verifique se o arquivo: 
                                        <strong style="color: var(--erro);">${fetchUrl}</strong> existe no caminho correto.</p>`;
            });
    }

    // --- INICIALIZAÇÃO E EVENT LISTENERS ---

    // 1. Intercepta cliques nos links de navegação do HEADER
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            let url = e.currentTarget.getAttribute('href');
            
            if (url && (url.startsWith('http') || url.startsWith('mailto:'))) {
                window.location.href = url;
                return;
            }
            
            // Converte para a URL de conteúdo
            if (url === 'index.html' || url === '/') {
                url = 'index-content.html';
            } else if (url && url.endsWith('.html')) {
                url = url.replace('.html', '-content.html');
            } else {
                 window.location.href = e.currentTarget.getAttribute('href');
                 return;
            }

            loadContent(url);
        });
    });
    
    // 2. Adiciona suporte para navegação do navegador (botões Voltar/Avançar)
    window.addEventListener('popstate', () => {
        // Remove BASE_PATH do pathname para isolar apenas o arquivo .html
        let path = window.location.pathname.replace(BASE_PATH, '');
        
        // Se o path estiver vazio após a remoção (ou seja, estamos na raiz do Pages)
        if (path === '') {
            path = 'index.html';
        }
        
        let contentPath;
        if (path && path.endsWith('.html')) {
            contentPath = path.replace('.html', '-content.html');
        } else {
            contentPath = 'index-content.html';
        }

        updateActiveMenu(path || 'index.html');
        loadContent(contentPath);
    });


   // 3. Carrega o conteúdo inicial (Corrigindo o problema de carregamento inicial)
    
    // Pega o caminho, removendo a barra inicial e o BASE_PATH
    let rawPath = window.location.pathname.replace(/^\/|\/$/g, '');
    let initialFilename = rawPath.replace(BASE_PATH.replace(/\//g, ''), ''); 

    let initialContentUrl;

    if (initialFilename && initialFilename.endsWith('.html')) {
        // Se houver um arquivo na URL (ex: projetos.html)
        initialContentUrl = initialFilename.replace('.html', '-content.html');
    } else {
        // Se a URL for apenas a raiz do Pages (sem nome de arquivo)
        initialContentUrl = 'index-content.html';
    }

    // A URL que realmente é passada para o loadContent
    let historyUrl = initialContentUrl.replace('-content.html', '.html');
    if (initialContentUrl === 'index-content.html') {
         historyUrl = 'index.html';
    }
    
    loadContent(initialContentUrl);
    updateActiveMenu(historyUrl);
    });