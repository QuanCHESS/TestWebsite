// Parallax Effect cho ảnh nền
document.addEventListener('DOMContentLoaded', function() {
    const parallaxBg = document.getElementById('parallax-bg');
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;
    let lastScrollTop = 0;
    
    // Hiệu ứng parallax khi scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hiệu ứng parallax cho ảnh nền
        if (scrollTop <= heroHeight) {
            // Tính toán scale dựa trên vị trí scroll
            const scale = 1 + (scrollTop * 0.0005);
            const translateY = scrollTop * 0.5;
            
            parallaxBg.style.transform = `translateY(${translateY}px) scale(${scale})`;
            
            // Điều chỉnh độ mờ của overlay
            const overlay = document.querySelector('.bg-overlay');
            const opacity = 0.85 - (scrollTop * 0.001);
            overlay.style.opacity = Math.max(opacity, 0.7);
        }
        
        lastScrollTop = scrollTop;
        
        // Gọi hàm reveal animation
        reveal();
    });
    
    // Reveal animation on scroll
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    
    // Smooth scroll cho nút scroll down
    const scrollDownBtn = document.querySelector('.scroll-down-btn');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#profile').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.innerText);
        let current = 0;
        const increment = target / 50;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.innerText = Math.floor(current);
                setTimeout(updateNumber, 30);
            } else {
                stat.innerText = target;
            }
        };
        
        // Start counting when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat.parentElement);
    });
    
    // Animate skill tags on hover
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-20px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px)';
            }, 150);
        });
    });
    
    // Typing effect for profile title
    const profileTitle = document.querySelector('.profile-title');
    if (profileTitle) {
        const originalText = profileTitle.textContent;
        profileTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                profileTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing when profile section is visible
        const profileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    profileObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        profileObserver.observe(document.querySelector('.profile-section'));
    }
    
    // Add floating animation to avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        let floatDirection = 1;
        let floatPosition = 0;
        
        function floatAvatar() {
            floatPosition += 0.5 * floatDirection;
            
            if (floatPosition > 5) {
                floatDirection = -1;
            } else if (floatPosition < -5) {
                floatDirection = 1;
            }
            
            avatar.style.transform = `translateY(${floatPosition}px) scale(1.05)`;
            requestAnimationFrame(floatAvatar);
        }
        
        // Start floating when avatar is visible
        const avatarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    floatAvatar();
                    avatarObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        avatarObserver.observe(avatar);
    }
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--accent-color), var(--secondary-color));
        z-index: 1000;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // Initialize reveal on page load
    reveal();
});
