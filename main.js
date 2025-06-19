// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mobileMenu.classList.contains('flex')) {
            mobileMenu.classList.remove('flex');
            mobileMenu.classList.add('hidden');
        }
    });
});

// Set current year in footer
document.getElementById('current-year-footer').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
});

// Handle contact form submission
const contactForm = document.getElementById('contactForm');
const formMessages = document.getElementById('form-messages');

contactForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const data = new FormData(form);
    const action = form.action; // Get the action URL (Formspree endpoint)

    try {
        const response = await fetch(action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formMessages.classList.remove('error');
            formMessages.classList.add('success');
            formMessages.textContent = 'Thank you for your message! I will get back to you shortly.';
            form.reset(); // Clear the form
        } else {
            const errorData = await response.json();
            formMessages.classList.remove('success');
            formMessages.classList.add('error');
            if (errorData.errors) {
                formMessages.textContent = errorData.errors.map(err => err.message).join(', ');
            } else {
                formMessages.textContent = 'Oops! There was a problem sending your message.';
            }
        }
    } catch (error) {
        formMessages.classList.remove('success');
        formMessages.classList.add('error');
        formMessages.textContent = 'An unexpected error occurred. Please try again later.';
        console.error('Form submission error:', error);
    } finally {
        formMessages.style.display = 'block'; // Show the message box
    }
});