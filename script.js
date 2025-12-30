class ChessScrollPage {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.dots = document.querySelectorAll('.dot');
        this.progressFill = document.querySelector('.progress-fill');
        this.chessBoard = document.getElementById('chessBoard');
        this.currentSection = 0;
        this.isScrolling = false;
        this.scrollDelay = 800;
        this.lastScrollTime = Date.now();
        
        this.init();
    }
    
    init() {
        this.createChessBackground();
        this.setupEventListeners();
        this.observeSections();
        this.activateSection(0);
    }
    
    createChessBackground() {
        const chessPieces = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
        const boardSize = 8;
        
        // Create floating chess pieces
        for (let i = 0; i < 20; i++) {
            const piece = document.createElement('div');
            piece.className = 'chess-piece-bg';
            piece.innerHTML = `<i class="fas fa-chess-${chessPieces[Math.floor(Math.random() * chessPieces.length)]}"></i>`;
            
            // Random position
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.top = `${Math.random() * 100}%`;
            
            // Random animation delay and duration
            piece.style.animationDelay = `${Math.random() * 20}s`;
            piece.style.animationDuration = `${15 + Math.random() * 20}s`;
            
            this.chessBoard.appendChild(piece);
        }
        
        // Create chess board pattern
        const boardPattern = document.createElement('div');
        boardPattern.className = 'board-pattern';
        boardPattern.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(45deg, rgba(181, 136, 99, 0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(181, 136, 99, 0.1) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(181, 136, 99, 0.1) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(181, 136, 99, 0.1) 75%);
            background-size: 100px 100px;
            background-position: 0 0, 0 50px, 50px -50px, -50px 0px;
            opacity: 0.3;
        `;
        this.chessBoard.appendChild(boardPattern);
    }
    
    setupEventListeners() {
        // Mouse wheel scroll
        window.addEventListener('wheel', (e) => this.handleScroll(e), { passive: false });
        
        // Touch events for mobile
        let touchStartY = 0;
        let touchStartTime = 0;
        
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });
        
        window.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndTime = Date.now();
            const deltaY = touchStartY - touchEndY;
            const deltaTime = touchEndTime - touchStartTime;
            
            // Only trigger if swipe is fast enough
            if (Math.abs(deltaY) > 50 && deltaTime < 300) {
                if (deltaY > 0) {
                    this.nextSection();
                } else {
                    this.previousSection();
                }
            }
        }, { passive: true });
        
        // Keyboard navigation (optional, for accessibility)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault();
                this.nextSection();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.previousSection();
            }
        });
        
        // Progress dots click
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const sectionIndex = parseInt(e.target.dataset.section) - 1;
                this.goToSection(sectionIndex);
            });
        });
    }
    
    handleScroll(e) {
        e.preventDefault();
        
        const currentTime = Date.now();
        if (currentTime - this.lastScrollTime < this.scrollDelay || this.isScrolling) {
            return;
        }
        
        this.lastScrollTime = currentTime;
        
        if (e.deltaY > 0) {
            this.nextSection();
        } else {
            this.previousSection();
        }
    }
    
    nextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.goToSection(this.currentSection + 1);
        }
    }
    
    previousSection() {
        if (this.currentSection > 0) {
            this.goToSection(this.currentSection - 1);
        }
    }
    
    goToSection(index) {
        if (this.isScrolling || index < 0 || index >= this.sections.length) {
            return;
        }
        
        this.isScrolling = true;
        this.currentSection = index;
        
        // Deactivate all sections
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Activate target section
        const targetSection = this.sections[index];
        targetSection.classList.add('active');
        
        // Scroll to section
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update progress dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.section) === index + 1) {
                dot.classList.add('active');
            }
        });
        
        // Update progress bar
        this.updateProgressBar();
        
        // Animate chess pieces
        this.animateChessPieces(index);
        
        // Reset scroll lock
        setTimeout(() => {
            this.isScrolling = false;
        }, this.scrollDelay);
    }
    
    updateProgressBar() {
        const progress = (this.currentSection / (this.sections.length - 1)) * 100;
        this.progressFill.style.height = `${progress}%`;
    }
    
    animateChessPieces(sectionIndex) {
        // Animate chess pieces in the current section
        const chessPieces = document.querySelectorAll('.chess-piece');
        chessPieces.forEach((piece, index) => {
            piece.style.animation = 'none';
            piece.offsetHeight; // Trigger reflow
            piece.style.animation = '';
            
            // Add bounce animation
            piece.style.animation = `bounce 0.5s ease ${index * 0.1}s`;
        });
        
        // Add CSS for bounce animation
        if (!document.getElementById('bounce-animation')) {
            const style = document.createElement('style');
            style.id = 'bounce-animation';
            style.textContent = `
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    observeSections() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionIndex = Array.from(this.sections).indexOf(entry.target);
                    if (sectionIndex !== this.currentSection) {
                        this.currentSection = sectionIndex;
                        this.updateProgressBar();
                        this.dots.forEach(dot => {
                            dot.classList.remove('active');
                            if (parseInt(dot.dataset.section) === sectionIndex + 1) {
                                dot.classList.add('active');
                            }
                        });
                    }
                }
            });
        }, {
            threshold: 0.5
        });
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    activateSection(index) {
        this.sections[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.updateProgressBar();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chessPage = new ChessScrollPage();
    
    // Add hover effects to chess pieces
    const chessIcons = document.querySelectorAll('.fa-chess');
    chessIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add particle effect on scroll
    let particleCanvas = null;
    let particleCtx = null;
    let particles = [];
    
    function initParticles() {
        particleCanvas = document.createElement('canvas');
        particleCanvas.id = 'particle-canvas';
        particleCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        document.body.appendChild(particleCanvas);
        
        particleCtx = particleCanvas.getContext('2d');
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                color: Math.random() > 0.5 ? 'rgba(255, 215, 0, 0.3)' : 'rgba(181, 136, 99, 0.3)'
            });
        }
        
        animateParticles();
    }
    
    function animateParticles() {
        if (!particleCtx) return;
        
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > particleCanvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > particleCanvas.height) particle.speedY *= -1;
            
            particleCtx.beginPath();
            particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            particleCtx.fillStyle = particle.color;
            particleCtx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Initialize particles
    initParticles();
    
    // Resize handler
    window.addEventListener('resize', () => {
        if (particleCanvas) {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
    });
    
    // Add subtle parallax to chess pieces
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const chessPieces = document.querySelectorAll('.chess-piece-bg');
        
        chessPieces.forEach((piece, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed * 0.1);
            piece.style.transform = `translateY(${yPos}px) rotate(${index * 10}deg)`;
        });
    });
});
