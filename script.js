// 1. Break Text into Animated Rainbow Letters
function buildAnimatedHeading() {
    const headingContainer = document.getElementById('animated-heading');
    const text = "HAPPY BIRTHDAY DEVIN";
    const colors = ['#ff6b6b', '#4dabf7', '#fcc419', '#51cf66', '#cc5de8', '#ff922b'];
    
    let colorIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        if (char === " ") {
            const space = document.createElement('span');
            space.classList.add('space');
            headingContainer.appendChild(space);
        } else {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = char;
            letterSpan.classList.add('letter');
            
            letterSpan.style.color = colors[colorIndex % colors.length];
            colorIndex++;

            letterSpan.style.animationDelay = (i * 0.1) + 's';
            
            headingContainer.appendChild(letterSpan);
        }
    }
}

// --- AUDIO SYSTEM INITIALIZATION ---
let musicStarted = false;

function initAudioPlay() {
    if (musicStarted) return;
    
    const bgMusic = document.getElementById('birthday-track');
    if (bgMusic) {
        bgMusic.volume = 0.4; 
        bgMusic.play().then(() => {
            musicStarted = true;
            window.removeEventListener('click', initAudioPlay);
            window.removeEventListener('touchstart', initAudioPlay);
        }).catch(err => {
            console.log("Audio waiting for explicit user gesture interaction:", err);
        });
    }
}

// 2. Audio Effect using JS Web Audio API
function playPopSound() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, context.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.3, context.currentTime);
    gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.1);
    
    oscillator.connect(gain);
    gain.connect(context.destination);
    
    oscillator.start();
    oscillator.stop(context.currentTime + 0.1);
}

// 3. CONTINUOUS CONFETTI FOR 10 SECONDS
function startConfettiShower() {
    const wrapper = document.getElementById('confetti-wrapper');
    const colors = ['#ff6b6b', '#4dabf7', '#fcc419', '#51cf66', '#cc5de8', '#ff922b'];
    
    const confettiInterval = setInterval(() => {
        if (!wrapper) return;

        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's'; 
        confetti.style.width = Math.random() * 8 + 8 + 'px';
        confetti.style.height = confetti.style.width;
        
        wrapper.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }, 80);

    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 50000);
}

// --- NEW: 20 IMAGES CONFIGURATION ---
// List of 20 images inside your img folder. Make sure your actual file names/extensions match perfectly!
const popImages = [
    'img/img1.jpg', 'img/img2.jpg', 'img/img3.jpg', 'img/img4.jpg', 'img/img24.png',  'img/img5.jpg',
    'img/img26.png', 
    'img/img6.jpg', 'img/img7.jpg', 'img/img8.jpg', 'img/img9.jpg', 'img/img10.jpg',
    'img/img23.png', 'img/img25.png', 
    'img/img11.jpg', 'img/img12.jpg', 'img/img13.jpg', 'img/img14.jpg', 'img/img15.jpg',
    'img/img16.jpg', 'img/img17.jpg', 'img/img18.jpg', 'img/img19.jpg', 'img/img20.jpg'
    'img/img21.jpg',
     'img/img27.png',
    'img/img28.png',
];

function showPopImage(x, y) {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;

    // Create image element
    const img = document.createElement('img');
    
    // Pick a random image from our 20-image array
    const randomImage = popImages[Math.floor(Math.random() * popImages.length)];
    img.src = randomImage;
    img.classList.add('pop-popup-image');
    
    // Position the image exactly where the balloon was clicked
    img.style.left = (x - 50) + 'px'; // Centered (half of 100px width)
    img.style.top = (y - 50) + 'px';  // Centered (half of 100px height)

    gameContainer.appendChild(img);

    // Completely remove the element from code after 3 seconds
    setTimeout(() => {
        img.remove();
    }, 4000);
}

// 4. Full Canvas Balloon Game Engine
let score = 0;
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const balloonColors = ['#ff6b6b', '#4dabf7', '#fcc419', '#51cf66', '#cc5de8'];

function spawnBalloon() {
    if (!gameContainer) return;

    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    balloon.style.backgroundColor = randomColor;
    balloon.style.color = randomColor; 
    
    balloon.style.left = Math.random() * (window.innerWidth - 60) + 'px';

    // Click/Tap event to pop
    balloon.addEventListener('click', (event) => {
        playPopSound();
        
        // Get precise mouse coordinates of the click
        const clickX = event.clientX;
        const clickY = event.clientY;
        
        // Trigger the image pop-up function
        showPopImage(clickX, clickY);

        balloon.remove();
        score++;
        if (scoreDisplay) scoreDisplay.textContent = score;
    });

    gameContainer.appendChild(balloon);

    setTimeout(() => {
        if (balloon.parentNode) {
            balloon.remove();
        }
    }, 5000);
}

// Run everything when page loads
window.onload = () => {
    buildAnimatedHeading();
    startConfettiShower(); 
    setInterval(spawnBalloon, 800); 
    
    window.addEventListener('click', initAudioPlay);
    window.addEventListener('touchstart', initAudioPlay);
};
