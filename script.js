// ── Photo Upload ──
const photoInput   = document.getElementById('photoInput');
const profileImg   = document.getElementById('profileImg');
const placeholder  = document.getElementById('pp');
const overlay      = document.getElementById('photoOverlay');
const uploadHint   = document.getElementById('uploadHint');
const photoCircle  = document.getElementById('photoCircle');

// Show/hide hover overlay
photoCircle.addEventListener('mouseenter', () => overlay.style.opacity = 1);
photoCircle.addEventListener('mouseleave', () => overlay.style.opacity = 0);

// Load saved photo from localStorage on page load
const savedPhoto = localStorage.getItem('portfolioPhoto');
if (savedPhoto) {
  profileImg.src = savedPhoto;
  profileImg.style.display = 'block';
  placeholder.style.display = 'none';
  uploadHint.textContent = '📷 Click to change photo';
}

// Handle file selection
photoInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  // Validate: image only, max 5MB
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file (JPG, PNG, etc.)');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert('Photo is too large. Please use an image under 5MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64 = e.target.result;

    // Show the photo
    profileImg.src = base64;
    profileImg.style.display = 'block';
    placeholder.style.display = 'none';
    uploadHint.textContent = '📷 Click to change photo';

    // Save to localStorage so it persists on refresh
    try {
      localStorage.setItem('portfolioPhoto', base64);
    } catch (err) {
      // Storage full — still show but won't persist
      console.warn('Could not save photo to localStorage:', err);
    }
  };
  reader.readAsDataURL(file);
});

// ── Typewriter Effect ──
const roles = [
  "SIA Licensed Door Supervisor",
  "Data Analyst (Excel · Power BI · SQL)",
  "Customer Service Professional"
];
const el = document.getElementById('typewriter');
let ri = 0, ci = 0, deleting = false;

function type() {
  const word = roles[ri];
  if (!deleting) {
    el.innerHTML = word.slice(0, ci + 1) + '<span class="cursor"></span>';
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.innerHTML = word.slice(0, ci - 1) + '<span class="cursor"></span>';
    ci--;
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 45 : 70);
}
type();

// ── Scroll Reveal Animation ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-group, .timeline-item, .edu-card, .contact-item, .sia-card')
  .forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
