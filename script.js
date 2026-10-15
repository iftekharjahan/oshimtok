document.title = "অসীমতক | Oshimtok — Online Fashion Store";

// আপনার কালেকশনের পণ্যসমূহ (ছবি ও দাম সহ)
const products = [
  {id:1,name:"Mint Floral Suit",description:"মিন্ট সবুজে রঙিন ফ্লোরাল প্রিন্টের আকর্ষণীয় থ্রি-পিস।",price:1500,salePrice:1275,code:"OSH · 01",image:"assets/product-01-model.jpg",detailImage:"assets/product-01-detail.jpg",emoji:"👗",tone1:"#d9dfcc",tone2:"#899c7e"},
  {id:2,name:"Black Rose Suit",description:"ব্ল্যাক বেস, রোজ প্রিন্ট ও কনট্রাস্ট ডিজাইনের এলিগ্যান্ট সেট।",price:1500,salePrice:1275,code:"OSH · 02",image:"assets/product-02-model.jpg",detailImage:"assets/product-02-detail.jpg",emoji:"👚",tone1:"#e5d4c7",tone2:"#b88977"},
  {id:3,name:"Sage Garden Suit",description:"সফট সেজ টোনে সূক্ষ্ম বোটানিক্যাল প্রিন্টের পরিপাটি লুক।",price:1500,salePrice:1275,code:"OSH · 03",image:"assets/product-03-model.jpg",detailImage:"assets/product-03-detail.jpg",emoji:"👗",tone1:"#d7dce1",tone2:"#8794a0"},
  {id:4,name:"Olive Elegance Suit",description:"অলিভ-গ্রিন শেড ও ডিটেইলড প্রিন্ট—ক্লাসিক পছন্দের জন্য।",price:1500,salePrice:1275,code:"OSH · 04",image:"assets/product-04-model.jpg",detailImage:"assets/product-04-detail.jpg",emoji:"👗",tone1:"#d9cfc0",tone2:"#99866e"},
  {id:5,name:"Plum Classic Suit",description:"রিচ প্লাম রঙে বর্ডার ডিটেইলসহ স্টেটমেন্ট থ্রি-পিস।",price:1500,salePrice:1275,code:"OSH · 05",image:"assets/product-05-model.jpg",detailImage:"assets/product-05-detail.jpg",emoji:"👚",tone1:"#d0ddcf",tone2:"#7c9786"},
  {id:6,name:"Forest Embroidery Suit",description:"ডিপ ফরেস্ট টোন ও গোল্ডেন মোটিফে প্রিমিয়াম লুক।",price:1500,salePrice:1275,code:"OSH · 06",image:"assets/product-06-model.jpg",detailImage:"assets/product-06-detail.jpg",emoji:"👗",tone1:"#e4d3d9",tone2:"#aa8393"}
];

const money = n => "৳" + Number(n).toLocaleString("en-US");
const grid = document.getElementById("productGrid");
const cart = new Map();
let toastTimer;

// Dynamic Navbar Scroll Effect
document.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 10px 30px rgba(13, 43, 36, 0.08)';
    header.style.padding = '0 5%';
  } else {
    header.style.boxShadow = 'none';
    header.style.padding = '0 6%';
  }
});

// Menu Toggle Action with Animations
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  
  const bars = menuToggle.querySelectorAll('.bar');
  if (isOpen) {
    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});

mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  const bars = menuToggle.querySelectorAll('.bar');
  bars[0].style.transform = 'none';
  bars[1].style.opacity = '1';
  bars[2].style.transform = 'none';
}));

// Render Products
function renderProducts(){
  const sort = document.getElementById("sortSelect").value;
  let list = [...products];
  if(sort === "low") list.sort((a,b) => a.salePrice - b.salePrice);
  if(sort === "high") list.sort((a,b) => b.salePrice - a.salePrice);
  
  grid.innerHTML = list.map((p) => `
    <article class="product-card">
      <div class="product-visual" onclick="openProductModal(${p.id})" style="cursor: pointer;" title="বিস্তারিত দেখতে ক্লিক করুন">
        <span class="discount-badge">১৫% ছাড়</span>
        <div class="product-placeholder" style="--tone1:${p.tone1};--tone2:${p.tone2}">
          <span class="shirt-shape">${p.emoji}</span><small>CURATED STYLE · 0${p.id}</small>
        </div>
        ${p.image ? `<img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"><img class="product-detail-photo" src="${p.detailImage}" alt="${p.name} Detail" loading="lazy" onerror="this.style.display='none'">` : ""}
        <button class="quick-add" onclick="event.stopPropagation(); addToCart(${p.id})">＋ ব্যাগে যোগ করুন</button>
      </div>
      <div class="product-info" onclick="openProductModal(${p.id})" style="cursor: pointer;">
        <div class="product-meta"><h3>${p.name}</h3><span class="product-code">${p.code}</span></div>
        <p class="product-desc">${p.description}</p>
        <div class="price-row">
          <span class="sale-price">${money(p.salePrice)}</span>
          <span class="old-price">${money(p.price)}</span>
          <span class="save-label">৳${p.price - p.salePrice} সাশ্রয়</span>
        </div>
      </div>
    </article>`).join("");
}

function renderMessageProducts(){
  const select = document.getElementById("messageProduct");
  products.forEach(p => {
    const o = document.createElement("option");
    o.value = p.name;
    o.textContent = p.name;
    select.appendChild(o);
  });
}

// Cart Functions
function addToCart(id){
  cart.set(id, (cart.get(id) || 0) + 1); 
  renderCart(); 
  showToast("পণ্যটি আপনার ব্যাগে যোগ হয়েছে।");
}

function changeQty(id, delta){
  const next = (cart.get(id) || 0) + delta;
  if(next <= 0) cart.delete(id); 
  else cart.set(id, next);
  renderCart();
}

function renderCart(){
  const count = [...cart.values()].reduce((a,b) => a + b, 0);
  const total = [...cart.entries()].reduce((sum, [id, qty]) => sum + products.find(p => p.id === id).salePrice * qty, 0);
  
  document.getElementById("cartCount").textContent = count;
  document.getElementById("drawerCount").textContent = `(${count})`;
  document.getElementById("cartTotal").textContent = money(total);
  
  const wrap = document.getElementById("cartItems");
  
  if(!count){
    wrap.innerHTML = '<div class="empty-cart"><span>🛍️</span><p>আপনার ব্যাগ এখনো খালি।</p><a href="#collection" id="startShopping">কালেকশন দেখুন →</a></div>';
    document.getElementById("startShopping").addEventListener("click", closeCart);
    return;
  }
  
  wrap.innerHTML = [...cart.entries()].map(([id, qty]) => {
    const p = products.find(x => x.id === id);
    return `
      <div class="cart-item">
        <div class="cart-thumb" style="background:linear-gradient(145deg,${p.tone1},${p.tone2})">${p.emoji}</div>
        <div>
          <h4>${p.name}</h4>
          <p>${money(p.salePrice)} / পিস</p>
          <div class="quantity-control">
            <button data-qty="${id}" data-delta="-1" aria-label="একটি কমান">−</button>
            <span>${qty}</span>
            <button data-qty="${id}" data-delta="1" aria-label="একটি বাড়ান">＋</button>
          </div>
          <button class="remove-item" data-remove="${id}">সরিয়ে ফেলুন</button>
        </div>
        <strong class="cart-item-price">${money(p.salePrice * qty)}</strong>
      </div>`;
  }).join("");
  
  wrap.querySelectorAll("[data-qty]").forEach(b => b.addEventListener("click", () => changeQty(Number(b.dataset.qty), Number(b.dataset.delta))));
  wrap.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => {cart.delete(Number(b.dataset.remove)); renderCart()}));
}

function openCart(){
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("active");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart(){
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("active");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showToast(message){
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2500);
}

// Events
document.getElementById("sortSelect").addEventListener("change", renderProducts);
document.getElementById("cartOpen").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);

document.getElementById("checkoutButton").addEventListener("click", () => {
  if(!cart.size){ showToast("অর্ডার করার আগে ব্যাগে পণ্য যোগ করুন।"); return; }
  
  const lines = [...cart.entries()].map(([id, qty]) => {
    const p = products.find(x => x.id === id);
    return `• ${p.name} — ${qty} পিস × ${money(p.salePrice)} = ${money(p.salePrice * qty)}`;
  });
  
  const total = [...cart.entries()].reduce((s, [id, q]) => s + products.find(p => p.id === id).salePrice * q, 0);
  const msg = `আসসালামু আলাইকুম, আমি অর্ডার করতে চাই:\n\n${lines.join("\n")}\n\nমোট: ${money(total)}\nনাম:\nঠিকানা:\nমোবাইল:\n\nদয়া করে অর্ডারটি নিশ্চিত করবেন।`;
  
  window.open("https://wa.me/8801971936771?text=" + encodeURIComponent(msg), "_blank", "noopener");
});

document.getElementById("messageForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const product = document.getElementById("messageProduct").value;
  const message = document.getElementById("customerMessage").value.trim();
  const text = `আসসালামু আলাইকুম।\nনাম: ${name}\nপণ্য: ${product}\nমেসেজ: ${message}`;
  window.open("https://wa.me/8801971936771?text=" + encodeURIComponent(text), "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();

// Product Details Modal (Quick View) Logic
const modalOverlay = document.getElementById("modalOverlay");
const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModalBtn");

function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if(!p) return;
  
  modalContent.innerHTML = `
    <div class="modal-gallery">
      <img src="${p.image}" alt="${p.name} Model View">
      <img src="${p.detailImage}" alt="${p.name} Fabric Detail">
    </div>
    <div class="modal-info">
      <h2>${p.name}</h2>
      <span class="product-code">${p.code} | PREMIUM THREE-PIECE</span>
      <div class="price-row" style="margin-bottom: 10px;">
        <span class="sale-price" style="font-size: 26px;">${money(p.salePrice)}</span>
        <span class="old-price" style="font-size: 16px;">${money(p.price)}</span>
        <span class="discount-badge" style="position: static; margin-left: 15px;">১৫% ছাড়</span>
      </div>
      <p class="product-desc">${p.description} <br><br> উন্নতমানের কাপড় এবং আরামদায়ক ফিটিং। প্রতিদিনের ব্যবহারের জন্য পারফেক্ট।</p>
      
      <ul class="modal-features">
        <li><span>✦</span> ১০০% অরিজিনাল কোয়ালিটি</li>
        <li><span>✦</span> সাইজ কাস্টমাইজেশন এভেইলেবল</li>
        <li><span>✦</span> দেশব্যাপী হোম ডেলিভারি সুবিধা</li>
      </ul>

      <button class="btn btn-dark btn-full" style="margin-top: 25px; padding: 18px;" onclick="addToCart(${p.id}); closeProductModal();">
        ＋ ব্যাগে যোগ করুন
      </button>
    </div>
  `;
  
  modalOverlay.classList.add("active");
  productModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  modalOverlay.classList.remove("active");
  productModal.classList.remove("open");
  document.body.style.overflow = "";
}

closeModalBtn.addEventListener("click", closeProductModal);
modalOverlay.addEventListener("click", closeProductModal);

// Auto Dynamic Slideshow Logic
let slideIndex = 0;
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("hero-slide");
  if (slides.length === 0) return;
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 3500); // Change image every 3.5 seconds
}

// Initialize Everything
renderProducts();
renderMessageProducts();
renderCart();
showSlides();
