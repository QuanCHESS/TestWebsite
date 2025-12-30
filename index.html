class SmoothScrollPage {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.dots = document.querySelectorAll('.dot');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentSection = 0;
        this.isScrolling = false;
        this.scrollDelay = 800;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupScrollObserver();
        this.updateNavigation();
    }
    
    setupEventListeners() {
        // Handle wheel scroll
        window.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            if (this.isScrolling) return;
            
            if (e.deltaY > 0) {
                this.nextSection();
            } else {
                this.previousSection();
            }
        }, { passive: false });
        
        // Handle touch swipe
        let touchStartY = 0;
        let touchStartTime = 0;
        
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        });
        
        window.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndTime = Date.now();
            const deltaY = touchStartY - touchEndY;
            const deltaTime = touchEndTime - touchStartTime;
            
            if (Math.abs(deltaY) > 50 && deltaTime < 300) {
                if (deltaY > 0 && !this.isScrolling) {
                    this.nextSection();
                } else if (deltaY < 0 && !this.isScrolling) {
                    this.previousSection();
                }
            }
        });
        
        // Navigation dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSection(index);
            });
        });
    }
    
    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(this.sections).indexOf(entry.target);
                    this.currentSection = index;
                    this.updateNavigation();
                    this.updateProgress();
                    
                    // Animate chess pieces
                    this.animateChessPieces(index);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px'
        });
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
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
        if (this.isScrolling || index < 0 || index >= this.sections.length) return;
        
        this.isScrolling = true;
        this.currentSection = index;
        
        // Scroll to section
        this.sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        this.updateNavigation();
        this.updateProgress();
        
        // Reset scroll lock
        setTimeout(() => {
            this.isScrolling = false;
        }, this.scrollDelay);
    }
    
    updateNavigation() {
        // Update active section
        this.sections.forEach((section, index) => {
            section.classList.remove('active');
            if (index === this.currentSection) {
                section.classList.add('active');
            }
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === this.currentSection) {
                dot.classList.add('active');
            }
        });
    }
    
    updateProgress() {
        const progress = (this.currentSection / (this.sections.length - 1)) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    animateChessPieces(sectionIndex) {
        const chessIcons = document.querySelectorAll('.fa-chess');
        chessIcons.forEach((icon, index) => {
            // Reset animation
            icon.style.animation = 'none';
            void icon.offsetWidth; // Trigger reflow
            
            // Add bounce animation
            icon.style.animation = `chessBounce 0.5s ease ${index * 0.1}s`;
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const page = new SmoothScrollPage();
    
    // Add hover effects
    const skillCards = document.querySelectorAll('.skill-card, .project-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add CSS animation for chess pieces
    const style = document.createElement('style');
    style.textContent = `
        @keyframes chessBounce {
            0%, 100% {
                transform: translateY(0) scale(1);
            }
            50% {
                transform: translateY(-10px) scale(1.1);
            }
        }
        
        .fa-chess {
            display: inline-block;
        }
    `;
    document.head.appendChild(style);
    
    // Add floating chess pieces in background
    const background = document.querySelector('.chess-background');
    const chessPieces = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
    
    for (let i = 0; i < 12; i++) {
        const piece = document.createElement('div');
        piece.style.cssText = `
            position: absolute;
            font-size: 2rem;
            color: rgba(218, 165, 32, 0.1);
            z-index: -1;
            animation: floatPiece 20s infinite linear;
            animation-delay: ${Math.random() * 20}s;
        `;
        
        piece.innerHTML = `<i class="fas fa-chess-${chessPieces[Math.floor(Math.random() * chessPieces.length)]}"></i>`;
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `${Math.random() * 100}%`;
        
        background.appendChild(piece);
    }
    
    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes floatPiece {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(floatStyle);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Force reflow on sections to fix scroll issues
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
        void section.offsetWidth;
        section.style.display = 'flex';
    });
});
