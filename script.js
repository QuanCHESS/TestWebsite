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
        this.setupAnimationDelays();
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
    
    setupAnimationDelays() {
        // Set staggered delays for grid items
        const websites = document.querySelectorAll('.website-card');
        websites.forEach((card, index) => {
            card.style.setProperty('--index', index);
        });
        
        const highlights = document.querySelectorAll('.highlight-item');
        highlights.forEach((item, index) => {
            item.style.setProperty('--index', index);
        });
        
        const videos = document.querySelectorAll('.video-card');
        videos.forEach((card, index) => {
            card.style.setProperty('--index', index);
        });
    }
    
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class with delay for staggered animations
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
        
        // Initial trigger for active tab
        this.triggerRevealAnimations();
    }
    
    triggerRevealAnimations() {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            const elements = activeTab.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
            
            elements.forEach((el, index) => {
                // Remove any existing visible class
                el.classList.remove('visible');
                
                // Reset styles
                if (el.classList.contains('reveal-left')) {
                    el.style.transform = 'translateX(-50px)';
                } else if (el.classList.contains('reveal-right')) {
                    el.style.transform = 'translateX(50px)';
                } else if (el.classList.contains('reveal-up')) {
                    el.style.transform = 'translateY(30px)';
                }
                el.style.opacity = '0';
                
                // Trigger reflow
                void el.offsetWidth;
                
                // Add visible class with staggered delay
                const delay = el.dataset.delay || index * 0.1;
                setTimeout(() => {
                    el.classList.add('visible');
                }, delay * 300);
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
                
                // Show loading state with reveal animation
                submitBtn.classList.remove('visible');
                submitBtn.style.transform = 'translateY(20px)';
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Trigger reflow
                void submitBtn.offsetWidth;
                
                // Add visible class for animation
                submitBtn.classList.add('visible');
                
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
                        
                        // Show success message with reveal animation
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
        notification.className = 'notification reveal-up';
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
            font-family: 'Montserrat', sans-serif;
            opacity: 0;
            transform: translateY(-30px);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        `;
        
        document.body.appendChild(notification);
        
        // Trigger reveal animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-30px)';
            
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const chessProfile = new ChessProfilePage();
    
    // Add chess piece floating animation in background
    const chessBoard = document.querySelector('.chess-board');
    const chessPieces = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
    
    for (let i = 0; i < 8; i++) {
        const piece = document.createElement('div');
        piece.className = 'floating-piece reveal-up';
        piece.style.cssText = `
            position: fixed;
            font-size: 3rem;
            color: rgba(241, 196, 15, 0.05);
            z-index: -1;
            pointer-events: none;
            animation: floatChessPiece 20s infinite linear;
            animation-delay: ${Math.random() * 20}s;
            opacity: 0;
        `;
        
        piece.innerHTML = `<i class="fas fa-chess-${chessPieces[Math.floor(Math.random() * chessPieces.length)]}"></i>`;
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `${Math.random() * 100}%`;
        
        chessBoard.appendChild(piece);
        
        // Animate piece in
        setTimeout(() => {
            piece.style.opacity = '1';
            piece.style.transform = 'translateY(0)';
        }, i * 200);
    }
    
    // Add floating animation style
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes floatChessPiece {
            0% {
                transform: translateY(100vh) rotate(0deg);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
        
        .floating-piece {
            transition: opacity 1s ease, transform 1s ease;
        }
    `;
    document.head.appendChild(floatStyle);
    
    // Add hover effects with reveal animations
    const interactiveElements = document.querySelectorAll('.website-card, .highlight-item, .video-card, .platform-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (this.classList.contains('reveal-left')) {
                this.style.transform = 'translateX(-8px)';
            } else if (this.classList.contains('reveal-right')) {
                this.style.transform = 'translateX(8px)';
            } else {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.classList.contains('reveal-left') && this.classList.contains('visible')) {
                this.style.transform = 'translateX(0)';
            } else if (this.classList.contains('reveal-right') && this.classList.contains('visible')) {
                this.style.transform = 'translateX(0)';
            } else if (this.classList.contains('visible')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add video play functionality with reveal
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        if (playBtn) {
            playBtn.classList.add('reveal-up');
            playBtn.style.opacity = '0';
            
            card.addEventListener('mouseenter', function() {
                playBtn.classList.add('visible');
            });
            
            card.addEventListener('mouseleave', function() {
                playBtn.classList.remove('visible');
            });
            
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const videoTitle = card.querySelector('h3').textContent;
                chessProfile.showNotification(`Playing: ${videoTitle}`);
            });
        }
        
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.play-btn')) {
                const videoTitle = this.querySelector('h3').textContent;
                chessProfile.showNotification(`Opening: ${videoTitle}`);
            }
        });
    });
});

// Handle window resize - re-trigger animations
window.addEventListener('resize', () => {
    const chessProfile = new ChessProfilePage();
    setTimeout(() => {
        chessProfile.triggerRevealAnimations();
    }, 300);
});
