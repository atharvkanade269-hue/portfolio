const API_BASE = "http://127.0.0.1:5000/api";

const token = localStorage.getItem("admin_token");

if (!token) {
    window.location.href = "login.html";
}


// =========================
// API HELPER
// =========================

async function apiRequest(url, options = {}) {

    const response = await fetch(`${API_BASE}${url}`, {
        ...options,

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...(options.headers || {})
        }
    });

    if (response.status === 401) {
        localStorage.removeItem("admin_token");
        window.location.href = "login.html";
        return;
    }

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}


// =========================
// LOAD DASHBOARD
// =========================

async function loadDashboard() {

    try {

        const data = await apiRequest("/admin/dashboard");

        const stats = data.stats;
        const visitors = data.visitors;

        document.getElementById("visitorsToday").textContent =
            visitors.today;

        document.getElementById("visitorsMonth").textContent =
            visitors.this_month;

        document.getElementById("visitorsYear").textContent =
            visitors.this_year;

        document.getElementById("visitorsTotal").textContent =
            visitors.total;

        document.getElementById("totalContacts").textContent =
            stats.contacts;

        document.getElementById("totalProjects").textContent =
            stats.projects;

        document.getElementById("totalSkills").textContent =
            stats.skills;

        document.getElementById("totalExperience").textContent =
            stats.experiences;

        document.getElementById("totalEducation").textContent =
            stats.education;

        document.getElementById("quickMessages").textContent =
            stats.contacts;

        document.getElementById("quickProjects").textContent =
            stats.projects;

        document.getElementById("quickVisitors").textContent =
            visitors.total;

        document.getElementById("visitorPageToday").textContent =
            visitors.today;

        document.getElementById("visitorPageMonth").textContent =
            visitors.this_month;

        document.getElementById("visitorPageYear").textContent =
            visitors.this_year;

        document.getElementById("visitorPageTotal").textContent =
            visitors.total;

    } catch (error) {

        console.error(
            "Dashboard loading failed:",
            error
        );

    }
}


// =========================
// NAVIGATION
// =========================

const navItems = document.querySelectorAll(".nav-item");

const sections = document.querySelectorAll(".section");

const pageTitle = document.getElementById("pageTitle");


navItems.forEach(item => {

    item.addEventListener("click", () => {

        const target = item.dataset.section;

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        sections.forEach(section => {
            section.classList.remove("active");
        });

        const targetSection =
            document.getElementById(target);

        if (targetSection) {
            targetSection.classList.add("active");
        }

        const title =
            target.charAt(0).toUpperCase() +
            target.slice(1);

        pageTitle.textContent =
            title;
    });

});


// =========================
// LOGOUT
// =========================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("admin_token");
        window.location.href = "login.html";
    });
}

// =========================
// START
// =========================

loadDashboard();