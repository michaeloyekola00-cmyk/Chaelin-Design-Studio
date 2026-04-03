class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="site-header">
                <div class="container">
                    <a href="index.html" class="logo">Chaelin Design Studio</a>
                    <nav class="nav-links">
                        <a href="index.html">Home</a>
                        <a href="about.html">About</a>
                        <a href="services.html">Services</a>
                        <a href="pricing.html">Pricing</a>
                        <a href="contact.html">Contact</a>
                        <a href="contact.html" class="btn btn-primary">Start a Project</a>
                    </nav>
                    <button class="menu-toggle">☰</button>
                </div>
            </header>
        `;

        // Mobile menu toggle logic
        const toggle = this.querySelector('.menu-toggle');
        const nav = this.querySelector('.nav-links');

        toggle.addEventListener('click', () => {
            if (nav.style.display === 'flex') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'var(--surface-color)';
                nav.style.padding = 'var(--spacing-md)';
                nav.style.borderBottom = '1px solid var(--border-color)';
            }
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
                            <p style="margin-top: 1rem; color: var(--text-tertiary); font-size: 0.875rem;">A Chaelin Studios company</p>
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
                                <li style="margin-top: 0.5rem;"><a href="contact.html" class="link-arrow">Start a Project →</a></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Contact</h4>
                            <ul>
                                <li><a href="mailto:design@chaelinstudios.com">design@chaelinstudios.com</a></li>
                                <li><a href="https://design.chaelinstudios.com">design.chaelinstudios.com</a></li>
                                <li><span style="color: var(--text-secondary)">London, United Kingdom</span></li>
                                <li>
                                    <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                                        <a href="#">Instagram</a>
                                        <span style="color: var(--text-tertiary)">·</span>
                                        <a href="#">LinkedIn</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        © 2026 Chaelin Design Studio. All rights reserved.
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

// Intersection Observer for Scroll Animations
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach((el) => {
        observer.observe(el);
    });
});
