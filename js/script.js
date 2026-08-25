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

// ========================================
// LOAD PROJECTS FROM BACKEND API
// ========================================

async function loadProjects() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/projects/");

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const projects = await response.json();

        const projectsGrid = document.querySelector(".projects-grid");

        if (!projectsGrid) {
            console.error("Projects grid not found.");
            return;
        }

        projectsGrid.innerHTML = "";

        projects.forEach((project) => {
            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <div class="project-buttons">
                    ${
                        project.live_url
                            ? `<a href="${project.live_url}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
                            : ""
                    }

                    ${
                        project.github_url
                            ? `<a href="${project.github_url}" target="_blank" rel="noopener noreferrer">GitHub</a>`
                            : ""
                    }
                </div>
            `;

            projectsGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Failed to load projects:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadProjects);

// ========================================
// LOAD SKILLS FROM BACKEND API
// ========================================

async function loadSkills() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/skills/");

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const skills = await response.json();

        const skillsGrid = document.querySelector(".skills-grid");

        if (!skillsGrid) {
            console.error("Skills grid not found.");
            return;
        }

        skillsGrid.innerHTML = "";

        skills.forEach((skill) => {
            const card = document.createElement("div");
            card.className = "skill-card";

            card.innerHTML = `
                <div class="skill-icon">⚡</div>
                <h3>${skill.name}</h3>
                <p>${skill.category} • ${skill.level}</p>
            `;

            skillsGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Failed to load skills:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadSkills);

// ========================================
// CONTACT FORM → BACKEND API
// ========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message")
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/api/contact/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            alert("Message sent successfully! 🚀");

            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);

            alert(
                "Unable to send your message. Please try again."
            );
        }
    });
}

// ========================================
// VISITOR ANALYTICS
// ========================================

async function trackVisitor() {
    try {
        await fetch("http://127.0.0.1:5000/api/visitors/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                page: window.location.pathname
            })
        });

        console.log("Visitor tracked successfully.");
    } catch (error) {
        console.error("Visitor tracking failed:", error);
    }
}

document.addEventListener("DOMContentLoaded", trackVisitor);