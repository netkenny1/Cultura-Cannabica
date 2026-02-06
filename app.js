/* =========================================================
   CULTURA CANNABICA — App Logic
   Scroll reveals · Shop filters · Cart · Tabs · Nav
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. SCROLL REVEAL (IntersectionObserver)
     --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------
     2. MOBILE NAV TOGGLE
     --------------------------------------------------------- */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav]');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.textContent = open ? 'Cerrar' : 'Menu';
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = 'Menu';
      });
    });
  }

  /* ---------------------------------------------------------
     3. SMOOTH SCROLL FOR ANCHOR LINKS
     --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------------------------------------------------------
     4. SHOP — PRODUCT DATA & RENDERING
     --------------------------------------------------------- */
  const productGrid = document.querySelector('[data-product-grid]');
  const chipList = document.querySelector('[data-chip-list]');
  const searchInput = document.querySelector('[data-search]');
  const sortSelect = document.querySelector('[data-sort]');
  const loadingEl = document.querySelector('[data-loading]');
  const emptyEl = document.querySelector('[data-empty]');

  if (productGrid) {
    const PRODUCTS = [
      { id: 1,  name: 'Cartucho Amnesia',       cat: 'stv',       tag: 'STV · 2ml',     price: 50, badge: 'Nuevo',      img: 'https://culturacannabica.es/wp-content/uploads/2025/10/Imagen-de-WhatsApp-2025-10-02-a-las-10.58.34_9b2d2278.jpg', meta: 'Sativa · Citrico' },
      { id: 2,  name: 'STV Cookies',             cat: 'stv',       tag: 'Vaper · 2ml',   price: 60, badge: 'Popular',    img: 'https://culturacannabica.es/wp-content/uploads/2025/10/Imagen-de-WhatsApp-2025-10-02-a-las-10.58.34_08a88045.jpg', meta: 'Hibrido · Dulce' },
      { id: 3,  name: 'STV OG Kush',             cat: 'stv',       tag: 'STV · 2ml',     price: 50, badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2025/10/Imagen-de-WhatsApp-2025-10-02-a-las-10.58.34_9b2d2278.jpg', meta: 'Indica · Terroso' },
      { id: 4,  name: 'Vaper Gelato',            cat: 'stv',       tag: 'Vaper · 2ml',   price: 35, badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2025/10/Imagen-de-WhatsApp-2025-10-02-a-las-10.58.34_08a88045.jpg', meta: 'Hibrido · Frutal' },
      { id: 5,  name: 'Cartucho Amnesia',        cat: 'hhx',       tag: 'HHX · 1ml',     price: 25, badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2025/06/Cart-1ml-HHX-scaled.jpg', meta: 'Sativa · Energizante' },
      { id: 6,  name: 'Cartucho Lemon Haze',     cat: 'hhx',       tag: 'HHX · 1ml',     price: 25, badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2025/06/Cart-1ml-HHX-scaled.jpg', meta: 'Sativa · Citrico' },
      { id: 7,  name: 'Amnesia Haze CBD',        cat: 'cbd',       tag: 'CBD · Flores',  price: 25, badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2024/02/productos-cbd.jpg', meta: 'Indoor · Citrico' },
      { id: 8,  name: 'Gelato 41 CBD',           cat: 'cbd',       tag: 'CBD · Flores',  price: 30, badge: 'Popular',    img: 'https://culturacannabica.es/wp-content/uploads/2024/02/productos-hhc.jpg', meta: 'Hibrido · Dulce' },
      { id: 9,  name: 'Aceite CBD 10%',          cat: 'cbd',       tag: 'CBD · Aceite',  price: 35, badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2024/02/productos-cbd.jpg', meta: 'Full Spectrum' },
      { id: 10, name: 'Hash CBD Ketama',         cat: 'resinas',   tag: 'Resinas',       price: 20, badge: 'Chill Pick', img: 'https://culturacannabica.es/wp-content/uploads/2024/02/productos-hhc.jpg', meta: 'Tradicional · Terroso' },
      { id: 11, name: 'Resina Dry Sift',         cat: 'resinas',   tag: 'Resinas',       price: 28, badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2024/02/productos-hhc.jpg', meta: 'Premium · Aromatico' },
      { id: 12, name: 'Critical Seeds Pack',     cat: 'semillas',  tag: 'Semillas',      price: 15, badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2024/02/productos-cbd.jpg', meta: 'Feminizada · Alta produccion' },
      { id: 13, name: 'Premium Grinder 4p',      cat: 'accesorios',tag: 'Accesorios',    price: 15, badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2024/02/productos-hhc.jpg', meta: 'Aluminio · 4 piezas' },
      { id: 14, name: 'Bateria 510',             cat: 'accesorios',tag: 'Accesorios',    price: 12, badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2024/02/productos-hhc.jpg', meta: 'Voltaje variable' },
      { id: 15, name: 'Rolling Papers KS',       cat: 'accesorios',tag: 'Accesorios',    price: 3,  badge: '',           img: 'https://culturacannabica.es/wp-content/uploads/2024/02/productos-cbd.jpg', meta: 'King Size · Natural' },
    ];

    const CAT_LABELS = {
      stv: 'STV',
      hhx: 'HHX',
      cbd: 'CBD',
      resinas: 'Resinas',
      semillas: 'Semillas',
      accesorios: 'Accesorios'
    };

    // Build chips
    if (chipList) {
      Object.entries(CAT_LABELS).forEach(([key, label]) => {
        const btn = document.createElement('button');
        btn.className = 'chip';
        btn.dataset.filter = key;
        btn.textContent = label;
        chipList.appendChild(btn);
      });
    }

    let activeFilter = 'all';
    let searchQuery = '';
    let sortMode = 'featured';

    // Check URL params for initial filter
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam && CAT_LABELS[catParam]) {
      activeFilter = catParam;
    }

    function renderProducts() {
      let filtered = PRODUCTS;

      // Filter by category
      if (activeFilter !== 'all') {
        filtered = filtered.filter(p => p.cat === activeFilter);
      }

      // Filter by search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q) ||
          p.meta.toLowerCase().includes(q) ||
          p.cat.toLowerCase().includes(q)
        );
      }

      // Sort
      if (sortMode === 'low')       filtered.sort((a, b) => a.price - b.price);
      else if (sortMode === 'high') filtered.sort((a, b) => b.price - a.price);

      // Render
      productGrid.innerHTML = '';

      if (filtered.length === 0) {
        if (emptyEl) emptyEl.hidden = false;
      } else {
        if (emptyEl) emptyEl.hidden = true;
        filtered.forEach((p, i) => {
          const card = document.createElement('article');
          card.className = 'product-card';
          card.style.setProperty('--reveal-d', String(i));
          card.setAttribute('data-reveal', '');

          const badgeHtml = p.badge
            ? `<div class="product-card__badge${p.badge === 'Popular' ? ' product-card__badge--popular' : p.badge === 'Chill Pick' ? ' product-card__badge--chill' : ''}">${p.badge}</div>`
            : '';

          card.innerHTML = `
            <div class="product-card__image-wrapper">
              <div class="product-card__image">
                <img src="${p.img}" alt="${p.name}" loading="lazy" />
              </div>
              <div class="product-card__overlay">
                <button class="product-card__quick-view">Vista Rapida</button>
              </div>
              ${badgeHtml}
            </div>
            <div class="product-card__content">
              <div class="product-card__tag">${p.tag}</div>
              <h3 class="product-card__name">${p.name}</h3>
              <p class="product-card__meta">${p.meta}</p>
              <div class="product-card__footer">
                <span class="product-card__price-amount">&euro;${p.price.toFixed(2)}</span>
                <a href="product.html" class="btn--icon" aria-label="Ver detalle">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>
              </div>
            </div>
          `;

          productGrid.appendChild(card);
        });

        // Trigger reveals on new cards
        requestAnimationFrame(() => {
          productGrid.querySelectorAll('[data-reveal]').forEach(el => {
            revealObserverShop.observe(el);
          });
        });
      }
    }

    // Separate observer for shop cards
    const revealObserverShop = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserverShop.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    // Chip clicks
    if (chipList) {
      chipList.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        chipList.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        activeFilter = chip.dataset.filter;
        renderProducts();
      });

      // Set initial active chip
      const activeChip = chipList.querySelector(`[data-filter="${activeFilter}"]`);
      if (activeChip) {
        chipList.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
        activeChip.classList.add('is-active');
      }
    }

    // Search
    if (searchInput) {
      let debounce;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          searchQuery = searchInput.value.trim();
          renderProducts();
        }, 250);
      });
    }

    // Sort
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        sortMode = sortSelect.value;
        renderProducts();
      });
    }

    // Hide loading, render
    if (loadingEl) loadingEl.hidden = true;
    renderProducts();
  }

  /* ---------------------------------------------------------
     5. TABS (Product page & Auth page)
     --------------------------------------------------------- */
  // Product tabs
  const tabsContainer = document.querySelector('[data-tabs]');
  if (tabsContainer) {
    tabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab');
      if (!btn) return;
      const tabId = btn.dataset.tab;

      tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
      btn.classList.add('is-active');

      const panels = tabsContainer.closest('.product-tabs, .section')
        ?.querySelectorAll('.tab-panel') || document.querySelectorAll('.tab-panel');
      panels.forEach(p => {
        p.classList.toggle('is-active', p.dataset.panel === tabId);
      });
    });
  }

  // Auth tabs
  const authTabs = document.querySelector('[data-auth-tabs]');
  if (authTabs) {
    authTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab');
      if (!btn) return;
      const tabId = btn.dataset.authTab;

      authTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
      btn.classList.add('is-active');

      document.querySelectorAll('[data-auth-panel]').forEach(p => {
        p.classList.toggle('is-active', p.dataset.authPanel === tabId);
      });
    });
  }

  /* ---------------------------------------------------------
     6. QUANTITY SELECTORS
     --------------------------------------------------------- */
  document.querySelectorAll('[data-qty]').forEach(qtyEl => {
    const minus = qtyEl.querySelector('[data-qty-minus]');
    const plus = qtyEl.querySelector('[data-qty-plus]');
    const display = qtyEl.querySelector('[data-qty-value]');
    if (!minus || !plus || !display) return;

    minus.addEventListener('click', () => {
      let val = parseInt(display.textContent, 10) || 1;
      if (val > 1) {
        val--;
        display.textContent = val;
        updateCartTotals();
      }
    });

    plus.addEventListener('click', () => {
      let val = parseInt(display.textContent, 10) || 1;
      val++;
      display.textContent = val;
      updateCartTotals();
    });
  });

  /* ---------------------------------------------------------
     7. CART TOTALS
     --------------------------------------------------------- */
  function updateCartTotals() {
    const items = document.querySelectorAll('[data-cart-item]');
    let subtotal = 0;

    items.forEach(row => {
      const price = parseFloat(row.dataset.price) || 0;
      const qtyEl = row.querySelector('[data-qty-value]');
      const qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      const itemTotal = price * qty;
      subtotal += itemTotal;

      const subtotalEl = row.querySelector('[data-subtotal]');
      if (subtotalEl) subtotalEl.textContent = `€${itemTotal.toFixed(2)}`;
    });

    const subtotalDisplay = document.querySelector('[data-cart-subtotal]');
    if (subtotalDisplay) subtotalDisplay.textContent = `€${subtotal.toFixed(2)}`;

    // Calculate total with shipping
    const shippingInput = document.querySelector('[data-shipping]:checked');
    const shipping = shippingInput ? parseFloat(shippingInput.value) : 0;
    const total = subtotal + shipping;

    const totalDisplay = document.querySelector('[data-cart-total]');
    if (totalDisplay) totalDisplay.textContent = `€${total.toFixed(2)}`;
  }

  // Shipping radio changes
  document.querySelectorAll('[data-shipping]').forEach(radio => {
    radio.addEventListener('change', updateCartTotals);
  });

  // Remove cart item
  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('[data-cart-item]');
      if (row) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all .3s var(--ease)';
        setTimeout(() => {
          row.remove();
          updateCartTotals();
        }, 300);
      }
    });
  });

  /* ---------------------------------------------------------
     8. CHECKOUT
     --------------------------------------------------------- */
  // Coupon toggle
  const couponToggle = document.querySelector('[data-coupon-toggle]');
  const couponPanel = document.querySelector('[data-coupon-panel]');
  if (couponToggle && couponPanel) {
    couponToggle.addEventListener('click', () => {
      couponPanel.hidden = !couponPanel.hidden;
    });
  }

  // Shipping toggle
  const shippingToggle = document.querySelector('[data-shipping-toggle]');
  const shippingPanel = document.querySelector('[data-shipping-panel]');
  if (shippingToggle && shippingPanel) {
    shippingToggle.addEventListener('change', () => {
      shippingPanel.hidden = !shippingToggle.checked;
    });
  }

  // Checkout shipping radio
  document.querySelectorAll('[name="checkout-shipping"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const summaryEl = document.querySelector('[data-checkout-summary]');
      if (!summaryEl) return;
      const subtotal = parseFloat(summaryEl.dataset.subtotal) || 0;
      const shipping = parseFloat(radio.value) || 0;
      const totalEl = document.querySelector('[data-checkout-total]');
      if (totalEl) totalEl.textContent = `€${(subtotal + shipping).toFixed(2)}`;
    });
  });

  // Place order
  const placeOrderBtn = document.querySelector('[data-place-order]');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      const termsCheckbox = placeOrderBtn.closest('.checkout__summary')?.querySelector('.terms input');
      const statusEl = document.querySelector('[data-place-order-status]');

      if (termsCheckbox && !termsCheckbox.checked) {
        if (statusEl) statusEl.hidden = false;
        return;
      }

      if (statusEl) statusEl.hidden = true;
      window.location.href = 'order-success.html';
    });
  }

  /* ---------------------------------------------------------
     9. SCROLL-AWAY HEADER (hide on scroll down, show on scroll up)
     --------------------------------------------------------- */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const SCROLL_THRESHOLD = 80;
    const SCROLL_UP_THRESHOLD = 8;
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
      const y = window.scrollY;
      const scrollingDown = y > lastScrollY;
      const pastThreshold = y > SCROLL_THRESHOLD;
      const scrollDelta = Math.abs(y - lastScrollY);

      siteHeader.classList.toggle('is-scrolled', y > 20);

      if (pastThreshold && scrollingDown && scrollDelta > 2) {
        document.body.classList.add('header-hidden');
        siteHeader.classList.add('site-header--hidden');
      } else if (!scrollingDown || y <= SCROLL_THRESHOLD) {
        document.body.classList.remove('header-hidden');
        siteHeader.classList.remove('site-header--hidden');
      }

      lastScrollY = y;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateHeader();
  }

});
