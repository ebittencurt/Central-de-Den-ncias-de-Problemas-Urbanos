
function exibirAlerta(tipo, mensagem) {
  const alertContainer = document.getElementById('alertContainer');
  if (!alertContainer) {
    console.warn('alertContainer não encontrado, exibindo alerta no console:', mensagem);
    return;
  }

  const alertClass = tipo === 'success' ? 'alert-success' : 'alert-danger';
  const iconClass = tipo === 'success' ? 'check-circle' : 'exclamation-circle';
  const titulo = tipo === 'success' ? 'Sucesso!' : 'Erro!';

  const alertHtml = `
    <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
      <i class="fas fa-${iconClass} me-2"></i>
      <strong>${titulo}</strong> ${mensagem}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;

  alertContainer.innerHTML = alertHtml;

  setTimeout(() => {
    alertContainer.innerHTML = '';
  }, 5000);
}

function formatarData(dataISO) {
  if (!dataISO) return 'Data não disponível';

  try {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
}

function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validarTelefone(telefone) {
  if (!telefone) return true; // Telefone é opcional
  const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  return telefoneRegex.test(telefone);
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
