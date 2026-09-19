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
        modalTitle.textContent = "ACESSO LIBERADO";
        modalTitle.classList.add('txt-sucesso');
        modalMessage.innerHTML = `Parabéns, Recruta <strong>${nome}</strong>!<br><br>Você pode prosseguir no processo para a vaga no Império. A Força é forte em você.`;
    } else {
        modalTitle.textContent = "ACESSO NEGADO";
        modalTitle.classList.add('txt-falha');
        
        // Brincadeira com a regra de altura baseada na fala da Princesa Leia
        if (altura < 1.70) {
            modalMessage.innerHTML = `Saudações, <strong>${nome}</strong>.<br><br>Infelizmente você não é apto à vaga.<br><em>"Você não é um pouco baixo para um Stormtrooper?"</em>`;
        } else {
            modalMessage.innerHTML = `Saudações, <strong>${nome}</strong>.<br><br>Infelizmente você não é apto à vaga. O Império exige mais ciclos de vida (idade).`;
        }
    }

    // Exibe o Modal (Popup)
    modalOverlay.classList.add('active');
});

// Lógica para fechar o Modal ao clicar no botão
btnFecharModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    form.reset();
});

// Fecha o modal se o usuário clicar na área escura
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

// --- ANIMAÇÃO DO SABRE DE LUZ (IMPACTO) ---

// Escuta quando o usuário aperta o botão do mouse em qualquer lugar da tela
document.addEventListener('mousedown', (e) => {
    // Cria uma div nova para ser a faísca
    const clash = document.createElement('div');
    clash.classList.add('saber-clash');
    
    // Posiciona a faísca exatamente nas coordenadas do cursor (na ponta do sabre)
    clash.style.left = `${e.clientX}px`;
    clash.style.top = `${e.clientY}px`;
    
    // Coloca a faísca na tela
    document.body.appendChild(clash);

    // Remove a faísca depois de 300 milissegundos (tempo exato da animação CSS)
    setTimeout(() => {
        clash.remove();
    }, 300);
});