/* ================================
   script.js — Portfolio
   ================================ */

//Selectors
const hamburger = document.querySelector(".hamburger");
const menuOverlay = document.querySelector(".menu-overlay");
const closeBtn = document.querySelector(".close-menu");
const menuLinks = document.querySelectorAll(".menu-panel a");

// ---- 1. Open mobile menu ----
hamburger?.addEventListener("click", () => {
    menuOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";     // stop background scroll
});

// ---- 2. Close mobile menu ----
const closeMenu = () => {
    menuOverlay.style.display = "none";
    document.body.style.overflow = "auto";        // restore scroll
};

closeBtn?.addEventListener("click", closeMenu);

// ---- 3. Close menu when clicking any link ----
menuLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// ---- 4. Close menu by clicking outside panel ----
menuOverlay?.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
        closeMenu();
    }
});

// ---- 5. Smooth Scroll for internal links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ---- 6. Active link highlight on scroll (optional) ----
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (scrollY >= top) current = section.getAttribute("id");
    });

    navItems.forEach((a) => {
        a.classList.remove("active-nav");
        if (a.getAttribute("href") === `#${current}`) {
            a.classList.add("active-nav");
        }
    });
});
