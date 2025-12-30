class ChessProfilePage {
    constructor() {
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.progressBar = document.querySelector('.progress-bar');
        
        this.init();
    }
    
    init() {
        this.setupTabs();
        this.setupScrollReveal();
        this.setupScrollProgress();
        this.setupForm();
    }
    
    setupTabs() {
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }
    
    switchTab(tabId) {
        // Update active tab button
        this.tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            }
        });
        
        // Show active tab content
        this.tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
                
                // Reset scroll position when switching tabs
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Trigger reveal animations for new content
                setTimeout(() => {
                    this.triggerRevealAnimations();
                }, 300);
            }
        });
    }
    
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    
                    // Add delay based on data-delay attribute
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
        
        // Initial trigger
        this.triggerRevealAnimations();
    }
    
    triggerRevealAnimations() {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            const elements = activeTab.querySelectorAll('.reveal');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
    
    setupScrollProgress() {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            this.progressBar.style.width = scrolled + "%";
        });
    }
    
    setupForm() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Show success state
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.background = '#27ae60';
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        
                        // Show success message
                        this.showNotification('Message sent successfully!');
                    }, 2000);
                }, 1500);
            });
        }
    }
    
    showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-family: 'Montserrat', sans-serif;
        `;
        
        document.body.appendChild(notification);
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            
            const slideOutStyle = document.createElement('style');
            slideOutStyle.textContent = `
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(slideOutStyle);
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const chessProfile = new ChessProfilePage();
    
    // Add hover effects to video cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const playBtn = this.querySelector('.play-btn');
            if (playBtn) {
                playBtn.style.transform = 'translate(-50%, -50%) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const playBtn = this.querySelector('.play-btn');
            if (playBtn) {
                playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });
    
    // Add click event to video cards (simulate play)
    videoCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.play-btn')) {
                const title = this.querySelector('h3').textContent;
                chessProfile.showNotification(`Playing: ${title}`);
            }
        });
    });
    
    // Add chess piece floating animation in background
    const chessBoard = document.querySelector('.chess-board');
    const chessPieces = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
    
    for (let i = 0; i < 8; i++) {
        const piece = document.createElement('div');
        piece.style.cssText = `
            position: fixed;
            font-size: 3rem;
            color: rgba(241, 196, 15, 0.05);
            z-index: -1;
            pointer-events: none;
            animation: floatChessPiece 20s infinite linear;
            animation-delay: ${Math.random() * 20}s;
        `;
        
        piece.innerHTML = `<i class="fas fa-chess-${chessPieces[Math.floor(Math.random() * chessPieces.length)]}"></i>`;
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `${Math.random() * 100}%`;
        
        chessBoard.appendChild(piece);
    }
    
    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes floatChessPiece {
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
    // Re-trigger animations on resize
    const chessProfile = new ChessProfilePage();
    chessProfile.triggerRevealAnimations();
});
