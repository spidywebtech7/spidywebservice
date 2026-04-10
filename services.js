document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching Logic
    const tabs = document.querySelectorAll('.tab-item');
    const contents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // Update tabs
        tabs.forEach(t => {
            if (t.getAttribute('data-tab') === tabId) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        // Update content
        contents.forEach(c => {
            if (c.id === tabId) {
                c.classList.add('active');
            } else {
                c.classList.remove('active');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            switchTab(target);
        });
    });

    // 2. Handle URL Query Params (e.g. services.html?tab=web)
    const urlParams = new URLSearchParams(window.location.search);
    const initialTab = urlParams.get('tab');
    if (initialTab) {
        switchTab(initialTab);
    }

    // 3. Accordion Logic
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        const icon = header.querySelector('i');
        const body = acc.querySelector('.accordion-body');

        header.addEventListener('click', () => {
            const isActive = acc.classList.contains('active');

            // Close all other accordions in the same group
            const parentGroup = acc.closest('.accordions');
            parentGroup.querySelectorAll('.accordion').forEach(sibling => {
                sibling.classList.remove('active');
                sibling.querySelector('.accordion-body').style.display = 'none';
                sibling.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
            });

            if (!isActive) {
                acc.classList.add('active');
                body.style.display = 'block';
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    });

    // 4. Services form submission (Reusing backend logic)
    const servicesForm = document.getElementById('services-form');
    if (servicesForm) {
        servicesForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = servicesForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            const inputs = servicesForm.querySelectorAll('input, textarea');
            const data = {
                name: inputs[0].value,
                email: inputs[1].value,
                phone: inputs[2].value,
                message: inputs[3].value
            };

            try {
                const whatsappNumber = "916356647453";
                const whatsappMessage = `*New Services Inquiry*%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Phone:* ${data.phone}%0A*Message:* ${data.message}`;
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
                
                window.open(whatsappUrl, '_blank');

                btn.innerHTML = 'Redirecting to WhatsApp... <i class="fab fa-whatsapp"></i>';
                servicesForm.reset();
                
                setTimeout(() => { 
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 3000);
            } catch (err) {
                btn.innerHTML = 'Error! Try Again';
                btn.disabled = false;
                setTimeout(() => { btn.innerHTML = originalText; }, 3000);
            }
        });
    }

    // 5. Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
});
