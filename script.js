// =============================
// Mobile Menu Toggle
// =============================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
});

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
});

mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// Close menu when link is clicked
document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    });
});


// =============================
// Active Link Highlight
// =============================
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active-link");
        }
    });
});


// =============================
// Smooth Scroll
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// =============================
// Lazy Loading Images
// =============================
const lazyImages = document.querySelectorAll("img[data-src]");

const loadImage = (img) => {
    img.src = img.dataset.src;
    img.onload = () => img.classList.add("loaded");
};

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadImage(entry.target);
            obs.unobserve(entry.target);
        }
    });
});

lazyImages.forEach(img => observer.observe(img));
