// ===== AUTENTICAÇÃO COM LOCALSTORAGE =====

/**
 * Fazer login (fake - aceita qualquer email/senha)
 */
function login(email, senha) {
  // Validação básica
  if (!email || !senha) {
    exibirAlerta('danger', 'Email e senha são obrigatórios');
    return false;
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    exibirAlerta('danger', 'Email inválido');
    return false;
  }

  // Salvar usuário no localStorage
  const user = {
    email,
    nome: email.split('@')[0], // Usar parte do email como nome
    loggedIn: true
  };

  localStorage.setItem('user', JSON.stringify(user));

  // Atualizar navbar
  updateNavbar();

  // Redirecionar para index.html
  window.location.href = 'index.html';
  return true;
}

/**
 * Fazer logout
 */
function logout() {
  // Confirmar logout
  if (!confirm('Tem certeza que deseja sair?')) {
    return false;
  }

  // Limpar localStorage
  localStorage.removeItem('user');

  // Atualizar navbar
  updateNavbar();

  // Redirecionar para login.html
  window.location.href = 'login.html';
  return true;
}

/**
 * Verificar se está logado
 */
function isLoggedIn() {
  const user = localStorage.getItem('user');
  if (!user) {
    return false;
  }

  try {
    const userData = JSON.parse(user);
    return userData.loggedIn === true;
  } catch (error) {
    return false;
  }
}

/**
 * Obter dados do usuário logado
 */
function getUser() {
  const user = localStorage.getItem('user');
  if (!user) {
    return null;
  }

  try {
    const userData = JSON.parse(user);
    return userData.loggedIn ? userData : null;
  } catch (error) {
    return null;
  }
}

/**
 * Atualizar interface da navbar
 */
function updateNavbar() {
  const navLogin = document.getElementById('navLogin');
  const navUser = document.getElementById('navUser');
  const userName = document.getElementById('userName');

  if (isLoggedIn()) {
    const user = getUser();

    // Esconder botão de login
    if (navLogin) {
      navLogin.classList.add('d-none');
    }

    // Mostrar dropdown de usuário
    if (navUser) {
      navUser.classList.remove('d-none');
    }

    // Preencher nome do usuário
    if (userName) {
      userName.textContent = user.nome || user.email;
    }
  } else {
    // Mostrar botão de login
    if (navLogin) {
      navLogin.classList.remove('d-none');
    }

    // Esconder dropdown de usuário
    if (navUser) {
      navUser.classList.add('d-none');
    }
  }
}

/**
 * Verificar login e redirecionar se necessário (para páginas protegidas)
 */
function checkAuthRedirect() {
  const currentPage = window.location.pathname;

  // Se está em index.html e não está logado, redirecionar para login
  if (currentPage.includes('index.html') && !isLoggedIn()) {
    window.location.href = 'login.html';
  }

  // Se está em login.html e já está logado, redirecionar para index
  if (currentPage.includes('login.html') && isLoggedIn()) {
    window.location.href = 'index.html';
  }
}
