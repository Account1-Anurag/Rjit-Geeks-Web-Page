document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && closeBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });

        // Close menu when clicking a link on mobile
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active Navigation Link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Members Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const memberCards = document.querySelectorAll('.member-card');

    if (filterBtns.length > 0 && memberCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter members
                memberCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        // Add animation for appearing cards
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                    }
                });
            });
        });
    }

    // Achievements Slider
    const achievementsContainer = document.querySelector('.achievements-container');
    const prevBtn = document.getElementById('prev-achievement');
    const nextBtn = document.getElementById('next-achievement');

    if (achievementsContainer && prevBtn && nextBtn) {
        const cardWidth = 300 + 25; // card width + gap
        const maxScrollPosition = achievementsContainer.scrollWidth - achievementsContainer.clientWidth;

        prevBtn.addEventListener('click', () => {
            achievementsContainer.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            achievementsContainer.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });

        // Disable/enable buttons based on scroll position
        achievementsContainer.addEventListener('scroll', () => {
            if (achievementsContainer.scrollLeft <= 0) {
                prevBtn.classList.add('disabled');
            } else {
                prevBtn.classList.remove('disabled');
            }

            if (achievementsContainer.scrollLeft >= maxScrollPosition - 10) {
                nextBtn.classList.add('disabled');
            } else {
                nextBtn.classList.remove('disabled');
            }
        });

        // Initial check
        if (achievementsContainer.scrollLeft <= 0) {
            prevBtn.classList.add('disabled');
        }
    }

    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Your message has been sent successfully!', 'success');
            contactForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value.trim();
            
            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            showNotification('Thanks for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        // Check if notification container exists, if not create it
        let notificationContainer = document.querySelector('.notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'notification-close';
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        notification.appendChild(closeBtn);
        notificationContainer.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }

    // Add CSS for notifications
    const notificationStyles = `
        .notification-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
        }
        .notification {
            background-color: white;
            color: #333;
            padding: 15px 40px 15px 20px;
            margin-bottom: 10px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            position: relative;
            min-width: 300px;
            animation: slide-in 0.5s ease;
        }
        .notification.success {
            border-left: 4px solid #4CAF50;
        }
        .notification.error {
            border-left: 4px solid #F44336;
        }
        .notification-close {
            position: absolute;
            top: 12px;
            right: 12px;
            cursor: pointer;
            font-size: 1.2rem;
        }
        .notification.fade-out {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        @keyframes slide-in {
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
    
    const styleElement = document.createElement('style');
    styleElement.textContent = notificationStyles;
    document.head.appendChild(styleElement);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.about-content, .hierarchy-card, .member-card, .achievement-card, .alumni-card, .event-card');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animation
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', checkScroll);
    // Initial check for elements in view
    checkScroll();

    // Countdown timer for upcoming events
    const eventDates = document.querySelectorAll('.event-date');
    
    if (eventDates.length > 0) {
        // Get current date
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        
        eventDates.forEach(eventDate => {
            const dayElement = eventDate.querySelector('.day');
            const monthElement = eventDate.querySelector('.month');
            
            if (dayElement && monthElement) {
                const day = parseInt(dayElement.textContent);
                const month = getMonthIndex(monthElement.textContent);
                
                // Create event date (assume current year)
                const eventDateTime = new Date(currentYear, month, day);
                
                // If event date is in the past, add a year
                if (eventDateTime < currentDate) {
                    eventDateTime.setFullYear(currentYear + 1);
                }
                
                // Add data attribute with timestamp for potential countdown
                eventDate.setAttribute('data-timestamp', eventDateTime.getTime());
                
                // Highlight upcoming events (within next 7 days)
                const daysDifference = Math.ceil((eventDateTime - currentDate) / (1000 * 60 * 60 * 24));
                
                if (daysDifference <= 7) {
                    const eventCard = eventDate.closest('.event-card');
                    if (eventCard) {
                        // Add a "Coming Soon" badge
                        const badge = document.createElement('div');
                        badge.className = 'event-badge';
                        badge.textContent = 'Coming Soon';
                        eventCard.querySelector('.event-details').appendChild(badge);
                        
                        // Add some styling for the badge
                        badge.style.backgroundColor = '#e74c3c';
                        badge.style.color = 'white';
                        badge.style.padding = '3px 10px';
                        badge.style.borderRadius = '30px';
                        badge.style.display = 'inline-block';
                        badge.style.fontSize = '0.8rem';
                        badge.style.fontWeight = 'bold';
                        badge.style.marginTop = '10px';
                    }
                }
            }
        });
    }

    // Helper function to convert month name to index
    function getMonthIndex(monthName) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.findIndex(month => month.toLowerCase() === monthName.toLowerCase());
    }

    // Modal for alumni profiles
    const alumniCards = document.querySelectorAll('.alumni-card');
    
    if (alumniCards.length > 0) {
        alumniCards.forEach(card => {
            card.addEventListener('click', () => {
                // Get data from the card
                const name = card.querySelector('h3').textContent;
                const company = card.querySelector('.company').textContent;
                const batch = card.querySelector('.batch').textContent;
                const quote = card.querySelector('.quote').textContent;
                const imgSrc = card.querySelector('img').getAttribute('src');
                
                // Create modal HTML
                const modalHTML = `
                    <div class="alumni-modal-overlay">
                        <div class="alumni-modal">
                            <span class="modal-close">&times;</span>
                            <div class="modal-content">
                                <div class="modal-img">
                                    <img src="${imgSrc}" alt="${name}">
                                </div>
                                <div class="modal-info">
                                    <h2>${name}</h2>
                                    <p class="modal-position">${company}</p>
                                    <p class="modal-batch">${batch}</p>
                                    <p class="modal-quote">${quote}</p>
                                    <div class="modal-details">
                                        <p><strong>Achievements:</strong> Club President (2022), Winner of National Coding Challenge, Microsoft Student Partner</p>
                                        <p><strong>Skills:</strong> Full Stack Development, Machine Learning, Cloud Computing</p>
                                        <p><strong>Projects:</strong> Developed an AI-powered campus navigation system, Created a peer-to-peer learning platform for college students</p>
                                    </div>
                                    <div class="social-icons">
                                        <a href="#"><i class="fab fa-linkedin"></i></a>
                                        <a href="#"><i class="fab fa-github"></i></a>
                                        <a href="#"><i class="fab fa-twitter"></i></a>
                                        <a href="#"><i class="fas fa-globe"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add modal to body
                document.body.insertAdjacentHTML('beforeend', modalHTML);
                
                // Add modal styles
                const modalStyles = `
                    .alumni-modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.7);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1001;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    .alumni-modal {
                        background-color: white;
                        border-radius: 10px;
                        max-width: 800px;
                        width: 90%;
                        max-height: 90vh;
                        overflow-y: auto;
                        position: relative;
                        transform: translateY(-20px);
                        transition: transform 0.3s ease;
                    }
                    .modal-close {
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 28px;
                        cursor: pointer;
                        z-index: 10;
                        color: #333;
                    }
                    .modal-content {
                        display: flex;
                        padding: 30px;
                    }
                    .modal-img {
                        flex: 1;
                        max-width: 250px;
                    }
                    .modal-img img {
                        width: 100%;
                        border-radius: 10px;
                    }
                    .modal-info {
                        flex: 2;
                        padding-left: 30px;
                    }
                    .modal-position {
                        color: #3498db;
                        font-weight: 600;
                        margin-bottom: 5px;
                    }
                    .modal-batch {
                        color: #777;
                        margin-bottom: 10px;
                    }
                    .modal-quote {
                        font-style: italic;
                        border-left: 3px solid #3498db;
                        padding-left: 15px;
                        margin: 15px 0;
                    }
                    .modal-details {
                        margin: 20px 0;
                    }
                    .modal-details p {
                        margin-bottom: 10px;
                    }
                    @media (max-width: 768px) {
                        .modal-content {
                            flex-direction: column;
                        }
                        .modal-img {
                            max-width: 100%;
                            margin-bottom: 20px;
                        }
                        .modal-info {
                            padding-left: 0;
                        }
                    }
                `;
                
                // Add the styles temporarily
                const styleEl = document.createElement('style');
                styleEl.textContent = modalStyles;
                document.head.appendChild(styleEl);
                
                // Animate modal appearance
                setTimeout(() => {
                    document.querySelector('.alumni-modal-overlay').style.opacity = '1';
                    document.querySelector('.alumni-modal').style.transform = 'translateY(0)';
                }, 10);
                
                // Close modal when clicking the X or outside
                document.querySelector('.modal-close').addEventListener('click', closeModal);
                document.querySelector('.alumni-modal-overlay').addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeModal();
                    }
                });
                
                function closeModal() {
                    document.querySelector('.alumni-modal-overlay').style.opacity = '0';
                    document.querySelector('.alumni-modal').style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        document.querySelector('.alumni-modal-overlay').remove();
                        styleEl.remove();
                    }, 300);
                }
            });
        });
    }

    // Implement a simple image lightbox for member profiles
    const memberImages = document.querySelectorAll('.member-img');
    
    if (memberImages.length > 0) {
        memberImages.forEach(imgContainer => {
            imgContainer.addEventListener('click', () => {
                const img = imgContainer.querySelector('img');
                const imgSrc = img.getAttribute('src');
                const memberName = imgContainer.closest('.member-card').querySelector('h3').textContent;
                
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'image-lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${imgSrc}" alt="${memberName}">
                        <p>${memberName}</p>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                // Add lightbox styles
                const lightboxStyles = `
                    .image-lightbox {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.9);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1001;
                    }
                    .lightbox-content {
                        position: relative;
                        max-width: 80%;
                        max-height: 80%;
                        text-align: center;
                    }
                    .lightbox-content img {
                        max-width: 100%;
                        max-height: 80vh;
                        border: 4px solid white;
                    }
                    .lightbox-content p {
                        color: white;
                        margin-top: 15px;
                        font-size: 1.2rem;
                    }
                    .lightbox-close {
                        position: absolute;
                        top: -40px;
                        right: 0;
                        color: white;
                        font-size: 30px;
                        cursor: pointer;
                    }
                `;
                
                const styleEl = document.createElement('style');
                styleEl.textContent = lightboxStyles;
                document.head.appendChild(styleEl);
                
                // Close lightbox functionality
                lightbox.addEventListener('click', function(e) {
                    if (e.target === this || e.target.classList.contains('lightbox-close')) {
                        this.remove();
                        styleEl.remove();
                    }
                });
            });
        });
    }

    // Add a typing effect to the hero subtitle
    const heroSubtitle = document.querySelector('.hero-content p');
    
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 50);
            }
        }
        
        // Start typing effect with a short delay after page load
        setTimeout(typeText, 500);
    }

    // Dynamic counters for the stats
    const statNumbers = document.querySelectorAll('.stat-box h4');
    
    if (statNumbers.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const finalValue = parseInt(statElement.textContent);
                    statElement.textContent = '0';
                    
                    let currentValue = 0;
                    const increment = Math.ceil(finalValue / 50);
                    const duration = 1500; // ms
                    const interval = duration / (finalValue / increment);
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue > finalValue) {
                            statElement.textContent = finalValue + '+';
                            clearInterval(counter);
                        } else {
                            statElement.textContent = currentValue + '+';
                        }
                    }, interval);
                    
                    // Only run animation once
                    countObserver.unobserve(statElement);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            countObserver.observe(stat);
        });
    }

    // Automatic carousel for achievements if multiple exist
    if (achievementsContainer && nextBtn) {
        // Check if there are enough achievements to scroll
        if (achievementsContainer.scrollWidth > achievementsContainer.clientWidth) {
            let autoScrollInterval;
            
            // Function to start auto-scroll
            function startAutoScroll() {
                autoScrollInterval = setInterval(() => {
                    if (achievementsContainer.scrollLeft >= maxScrollPosition - 10) {
                        // If reached the end, scroll back to start
                        achievementsContainer.scrollTo({
                            left: 0,
                            behavior: 'smooth'
                        });
                    } else {
                        nextBtn.click();
                    }
                }, 5000);
            }
            
            // Start auto-scroll
            startAutoScroll();
            
            // Pause auto-scroll when user interacts
            achievementsContainer.addEventListener('mouseover', () => {
                clearInterval(autoScrollInterval);
            });
            
            // Resume auto-scroll when user stops interacting
            achievementsContainer.addEventListener('mouseleave', () => {
                startAutoScroll();
            });
        }
    }

    // Add local storage for form auto-save
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    if (nameInput && emailInput) {
        // Load saved data if exists
        const savedName = localStorage.getItem('rjit_geeks_name');
        const savedEmail = localStorage.getItem('rjit_geeks_email');
        
        if (savedName) nameInput.value = savedName;
        if (savedEmail) emailInput.value = savedEmail;
        
        // Save input values on change
        nameInput.addEventListener('change', () => {
            localStorage.setItem('rjit_geeks_name', nameInput.value);
        });
        
        emailInput.addEventListener('change', () => {
            localStorage.setItem('rjit_geeks_email', emailInput.value);
        });
    }

    // Add a theme switcher
    const footer = document.querySelector('footer');
    
    if (footer) {
        // Create theme switcher button
        const themeSwitcher = document.createElement('div');
        themeSwitcher.className = 'theme-switcher';
        themeSwitcher.innerHTML = `
            <button class="theme-btn light active" data-theme="light">
                <i class="fas fa-sun"></i>
            </button>
            <button class="theme-btn dark" data-theme="dark">
                <i class="fas fa-moon"></i>
            </button>
        `;
        
        // Add theme switcher to the page
        document.body.appendChild(themeSwitcher);
        
        // Add theme switcher styles
        const themeStyles = `
            .theme-switcher {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background-color: white;
                border-radius: 30px;
                padding: 5px;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                z-index: 100;
                display: flex;
            }
            .theme-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: none;
                background-color: transparent;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #333;
                transition: all 0.3s ease;
            }
            .theme-btn.active {
                background-color: #3498db;
                color: white;
            }
            
            /* Dark theme styles */
            body.dark-theme {
                background-color: #222;
                color: #f5f5f5;
            }
            body.dark-theme .navbar,
            body.dark-theme .about,
            body.dark-theme .members,
            body.dark-theme .contact,
            body.dark-theme .about-text,
            body.dark-theme .member-card,
            body.dark-theme .contact-form {
                background-color: #333;
                color: #f5f5f5;
            }
            body.dark-theme h1, 
            body.dark-theme h2, 
            body.dark-theme h3, 
            body.dark-theme h4, 
            body.dark-theme h5, 
            body.dark-theme h6 {
                color: #f5f5f5;
            }
            body.dark-theme .hierarchy,
            body.dark-theme .achievements,
            body.dark-theme .events {
                background-color: #222;
            }
            body.dark-theme .hierarchy-card,
            body.dark-theme .achievement-card,
            body.dark-theme .event-card {
                background-color: #333;
            }
            body.dark-theme .nav-links a,
            body.dark-theme .logo h1 {
                color: #f5f5f5;
            }
            body.dark-theme .alumni-card {
                background-color: #333;
            }
            body.dark-theme .filter-btn,
            body.dark-theme .form-group input,
            body.dark-theme .form-group textarea {
                background-color: #444;
                color: #f5f5f5;
                border-color: #555;
            }
            body.dark-theme .filter-btn.active {
                background-color: #3498db;
            }
            body.dark-theme .social-icons a {
                background-color: #444;
                color: #f5f5f5;
            }
            body.dark-theme .stat-box h4{
                color: black;
            }
            body.dark-theme .stat-box p{
                color: black;
            }
            body.dark-theme .section-title h2{
                color:blue;
            }
        `;
        
        const themeStyleEl = document.createElement('style');
        themeStyleEl.textContent = themeStyles;
        document.head.appendChild(themeStyleEl);
        
        // Theme switching functionality
        const themeButtons = document.querySelectorAll('.theme-btn');
        
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('rjit_geeks_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-theme') === 'dark') {
                    btn.classList.add('active');
                }
            });
        }
        
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                
                // Update active button
                themeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Toggle theme class on body
                if (theme === 'dark') {
                    document.body.classList.add('dark-theme');
                    localStorage.setItem('rjit_geeks_theme', 'dark');
                } else {
                    document.body.classList.remove('dark-theme');
                    localStorage.setItem('rjit_geeks_theme', 'light');
                }
            });
        });
    }
});