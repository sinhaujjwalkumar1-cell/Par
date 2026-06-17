/* ============================================
   SURINA MASALA — SHARED APP LOGIC
   Used across index.html, shop.html, distributor.html
============================================ */
const WA_NUMBER='916201986597';

/* ===== PRODUCT CATALOG ===== */
const PRODUCTS=[
  {id:1,name:"Haldi Powder",sub:"Turmeric",category:"powder",emoji:"🟡",
   img:"https://images.unsplash.com/photo-1615485736257-2e2041ddd6f0?w=500&auto=format&fit=crop&q=80",
   desc:"Vibrant golden haldi with rich curcumin. Deep earthy aroma, brilliant color — har dish ki jaan.",
   prices:{"100g":18,"200g":32,"500g":72,"1kg":130},badge:"BESTSELLER",bdg:"best",rating:4.8,reviews:142},
  {id:2,name:"Lal Mirch Powder",sub:"Red Chilli",category:"powder",emoji:"🌶️",
   img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80",
   desc:"Bold, fiery flavor with deep red color. Perfect heat jo khane ko jaan de de.",
   prices:{"100g":22,"200g":40,"500g":90,"1kg":165},badge:"HOT",bdg:"hot",rating:4.7,reviews:118},
  {id:3,name:"Dhaniya Powder",sub:"Coriander",category:"powder",emoji:"🌿",
   img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80",
   desc:"Fresh, citrusy aur fragrant. Premium dried coriander seeds se ground — ekdum shuddh.",
   prices:{"100g":16,"200g":28,"500g":62,"1kg":110},badge:"PURE",bdg:"pure",rating:4.6,reviews:97},
  {id:4,name:"Garam Masala",sub:"Aromatic Blend",category:"blend",emoji:"🫙",
   img:"https://images.unsplash.com/photo-1599909631988-24bf234f0c5c?w=500&auto=format&fit=crop&q=80",
   desc:"Aromatic whole spice blend. Warm, complex, perfectly balanced — khane ka sawad double.",
   prices:{"100g":30,"200g":55,"500g":120,"1kg":220},badge:"PREMIUM",bdg:"best",rating:4.9,reviews:203},
  {id:5,name:"Kitchen King",sub:"All-in-One Masala",category:"blend",emoji:"👑",
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=80",
   desc:"Rozana khana banane ka all-rounder masala. Rich aroma, authentic taste — ek hi masale mein sab.",
   prices:{"100g":28,"200g":50,"500g":110,"1kg":200},badge:"POPULAR",bdg:"best",rating:4.8,reviews:176},
  {id:6,name:"Chicken Masala",sub:"Special Blend",category:"blend",emoji:"🍗",
   img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80",
   desc:"Specially crafted blend for chicken dishes. Bold spices, restaurant-style flavor ghar pe.",
   prices:{"100g":32,"200g":58,"500g":130,"1kg":240},badge:"NEW",bdg:"new",rating:4.7,reviews:64},
  {id:7,name:"Meat Masala",sub:"Mutton & Beef",category:"blend",emoji:"🥩",
   img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
   desc:"Intense, hearty blend for mutton curries. Deep, robust flavor jo gosht ke saath khoob jamta hai.",
   prices:{"100g":34,"200g":60,"500g":135,"1kg":250},badge:"NEW",bdg:"new",rating:4.6,reviews:51},
  {id:8,name:"Biryani Masala",sub:"Royal Blend",category:"blend",emoji:"🍚",
   img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80&sat=50",
   desc:"Fragrant, royal blend for the perfect biryani. Har chawal mein mehek — restaurant-level biryani ghar pe.",
   prices:{"100g":36,"200g":65,"500g":140,"1kg":260},badge:"SPECIAL",bdg:"best",rating:4.9,reviews:189},
  {id:9,name:"Pav Bhaji Masala",sub:"Mumbai Style",category:"blend",emoji:"🍞",
   img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80&hue=30",
   desc:"Mumbai-style tangy, spicy blend. Street food ka asli swad ab aapke ghar ki kitchen mein.",
   prices:{"100g":26,"200g":46,"500g":100,"1kg":185},badge:"NEW",bdg:"new",rating:4.5,reviews:43},
  {id:10,name:"Chaat Masala",sub:"Tangy & Chatpata",category:"blend",emoji:"🫠",
   img:"https://images.unsplash.com/photo-1599909631988-24bf234f0c5c?w=500&auto=format&fit=crop&q=80&hue=60",
   desc:"Tangy, chatpata blend with amchur aur black salt. Snacks, fruits, dahi — sab par perfect.",
   prices:{"100g":24,"200g":42,"500g":92,"1kg":170},badge:"NEW",bdg:"new",rating:4.6,reviews:38},
  {id:11,name:"Haldi Sabut",sub:"Whole Turmeric",category:"whole",emoji:"🟠",
   img:"https://images.unsplash.com/photo-1615485736257-2e2041ddd6f0?w=500&auto=format&fit=crop&q=80&sat=-20",
   desc:"Whole dried turmeric finger roots. Sun-dried naturally, top grade curcumin content.",
   prices:{"100g":20,"200g":36,"500g":80,"1kg":145},badge:"PURE",bdg:"pure",rating:4.7,reviews:29},
  {id:12,name:"Sabut Dhaniya",sub:"Whole Coriander Seeds",category:"whole",emoji:"🌱",
   img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80&sat=-20",
   desc:"Premium whole coriander seeds — roast karke khud pees sakte hain, ya seedha use karein.",
   prices:{"100g":14,"200g":24,"500g":54,"1kg":95},badge:"PURE",bdg:"pure",rating:4.5,reviews:22},
];

/* ===== CART STATE ===== */
let cart=JSON.parse(localStorage.getItem('surina_cart')||'[]');

function saveCart(){localStorage.setItem('surina_cart',JSON.stringify(cart))}

function cartCount(){return cart.reduce((s,i)=>s+i.qty,0)}
function cartTotal(){return cart.reduce((s,i)=>s+i.price*i.qty,0)}

function addToCart(id,weight,qty){
  qty=qty||1;
  const p=PRODUCTS.find(x=>x.id===id);
  if(!p)return;
  const price=p.prices[weight];
  const key=`${id}-${weight}`;
  const ex=cart.find(i=>i.key===key);
  if(ex)ex.qty+=qty;
  else cart.push({key,id,name:p.name,emoji:p.emoji,img:p.img,weight,price,qty});
  saveCart();
  renderCartUI();
}

function removeFromCart(key){
  cart=cart.filter(i=>i.key!==key);
  saveCart();
  renderCartUI();
}

function changeCartQty(key,delta){
  const item=cart.find(i=>i.key===key);
  if(!item)return;
  item.qty=Math.max(1,item.qty+delta);
  saveCart();
  renderCartUI();
}

function renderCartUI(){
  const count=cartCount(),total=cartTotal();
  document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=count);
  document.querySelectorAll('[data-cart-total]').forEach(el=>el.textContent='₹'+total);
  const itemsEl=document.getElementById('cartItems');
  if(!itemsEl)return;
  if(!cart.length){
    itemsEl.innerHTML='<div class="cart-empty"><div class="cart-empty-icon">🛒</div>Aapka cart abhi khali hai.<br/>Products add karein!</div>';
    return;
  }
  itemsEl.innerHTML=cart.map(item=>`
    <div class="ci">
      <img class="ci-thumb" src="${item.img}" alt="${item.name}"/>
      <div style="flex:1">
        <div class="ci-name">${item.name}</div>
        <div class="ci-meta">${item.weight} · Qty: ${item.qty}</div>
        <div class="ci-price">₹${item.price*item.qty}</div>
      </div>
      <button class="ci-rm" onclick="removeFromCart('${item.key}');event.stopPropagation()">🗑</button>
    </div>`).join('');
}

function toggleCart(){
  const d=document.getElementById('cartDrawer'),o=document.getElementById('cartOverlay');
  if(d)d.classList.toggle('open');
  if(o)o.classList.toggle('open');
}
function closeCart(){
  const d=document.getElementById('cartDrawer'),o=document.getElementById('cartOverlay');
  if(d)d.classList.remove('open');
  if(o)o.classList.remove('open');
}

function waCheckout(){
  if(!cart.length){alert('Cart khali hai — pehle kuch products add karein.');return}
  const lines=cart.map(i=>`• ${i.name} (${i.weight}) × ${i.qty} = ₹${i.price*i.qty}`).join('\n');
  const total=cartTotal();
  const msg=encodeURIComponent(`Namaste Surina Masala,\n\nMain order karna chahta/chahti hoon:\n\n${lines}\n\n*Total: ₹${total}*\n\nKripya confirm karein.\n\nNaam: \nPhone: \nAddress: `);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,'_blank');
}

/* ===== SHARED UI BEHAVIORS ===== */
function initSharedUI(){
  renderCartUI();

  // Header scroll shadow
  const hdr=document.getElementById('hdr');
  if(hdr)window.addEventListener('scroll',()=>hdr.classList.toggle('shadow',scrollY>40));

  // Mobile burger
  const burger=document.getElementById('burger'),nav=document.getElementById('nav');
  if(burger&&nav){
    burger.addEventListener('click',()=>nav.classList.toggle('open'));
    document.querySelectorAll('.nav-a').forEach(l=>l.addEventListener('click',()=>nav.classList.remove('open')));
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id.length<2)return;
      const t=document.querySelector(id);
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}
    });
  });

  // Reveal-on-scroll
  const obs=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('vis'),i*60)});
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Counters
  const cobs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target,end=+el.dataset.n;
        let s=0;const step=Math.ceil(end/50);
        const t=setInterval(()=>{s+=step;if(s>=end){el.textContent=end;clearInterval(t)}else el.textContent=s},28);
        cobs.unobserve(el);
      }
    });
  },{threshold:.5});
  document.querySelectorAll('.ctr').forEach(el=>cobs.observe(el));
}

document.addEventListener('DOMContentLoaded',initSharedUI);
