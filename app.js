/* ============================================
   SURINA MASALA — CORE APPLICATION LOGIC
   Featuring Dynamic Discounts & Live Checkout
============================================ */
const WA_NUMBER = '916201986597';

/* ===== PRODUCT CATALOG (With MRP and Dynamic Discounts) ===== */
const PRODUCTS = [
  {id:1, name:"Haldi Powder", sub:"Turmeric", category:"powder",
   img:"https://images.unsplash.com/photo-1615485736257-2e2041ddd6f0?w=500&auto=format&fit=crop&q=80",
   desc:"Vibrant golden haldi with rich curcumin. Deep earthy aroma, brilliant color.",
   sizes: {
     "100g": {mrp: 30, price: 18},   // 40% OFF
     "200g": {mrp: 55, price: 32},   // 41% OFF
     "500g": {mrp: 130, price: 72},  // 44% OFF
     "1kg": {mrp: 250, price: 130}   // 48% OFF
   }, badge:"BESTSELLER", bdg:"best", rating:4.8, reviews:142},
  {id:2, name:"Lal Mirch Powder", sub:"Red Chilli", category:"powder",
   img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80",
   desc:"Bold, fiery flavor with deep red color. Perfect heat jo khane ko jaan de de.",
   sizes: {
     "100g": {mrp: 35, price: 22},
     "200g": {mrp: 65, price: 40},
     "500g": {mrp: 150, price: 90},
     "1kg": {mrp: 290, price: 165}
   }, badge:"HOT", bdg:"hot", rating:4.7, reviews:118},
  {id:3, name:"Dhaniya Powder", sub:"Coriander", category:"powder",
   img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80",
   desc:"Fresh, citrusy aur fragrant. Premium dried coriander seeds se ground.",
   sizes: {
     "100g": {mrp: 25, price: 16},
     "200g": {mrp: 45, price: 28},
     "500g": {mrp: 110, price: 62},
     "1kg": {mrp: 200, price: 110}
   }, badge:"PURE", bdg:"pure", rating:4.6, reviews:97},
  {id:4, name:"Garam Masala", sub:"Aromatic Blend", category:"blend",
   img:"https://images.unsplash.com/photo-1599909631988-24bf234f0c5c?w=500&auto=format&fit=crop&q=80",
   desc:"Warm, complex, perfectly balanced — khane ka sawad double.",
   sizes: {
     "100g": {mrp: 50, price: 30},
     "200g": {mrp: 95, price: 55},
     "500g": {mrp: 220, price: 120},
     "1kg": {mrp: 400, price: 220}
   }, badge:"PREMIUM", bdg:"best", rating:4.9, reviews:203},
   {id:5, name:"Kitchen King", sub:"All-in-One Masala", category:"blend",
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=80",
   desc:"Rozana khana banane ka all-rounder masala. Rich aroma, authentic taste.",
   sizes: {
     "100g": {mrp: 45, price: 28},
     "200g": {mrp: 85, price: 50},
     "500g": {mrp: 200, price: 110},
     "1kg": {mrp: 380, price: 200}
   }, badge:"POPULAR", bdg:"best", rating:4.8, reviews:176}
   // Feel free to add the rest of your products using this new 'sizes' structure!
];

/* ===== CART STATE ===== */
let cart = JSON.parse(localStorage.getItem('surina_cart') || '[]');
let directBuyItem = null; // Used when user clicks "Buy Now" directly

function saveCart() { localStorage.setItem('surina_cart', JSON.stringify(cart)); }
function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function cartTotals() {
  return cart.reduce((sums, i) => {
    sums.mrp += (i.mrp * i.qty);
    sums.price += (i.price * i.qty);
    return sums;
  }, { mrp: 0, price: 0 });
}

function addToCart(id, weight, qty) {
  qty = qty || 1;
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const sizeData = p.sizes[weight];
  const key = `${id}-${weight}`;
  const ex = cart.find(i => i.key === key);
  
  if(ex) ex.qty += qty;
  else cart.push({ key, id, name: p.name, img: p.img, weight, mrp: sizeData.mrp, price: sizeData.price, qty });
  
  saveCart();
  renderCartUI();
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  renderCartUI();
}

function renderCartUI() {
  const count = cartCount();
  const totals = cartTotals();
  const saved = totals.mrp - totals.price;
  
  document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = count);
  document.querySelectorAll('[data-cart-total]').forEach(el => el.textContent = '₹' + totals.price);
  
  const itemsEl = document.getElementById('cartItems');
  if(!itemsEl) return;
  
  if(!cart.length) {
    itemsEl.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div>Aapka cart khali hai.<br/>Products add karein!</div>';
    document.getElementById('cartSavings').style.display = 'none';
    return;
  }
  
  document.getElementById('cartSavings').style.display = saved > 0 ? 'block' : 'none';
  document.getElementById('cartSavingsValue').textContent = '₹' + saved;

  itemsEl.innerHTML = cart.map(item => `
    <div class="ci">
      <img class="ci-thumb" src="${item.img}" alt="${item.name}"/>
      <div style="flex:1">
        <div class="ci-name">${item.name}</div>
        <div class="ci-meta">${item.weight} · Qty: ${item.qty}</div>
        <div class="ci-price"><del style="color:#9CA3AF;font-size:11px;margin-right:4px">₹${item.mrp * item.qty}</del>₹${item.price * item.qty}</div>
      </div>
      <button class="ci-rm" onclick="removeFromCart('${item.key}');event.stopPropagation()">🗑</button>
    </div>`).join('');
}

function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

/* ===== CHECKOUT MODAL & LOCATION LOGIC ===== */
function injectCheckoutModal() {
  const modalHTML = `
    <div class="modal-overlay" id="checkoutOverlay"></div>
    <div class="checkout-modal" id="checkoutModal">
      <div class="modal-hdr">
        <h3>🚀 Finalize Order</h3>
        <button class="modal-x" onclick="closeCheckout()">✕</button>
      </div>
      <div class="modal-body">
        <div class="fg">
          <label>Customer Type</label>
          <select id="coType">
            <option value="Home Customer">Home Customer</option>
            <option value="Dealer/Wholesaler">Dealer / Wholesaler</option>
            <option value="Restaurant/Hotel">Restaurant / Hotel</option>
          </select>
        </div>
        <div class="fg"><label>Pura Naam *</label><input type="text" id="coName" placeholder="Rajesh Kumar"/></div>
        <div class="fg"><label>Mobile Number *</label><input type="tel" id="coPhone" placeholder="10-digit mobile number"/></div>
        
        <div class="location-box">
          <label>Delivery Address *</label>
          <button class="btn btn-outline-r btn-sm fw" onclick="getLiveLocation()" id="locBtn" style="margin-bottom:10px">
            📍 Get Live Location (Auto-Fill)
          </button>
          <textarea id="coAddress" rows="3" placeholder="Pura address type karein ya Live Location button dabayein..."></textarea>
          <input type="hidden" id="coMapLink" value="" />
        </div>
        
        <button class="btn btn-wa fw" onclick="processOrder()" style="margin-top:10px; padding:16px; font-size:15px">
          WhatsApp Par Order Bhejein
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openCheckout(isDirect = false, pId = null, pWeight = null, pQty = null) {
  if (isDirect) {
    const p = PRODUCTS.find(x => x.id === pId);
    const sizeData = p.sizes[pWeight];
    directBuyItem = [{
      name: p.name, weight: pWeight, qty: pQty, 
      mrp: sizeData.mrp, price: sizeData.price
    }];
  } else {
    if(!cart.length) { alert('Cart khali hai!'); return; }
    directBuyItem = null;
    closeCart();
  }
  document.getElementById('checkoutOverlay').classList.add('open');
  document.getElementById('checkoutModal').classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('open');
  document.getElementById('checkoutModal').classList.remove('open');
}

function getLiveLocation() {
  const btn = document.getElementById('locBtn');
  btn.textContent = "⏳ Fetching Location...";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const link = `https://www.google.com/maps?q=${lat},${lon}`;
        document.getElementById('coMapLink').value = link;
        document.getElementById('coAddress').value += (document.getElementById('coAddress').value ? "\n" : "") + `Live GPS Coords: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        btn.textContent = "✅ Location Added!";
        btn.style.background = "#E8F5E9"; btn.style.borderColor = "#4CAF50"; btn.style.color = "#2E7D32";
      },
      (error) => { alert("Location access denied ya error aaya. Kripya address manually likhein."); btn.textContent = "📍 Get Live Location"; }
    );
  } else { alert("Aapka browser live location support nahi karta."); }
}

function processOrder() {
  const type = document.getElementById('coType').value;
  const name = document.getElementById('coName').value.trim();
  const phone = document.getElementById('coPhone').value.trim();
  const address = document.getElementById('coAddress').value.trim();
  const mapLink = document.getElementById('coMapLink').value;

  if(!name || !phone || !address) { alert('Kripya Naam, Number aur Address zaroor bharein.'); return; }
  
  const itemsList = directBuyItem ? directBuyItem : cart;
  let totalMrp = 0, totalSell = 0;
  
  const itemsText = itemsList.map((item, index) => {
    totalMrp += (item.mrp * item.qty);
    totalSell += (item.price * item.qty);
    return `*${index + 1}. ${item.name}* (${item.weight})\n   Qty: ${item.qty} x ₹${item.price} = *₹${item.price * item.qty}*`;
  }).join('\n');
  
  const saved = totalMrp - totalSell;
  const locationText = mapLink ? `\n*Map Link:* ${mapLink}` : '';

  const msg = `*🛍️ NEW ORDER - SURINA MASALA*
*Type:* ${type}
*Name:* ${name}
*Phone:* ${phone}
*Address:* ${address}${locationText}
-----------------------------------
${itemsText}
-----------------------------------
*🧾 Final Payable Total: ₹${totalSell}*
*🎉 You Saved: ₹${saved}*

*Kripya mera order confirm karein.*`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  
  // Clear cart if it wasn't a direct buy
  if(!directBuyItem) { cart = []; saveCart(); renderCartUI(); }
  closeCheckout();
}

/* ===== SHARED UI BEHAVIORS ===== */
document.addEventListener('DOMContentLoaded', () => {
  injectCheckoutModal();
  renderCartUI();

  const hdr = document.getElementById('hdr');
  if(hdr) window.addEventListener('scroll', () => hdr.classList.toggle('shadow', scrollY > 20));

  const burger = document.getElementById('burger'), nav = document.getElementById('nav');
  if(burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    document.querySelectorAll('.nav-a').forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => { if(e.isIntersecting) setTimeout(() => e.target.classList.add('vis'), i * 60) });
  }, {threshold: .1});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});
