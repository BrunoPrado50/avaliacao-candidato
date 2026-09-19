const form = document.getElementById('formRecrutamento');
const modalOverlay = document.getElementById('modalOverlay');
const modalMessage = document.getElementById('modalMessage');
const modalTitle = document.getElementById('modalTitle');
const btnFecharModal = document.getElementById('btnFecharModal');

// Elementos de Áudio
const somImpacto = document.getElementById('somImpacto');
const somFundo = document.getElementById('somFundo');
let audioIniciado = false;

// --- LÓGICA DE SUBMISSÃO DO FORMULÁRIO ---
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Limpa formatações e classes de cores anteriores
    modalMessage.className = '';
    modalTitle.className = '';

    if (altura >= 1.70 && idade >= 18) {
        modalTitle.textContent = "ACESSO LIBERADO";
        modalTitle.classList.add('txt-sucesso');
        modalMessage.innerHTML = `Parabéns, Recruta <strong>${nome}</strong>!<br><br>Você pode prosseguir no processo para a vaga no Império. A Força é forte em você.`;
    } else {
        modalTitle.textContent = "ACESSO NEGADO";
        modalTitle.classList.add('txt-falha');
        
        // Easter egg do Star Wars para recusa por altura
        if (altura < 1.70) {
            modalMessage.innerHTML = `Saudações, <strong>${nome}</strong>.<br><br>Infelizmente você não é apto à vaga.<br><em>"Você não é um pouco baixo para um Stormtrooper?"</em>`;
        } else {
            modalMessage.innerHTML = `Saudações, <strong>${nome}</strong>.<br><br>Infelizmente você não é apto à vaga. O Império exige mais ciclos de vida (idade).`;
        }
    }

    // Exibe o Modal (Popup) na tela
    modalOverlay.classList.add('active');
});

// --- LÓGICA PARA FECHAR O MODAL ---
btnFecharModal.addEventListener('click', () => { 
    modalOverlay.classList.remove('active'); 
    form.reset(); 
});

// Fecha o modal se o usuário clicar na área escura em volta da caixa
modalOverlay.addEventListener('click', (e) => { 
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active'); 
    }
});

// --- LÓGICA DO SABRE DE LUZ (Som Otimizado e Rastro) ---

// 1. Som de Impacto e Faísca ao Clicar
document.addEventListener('mousedown', (e) => {
    
    // OTIMIZAÇÃO AUDIO: Clona o áudio para permitir sobreposição em cliques rápidos (Polyphony)
    const somClone = somImpacto.cloneNode();
    somClone.volume = 0.8;
    somClone.play().catch(err => console.log("Áudio pendente de interação do usuário."));

    // Limpa o clone da memória do navegador após tocar para não causar vazamento de memória
    somClone.addEventListener('ended', () => {
        somClone.remove();
    });

    // Inicia o som de fundo (Hum contínuo) apenas no primeiro clique na página
    if (!audioIniciado) {
        somFundo.volume = 0.3; // Volume ambiente bem baixo
        somFundo.play().catch(err => console.log("Áudio pendente de interação do usuário."));
        audioIniciado = true;
    }

    // Desenha a explosão (faísca) do sabre
    const clash = document.createElement('div');
    clash.classList.add('saber-clash');
    clash.style.left = `${e.clientX}px`;
    clash.style.top = `${e.clientY}px`;
    document.body.appendChild(clash);
    
    // Remove a explosão da tela após 300ms (tempo exato da animação no CSS)
    setTimeout(() => clash.remove(), 300);
});

// 2. Rastro de Luz ao mover o mouse
document.addEventListener('mousemove', (e) => {
    // Cria o rastro de forma moderada (30% das vezes) para otimizar desempenho de processamento
    if (Math.random() > 0.3) {
        const trail = document.createElement('div');
        trail.classList.add('saber-trail');
        
        // Pequeno desvio (+2px) para a luz sair exatamente da ponta visual do sabre e não esconder o cursor
        trail.style.left = `${e.clientX + 2}px`;
        trail.style.top = `${e.clientY + 2}px`;
        
        document.body.appendChild(trail);
        
        // Remove a pequena bola de luz após 200ms
        setTimeout(() => {
            trail.remove();
        }, 200);
    }
});