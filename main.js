document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Logic
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = '#fff';
        }
    });

    // 2. Reveal Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a counter, start counting
                if (entry.target.querySelector('.counter')) {
                    startCounter(entry.target.querySelector('.counter'));
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Counter Animation Logic
    function startCounter(counterEl) {
        const target = +counterEl.getAttribute('data-target');
        const count = +counterEl.innerText;
        const increment = target / 100;

        if (count < target) {
            counterEl.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounter(counterEl), 20);
        } else {
            counterEl.innerText = target;
        }
    }

    // 4. Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.innerText = 'Sending message...';
            formStatus.style.color = 'var(--primary)';

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            try {
                const whatsappNumber = "916356647453";
                const whatsappMessage = `*New Contact Form Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Message:* ${formData.message}`;
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
                
                window.open(whatsappUrl, '_blank');

                formStatus.innerText = 'Redirecting to WhatsApp...';
                formStatus.style.color = '#28a745';
                contactForm.reset();
                
                setTimeout(() => { formStatus.innerText = ''; }, 3000);
            } catch (error) {
                formStatus.innerText = 'Oops! Something went wrong. Please try again.';
                formStatus.style.color = '#dc3545';
                console.error('Submission error:', error);
            }
        });
    }

    // 5. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            e.stopPropagation();
        });

        // Toggle dropdowns on mobile
        const dropdowns = document.querySelectorAll('.has-dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (!dropdown.classList.contains('active')) {
                        e.preventDefault();
                        dropdown.classList.add('active');
                    }
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });

        // Close menu when clicking a link (if not a dropdown parent on mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const parent = link.parentElement;
                if (!parent.classList.contains('has-dropdown') || window.innerWidth > 768) {
                    navMenu.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }
});
