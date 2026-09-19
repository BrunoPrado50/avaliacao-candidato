const form = document.getElementById('formRecrutamento');
const modalOverlay = document.getElementById('modalOverlay');
const modalMessage = document.getElementById('modalMessage');
const modalTitle = document.getElementById('modalTitle');
const btnFecharModal = document.getElementById('btnFecharModal');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Limpa as classes de estilo anteriores
    modalMessage.className = '';
    modalTitle.className = '';

    if (altura >= 1.70 && idade >= 18) {
        modalTitle.textContent = "Aprovado(a)";
        modalTitle.classList.add('txt-sucesso');
        modalMessage.innerHTML = `Parabéns, <strong>${nome}</strong>!<br><br>Você pode prosseguir no processo para a vaga!`;
    } else {
        modalTitle.textContent = "Reprovado(a)";
        modalTitle.classList.add('txt-falha');
        modalMessage.innerHTML = `Olá, <strong>${nome}</strong>.<br><br>Infelizmente você não é apto à vaga.`;
    }

    // Exibe o Modal (Popup)
    modalOverlay.classList.add('active');
});

// Lógica para fechar o Modal ao clicar no botão "OK"
btnFecharModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    
    // Opcional: limpa o formulário após fechar o popup
    form.reset();
});

// Fecha o modal se o usuário clicar na área escura (fora do quadro)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});