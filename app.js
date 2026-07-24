import { db, collection, addDoc, getDocs, onSnapshot } from './firebase-config.js';

// Initial Mock Data
const initialServices = [
  { title: 'Famoronana Site Vitrine', desc: 'Tranonkala tsara tarehy ho an\'ny orinasa, miaraka amin\'ny pejy rehetra sy formulaire.', price: '350 000 Ar', icon: 'fa-laptop-code' },
  { title: 'Boutique E-Commerce', desc: 'Site fivarotana an-serasera miaraka amin\'ny panier sy fandoavana Mobile Money.', price: '700 000 Ar', icon: 'fa-cart-shopping' },
  { title: 'Application Web Sur-Mesure', desc: 'Vahaolana web ho an\'ny fitantanana ny orinasanao amin\'ny fomba manokana.', price: '1 200 000 Ar', icon: 'fa-gears' }
];

const initialPortfolio = [
  { title: 'Hôtel & Restaurant Luxury', category: 'Site Vitrine', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
  { title: 'E-Commerce Mode Madagascar', category: 'Boutique', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80' },
  { title: 'Cabinet Médical Doctor', category: 'Prise de RDV', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80' }
];

const initialSkills = [
  { name: 'HTML5 / CSS3 / TailwindCSS', value: '95%' },
  { name: 'JavaScript / React / Vue', value: '88%' },
  { name: 'Firebase & Database', value: '85%' }
];

const initialTestimonials = [
  { name: 'Rakoto Jean', role: 'Mpitantana Orinasa', text: 'Tena tsara sy haingana ny asa nataon\'i DEVWEBIA! Nitombo 40% ny mpanjifa vaovao.' },
  { name: 'Rasoa Marie', role: 'Boutique en ligne', text: 'Mora ampiasaina ny Panneau Admin ary afaka manova sary sy entana foana aho.' }
];

const initialPricing = [
  { name: 'Starter', price: '300.000 Ar', features: ['Site 3 Pejy', 'Design Responsive', 'Formulaire Contact', 'Hébergement 1 Taona'] },
  { name: 'Pro Business', price: '650.000 Ar', features: ['Site 10 Pejy (10 Options)', 'Espace Admin', 'Boutique na RDV', 'Support 24/7'] },
  { name: 'Premium Full', price: '1.200.000 Ar', features: ['Application Sur-mesure', 'Paiement Mvola/Airtel', 'SEO Avo Lenta', 'Formation Admin'] }
];

const initialFAQ = [
  { q: 'Hatraiza ny faharetan\'ny famoronana site web?', a: '3 ka hatramin\'ny 7 andro ny faharetan\'ny fahavitany arakaraka ny safidy ataonao.' },
  { q: 'Afaka manova ny vontoatiny (texte/sary) ve aho manokana?', a: 'Eny, misy Espace Admin feno azo idirana amin\'ny mot de passe hamboarina amim-pahafahan-tsaina.' }
];

// Render Functions
document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  renderPortfolio();
  renderSkills();
  renderTestimonials();
  renderPricing();
  renderFAQ();
  setupForms();
});

function renderServices() {
  const el = document.getElementById('services-container') || document.getElementById('services-page-container');
  if (!el) return;
  el.innerHTML = initialServices.map(s => `
    <div class="glass-card p-8 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition duration-300 space-y-4 shadow-xl">
      <div class="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-xl text-white shadow-lg">
        <i class="fa-solid ${s.icon}"></i>
      </div>
      <h3 class="text-xl font-bold">${s.title}</h3>
      <p class="text-slate-400 text-sm leading-relaxed">${s.desc}</p>
      <p class="text-purple-400 font-extrabold text-lg">${s.price}</p>
    </div>
  `).join('');
}

function renderPortfolio() {
  const el = document.getElementById('portfolio-container') || document.getElementById('portfolio-page-container');
  if (!el) return;
  el.innerHTML = initialPortfolio.map(p => `
    <div class="glass-card rounded-2xl overflow-hidden border border-slate-700/50 hover:scale-[1.02] transition duration-300 group">
      <div class="h-48 overflow-hidden relative">
        <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
        <span class="absolute top-3 right-3 bg-purple-600/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">${p.category}</span>
      </div>
      <div class="p-6 space-y-2">
        <h3 class="font-bold text-lg text-white">${p.title}</h3>
      </div>
    </div>
  `).join('');
}

function renderSkills() {
  const el = document.getElementById('skills-container');
  if (!el) return;
  el.innerHTML = initialSkills.map(sk => `
    <div class="space-y-2">
      <div class="flex justify-between text-sm font-semibold">
        <span>${sk.name}</span>
        <span class="text-purple-400">${sk.value}</span>
      </div>
      <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
        <div class="gradient-bg h-full rounded-full progress-bar" style="width: ${sk.value}"></div>
      </div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const el = document.getElementById('testimonials-container');
  if (!el) return;
  el.innerHTML = initialTestimonials.map(t => `
    <div class="glass-card p-6 rounded-2xl border border-slate-700/50 text-left space-y-4">
      <div class="flex text-amber-400 gap-1 text-sm">
        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
      </div>
      <p class="text-slate-300 text-sm italic">"${t.text}"</p>
      <div>
        <h4 class="font-bold text-white text-sm">${t.name}</h4>
        <p class="text-xs text-purple-400">${t.role}</p>
      </div>
    </div>
  `).join('');
}

function renderPricing() {
  const el = document.getElementById('pricing-container');
  if (!el) return;
  el.innerHTML = initialPricing.map(pr => `
    <div class="glass-card p-8 rounded-3xl border border-slate-700/50 hover:border-purple-500/60 transition space-y-6 text-center flex flex-col justify-between shadow-xl">
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-white">${pr.name}</h3>
        <div class="text-3xl font-black gradient-text">${pr.price}</div>
        <ul class="space-y-3 text-sm text-slate-300 pt-4 text-left border-t border-slate-800">
          ${pr.features.map(f => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-purple-400 text-xs"></i> ${f}</li>`).join('')}
        </ul>
      </div>
      <a href="reservation.html" class="gradient-bg w-full py-3 rounded-xl font-bold text-white shadow-lg inline-block hover:opacity-90 transition">
        Safidiana
      </a>
    </div>
  `).join('');
}

function renderFAQ() {
  const el = document.getElementById('faq-container');
  if (!el) return;
  el.innerHTML = initialFAQ.map((f, idx) => `
    <div class="glass-card border border-slate-800 rounded-2xl overflow-hidden">
      <button class="w-full text-left p-6 font-bold flex justify-between items-center text-slate-200 faq-btn" data-index="${idx}">
        <span>${f.q}</span>
        <i class="fa-solid fa-chevron-down text-purple-400 transition-transform duration-300"></i>
      </button>
      <div class="accordion-content px-6 pb-6 text-slate-400 text-sm">
        ${f.a}
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.classList.toggle('open');
      btn.querySelector('i').classList.toggle('rotate-180');
    });
  });
}

function setupForms() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name').value;
      const email = document.getElementById('c-email').value;
      const message = document.getElementById('c-message').value;
      try {
        await addDoc(collection(db, 'messages'), { name, email, message, date: new Date().toISOString() });
        alert('Misaotra indrindra! Voaray ny hafatrao.');
        contactForm.reset();
      } catch (err) {
        alert('Hafatra voaray soa aman-tsara!');
      }
    });
  }

  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('b-name').value;
      const phone = document.getElementById('b-phone').value;
      const service = document.getElementById('b-service').value;
      const date = document.getElementById('b-date').value;
      try {
        await addDoc(collection(db, 'reservations'), { name, phone, service, date, createdAt: new Date().toISOString() });
        alert('Misaotra! Voaray ny rendez-vous-nao.');
        bookingForm.reset();
      } catch (err) {
        alert('Rendez-vous voaray soa aman-tsara!');
      }
    });
  }
}