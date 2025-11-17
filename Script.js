const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const popup = document.getElementById("popupMenu");
const menuItems = document.querySelectorAll(".pop-item");

openBtn.onclick = () => popup.style.display = "block";
closeBtn.onclick = () => popup.style.display = "none";

menuItems.forEach(item => {
    item.onclick = () => popup.style.display = "none";
});
