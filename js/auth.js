
function login(email, senha) {
  if (!email || !senha) {
    exibirAlerta('danger', 'Email e senha são obrigatórios');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    exibirAlerta('danger', 'Email inválido');
    return false;
  }

  const user = {
    email,
    nome: email.split('@')[0], // Usar parte do email como nome
    loggedIn: true
  };

  localStorage.setItem('user', JSON.stringify(user));

  updateNavbar();

  window.location.href = 'index.html';
  return true;
}

function logout() {
  if (!confirm('Tem certeza que deseja sair?')) {
    return false;
  }

  localStorage.removeItem('user');

  updateNavbar();

  window.location.href = 'login.html';
  return true;
}

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

function updateNavbar() {
  const navLogin = document.getElementById('navLogin');
  const navUser = document.getElementById('navUser');
  const userName = document.getElementById('userName');

  if (isLoggedIn()) {
    const user = getUser();

    if (navLogin) {
      navLogin.classList.add('d-none');
    }

    if (navUser) {
      navUser.classList.remove('d-none');
    }

    if (userName) {
      userName.textContent = user.nome || user.email;
    }
  } else {
    if (navLogin) {
      navLogin.classList.remove('d-none');
    }

    if (navUser) {
      navUser.classList.add('d-none');
    }
  }
}

function checkAuthRedirect() {
  const currentPage = window.location.pathname;

  if (currentPage.includes('index.html') && !isLoggedIn()) {
    window.location.href = 'login.html';
  }

  if (currentPage.includes('login.html') && isLoggedIn()) {
    window.location.href = 'index.html';
  }
}
