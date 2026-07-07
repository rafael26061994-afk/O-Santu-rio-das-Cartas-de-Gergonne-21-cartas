const FULL_52_DECK = [
    // Espadas ♠
    { num: 'A', suit: '♠', name: 'Ás de Espadas', red: false }, { num: 'K', suit: '♠', name: 'Rei de Espadas', red: false }, { num: 'Q', suit: '♠', name: 'Dama de Espadas', red: false }, { num: 'J', suit: '♠', name: 'Valete de Espadas', red: false },
    { num: '10', suit: '♠', name: '10 de Espadas', red: false }, { num: '9', suit: '♠', name: '9 de Espadas', red: false }, { num: '8', suit: '♠', name: '8 de Espadas', red: false }, { num: '7', suit: '♠', name: '7 de Espadas', red: false },
    { num: '6', suit: '♠', name: '6 de Espadas', red: false }, { num: '5', suit: '♠', name: '5 de Espadas', red: false }, { num: '4', suit: '♠', name: '4 de Espadas', red: false }, { num: '3', suit: '♠', name: '3 de Espadas', red: false }, { num: '2', suit: '♠', name: '2 de Espadas', red: false },
    // Copas ♥
    { num: 'A', suit: '♥️', name: 'Ás de Copas', red: true }, { num: 'K', suit: '♥️', name: 'Rei de Copas', red: true }, { num: 'Q', suit: '♥️', name: 'Dama de Copas', red: true }, { num: 'J', suit: '♥️', name: 'Valete de Copas', red: true },
    { num: '10', suit: '♥️', name: '10 de Copas', red: true }, { num: '9', suit: '♥️', name: '9 de Copas', red: true }, { num: '8', suit: '♥️', name: '8 de Copas', red: true }, { num: '7', suit: '♥️', name: '7 de Copas', red: true },
    { num: '6', suit: '♥️', name: '6 de Copas', red: true }, { num: '5', suit: '♥️', name: '5 de Copas', red: true }, { num: '4', suit: '♥️', name: '4 de Copas', red: true }, { num: '3', suit: '♥️', name: '3 de Copas', red: true }, { num: '2', suit: '♥️', name: '2 de Copas', red: true },
    // Ouros ♦
    { num: 'A', suit: '♦️', name: 'Ás de Ouros', red: true }, { num: 'K', suit: '♦️', name: 'Rei de Ouros', red: true }, { num: 'Q', suit: '♦️', name: 'Dama de Ouros', red: true }, { num: 'J', suit: '♦️', name: 'Valete de Ouros', red: true },
    { num: '10', suit: '♦️', name: '10 de Ouros', red: true }, { num: '9', suit: '♦️', name: '9 de Ouros', red: true }, { num: '8', suit: '♦️', name: '8 de Ouros', red: true }, { num: '7', suit: '♦️', name: '7 de Ouros', red: true },
    { num: '6', suit: '♦️', name: '6 de Ouros', red: true }, { num: '5', suit: '♦️', name: '5 de Ouros', red: true }, { num: '4', suit: '♦️', name: '4 de Ouros', red: true }, { num: '3', suit: '♦️', name: '3 de Ouros', red: true }, { num: '2', suit: '♦️', name: '2 de Ouros', red: true },
    // Paus ♣
    { num: 'A', suit: '♣', name: 'Ás de Paus', red: false }, { num: 'K', suit: '♣', name: 'Rei de Paus', red: false }, { num: 'Q', suit: '♣', name: 'Dama de Paus', red: false }, { num: 'J', suit: '♣', name: 'Valete de Paus', red: false },
    { num: '10', suit: '♣', name: '10 de Paus', red: false }, { num: '9', suit: '♣', name: '9 de Paus', red: false }, { num: '8', suit: '♣', name: '8 de Paus', red: false }, { num: '7', suit: '♣', name: '7 de Paus', red: false },
    { num: '6', suit: '♣', name: '6 de Paus', red: false }, { num: '5', suit: '♣', name: '5 de Paus', red: false }, { num: '4', suit: '♣', name: '4 de Paus', red: false }, { num: '3', suit: '♣', name: '3 de Paus', red: false }, { num: '2', suit: '♣', name: '2 de Paus', red: false }
];

let activeDeck = [];
let step = 1;
let currentFontSize = 100;

function randomizeMagicians() {
    const instImg = document.getElementById('instructions-magician');
    const revImg = document.getElementById('reveal-magician');
    const magicians = [{ src: 'rafael.png', alt: 'Rafael' }, { src: 'ronaldo.png', alt: 'Ronaldo' }];
    if (Math.random() > 0.5) magicians.reverse();
    if (instImg) { instImg.src = magicians[0].src; instImg.alt = magicians[0].alt; }
    if (revImg) { revImg.src = magicians[1].src; revImg.alt = magicians[1].alt; }
}

function createCardHTML(cardData) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'poker-card';
    if (cardData.red) cardDiv.classList.add('red-suit');

    cardDiv.innerHTML = `
        <div class="card-corner-top">
            <span>${cardData.num}</span>
            <span class="corner-suit">${cardData.suit}</span>
        </div>
        <div class="card-center-suit">${cardData.suit}</div>
        <div class="card-discreet-name">${cardData.name}</div>
        <div class="card-corner-bottom">
            <span>${cardData.num}</span>
            <span class="corner-suit">${cardData.suit}</span>
        </div>
    `;
    return cardDiv;
}

function renderBoard() {
    document.getElementById('current-step').textContent = step;
    document.getElementById('col-0').innerHTML = '';
    document.getElementById('col-1').innerHTML = '';
    document.getElementById('col-2').innerHTML = '';

    for (let i = 0; i < activeDeck.length; i++) {
        const colIndex = i % 3;
        const cardElement = createCardHTML(activeDeck[i]);
        document.getElementById(`col-${colIndex}`).appendChild(cardElement);
    }
}

function showTableScreen() {
    stopSpeech();
    step = 1;
    const shuffledFullDeck = [...FULL_52_DECK].sort(() => Math.random() - 0.5);
    activeDeck = shuffledFullDeck.slice(0, 21); 
    renderBoard();
    document.getElementById('screen-instructions').classList.add('hidden');
    document.getElementById('screen-table').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function chooseColumn(selectedCol) {
    stopSpeech();
    let c0 = [], c1 = [], c2 = [];
    for (let i = 0; i < activeDeck.length; i++) {
        if (i % 3 === 0) c0.push(activeDeck[i]);
        if (i % 3 === 1) c1.push(activeDeck[i]);
        if (i % 3 === 2) c2.push(activeDeck[i]);
    }

    if (selectedCol === 0) activeDeck = [...c1, ...c0, ...c2];
    else if (selectedCol === 1) activeDeck = [...c0, ...c1, ...c2];
    else if (selectedCol === 2) activeDeck = [...c0, ...c2, ...c1];

    if (step < 3) {
        step++;
        renderBoard();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        revealMind();
    }
}

function revealMind() {
    const winningCard = activeDeck[10];
    document.getElementById('screen-table').classList.add('hidden');
    const finalWrapper = document.getElementById('final-symbol');
    finalWrapper.innerHTML = '';
    finalWrapper.appendChild(createCardHTML(winningCard));
    document.getElementById('screen-reveal').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetGame() {
    stopSpeech();
    randomizeMagicians(); 
    document.getElementById('screen-reveal').classList.add('hidden');
    document.getElementById('screen-instructions').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changeFontSize(dir) {
    currentFontSize += (dir * 10);
    if (currentFontSize < 80) currentFontSize = 80;
    if (currentFontSize > 150) currentFontSize = 150;
    document.body.style.fontSize = currentFontSize + "%";
}

function toggleContrast() { document.body.classList.toggle('high-contrast'); }

function readText() {
    stopSpeech();
    const activeScreen = document.querySelector('.screen:not(.hidden)');
    let textToRead = activeScreen.id === "screen-table" ? 
        "Mesa disposta com colunas verticais em pé. Localize a sua carta física mentalizada e clique no botão correspondente abaixo dela." : 
        activeScreen.innerText;
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
}

function stopSpeech() { window.speechSynthesis.cancel(); }
randomizeMagicians();