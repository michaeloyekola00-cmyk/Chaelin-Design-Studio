// Custom Elements for Chaelin Design Studio

class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="site-header">
                <div class="container">
                    <a href="index.html" class="logo">Chaelin Design Studio</a>
                    <nav class="nav-links">
                        <a href="index.html" id="nav-home">Home</a>
                        <a href="about.html" id="nav-about">About</a>
                        <a href="services.html" id="nav-services">Services</a>
                        <a href="pricing.html" id="nav-pricing">Pricing</a>
                        <a href="contact.html" id="nav-contact">Contact</a>
                        <a href="contact.html" class="btn btn-primary" style="padding: 0.6rem 1.25rem;">Start a Project</a>
                    </nav>
                    <button class="menu-toggle" aria-label="Toggle Navigation">☰</button>
                </div>
            </header>
            
            <div class="mobile-nav-panel">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="services.html">Services</a>
                <a href="pricing.html">Pricing</a>
                <a href="contact.html">Contact</a>
                <a href="contact.html" class="btn btn-primary">Start a Project</a>
            </div>
        `;

        // Highlight active page
        const path = window.location.pathname;
        const page = path.split("/").pop();
        if (page === "index.html" || page === "") {
            this.querySelector('#nav-home')?.classList.add('active');
        } else if (page === "about.html") {
            this.querySelector('#nav-about')?.classList.add('active');
        } else if (page === "services.html") {
            this.querySelector('#nav-services')?.classList.add('active');
        } else if (page === "pricing.html") {
            this.querySelector('#nav-pricing')?.classList.add('active');
        } else if (page === "contact.html") {
            this.querySelector('#nav-contact')?.classList.add('active');
        }

        // Mobile menu toggle logic
        const toggle = this.querySelector('.menu-toggle');
        const panel = this.querySelector('.mobile-nav-panel');

        toggle.addEventListener('click', () => {
            panel.classList.toggle('open');
            if (panel.classList.contains('open')) {
                toggle.textContent = '✕';
                toggle.style.position = 'fixed';
                toggle.style.right = '2rem';
            } else {
                toggle.textContent = '☰';
                toggle.style.position = 'static';
            }
        });
        
        // Close menu panel when clicking any link
        panel.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                panel.classList.remove('open');
                toggle.textContent = '☰';
                toggle.style.position = 'static';
            });
        });
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer">
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-col">
                            <h4>Chaelin Design Studio</h4>
                            <p>A creative studio building brand identities, graphic design systems, and websites for businesses that mean it.</p>
                            <p style="margin-top: 1.5rem; color: var(--text-tertiary); font-size: 0.8125rem;">A Chaelin Studios company</p>
                        </div>
                        <div class="footer-col">
                            <h4>Navigation</h4>
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="services.html">Services</a></li>
                                <li><a href="pricing.html">Pricing</a></li>
                                <li><a href="contact.html">Contact</a></li>
                                <li><a href="terms.html">Terms & Conditions</a></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Contact & Social</h4>
                            <ul>
                                <li><a href="mailto:hello@design.chaelinstudios.com">hello@design.chaelinstudios.com</a></li>
                                <li><span style="color: var(--text-secondary)">London, United Kingdom</span></li>
                                <li>
                                    <div style="display: flex; gap: 1rem; margin-top: 0.75rem;">
                                        <a href="#" style="color: var(--text-secondary)">Instagram</a>
                                        <span style="color: var(--text-tertiary)">·</span>
                                        <a href="#" style="color: var(--text-secondary)">LinkedIn</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        &copy; 2026 Chaelin Design Studio. All rights reserved.
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

// Sticky Header behavior
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

/* Lightbox Modal & Carousel Logic */
const projectImages = {
    flaren: [
        'Images/Flaren Brand Identity/FLAREN.png',
        'Images/Flaren Brand Identity/FLAREN (1).png',
        'Images/Flaren Brand Identity/FLAREN (2).png',
        'Images/Flaren Brand Identity/FLAREN (3).png',
        'Images/Flaren Brand Identity/FLAREN (4).png',
        'Images/Flaren Brand Identity/FLAREN (5).png',
        'Images/Flaren Brand Identity/FLAREN (6).png',
        'Images/Flaren Brand Identity/FLAREN (7).png',
        'Images/Flaren Brand Identity/FLAREN (8).png',
        'Images/Flaren Brand Identity/FLAREN (9).png',
        'Images/Flaren Brand Identity/FLAREN (10).png',
        'Images/Flaren Brand Identity/FLAREN (11).png',
        'Images/Flaren Brand Identity/FLAREN (12).png',
        'Images/Flaren Brand Identity/FLAREN (13).png',
        'Images/Flaren Brand Identity/FLAREN (14).png',
        'Images/Flaren Brand Identity/FLAREN (15).png'
    ],
    franky: [
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's.jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (1).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (2).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (3).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (4).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (5).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (6).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (7).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (8).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (9).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (10).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (11).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (12).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (13).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (14).jpg",
        "Images/MR.FRANKY'S Logo Design & Brand Identity/Mr. Franky's (15).jpg"
    ],
    reccom: [
        'Images/RECCOM BRAND IDENTIY/RECCOM.jpg',
        'Images/RECCOM BRAND IDENTIY/RECCOM (1).jpg',
        'Images/RECCOM BRAND IDENTIY/RECCOM (2).jpg',
        'Images/RECCOM BRAND IDENTIY/RECCOM (3).jpg',
        'Images/RECCOM BRAND IDENTIY/RECCOM (4).jpg',
        'Images/RECCOM BRAND IDENTIY/RECCOM (5).jpg',
        'Images/RECCOM BRAND IDENTIY/RECCOM (6).jpg',
        'Images/RECCOM BRAND IDENTIY/RECCOM (7).jpg',
        'Images/RECCOM BRAND IDENTIY/RECCOM (8).jpg',
        'Images/RECCOM BRAND IDENTIY/RECCOM (9).jpg'
    ],
    rost: [
        'Images/ROST UXUI design/ROST.png',
        'Images/ROST UXUI design/ROST (1).png',
        'Images/ROST UXUI design/ROST (2).png',
        'Images/ROST UXUI design/ROST (3).png',
        'Images/ROST UXUI design/ROST (4).png',
        'Images/ROST UXUI design/ROST (5).png',
        'Images/ROST UXUI design/ROST (6).png',
        'Images/ROST UXUI design/ROST (7).png',
        'Images/ROST UXUI design/ROST (8).png'
    ],
    tomo: [
        'Images/TOMO UXUI/TOMO.png',
        'Images/TOMO UXUI/TOMO (1).png',
        'Images/TOMO UXUI/TOMO (2).png',
        'Images/TOMO UXUI/TOMO (3).png',
        'Images/TOMO UXUI/TOMO (4).png',
        'Images/TOMO UXUI/TOMO (5).png',
        'Images/TOMO UXUI/TOMO (6).png',
        'Images/TOMO UXUI/TOMO (7).png',
        'Images/TOMO UXUI/TOMO (8).png',
        'Images/TOMO UXUI/TOMO (9).png',
        'Images/TOMO UXUI/TOMO (10).png'
    ]
};

const projectCaptions = {
    flaren: 'Flaren — Brand Identity System',
    franky: "Mr. Franky's — Logo Design & Visual System",
    reccom: 'Reccom — Brand Identity & Product Presentation',
    rost: 'Rost — UX/UI Design & Product Interface',
    tomo: 'Tomo — UX/UI Design & E-Commerce Flow'
};

let currentProject = '';
let currentImageIndex = 0;

function initLightbox() {
    // Inject Lightbox HTML to body
    const lightboxHTML = `
        <div id="global-lightbox" class="lightbox-modal">
            <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
            <button class="lightbox-arrow lightbox-arrow-left" aria-label="Previous Image">&#10094;</button>
            <button class="lightbox-arrow lightbox-arrow-right" aria-label="Next Image">&#10095;</button>
            <div class="lightbox-container">
                <div class="lightbox-slide-wrapper">
                    <img id="lightbox-image" class="lightbox-image" src="" alt="Portfolio Showcase">
                </div>
                <div class="lightbox-meta">
                    <div id="lightbox-caption" class="lightbox-caption"></div>
                    <div id="lightbox-counter" class="lightbox-counter"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('global-lightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-arrow-left');
    const nextBtn = lightbox.querySelector('.lightbox-arrow-right');

    const updateImage = () => {
        const img = lightbox.querySelector('#lightbox-image');
        const caption = lightbox.querySelector('#lightbox-caption');
        const counter = lightbox.querySelector('#lightbox-counter');
        const list = projectImages[currentProject];

        if (list && list[currentImageIndex]) {
            // Apply a slight fade trigger
            img.style.opacity = '0';
            img.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                img.src = list[currentImageIndex];
                caption.textContent = projectCaptions[currentProject];
                counter.textContent = `${currentImageIndex + 1} of ${list.length}`;
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, 150);
        }
    };

    const showNext = () => {
        const list = projectImages[currentProject];
        if (list) {
            currentImageIndex = (currentImageIndex + 1) % list.length;
            updateImage();
        }
    };

    const showPrev = () => {
        const list = projectImages[currentProject];
        if (list) {
            currentImageIndex = (currentImageIndex - 1 + list.length) % list.length;
            updateImage();
        }
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };

    // Attach click events
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Close when clicking overlay backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // Bind to page portfolio cards
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.portfolio-card');
        if (card) {
            const projectKey = card.getAttribute('data-project');
            if (projectKey && projectImages[projectKey]) {
                currentProject = projectKey;
                currentImageIndex = 0;
                updateImage();
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        }
    });
}

// Portfolio Grid filter action
function initPortfolioFilters() {
    document.addEventListener('click', (e) => {
        const filterBtn = e.target.closest('.portfolio-filter-btn');
        if (!filterBtn) return;

        // Toggle active states
        document.querySelectorAll('.portfolio-filter-btn').forEach(btn => btn.classList.remove('active'));
        filterBtn.classList.add('active');

        const filterVal = filterBtn.getAttribute('data-filter');
        const cards = document.querySelectorAll('.portfolio-card');

        cards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filterVal === 'all' || categories.includes(filterVal)) {
                card.style.display = 'flex';
                card.style.opacity = '0';
                card.style.transform = 'translateY(15px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// FAQ Accordion interaction
function initFaqAccordion() {
    document.addEventListener('click', (e) => {
        const question = e.target.closest('.faq-question');
        if (!question) return;

        const item = question.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Collapse all others
        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('open');
        });

        if (!isOpen) {
            item.classList.add('open');
        }
    });
}

// Scroll Intersection Observer
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.fade-up, .scale-in').forEach((el) => {
        observer.observe(el);
    });
}

// Run initializers on load
document.addEventListener("DOMContentLoaded", () => {
    initLightbox();
    initPortfolioFilters();
    initFaqAccordion();
    initScrollObserver();
});
