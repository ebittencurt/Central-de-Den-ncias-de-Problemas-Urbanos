
function init() {
  console.log('Inicializando aplicação...');

  checkAuthRedirect();

  updateNavbar();

  setupTheme();

  setupFormLogin();

  if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    setupPageDenuncias();
  }

  console.log('Aplicação iniciada com sucesso');
}

function setupPageDenuncias() {
  setupImagePreview();

  setupFormDenuncia();

  setupFiltros();

  setupRefresh();

  setupLogout();

  listarDenuncias();

  carregarResolvidos();

}

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

function setupLogout() {
  const btnLogout = document.getElementById('btnLogout');

  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
}

function setupTheme() {
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  const html = document.documentElement;

  if (!btnThemeToggle) return;

  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-bs-theme', savedTheme);
  atualizarIconTema(savedTheme);

  btnThemeToggle.addEventListener('click', (e) => {
    e.preventDefault();

    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-bs-theme', newTheme);

    localStorage.setItem('theme', newTheme);

    atualizarIconTema(newTheme);

    console.log(`Tema alterado para: ${newTheme}`);
  });
}

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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.addEventListener('error', (event) => {
  console.error('Erro não tratado:', event.error);
  exibirAlerta('danger', 'Ocorreu um erro inesperado. Consulte o console.');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejection não tratada:', event.reason);
  exibirAlerta('danger', 'Erro ao processar requisição. Tente novamente.');
});
