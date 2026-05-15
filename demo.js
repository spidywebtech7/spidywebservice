const id = (name) => document.getElementById(name);

document.addEventListener('DOMContentLoaded', () => {
    const demoForm = id('business-demo-form');
    const formContainer = id('demo-form-container');
    const proposalContainer = id('proposal-result');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');

    // Multi-step Navigation
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = btn.getAttribute('data-next');
            
            // Basic validation for Step 1
            if (nextStep == "2") {
                if (!id('business-name').value || !id('business-industry').value) {
                    alert('Please enter your business name and select an industry');
                    return;
                }
            }

            // Basic validation for Step 2
            if (nextStep == "3") {
                const checked = document.querySelectorAll('.service-check:checked');
                if (checked.length === 0) {
                    alert('Please select at least one service');
                    return;
                }
                if (!id('project-budget').value || !id('project-timeline').value) {
                    alert('Please select a budget range and timeline');
                    return;
                }
            }

            goToStep(nextStep);
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStep = btn.getAttribute('data-prev');
            goToStep(prevStep);
        });
    });

    function goToStep(stepNum) {
        steps.forEach(s => s.classList.remove('active'));
        progressSteps.forEach(s => {
            s.classList.remove('active');
            if (s.getAttribute('data-step') < stepNum) {
                s.classList.add('completed');
            } else {
                s.classList.remove('completed');
            }
        });

        id(`step-${stepNum}`).classList.add('active');
        document.querySelector(`.progress-step[data-step="${stepNum}"]`).classList.add('active');
    }

    // Form Submission
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Final Step Validation
            if (!id('contact-name').value || !id('contact-email').value || !id('contact-phone').value) {
                alert('Please fill in all contact details');
                return;
            }

            // Gather Data
            const formData = {
                businessName: id('business-name').value,
                industry: id('business-industry').value,
                website: id('business-website').value || 'Not provided',
                services: Array.from(document.querySelectorAll('.service-check:checked')).map(c => c.value),
                budget: id('project-budget').value,
                timeline: id('project-timeline').value,
                contactName: id('contact-name').value,
                contactEmail: id('contact-email').value,
                contactPhone: id('contact-phone').value
            };

            // 1. Generate Proposal UI
            id('prop-business-name').innerText = formData.businessName;
            id('prop-industry').innerText = formData.industry;
            id('prop-budget').innerText = formData.budget;
            id('prop-timeline').innerText = formData.timeline;
            id('prop-date').innerText = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

            const servicesList = id('prop-services');
            servicesList.innerHTML = '';
            formData.services.forEach(s => {
                const span = document.createElement('span');
                span.className = 'feature-tag';
                span.innerText = s;
                servicesList.appendChild(span);
            });

            // 2. Format WhatsApp Message
            const whatsappNumber = "916356647453";
            const message = `*🚀 New Business Proposal Request*%0A%0A` +
                            `*Business:* ${formData.businessName}%0A` +
                            `*Industry:* ${formData.industry}%0A` +
                            `*Website:* ${formData.website}%0A%0A` +
                            `*Services Needed:* ${formData.services.join(', ')}%0A` +
                            `*Budget Range:* ${formData.budget}%0A` +
                            `*Timeline:* ${formData.timeline}%0A%0A` +
                            `*Contact Person:* ${formData.contactName}%0A` +
                            `*Phone:* ${formData.contactPhone}%0A` +
                            `*Email:* ${formData.contactEmail}`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

            // 3. UI Transition
            id('demo-form-container').style.display = 'none';
            proposalContainer.style.display = 'block';
            
            // Scroll to top of proposal
            window.scrollTo({ top: proposalContainer.offsetTop - 50, behavior: 'smooth' });

            // 4. Set up Final WhatsApp Button
            id('final-whatsapp').onclick = () => {
                window.open(whatsappUrl, '_blank');
            };
        });
    }

    // Sticky Header logic
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
});
