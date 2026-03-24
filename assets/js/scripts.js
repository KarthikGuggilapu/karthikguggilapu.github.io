document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const themeButtons = document.querySelectorAll('[data-theme-toggle]');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuContent = document.getElementById('mobile-menu-content');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('nav a') : [];
    const header = document.getElementById('main-header');
    const scrollTopButton = document.getElementById('scroll-top');
    const viewProjectsButton = document.getElementById('view-projects-btn');
    const projectsSection = document.getElementById('projects');
    const scrollElements = document.querySelectorAll('[data-scroll]');
    const sectionLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const setTheme = (theme) => {
        htmlElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(savedTheme || preferredTheme);

    themeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const nextTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
            setTheme(nextTheme);
        });
    });

    const openMenu = () => {
        if (!mobileMenu || !mobileMenuContent || !mobileMenuBackdrop) {
            return;
        }
        mobileMenu.classList.remove('hidden');
        requestAnimationFrame(() => {
            mobileMenuBackdrop.classList.add('opacity-100');
            mobileMenuContent.classList.remove('translate-x-full');
        });
    };

    const closeMenu = () => {
        if (!mobileMenu || !mobileMenuContent || !mobileMenuBackdrop) {
            return;
        }
        mobileMenuBackdrop.classList.remove('opacity-100');
        mobileMenuContent.classList.add('translate-x-full');
        window.setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    };

    mobileMenuButton?.addEventListener('click', openMenu);
    closeMobileMenu?.addEventListener('click', closeMenu);
    mobileMenuBackdrop?.addEventListener('click', closeMenu);
    mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

    viewProjectsButton?.addEventListener('click', (event) => {
        event.preventDefault();
        projectsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    const updateHeaderState = () => {
        header?.classList.toggle('is-scrolled', window.scrollY > 40);
        if (scrollTopButton) {
            scrollTopButton.classList.toggle('opacity-0', window.scrollY <= 500);
        }
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    scrollTopButton?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.18 });

    scrollElements.forEach((element) => sectionObserver.observe(element));

    const setActiveNav = () => {
        let activeId = '';
        sections.forEach((section) => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;
            if (window.scrollY >= top && window.scrollY < bottom) {
                activeId = section.id;
            }
        });

        sectionLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${activeId}`;
            link.classList.toggle('is-active', isActive);
        });
    };

    setActiveNav();
    window.addEventListener('scroll', setActiveNav, { passive: true });

    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 36,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                color: {
                    value: ['#FF5722', '#0BA5EC']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.22,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.08,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#FF5722',
                    opacity: 0.14,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 160,
                        line_linked: {
                            opacity: 0.35
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }

    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        const emailScript = document.createElement('script');
        emailScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        emailScript.async = true;
        document.body.appendChild(emailScript);

        emailScript.onload = () => {
            emailjs.init('OEND2agfpKED26IbM');
        };

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (!submitButton) {
                return;
            }

            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            const name = contactForm.querySelector('#name')?.value || '';
            const email = contactForm.querySelector('#email')?.value || '';
            const subject = contactForm.querySelector('#subject')?.value || '';
            const message = contactForm.querySelector('#message')?.value || '';

            try {
                await emailjs.send('service_d74trqa', 'template_admin_message', {
                    from_name: name,
                    from_email: email,
                    subject,
                    message,
                    to_email: 'karthikguggillapu@gmail.com'
                });

                await emailjs.send('service_d74trqa', 'template_thankyou_user', {
                    to_name: name,
                    to_email: email
                });

                submitButton.textContent = 'Message Sent!';
                submitButton.classList.add('bg-green-500');
                contactForm.reset();
            } catch (error) {
                console.error('Email sending failed:', error);
                submitButton.textContent = 'Failed to Send';
                submitButton.classList.add('bg-red-500');
            }

            window.setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.classList.remove('bg-green-500', 'bg-red-500');
                submitButton.disabled = false;
            }, 3000);
        });
    }
});
