// Toggle mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    }
});


// Hero section
document.querySelector('.logistaff-scroll-indicator').addEventListener('click', function () {
    window.scrollTo({
        top: document.querySelector('.logistaff-hero').offsetHeight,
        behavior: 'smooth'
    });
});

// Add intersection observer for elements to animate when in viewport
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.logistaff-service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});


// Services section

// Optimized service section visibility on scroll
document.addEventListener('DOMContentLoaded', function () {
    const serviceItems = document.querySelectorAll('.logistaff-service-item');

    // Use Intersection Observer for better performance
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay based on element's position for staggered effect
                const index = Array.from(serviceItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Reduced delay for faster appearance

                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each service item
    serviceItems.forEach(item => {
        observer.observe(item);
    });

    // Add hover effects to service items
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });
});

// how it works section

document.addEventListener('DOMContentLoaded', function () {
    const processSteps = document.querySelectorAll('.logistaff-process-step');

    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-20px)';
        });

        step.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add intersection observer for elements to animate when in viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each process step
    processSteps.forEach(step => {
        observer.observe(step);
    });
});

// why choose us section

document.addEventListener('DOMContentLoaded', function () {
    const benefitCards = document.querySelectorAll('.logistaff-benefit-card');

    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});


// stats counter section

document.addEventListener('DOMContentLoaded', function () {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate numbers
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animate stats when they come into view
    const statNumbers = document.querySelectorAll('.logistaff-stat-number');
    const statsSection = document.querySelector('.logistaff-stats-section');
    let animated = false;

    function checkAnimation() {
        if (isInViewport(statsSection) && !animated) {
            statNumbers.forEach(stat => {
                // Extract the number value (handling prefix/suffix)
                let valueText = stat.textContent;
                if (stat.querySelector('.logistaff-stat-prefix')) {
                    valueText = valueText.replace(stat.querySelector('.logistaff-stat-prefix').textContent, '');
                }
                if (stat.querySelector('.logistaff-stat-suffix')) {
                    valueText = valueText.replace(stat.querySelector('.logistaff-stat-suffix').textContent, '');
                }

                const value = parseInt(valueText.replace(/[^0-9]/g, ''));
                stat.textContent = '0';

                // Add back prefix/suffix if they exist
                if (stat.querySelector('.logistaff-stat-prefix')) {
                    stat.innerHTML = '<span class="logistaff-stat-prefix">+</span>' + stat.textContent;
                }
                if (stat.querySelector('.logistaff-stat-suffix')) {
                    stat.innerHTML += '<span class="logistaff-stat-suffix">%</span>';
                }

                animateValue(stat, 0, value, 2000);
            });
            animated = true;
        }
    }

    // Check on load and scroll
    window.addEventListener('load', checkAnimation);
    window.addEventListener('scroll', checkAnimation);

    // Add hover effects with JavaScript for additional interactivity
    const statCards = document.querySelectorAll('.logistaff-stat-card');

    statCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            const numberEl = this.querySelector('.logistaff-stat-number');
            if (numberEl) numberEl.style.color = '#FF9E1B';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            const numberEl = this.querySelector('.logistaff-stat-number');
            if (numberEl) numberEl.style.color = '#0E1E42';
        });
    });
});

// footer
document.addEventListener('DOMContentLoaded', function () {
    const footerSections = document.querySelectorAll('.logistaff-footer-section');

    footerSections.forEach(section => {
        section.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        section.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Form animation
    const formInput = document.querySelector('.logistaff-footer-input');
    if (formInput) {
        formInput.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });

        formInput.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    }
});


// about us page adjustments

document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('.staffing-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Animate stats counting
                if (entry.target.classList.contains('staffing-stat-item')) {
                    const numberElement = entry.target.querySelector('.staffing-stat-number');
                    const finalValue = parseInt(numberElement.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const interval = 20; // update every 20ms
                    const steps = duration / interval;
                    const increment = finalValue / steps;
                    let currentValue = 0;

                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            clearInterval(timer);
                            currentValue = finalValue;
                        }
                        numberElement.textContent = Math.round(currentValue);
                    }, interval);
                }
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});