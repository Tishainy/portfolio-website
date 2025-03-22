document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0); // Ensure the page starts at the top on reload

    const lampContainer = document.getElementById('lamp-container');
    const lamp = document.createElement('div');
    lamp.id = 'lamp';
    document.body.appendChild(lamp); // Append lamp to body

    document.addEventListener('mousemove', (e) => {
        const lampSize = 900; // Diameter of the lamp effect
        const x = e.clientX - lampSize / 2;
        const y = e.clientY - lampSize / 2;
        lamp.style.left = `${x}px`;
        lamp.style.top = `${y}px`;
    });

    const iconLinks = document.querySelectorAll('.icon-link');

    iconLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const text = document.createElement('span');
            text.className = 'icon-text';
            text.innerText = link.getAttribute('data-text');
            document.body.appendChild(text);

            const rect = link.getBoundingClientRect();
            text.style.position = 'absolute';
            text.style.top = `${rect.bottom + window.scrollY + 10}px`; // Adjusted to add some space
            text.style.left = `${rect.left + rect.width / 2 - text.offsetWidth / 2 + window.scrollX}px`;
            text.style.display = 'block';

            link.addEventListener('mouseleave', function() {
                text.remove();
            }, { once: true });
        });
    });

    // Section Scroll Effect
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.3 // Adjust threshold for smoother transitions
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Highlight text in the about me section as it comes into view
    window.addEventListener('scroll', function() {
        const aboutMeLines = document.querySelectorAll('#aboutme h1 span');
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        aboutMeLines.forEach((line, index) => {
            const linePosition = line.getBoundingClientRect().top + scrollPosition;
            if (scrollPosition > linePosition - windowHeight / 2) {
                if (line.classList.contains('gray')) {
                    line.style.color = '#00BFAE'; // Change to blue
                } else {
                    line.style.color = 'white';
                }
                line.style.opacity = '1';
            } else {
                line.style.color = 'gray';
                line.style.opacity = '0.5';
            }
        });
    });

    // Observe sections only after the loading screen starts fading out
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.addEventListener('transitionend', () => {
        sections.forEach(section => {
            observer.observe(section);
        });
        document.getElementById('icon-container').style.opacity = '1';
    });

    // Ensure sections are observed if the loading screen is already hidden
    if (loadingScreen.style.display === 'none') {
        sections.forEach(section => {
            observer.observe(section);
        });
        document.getElementById('icon-container').style.opacity = '1';
    }

    // Typing effect
    const typingElement = document.getElementById('typing-effect');
    const texts = ["Software Developer", "Web Designer", "Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 2000; // Initial delay before starting the typing effect

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                delay = 500; // Delay before starting to type the next text
            }
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                delay = 2000; // Delay before starting to delete the text
            }
        }
        setTimeout(type, isDeleting ? 100 : 200);
    }

    setTimeout(type, delay);

    // Handle icon click events
    iconLinks.forEach(link => {
        link.addEventListener('click', function() {
            iconLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Create particles
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 100; i++) { // number of particles
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.width = `${Math.random() * 2 + 2}px`; // Vary width between 2px and 4px
        particle.style.height = `${Math.random() * 2 + 2}px`; // Vary height between 2px and 4px
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`; // Slower fall
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.top = `${Math.random() * 100}vh`; // Start at random vertical position
        particlesContainer.appendChild(particle);
    }
});

// Loading screen animation
document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loading-screen');
    const typingEffect = document.querySelector('.typing-effect');
    document.body.classList.add('loading'); // Prevent scrolling
    setTimeout(() => {
        typingEffect.classList.add('finished'); // Remove the blinking cursor
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            document.body.classList.remove('loading'); // Allow scrolling
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Ensure sections are observed after the loading screen is hidden
                const sections = document.querySelectorAll('section');
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.3 });
                sections.forEach(section => {
                    observer.observe(section);
                });
                document.getElementById('icon-container').style.opacity = '1';
            }, 1000); // Adjust to match the fade-out transition duration
        }, 500); // 0.5-second pause before fade-out
    }, 2000); // Adjust the timeout to match the typing animation duration
});

// About me section scroll effect
document.addEventListener('scroll', () => {
    const aboutMeSection = document.getElementById('aboutme');
    const scrollPosition = window.scrollY;
    const scrollThreshold = 5 * window.innerHeight; // Adjusted to start effect later

    if (scrollPosition > scrollThreshold) {
        aboutMeSection.classList.add('scrolled');
    } else {
        aboutMeSection.classList.remove('scrolled');
    }
});

// image scroll effect projects
const projectSections = document.querySelectorAll('.project-section');

document.addEventListener('mousemove', (e) => {
    const hoverImage = document.querySelector('.hover-image.active');
    if (hoverImage) {
        let mouseY = e.clientY;

        // Adjust offset for sections 2, 3, and 4
        const sectionIndex = [...projectSections].findIndex(section => section.querySelector('.hover-image.active'));
        if (sectionIndex > 0) { // If it's NOT the first section
            mouseY -= 300; // Adjust this value as needed to move the image up
        }

        hoverImage.style.top = `${mouseY - hoverImage.clientHeight / 2}px`; // Center image on the cursor
    }
});

projectSections.forEach((section) => {
    const hoverImage = section.querySelector('.hover-image');

    section.addEventListener('mouseenter', () => {
        document.querySelectorAll('.hover-image').forEach(img => img.classList.remove('active'));
        hoverImage.classList.add('active');

        hoverImage.style.opacity = 1;
        projectSections.forEach(otherSection => {
            if (otherSection !== section) {
                otherSection.style.opacity = 0.2;
            }
        });
    });

    section.addEventListener('mouseleave', () => {
        hoverImage.classList.remove('active');
        hoverImage.style.opacity = 0;
        projectSections.forEach(otherSection => {
            otherSection.style.opacity = 1;
        });
    });
});
