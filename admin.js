import { db, collection, addDoc, getDocs } from './firebase-config.js';

let currentPassword = localStorage.getItem('admin_pass') || '1234';

// Login Handling
const loginForm = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const adminDashboard = document.getElementById('admin-dashboard');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('admin-pass').value;
    if (pass === currentPassword) {
      loginScreen.classList.add('hidden');
      adminDashboard.classList.remove('hidden');
      loadMessages();
    } else {
      alert('Mot de passe diso!');
    }
  });
}

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active', 'bg-purple-600/20', 'text-purple-300'));
    btn.classList.add('active', 'bg-purple-600/20', 'text-purple-300');
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById(`tab-${tab}`).classList.remove('hidden');
  });
});

// Canvas Image Compression (<150KB)
const heroFileInput = document.getElementById('hero-file-input');
const heroPreview = document.getElementById('hero-preview');
let compressedBase64 = '';

if (heroFileInput) {
  heroFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 800;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        heroPreview.querySelector('img').src = compressedBase64;
        heroPreview.classList.remove('hidden');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Save Password
const savePassBtn = document.getElementById('save-pass-btn');
if (savePassBtn) {
  savePassBtn.addEventListener('click', () => {
    const newPass = document.getElementById('new-admin-pass').value;
    if (newPass.trim()) {
      currentPassword = newPass;
      localStorage.setItem('admin_pass', newPass);
      alert('Mot de passe voasoratra soa aman-tsara!');
    }
  });
}

// Load Messages
async function loadMessages() {
  const list = document.getElementById('admin-messages-list');
  if (!list) return;
  try {
    const snapshot = await getDocs(collection(db, 'messages'));
    list.innerHTML = snapshot.docs.map(doc => {
      const data = doc.data();
      return `
        <div class="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
          <div class="flex justify-between text-xs text-purple-400 font-bold">
            <span>${data.name || 'Client'} (${data.email || ''})</span>
            <span>${data.date ? new Date(data.date).toLocaleDateString() : ''}</span>
          </div>
          <p class="text-sm text-slate-300">${data.message}</p>
        </div>
      `;
    }).join('');
  } catch (err) {
    list.innerHTML = '<p class="text-xs text-slate-500">Tsy misy hafatra vaovao.</p>';
  }
}