// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
}

// Purchase Form Validation
const purchaseForm = document.getElementById('purchase-form');

if (purchaseForm) {
    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiry = document.getElementById('expiry').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
        
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate name
        if (name === '') {
            showError('name', 'Please enter your full name');
            isValid = false;
        }
        
        // Validate email
        if (email === '' || !isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate card number
        if (cardNumber === '' || !isValidCardNumber(cardNumber)) {
            showError('card-number', 'Please enter a valid card number');
            isValid = false;
        }
        
        // Validate expiry
        if (expiry === '' || !isValidExpiry(expiry)) {
            showError('expiry', 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
        }
        
        // Validate CVV
        if (cvv === '' || !isValidCVV(cvv)) {
            showError('cvv', 'Please enter a valid CVV');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message (in a real app, this would submit to a payment processor)
            showSuccessMessage();
        }
    });
}

// Helper functions
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '0.8rem';
    errorMessage.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorMessage);
    input.style.borderColor = 'red';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidCardNumber(cardNumber) {
    // Simple validation for demo purposes
    const cardNumberRegex = /^[0-9]{13,19}$/;
    return cardNumberRegex.test(cardNumber.replace(/\s/g, ''));
}

function isValidExpiry(expiry) {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    
    if (!expiryRegex.test(expiry)) {
        return false;
    }
    
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expiryYear = parseInt(year, 10);
    const expiryMonth = parseInt(month, 10);
    
    if (expiryYear < currentYear) {
        return false;
    }
    
    if (expiryYear === currentYear && expiryMonth < currentMonth) {
        return false;
    }
    
    return true;
}

function isValidCVV(cvv) {
    const cvvRegex = /^[0-9]{3,4}$/;
    return cvvRegex.test(cvv);
}

function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = `
        <div class="success-message" style="text-align: center; padding: 40px 20px;">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--success-color); margin-bottom: 20px;"></i>
            <h2>Payment Successful!</h2>
            <p style="margin-bottom: 20px;">Thank you for purchasing Simple Downloader. We've sent you an email with download instructions.</p>
            <a href="index.html" class="btn btn-primary">Return to Home</a>
        </div>
    `;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .benefit-card, .section-header, .content-wrapper, .hero-image');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animations
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .benefit-card, .section-header, .content-wrapper, .hero-image');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Trigger animation for elements in view on page load
    setTimeout(animateOnScroll, 300);
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});
