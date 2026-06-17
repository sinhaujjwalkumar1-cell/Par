// ===== DATA =====
const products = [
  { id: 1, name: "Turmeric Powder", emoji: "🟡", desc: "Vibrant golden haldi with rich curcumin content. Earthy aroma, bright color.", prices: { "100g": 18, "200g": 32, "500g": 72, "1kg": 130 } },
  { id: 2, name: "Red Chilli Powder", emoji: "🌶️", desc: "Bold, fiery flavor with deep red color. Adds the perfect heat to every dish.", prices: { "100g": 22, "200g": 40, "500g": 90, "1kg": 165 } },
  { id: 3, name: "Coriander Powder", emoji: "🌿", desc: "Fresh, citrusy and fragrant. Ground from premium dried coriander seeds.", prices: { "100g": 16, "200g": 28, "500g": 62, "1kg": 110 } },
  { id: 4, name: "Garam Masala", emoji: "🫙", desc: "Aromatic whole spice blend. Warm, complex and perfectly balanced.", prices: { "100g": 30, "200g": 55, "500g": 120, "1kg": 220 } },
  { id: 5, name: "Kitchen King Masala", emoji: "👑", desc: "The all-rounder masala for everyday cooking. Rich aroma, authentic taste.", prices: { "100g": 28, "200g": 50, "500g": 110, "1kg": 200 } },
  { id: 6, name: "Chicken Masala", emoji: "🍗", desc: "Special blend crafted for chicken dishes. Bold spices, restaurant-style flavor.", prices: { "100g": 32, "200g": 58, "500g": 130, "1kg": 240 } },
  { id: 7, name: "Meat Masala", emoji: "🥩", desc: "Intense, hearty blend for mutton and beef curries. Deep, robust flavor.", prices: { "100g": 34, "200g": 60, "500g": 135, "1kg": 250 } },
  { id: 8, name: "Biryani Masala", emoji: "🍚", desc: "Fragrant, royal blend for the perfect biryani. Elevates every rice dish.", prices: { "100g": 36, "200g": 65, "500g": 140, "1kg": 260 } },
  { id: 9, name: "Pav Bhaji Masala", emoji: "🍞", desc: "Mumbai-style tangy, spicy blend for the iconic street food experience.", prices: { "100g": 26, "200g": 46, "500g": 100, "1kg": 185 } },
  { id: 10, name: "Chaat Masala", emoji: "🫠", desc: "Tangy, chatpata blend with amchur and black salt. Perfect for snacks & chaats.", prices: { "100g": 24, "200g": 42, "500g": 92, "1kg": 170 } },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop", tab: "products", label: "Spice Collection" },
  { src: "https://images.unsplash.com/photo-1615485736257-2e2041ddd6f0?w=600&auto=format&fit=crop", tab: "products", label: "Premium Spices" },
  { src: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop", tab: "factory", label: "Processing Unit" },
  { src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop", tab: "packaging", label: "Packaging Line" },
  { src: "https://images.unsplash.com/photo-1599909631988-24bf234f0c5c?w=600&auto=format&fit=crop", tab: "products", label: "Whole Spices" },
  { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop", tab: "factory", label: "Quality Testing" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop", tab: "factory", label: "Warehouse" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop", tab: "packaging", label: "Premium Packaging" },
];

const reviews = [
  { name: "Rajesh Kumar", type: "Grocery Store Owner, Dhanbad", stars: 5, text: "Surina Masala has been my top-selling brand for 3 years. The quality is consistent, customers always ask for it by name and the margins are excellent." },
  { name: "Anita Devi", type: "Home Customer, Jamtara", stars: 5, text: "The turmeric and garam masala from Surina are far better than any other brand I've used. Pure aroma, beautiful color and no artificial smell." },
  { name: "Mohammed Imran", type: "Hotel Owner, Bokaro", stars: 5, text: "We switched to Surina Masala for our hotel kitchen 2 years ago. Our guests have noticed the difference in our food quality. Highly recommended!" },
  { name: "Priya Agarwal", type: "Caterer, Giridih", stars: 5, text: "For bulk orders, Surina is unbeatable. Fresh product, timely delivery and excellent pricing for wholesale. My go-to masala brand." },
  { name: "Santosh Sharma", type: "Distributor, Deoghar", stars: 5, text: "The dealer support from Surina is amazing. They help with marketing, provide display materials and the products literally sell themselves." },
];

const faqs = [
  { q: "Are your spices 100% pure?", a: "Yes, absolutely. All Surina Masala products are made from pure, premium-grade raw ingredients with no artificial colors, flavors, or adulterants. Each batch undergoes quality testing before packaging." },
  { q: "Do you supply wholesale / bulk orders?", a: "Yes! We are a wholesale supplier. We supply to grocery stores, restaurants, hotels, caterers, and distributors. Contact us on WhatsApp for bulk pricing and minimum order quantities." },
  { q: "Do you offer dealership / distributorship?", a: "Yes, we are actively looking for dealers and distributors across Jharkhand and nearby states. Fill out the dealer inquiry form or contact us on WhatsApp to discuss the opportunity and margins." },
  { q: "How can I place an order?", a: "You can place orders directly via WhatsApp by clicking any 'Order on WhatsApp' button, or use our website cart to select products and checkout via WhatsApp. We also accept bulk orders by phone." },
  { q: "What are the delivery timelines?", a: "For local orders in Jharkhand, delivery is typically 1–3 business days. For other states, delivery is 3–7 business days depending on your location. We use trusted courier partners for reliable delivery." },
];

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('surina_cart') || '[]');
let selectedWeights = {};
let productQtys = {};
let lbIndex = 0;
let galleryFiltered = [...galleryImages];
let sliderIndex = 0;
let autoSlide;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  buildProducts();
  buildGallery('all');
  buildReviews();
  buildFaq();
  setupHeader();
  setupHamburger();
  setupReveal();
  setupCounters();
  setupGalleryTabs();
  updateCartUI();
  startSlider();
});

// ===== HEADER =====
function setupHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===== HAMBURGER =====
function setupHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.classList.remove('open');
    });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== REVEAL =====
function setupReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ===== COUNTER ANIMATION =====
function setupCounters() {
  const counters = document.querySelectorAll('.stat-num');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const end = parseInt(el.dataset.count);
        let start = 0;
        const step = Math.ceil(end / 50);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { el.textContent = end; clearInterval(timer); }
          else { el.textContent = start; }
        }, 30);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}

// ===== PRODUCTS =====
function buildProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = products.map(p => {
    const weights = Object.keys(p.prices);
    const defaultW = weights[1];
    selectedWeights[p.id] = defaultW;
    productQtys[p.id] = 1;
    return `
    <div class="product-card reveal" id="product-${p.id}">
      <div class="product-img">${p.emoji}</div>
      <div class="product-badge">PURE</div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="weight-selector">
          ${weights.map(w => `<button class="weight-btn${w === defaultW ? ' active' : ''}" onclick="selectWeight(${p.id}, '${w}', this)">${w}</button>`).join('')}
        </div>
        <div class="product-actions">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${p.id}, -1)">−</button>
            <span class="qty-display" id="qty-${p.id}">1</span>
            <button class="qty-btn" onclick="changeQty(${p.id}, 1)">+</button>
          </div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>`;
  }).join('');
  setupReveal();
}

function selectWeight(id, weight, btn) {
  selectedWeights[id] = weight;
  const card = document.getElementById(`product-${id}`);
  card.querySelectorAll('.weight-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function changeQty(id, delta) {
  productQtys[id] = Math.max(1, (productQtys[id] || 1) + delta);
  document.getElementById(`qty-${id}`).textContent = productQtys[id];
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const weight = selectedWeights[id];
  const qty = productQtys[id] || 1;
  const price = product.prices[weight];
  const key = `${id}-${weight}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ key, id, name: product.name, emoji: product.emoji, weight, price, qty });
  }
  saveCart();
  updateCartUI();
  showCartFeedback(id);
}

function showCartFeedback(id) {
  const btn = document.querySelector(`#product-${id} .add-cart-btn`);
  if (!btn) return;
  btn.textContent = '✓ Added!';
  btn.style.background = '#16a34a';
  setTimeout(() => {
    btn.textContent = 'Add to Cart';
    btn.style.background = '';
  }, 1500);
}

function saveCart() {
  localStorage.setItem('surina_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartCountBadge').textContent = count;

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = `₹${total}`;

  const itemsEl = document.getElementById('cartItems');
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.weight} × ${item.qty} = ₹${item.price * item.qty}</div>
        <div class="qty-control" style="margin-top:8px">
          <button class="qty-btn" onclick="updateCartQty('${item.key}', -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty('${item.key}', 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.key}')">🗑</button>
    </div>
  `).join('');
}

function updateCartQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  updateCartUI();
}

function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function whatsappCheckout() {
  if (cart.length === 0) { alert('Your cart is empty!'); return; }
  const lines = cart.map(i => `• ${i.name} (${i.weight}) × ${i.qty} = ₹${i.price * i.qty}`).join('\n');
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const msg = encodeURIComponent(
    `Hello Surina Enterprises,\n\nI would like to place an order:\n\n${lines}\n\n*Total: ₹${total}*\n\nPlease confirm availability.\n\nCustomer Name: \nPhone: \nAddress: `
  );
  window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`, '_blank');
}

// ===== GALLERY =====
function buildGallery(tab) {
  galleryFiltered = tab === 'all' ? galleryImages : galleryImages.filter(i => i.tab === tab);
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = galleryFiltered.map((img, idx) => `
    <div class="gallery-item" onclick="openLightbox(${idx})">
      <img src="${img.src}" alt="${img.label}" loading="lazy" />
      <div class="gallery-overlay">🔍</div>
    </div>
  `).join('');
}

function setupGalleryTabs() {
  document.querySelectorAll('.gtab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gtab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildGallery(btn.dataset.tab);
    });
  });
}

function openLightbox(idx) {
  lbIndex = idx;
  const lb = document.getElementById('lightbox');
  document.getElementById('lbImg').src = galleryFiltered[idx].src;
  lb.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function lbNav(dir) {
  lbIndex = (lbIndex + dir + galleryFiltered.length) % galleryFiltered.length;
  document.getElementById('lbImg').src = galleryFiltered[lbIndex].src;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

// ===== REVIEWS =====
function buildReviews() {
  const track = document.getElementById('reviewTrack');
  const dots = document.getElementById('sliderDots');
  track.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-author">
        <div class="review-avatar">${r.name[0]}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-type">${r.type}</div>
        </div>
      </div>
    </div>
  `).join('');

  dots.innerHTML = reviews.map((_, i) => `<div class="dot${i === 0 ? ' active' : ''}" onclick="goSlide(${i})"></div>`).join('');
}

function goSlide(idx) {
  sliderIndex = idx;
  const card = document.querySelector('.review-card');
  const cardW = card ? card.offsetWidth + 24 : 364;
  document.getElementById('reviewTrack').style.transform = `translateX(-${idx * cardW}px)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

function startSlider() {
  autoSlide = setInterval(() => {
    sliderIndex = (sliderIndex + 1) % reviews.length;
    goSlide(sliderIndex);
  }, 4000);
}

// ===== FAQ =====
function buildFaq() {
  const list = document.getElementById('faqList');
  list.innerHTML = faqs.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-q" onclick="toggleFaq(${i})">
        <span>${f.q}</span>
        <span class="faq-arrow">▾</span>
      </div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}

function toggleFaq(i) {
  const item = document.getElementById(`faq-${i}`);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===== DEALER FORM =====
function submitDealerForm() {
  const name = document.getElementById('dealerName').value.trim();
  const shop = document.getElementById('shopName').value.trim();
  const phone = document.getElementById('dealerPhone').value.trim();
  const email = document.getElementById('dealerEmail').value.trim();
  const address = document.getElementById('dealerAddress').value.trim();
  const district = document.getElementById('dealerDistrict').value.trim();
  const state = document.getElementById('dealerState').value.trim();
  const req = document.getElementById('dealerRequirement').value.trim();
  const type = document.getElementById('dealerBusinessType').value;

  if (!name || !phone || !shop) { alert('Please fill in Name, Shop Name and Phone Number.'); return; }

  const msg = encodeURIComponent(
    `*Dealer Inquiry – Surina Masala*\n\nName: ${name}\nShop: ${shop}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nAddress: ${address}\nDistrict: ${district}\nState: ${state}\nMonthly Requirement: ${req} KG\nBusiness Type: ${type}`
  );
  window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`, '_blank');
}

// ===== CONTACT FORM =====
function submitContactForm() {
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMsg').value.trim();

  if (!name || !msg) { alert('Please enter your name and message.'); return; }

  const waMsg = encodeURIComponent(
    `*Message from Website*\n\nName: ${name}\nPhone: ${phone || 'N/A'}\nEmail: ${email || 'N/A'}\n\nMessage: ${msg}`
  );
  window.open(`https://wa.me/91XXXXXXXXXX?text=${waMsg}`, '_blank');
}
