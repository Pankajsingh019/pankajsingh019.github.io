AOS.init({duration:700, once:true});

// Typing effect  
const words = ["an Aspirant", "a Problem Solver", "a Designer"];
let wi = 0, wj = 0, wdel = false;

function typeAnim() {
    const el = document.getElementById("typing-text");
    if (!el) return;

    const word = words[wi];

    if (!wdel) {
        el.textContent = `I'm ${word.substring(0, wj + 1)}`;
        wj++;
        if (wj === word.length) {
            wdel = true;
            setTimeout(typeAnim, 580);
            return;
        }
    } else {
        el.textContent = `I'm ${word.substring(0, wj - 1)}`;
        wj--;
        if (wj === 0) {
            wdel = false;
            wi = (wi + 1) % words.length;
        }
    }

    setTimeout(typeAnim, wdel ? 60 : 60);
}

typeAnim();

// Dark mode toggle  
function toggleDarkMode(){  
  document.body.classList.toggle('dark');  
  const btn=document.querySelector('.toggle-btn');  
  btn.textContent=document.body.classList.contains('dark')?"☀️":"🌙";  
}  

// Navbar show/hide on scroll  
let lastScroll = 0;  
window.addEventListener('scroll', ()=> {  
  const current = window.pageYOffset;  
  const nav = document.getElementById('navbar');  
  if (current > lastScroll && current > 80) nav.classList.add('hide'); else nav.classList.remove('hide');  
  lastScroll = current <= 0 ? 0 : current;  
});  

// Progress bar + top button logic  
const topBtn=document.getElementById('topBtn');  
window.onscroll = function(){  
  const st = document.documentElement.scrollTop || document.body.scrollTop;  
  const sh = document.documentElement.scrollHeight - document.documentElement.clientHeight;  
  document.getElementById('progress-bar').style.width = (sh ? (st/sh*100) : 0) + '%';  
  if(st > 200){ topBtn.style.display = 'flex'; } else { topBtn.style.display = 'none'; }  
};  
function scrollToTop(){window.scrollTo({top:0,behavior:'smooth'})}  
topBtn.addEventListener('click', scrollToTop);  

// Loading screen hide  
window.addEventListener('load', ()=>{  
  const L=document.getElementById('loading-screen');  
  if(L){ L.style.opacity = '0'; setTimeout(()=> { L.style.display='none' }, 600); }  
});  

// Skills animation when visible  
const skillObserver = new IntersectionObserver((entries, obs) => {  
  entries.forEach(entry=>{  
    if(entry.isIntersecting){  
      const el = entry.target.querySelector('.skill-fill');  
      if(el){  
        const pct = el.getAttribute('data-percent') || '0';  
        el.style.width = pct + '%';  
        el.parentElement.setAttribute('aria-valuenow', pct);  
      }  
      obs.unobserve(entry.target);  
    }  
  });  
},{threshold:0.35});  
document.querySelectorAll('.skill').forEach(s => skillObserver.observe(s));  

// Testimonials slider  
const track = document.getElementById('testimonialTrack');  
const dots = document.querySelectorAll('.ctrl-dot');  
let tIndex = 0;  
function showTestimonial(idx){  
  if(!track) return;  
  tIndex = idx % track.children.length;  
  if(tIndex < 0) tIndex = track.children.length - 1;  
  track.style.transform = `translateX(-${tIndex*100}%)`;  
  dots.forEach(d=>d.classList.remove('active'));  
  if(dots[tIndex]) dots[tIndex].classList.add('active');  
}  
dots.forEach(d=>{  
  d.addEventListener('click', ()=> showTestimonial(parseInt(d.dataset.index)));  
});  
showTestimonial(0);  
let tAuto = setInterval(()=> showTestimonial((tIndex+1)% (track?track.children.length:1) ), 4000);  
if(track){  
  track.addEventListener('mouseenter', ()=> clearInterval(tAuto));  
  track.addEventListener('mouseleave', ()=> tAuto = setInterval(()=> showTestimonial((tIndex+1)%track.children.length), 4000));  
}  

// ================== CONTACT FORM ==================
const form = document.getElementById('contactForm');
const alertBox = document.getElementById('successAlert');
if (form && alertBox) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
      .then(response => {
        if (response.ok) {
          alertBox.textContent = '✅ Message sent successfully!';
          alertBox.style.display = 'block';
          setTimeout(() => alertBox.style.display = 'none', 4000);
          form.reset();
        } else {
          alertBox.textContent = '❌ Could not send message. Try again later.';
          alertBox.style.background = '#e74c3c';
          alertBox.style.display = 'block';
          setTimeout(() => { alertBox.style.display = 'none'; alertBox.style.background = ''; }, 4500);
        }
      })
      .catch(() => {
        alertBox.textContent = '❌ Network error. Try again later.';
        alertBox.style.background = '#e74c3c';
        alertBox.style.display = 'block';
        setTimeout(() => { alertBox.style.display = 'none'; alertBox.style.background = ''; }, 4500);
      });
  });
}

// Dynamic year  
document.getElementById('year').textContent = new Date().getFullYear();
