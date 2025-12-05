document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) {
                const navList = document.querySelector('.nav-list');
                const hamburger = document.querySelector('.hamburger-menu');
                navList.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
        });
    }

    // Pricing Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show the corresponding tab pane
            const targetTabId = button.dataset.tab;
            const targetPane = document.getElementById(targetTabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // FAQ Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Close all other open accordion items
            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.parentElement;
                const otherContent = otherHeader.nextElementSibling;
                if (otherHeader !== header && otherHeader.getAttribute('aria-expanded') === 'true') {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherContent.style.maxHeight = '0';
                }
            });

            // Toggle current item
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px'; // Set max-height for smooth transition
            } else {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0';
            }
        });
    });


    // Form submission (placeholder for actual backend interaction)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                console.log(`Подписка на рассылку: ${email}`);
                alert(`Спасибо за подписку, ${email}! Мы отправили вам список полезных советов.`);
                emailInput.value = ''; // Clear the input
                // In a real application, you would send this to a server
            } else {
                alert('Пожалуйста, введите ваш Email для подписки.');
            }
        });
    }

    // Optional: Add intersection observer for fade-in animations on scroll
    const animateOnScrollElements = document.querySelectorAll('section, .hero-image img, .problem-item, .change-item, .step-card, .content-item, .result-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust for early loading
    });

    animateOnScrollElements.forEach(element => {
        element.classList.add('fade-in'); // Add base class for animation
        observer.observe(element);
    });

    // Initial check for hash in URL to scroll to section
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// CSS for fade-in effect to be added below basic styles

/* Fade-in Animation */
