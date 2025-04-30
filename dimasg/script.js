class Particle {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'particle';
        this.reset();
    }

    reset() {
        const size = Math.random() * 15 + 5;
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    move(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * 2;
            this.y -= Math.sin(angle) * 2;
        }
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

// Initialize background
function initBackground() {
    const background = document.createElement('div');
    background.className = 'background';
    document.body.appendChild(background);

    const particles = Array.from({ length: 50 }, () => {
        const particle = new Particle();
        background.appendChild(particle.element);
        return particle;
    });

    document.addEventListener('mousemove', (e) => {
        particles.forEach(particle => particle.move(e.clientX, e.clientY));
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initBackground();

    const enterButton = document.querySelector('.enter-button');
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            const landingPage = document.querySelector('.landing-page');
            landingPage.style.transition = 'opacity 1s, transform 1s';
            landingPage.style.opacity = '0';
            landingPage.style.transform = 'scale(1.5)';
            
            setTimeout(() => {
                const bubblesContainer = document.createElement('div');
                bubblesContainer.className = 'bubbles-container';
                bubblesContainer.style.opacity = '0';
                bubblesContainer.style.transform = 'scale(0.8)';
                bubblesContainer.style.transition = 'opacity 1s, transform 1s';

                const bubbles = [
                    { label: 'Experience', page: 'experience.html' },
                    { label: 'Education', page: 'education.html' },
                    { label: 'Side Projects', page: 'projects.html' },
                    { label: 'Contact', page: 'contact.html' }
                ];

                bubbles.forEach(({ label, page }) => {
                    const bubble = document.createElement('div');
                    bubble.className = 'bubble';
                    bubble.innerText = label;
                    bubble.addEventListener('click', () => {
                        window.location.href = page;
                    });
                    bubblesContainer.appendChild(bubble);
                });

                document.body.innerHTML = '';
                document.body.appendChild(bubblesContainer);
                
                // Re-initialize background after clearing the body
                initBackground();
                
                // Trigger animation after a brief delay
                requestAnimationFrame(() => {
                    bubblesContainer.style.opacity = '1';
                    bubblesContainer.style.transform = 'scale(1)';
                });
            }, 1000);
        });
    }
});