// Reveal animation on scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', reveal);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    reveal();
    
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
        });
        
        observer.observe(stat.parentElement);
    });
    
    // Animate skill tags on hover
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
    
    // Add typing effect to profile title
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
                    typeWriter();
                    profileObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        profileObserver.observe(document.querySelector('.profile-section'));
    }
});
