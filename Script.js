// POPUP MENU
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const popup = document.getElementById("popupMenu");
const menuItems = document.querySelectorAll(".pop-item");

openBtn.onclick = () => popup.style.display = "block";
closeBtn.onclick = () => popup.style.display = "none";
menuItems.forEach(item => item.onclick = () => popup.style.display = "none");


// THEME (Dark / Light Mode)
const btn = document.getElementById("themeBtn");

btn.onclick = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        btn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        btn.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
};

// Load theme on refresh
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    btn.textContent = "☀️";
}
