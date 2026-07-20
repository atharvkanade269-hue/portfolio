const typingElement = document.getElementById("typing");

const roles = [
    "AI Developer",
    "Python Engineer",
    "Software Developer",
    "Automation Engineer",
    "AI & Software Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    const speed = deleting ? 45 : 100;

    setTimeout(typeEffect, speed);
}

typeEffect();

// ===========================
// PARTICLE BACKGROUND
// ===========================

const particleContainer = document.getElementById("particles");

for (let i = 0; i < 80; i++) {

    const particle = document.createElement("div");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "vw";

    particle.style.animationDuration = (6 + Math.random() * 10) + "s";

    particle.style.animationDelay = Math.random() * 5 + "s";

    particle.style.opacity = Math.random();

    particleContainer.appendChild(particle);

}

// ==========================================
// CURSOR GLOW
// ==========================================

const glow = document.getElementById("cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});
// Navbar Scroll Effect

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});

particlesJS("particles", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },

        color: {
            value: "#00d9ff"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.5
        },

        size: {
            value: 3,
            random: true
        },

        line_linked: {
            enable: true,
            distance: 150,
            color: "#00d9ff",
            opacity: 0.3,
            width: 1
        },

        move: {
            enable: true,
            speed: 2
        }
    },

    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            }
        },

        modes: {
            grab: {
                distance: 180,
                line_linked: {
                    opacity: 1
                }
            }
        }
    },

    retina_detect: true
});

// =========================================
// PARTICLES BACKGROUND
// =========================================

particlesJS("particles", {
    particles: {
        number: {
            value: 90,
            density: {
                enable: true,
                value_area: 900
            }
        },

        color: {
            value: "#00D9FF"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.6
        },

        size: {
            value: 3,
            random: true
        },

        line_linked: {
            enable: true,
            distance: 150,
            color: "#00D9FF",
            opacity: 0.25,
            width: 1
        },

        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },

    interactivity: {
        detect_on: "canvas",

        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },

            onclick: {
                enable: true,
                mode: "push"
            },

            resize: true
        },

        modes: {
            grab: {
                distance: 180,
                line_linked: {
                    opacity: 1
                }
            },

            push: {
                particles_nb: 4
            }
        }
    },

    retina_detect: true
});

// ===============================
// AI CORE PARALLAX EFFECT
// ===============================

const aiCore = document.getElementById("ai-core");

document.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 35;
    const y = (window.innerHeight / 2 - e.clientY) / 35;

    aiCore.style.transform =
        `translate(${x}px, ${y}px)`;
});