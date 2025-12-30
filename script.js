class SceneManager {
    constructor() {
        this.scenes = document.querySelectorAll('.scene');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.currentScene = 1;
        this.totalScenes = this.scenes.length;
        this.isScrolling = false;
        this.scrollDelay = 1000;
        this.lastScrollTime = Date.now();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.animateOnLoad();
        this.setupSmoothScroll();
        this.setupProgressBar();
        this.updateScene(1);
    }
    
    setupEventListeners() {
        // Mouse wheel scroll
        window.addEventListener('wheel', (e) => this.handleScroll(e), { passive: false });
        
        // Touch events for mobile
        let touchStartY = 0;
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        window.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            
            if (Math.abs(deltaY) > 50) {
                if (deltaY > 0) {
                    this.nextScene();
                } else {
                    this.previousScene();
                }
            }
        }, { passive: true });
        
        // Navigation dots
        this.navDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const sceneNumber = parseInt(e.target.dataset.scene);
                this.goToScene(sceneNumber);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                this.nextScene();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.previousScene();
            } else if (e.key >= '1' && e.key <= '5') {
                this.goToScene(parseInt(e.key));
            }
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
            this.nextScene();
        } else {
            this.previousScene();
        }
    }
    
    nextScene() {
        if (this.currentScene < this.totalScenes) {
            this.goToScene(this.currentScene + 1);
        }
    }
    
    previousScene() {
        if (this.currentScene > 1) {
            this.goToScene(this.currentScene - 1);
        }
    }
    
    goToScene(sceneNumber) {
        if (this.isScrolling || sceneNumber < 1 || sceneNumber > this.totalScenes) {
            return;
        }
        
        this.isScrolling = true;
        this.currentScene = sceneNumber;
        
        // Animate background before scene change
        const currentScene = document.querySelector(`.scene-${sceneNumber}`);
        const bg = currentScene.querySelector('.scene-bg');
        
        // Reset and animate background
        bg.style.transform = 'scale(1.2)';
        setTimeout(() => {
            bg.style.transform = 'scale(1)';
        }, 50);
        
        // Update scenes
        this.scenes.forEach(scene => {
            scene.classList.remove('active');
        });
        
        const targetScene = document.querySelector(`.scene-${sceneNumber}`);
        targetScene.classList.add('active');
        
        // Update navigation dots
        this.navDots.forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.scene) === sceneNumber) {
                dot.classList.add('active');
            }
        });
        
        // Animate elements on scroll
        setTimeout(() => {
            this.animateOnScroll();
            this.updateProgressBar();
            this.isScrolling = false;
        }, 800);
    }
    
    animateOnLoad() {
        const elements = document.querySelectorAll('.animate-on-load');
        elements.forEach((element, index) => {
            const delay = element.dataset.delay || 0;
            setTimeout(() => {
                element.style.animationDelay = `${delay}s`;
                element.classList.add('animated');
            }, index * 100);
        });
    }
    
    animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const sceneContent = document.querySelector('.scene.active .scene-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.dataset.delay || 0;
                    
                    setTimeout(() => {
                        element.classList.add('active');
                    }, parseFloat(delay) * 1000);
                    
                    observer.unobserve(element);
                }
            });
        }, {
            root: sceneContent,
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
        
        // Animate skill bars
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const level = bar.dataset.level;
            setTimeout(() => {
                bar.style.width = `${level}%`;
            }, 500);
        });
    }
    
    setupSmoothScroll() {
        // Smooth scroll within scene content
        const sceneContent = document.querySelectorAll('.scene-content');
        sceneContent.forEach(content => {
            content.addEventListener('wheel', (e) => {
                e.stopPropagation();
            });
        });
    }
    
    setupProgressBar() {
        this.progressBar = document.querySelector('.progress-bar');
        this.updateProgressBar();
    }
    
    updateProgressBar() {
        const progress = ((this.currentScene - 1) / (this.totalScenes - 1)) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    updateScene(sceneNumber) {
        this.goToScene(sceneNumber);
    }
}

// Initialize scene manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sceneManager = new SceneManager();
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Đã gửi!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = `<span>${originalText}</span><i class="fas fa-paper-plane"></i>`;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Add floating animation to avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        let angle = 0;
        
        function floatAvatar() {
            angle += 0.5;
            const y = Math.sin(angle * Math.PI / 180) * 10;
            avatar.style.transform = `translateY(${y}px)`;
            requestAnimationFrame(floatAvatar);
        }
        
        floatAvatar();
    }
    
    // Add ripple effect to social items
    document.querySelectorAll('.social-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add parallax effect to backgrounds
window.addEventListener('scroll', () => {
    const activeScene = document.querySelector('.scene.active');
    if (activeScene) {
        const bg = activeScene.querySelector('.scene-bg');
        const scrollPosition = window.pageYOffset;
        const parallaxValue = scrollPosition * 0.5;
        
        bg.style.transform = `translateY(${parallaxValue}px) scale(1)`;
    }
});
