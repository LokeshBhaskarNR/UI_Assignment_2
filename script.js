
function updateScrollIndicator() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.getElementById('scrollIndicator').style.width = scrollPercent + '%';
}

function toggleBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}


function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

function createObserver() {
    const options = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('emailInput');
    const submitBtn = e.target.querySelector('.newsletter-btn');
    
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = '✓ Subscribed!';
        submitBtn.style.background = '#16a34a';
        emailInput.value = '';
        
        setTimeout(() => {
            submitBtn.textContent = 'Subscribe';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
}

function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function handleParallax() {
    const banner = document.querySelector('.banner');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    banner.style.transform = `translateY(${rate}px)`;
}

document.addEventListener('DOMContentLoaded', function() {
   
    window.addEventListener('scroll', () => {
        updateScrollIndicator();
        toggleBackToTop();
        handleParallax();
    });

    document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletterSubmit);

    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    createObserver();
    smoothScroll();

    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
});