// ===== INICIALIZAÇÃO E ORQUESTRAÇÃO =====

/**
 * Inicializar aplicação
 */
function init() {
  console.log('Inicializando aplicação...');

  // Verificar autenticação e redirecionar se necessário
  checkAuthRedirect();

  // Atualizar navbar
  updateNavbar();

  // Configurar tema claro/escuro
  setupTheme();

  // Configurar event listeners do formulário de login (login.html)
  setupFormLogin();

  // Se estiver em index.html, configurar tudo para denúncias
  if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    setupPageDenuncias();
  }

  console.log('Aplicação iniciada com sucesso');
}

/**
 * Setup da página de denúncias (index.html)
 */
function setupPageDenuncias() {
  // Configurar preview de imagem
  setupImagePreview();

  // Configurar formulário de denúncia
  setupFormDenuncia();

  // Configurar filtros
  setupFiltros();

  // Configurar botão refresh
  setupRefresh();

  // Configurar botão logout
  setupLogout();

  // Carregar denúncias inicialmente
  listarDenuncias();

  // Carregar showcase de resolvidos
  carregarResolvidos();

  // Recarregar a cada 30 segundos (opcional)
  // setInterval(() => {
  //   const categoria = document.getElementById('filterCategoria')?.value || '';
  //   const status = document.getElementById('filterStatus')?.value || '';
  //   listarDenuncias(categoria, status, 1);
  // }, 30000);
}

/**
 * Setup do formulário de login (login.html)
 */
function setupFormLogin() {
  const formLogin = document.getElementById('formLogin');

  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail')?.value || '';
      const senha = document.getElementById('loginSenha')?.value || '';

      if (login(email, senha)) {
        console.log('Login realizado com sucesso');
      }
    });
  }
}

/**
 * Setup do botão logout
 */
function setupLogout() {
  const btnLogout = document.getElementById('btnLogout');

  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
}

/**
 * Setup do tema claro/escuro
 */
function setupTheme() {
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  const html = document.documentElement;

  if (!btnThemeToggle) return;

  // Carregar tema salvo
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-bs-theme', savedTheme);
  atualizarIconTema(savedTheme);

  // Event listener no botão
  btnThemeToggle.addEventListener('click', (e) => {
    e.preventDefault();

    // Alternar tema
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Atualizar atributo
    html.setAttribute('data-bs-theme', newTheme);

    // Salvar no localStorage
    localStorage.setItem('theme', newTheme);

    // Atualizar ícone
    atualizarIconTema(newTheme);

    console.log(`Tema alterado para: ${newTheme}`);
  });
}

/**
 * Atualizar ícone do tema
 */
function atualizarIconTema(theme) {
  const iconTheme = document.getElementById('iconTheme');

  if (iconTheme) {
    if (theme === 'dark') {
      iconTheme.className = 'fas fa-sun';
    } else {
      iconTheme.className = 'fas fa-moon';
    }
  }
}

// ===== EVENT LISTENERS GLOBAIS =====

// Executar init quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Tratar erros não capturados
window.addEventListener('error', (event) => {
  console.error('Erro não tratado:', event.error);
  exibirAlerta('danger', 'Ocorreu um erro inesperado. Consulte o console.');
});

// Tratar promise rejections não tratadas
window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejection não tratada:', event.reason);
  exibirAlerta('danger', 'Erro ao processar requisição. Tente novamente.');
});
