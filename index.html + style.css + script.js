<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Profile với Reveal Animation</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto+Mono:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #2d3436;
            --secondary-color: #0984e3;
            --accent-color: #00cec9;
            --light-color: #f5f6fa;
            --dark-color: #2d3436;
            --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            --transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--primary-color);
            color: var(--light-color);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header Styles */
        header {
            padding: 40px 0 20px;
            text-align: center;
            position: relative;
            z-index: 10;
        }
        
        .logo {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--accent-color);
            display: inline-block;
            margin-bottom: 10px;
            position: relative;
        }
        
        .logo i {
            margin-right: 10px;
        }
        
        .tagline {
            font-size: 1.2rem;
            color: #aaa;
            margin-bottom: 30px;
            font-weight: 300;
        }
        
        /* Profile Section */
        .profile-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 60px;
            opacity: 0;
            transform: translateY(30px);
            transition: var(--transition);
        }
        
        .profile-section.reveal {
            opacity: 1;
            transform: translateY(0);
        }
        
        .avatar-container {
            position: relative;
            width: 200px;
            height: 200px;
            margin-bottom: 30px;
        }
        
        .avatar {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 5px solid var(--secondary-color);
            box-shadow: var(--shadow);
            transition: var(--transition);
        }
        
        .avatar:hover {
            transform: scale(1.05);
            border-color: var(--accent-color);
        }
        
        .avatar-ring {
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            border-radius: 50%;
            border: 2px solid var(--accent-color);
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(1.1);
                opacity: 0;
            }
        }
        
        .profile-info {
            text-align: center;
            max-width: 600px;
        }
        
        .profile-name {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: var(--light-color);
        }
        
        .profile-title {
            font-size: 1.3rem;
            color: var(--accent-color);
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        .profile-description {
            font-size: 1.1rem;
            margin-bottom: 30px;
            color: #ccc;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.1);
            color: var(--light-color);
            font-size: 1.5rem;
            transition: var(--transition);
            text-decoration: none;
        }
        
        .social-link:hover {
            background-color: var(--secondary-color);
            transform: translateY(-5px);
        }
        
        /* Info Cards */
        .info-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }
        
        .info-card {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 30px;
            box-shadow: var(--shadow);
            transition: var(--transition);
            opacity: 0;
            transform: translateY(30px);
        }
        
        .info-card.reveal {
            opacity: 1;
            transform: translateY(0);
        }
        
        .info-card:hover {
            transform: translateY(-10px);
            background-color: rgba(255, 255, 255, 0.08);
        }
        
        .card-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .card-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--secondary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            font-size: 1.5rem;
        }
        
        .card-title {
            font-size: 1.5rem;
            color: var(--accent-color);
        }
        
        .card-content {
            color: #ccc;
        }
        
        /* Skills Section */
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }
        
        .skill-tag {
            background-color: rgba(0, 206, 201, 0.2);
            color: var(--accent-color);
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            transition: var(--transition);
        }
        
        .skill-tag:hover {
            background-color: var(--accent-color);
            color: var(--dark-color);
        }
        
        /* Stats Section */
        .stats-section {
            margin-bottom: 60px;
            opacity: 0;
            transform: translateY(30px);
            transition: var(--transition);
        }
        
        .stats-section.reveal {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .stat-card {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 25px;
            text-align: center;
            transition: var(--transition);
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
            background-color: rgba(255, 255, 255, 0.08);
        }
        
        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--accent-color);
            margin-bottom: 10px;
        }
        
        .stat-label {
            font-size: 1rem;
            color: #aaa;
        }
        
        /* Projects Section */
        .projects-section {
            margin-bottom: 60px;
            opacity: 0;
            transform: translateY(30px);
            transition: var(--transition);
        }
        
        .projects-section.reveal {
            opacity: 1;
            transform: translateY(0);
        }
        
        .projects-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .project-card {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            overflow: hidden;
            transition: var(--transition);
        }
        
        .project-card:hover {
            transform: translateY(-10px);
            background-color: rgba(255, 255, 255, 0.08);
        }
        
        .project-image {
            height: 180px;
            background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: white;
        }
        
        .project-content {
            padding: 20px;
        }
        
        .project-title {
            font-size: 1.3rem;
            margin-bottom: 10px;
            color: var(--light-color);
        }
        
        .project-description {
            color: #ccc;
            margin-bottom: 15px;
            font-size: 0.95rem;
        }
        
        .project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .project-tag {
            background-color: rgba(255, 255, 255, 0.1);
            color: #aaa;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.8rem;
        }
        
        /* Footer */
        footer {
            text-align: center;
            padding: 40px 0;
            color: #777;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 40px;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .footer-link {
            color: #aaa;
            text-decoration: none;
            transition: var(--transition);
        }
        
        .footer-link:hover {
            color: var(--accent-color);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .profile-name {
                font-size: 2rem;
            }
            
            .info-section {
                grid-template-columns: 1fr;
            }
            
            .avatar-container {
                width: 150px;
                height: 150px;
            }
        }
        
        /* Scroll animation */
        .reveal {
            position: relative;
            transform: translateY(150px);
            opacity: 0;
            transition: all 0.8s ease;
        }
        
        .reveal.active {
            transform: translateY(0);
            opacity: 1;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header>
            <div class="logo">
                <i class="fab fa-github"></i>GitHub Profile
            </div>
            <div class="tagline">Một trang profile đẹp với hiệu ứng reveal animation</div>
        </header>
        
        <!-- Profile Section -->
        <section class="profile-section reveal">
            <div class="avatar-container">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" alt="Avatar" class="avatar">
                <div class="avatar-ring"></div>
            </div>
            
            <div class="profile-info">
                <h1 class="profile-name">Nguyễn Văn A</h1>
                <div class="profile-title">Full Stack Developer & UI/UX Designer</div>
                <p class="profile-description">
                    Lập trình viên đam mê sáng tạo với 5 năm kinh nghiệm phát triển web và ứng dụng di động. 
                    Luôn tìm kiếm những thách thức mới và công nghệ mới nhất để nâng cao kỹ năng.
                </p>
                
                <div class="social-links">
                    <a href="#" class="social-link"><i class="fab fa-github"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="social-link"><i class="fas fa-globe"></i></a>
                </div>
            </div>
        </section>
        
        <!-- Info Cards Section -->
        <section class="info-section">
            <div class="info-card reveal">
                <div class="card-header">
                    <div class="card-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <h3 class="card-title">Thông Tin Cá Nhân</h3>
                </div>
                <div class="card-content">
                    <p><strong>Địa điểm:</strong> Hà Nội, Việt Nam</p>
                    <p><strong>Email:</strong> nguyenvana@example.com</p>
                    <p><strong>Số điện thoại:</strong> +84 123 456 789</p>
                    <p><strong>Ngôn ngữ:</strong> Tiếng Việt, Tiếng Anh</p>
                </div>
            </div>
            
            <div class="info-card reveal">
                <div class="card-header">
                    <div class="card-icon">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <h3 class="card-title">Học Vấn</h3>
                </div>
                <div class="card-content">
                    <p><strong>Đại học Bách Khoa Hà Nội</strong></p>
                    <p>Cử nhân Công nghệ Thông tin</p>
                    <p>2015 - 2019</p>
                    <p>GPA: 3.6/4.0</p>
                </div>
            </div>
            
            <div class="info-card reveal">
                <div class="card-header">
                    <div class="card-icon">
                        <i class="fas fa-code"></i>
                    </div>
                    <h3 class="card-title">Kỹ Năng</h3>
                </div>
                <div class="card-content">
                    <div class="skills-container">
                        <span class="skill-tag">JavaScript</span>
                        <span class="skill-tag">React</span>
                        <span class="skill-tag">Node.js</span>
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">HTML/CSS</span>
                        <span class="skill-tag">MongoDB</span>
                        <span class="skill-tag">Git</span>
                        <span class="skill-tag">UI/UX Design</span>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Stats Section -->
        <section class="stats-section reveal">
            <h2 style="text-align: center; margin-bottom: 40px; font-size: 2rem; color: var(--accent-color);">Thống Kê GitHub</h2>
            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-number">124</div>
                    <div class="stat-label">Repository</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">1,254</div>
                    <div class="stat-label">Commits</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">89</div>
                    <div class="stat-label">Đóng góp</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">42</div>
                    <div class="stat-label">Dự án</div>
                </div>
            </div>
        </section>
        
        <!-- Projects Section -->
        <section class="projects-section reveal">
            <h2 style="text-align: center; margin-bottom: 40px; font-size: 2rem; color: var(--accent-color);">Dự Án Nổi Bật</h2>
            <div class="projects-container">
                <div class="project-card">
                    <div class="project-image">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">E-commerce Platform</h3>
                        <p class="project-description">Nền tảng thương mại điện tử với React và Node.js, tích hợp thanh toán trực tuyến.</p>
                        <div class="project-tags">
                            <span class="project-tag">React</span>
                            <span class="project-tag">Node.js</span>
                            <span class="project-tag">MongoDB</span>
                            <span class="project-tag">Stripe API</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-image">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Fitness App</h3>
                        <p class="project-description">Ứng dụng theo dõi thể dục với React Native, tính năng theo dõi tiến độ và lập kế hoạch tập luyện.</p>
                        <div class="project-tags">
                            <span class="project-tag">React Native</span>
                            <span class="project-tag">Firebase</span>
                            <span class="project-tag">Redux</span>
                            <span class="project-tag">Health API</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-image">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Data Visualization Dashboard</h3>
                        <p class="project-description">Bảng điều khiển trực quan hóa dữ liệu với D3.js và React, hiển thị dữ liệu thời gian thực.</p>
                        <div class="project-tags">
                            <span class="project-tag">D3.js</span>
                            <span class="project-tag">React</span>
                            <span class="project-tag">Chart.js</span>
                            <span class="project-tag">WebSocket</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Footer -->
        <footer>
            <div class="footer-links">
                <a href="#" class="footer-link">GitHub</a>
                <a href="#" class="footer-link">LinkedIn</a>
                <a href="#" class="footer-link">Portfolio</a>
                <a href="#" class="footer-link">Blog</a>
            </div>
            <p>&copy; 2023 Nguyễn Văn A. Tất cả các quyền được bảo lưu.</p>
            <p>Made with <i class="fas fa-heart" style="color: #e74c3c;"></i> and <i class="fas fa-code" style="color: var(--accent-color);"></i></p>
        </footer>
    </div>

    <script>
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
    </script>
</body>
</html>
