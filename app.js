/* =========================================================
   CULTURA CANNABICA — App Logic
   Scroll reveals · Shop filters · Cart · Tabs · Nav
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     0. LANGUAGE SWITCHER (i18n)
     --------------------------------------------------------- */
  const TRANSLATIONS = {
    es: {
      'topbar.msg':     'Envío discreto 48-72 h · Atención en tienda Madrid',
      'topbar.contact': 'Contacto',
      'nav.shop':       'Tienda',
      'nav.categories': 'Categorias',
      'nav.collection': 'Coleccion STV',
      'nav.experience': 'Experiencia',
      'nav.search':     'Buscar',
      'nav.account':    'Mi cuenta',
      'nav.cart':       'Carrito &middot; 0',
      'hero.eyebrow':   'Premium CBD & Grow Shop',
      'hero.title':     'Cultiva<br><em>Excelencia</em>',
      'hero.lead':      'Descubre flores CBD premium, extractos puros, semillas de genetica top y equipamiento profesional de cultivo. Todo lo que necesitas en un solo lugar.',
      'hero.cta':       'Explorar Tienda',
      'hero.cta2':      'Ver Destacados',
      'hero.stat1':     'Productos',
      'hero.stat2':     'Clientes',
      'hero.stat3':     'Soporte',
      'hero.badge':     '<strong>Nuevo</strong> &mdash; STV Amnesia 2 ml',
      'immersive.eyebrow': 'Experiencia Interactiva',
      'immersive.title':   'Explora Nuestro<br>Universo',
      'immersive.text':    'Una experiencia inmersiva que captura la esencia de Cultura Cannabica. Interactua con el modelo 3D arrastrando y explorando.',
      'immersive.cta':     'Descubrir Mas',
      'cat.eyebrow':       'Comprar por Categoria',
      'cat.title':         'Explora Nuestras Colecciones',
      'cat.subtitle':      'Encuentra exactamente lo que necesitas para tu viaje de cultivo.',
      'cat.link':          'Comprar ahora &rarr;',
      'cat.cbd':           'Flores CBD',
      'cat.cbd_desc':      'Cepas indoor y outdoor de genetica premium con perfiles terpenicos unicos.',
      'cat.stv':           'STV Collection',
      'cat.stv_desc':      'Cartuchos y vapers de Sativanol.',
      'cat.extracts':      'Extractos',
      'cat.extracts_desc': 'Aceites puros y resinas premium.',
      'cat.seeds':         'Semillas',
      'cat.seeds_desc':    'Geneticas premium y variedades top.',
      'cat.grow':          'Grow Equipment',
      'cat.grow_desc':     'Equipamiento profesional de cultivo.',
      'cat.accessories':      'Accesorios',
      'cat.accessories_desc': 'Grinders, papeles, baterias y mas.',
      'featured.eyebrow': 'Seleccion Destacada',
      'featured.title':   'Los Mas Vendidos',
      'featured.cta':     'Ver todo &rarr;',
      'spot.eyebrow':     'Coleccion Exclusiva',
      'spot.title':       'Descubre<br>Sativanol',
      'spot.lead':        'Nuestra linea STV ofrece una experiencia unica con extractos de canamo organico de la mas alta pureza. Compatibles con baterias 510, hasta 1.200 caladas por cartucho.',
      'spot.tag3':        'Terpenos Naturales',
      'spot.cta':         'Explorar Coleccion',
      'trust.eyebrow':    'Por Que Elegirnos',
      'trust.title':      'La Experiencia Cultura Cannabica',
      'trust.t1':         'Calidad Garantizada',
      'trust.d1':         'Todos nuestros productos pasan controles de laboratorio y cumplen normativa vigente.',
      'trust.t2':         'Envio Discreto 48h',
      'trust.d2':         'Paqueteria anonima con seguimiento. Recogida gratuita en Madrid.',
      'trust.t3':         'Atencion Personal',
      'trust.d3':         'Equipo experto disponible para asesorarte en tienda y online.',
      'trust.t4':         'Catalogo Completo',
      'trust.d4':         'Mas de 500 productos entre flores, extractos, semillas y equipamiento.',
      'news.title':       'Mantente al Dia',
      'news.subtitle':    'Recibe novedades, ofertas exclusivas y consejos de cultivo directamente en tu bandeja.',
      'news.placeholder': 'Tu email',
      'news.cta':         'Suscribirse',
      'news.privacy':     'Respetamos tu privacidad. Cancela cuando quieras.',
      'footer.contact':   'Contacto',
      'footer.shop':      'Tienda',
      'footer.legal1':    'Uso ornamental o coleccionismo.',
      'footer.legal2':    'THC &lt; 0,02% segun normativa vigente.',
      'footer.privacy':   'Politica de privacidad',
      'footer.terms':     'Terminos y condiciones',
    },
    ca: {
      'topbar.msg':     'Enviament discret 48-72 h · Atenció a botiga Madrid',
      'topbar.contact': 'Contacte',
      'nav.shop':       'Botiga',
      'nav.categories': 'Categories',
      'nav.collection': 'Col·lecció STV',
      'nav.experience': 'Experiència',
      'nav.search':     'Cercar',
      'nav.account':    'El meu compte',
      'nav.cart':       'Cistella &middot; 0',
      'hero.eyebrow':   'Premium CBD & Grow Shop',
      'hero.title':     'Cultiva<br><em>Excel·lència</em>',
      'hero.lead':      'Descobreix flors CBD premium, extractes purs, llavors de genètica top i equipament professional de cultiu. Tot el que necessites en un sol lloc.',
      'hero.cta':       'Explorar Botiga',
      'hero.cta2':      'Veure Destacats',
      'hero.stat1':     'Productes',
      'hero.stat2':     'Clients',
      'hero.stat3':     'Suport',
      'hero.badge':     '<strong>Nou</strong> &mdash; STV Amnesia 2 ml',
      'immersive.eyebrow': 'Experiència Interactiva',
      'immersive.title':   'Explora el Nostre<br>Univers',
      'immersive.text':    'Una experiència immersiva que captura l\'essència de Cultura Cannabica. Interactua amb el model 3D arrossegant i explorant.',
      'immersive.cta':     'Descobrir Més',
      'cat.eyebrow':       'Comprar per Categoria',
      'cat.title':         'Explora les Nostres Col·leccions',
      'cat.subtitle':      'Troba exactament el que necessites per al teu viatge de cultiu.',
      'cat.link':          'Comprar ara &rarr;',
      'cat.cbd':           'Flors CBD',
      'cat.cbd_desc':      'Varietats indoor i outdoor de genètica premium amb perfils terpènics únics.',
      'cat.stv':           'Col·lecció STV',
      'cat.stv_desc':      'Cartutxos i vapers de Sativanol.',
      'cat.extracts':      'Extractes',
      'cat.extracts_desc': 'Olis purs i resines premium.',
      'cat.seeds':         'Llavors',
      'cat.seeds_desc':    'Genètiques premium i varietats top.',
      'cat.grow':          'Equipament de Cultiu',
      'cat.grow_desc':     'Equipament professional de cultiu.',
      'cat.accessories':      'Accessoris',
      'cat.accessories_desc': 'Grinders, papers, bateries i més.',
      'featured.eyebrow': 'Selecció Destacada',
      'featured.title':   'Els Més Venuts',
      'featured.cta':     'Veure tot &rarr;',
      'spot.eyebrow':     'Col·lecció Exclusiva',
      'spot.title':       'Descobreix<br>Sativanol',
      'spot.lead':        'La nostra línia STV ofereix una experiència única amb extractes de cànem orgànic de la més alta puresa. Compatibles amb bateries 510, fins a 1.200 calades per cartutx.',
      'spot.tag3':        'Terpens Naturals',
      'spot.cta':         'Explorar Col·lecció',
      'trust.eyebrow':    'Per Què Escollir-nos',
      'trust.title':      'L\'Experiència Cultura Cannabica',
      'trust.t1':         'Qualitat Garantida',
      'trust.d1':         'Tots els nostres productes passen controls de laboratori i compleixen la normativa vigent.',
      'trust.t2':         'Enviament Discret 48h',
      'trust.d2':         'Paqueteria anònima amb seguiment. Recollida gratuïta a Madrid.',
      'trust.t3':         'Atenció Personal',
      'trust.d3':         'Equip expert disponible per assessorar-te a botiga i online.',
      'trust.t4':         'Catàleg Complet',
      'trust.d4':         'Més de 500 productes entre flors, extractes, llavors i equipament.',
      'news.title':       'Mantén-te al Dia',
      'news.subtitle':    'Rep novetats, ofertes exclusives i consells de cultiu directament a la teva bústia.',
      'news.placeholder': 'El teu email',
      'news.cta':         'Subscriure\'s',
      'news.privacy':     'Respectem la teva privacitat. Cancel·la quan vulguis.',
      'footer.contact':   'Contacte',
      'footer.shop':      'Botiga',
      'footer.legal1':    'Ús ornamental o col·leccionisme.',
      'footer.legal2':    'THC &lt; 0,02% segons normativa vigent.',
      'footer.privacy':   'Política de privacitat',
      'footer.terms':     'Termes i condicions',
    },
    en: {
      'topbar.msg':     'Discreet shipping 48-72h · In-store service Madrid',
      'topbar.contact': 'Contact',
      'nav.shop':       'Shop',
      'nav.categories': 'Categories',
      'nav.collection': 'STV Collection',
      'nav.experience': 'Experience',
      'nav.search':     'Search',
      'nav.account':    'My Account',
      'nav.cart':       'Cart &middot; 0',
      'hero.eyebrow':   'Premium CBD & Grow Shop',
      'hero.title':     'Cultivate<br><em>Excellence</em>',
      'hero.lead':      'Discover premium CBD flowers, pure extracts, top-genetics seeds and professional grow equipment. Everything you need in one place.',
      'hero.cta':       'Explore Shop',
      'hero.cta2':      'View Featured',
      'hero.stat1':     'Products',
      'hero.stat2':     'Customers',
      'hero.stat3':     'Support',
      'hero.badge':     '<strong>New</strong> &mdash; STV Amnesia 2 ml',
      'immersive.eyebrow': 'Interactive Experience',
      'immersive.title':   'Explore Our<br>Universe',
      'immersive.text':    'An immersive experience that captures the essence of Cultura Cannabica. Interact with the 3D model by dragging and exploring.',
      'immersive.cta':     'Discover More',
      'cat.eyebrow':       'Shop by Category',
      'cat.title':         'Explore Our Collections',
      'cat.subtitle':      'Find exactly what you need for your growing journey.',
      'cat.link':          'Shop now &rarr;',
      'cat.cbd':           'CBD Flowers',
      'cat.cbd_desc':      'Indoor and outdoor strains of premium genetics with unique terpene profiles.',
      'cat.stv':           'STV Collection',
      'cat.stv_desc':      'Sativanol cartridges and vaporizers.',
      'cat.extracts':      'Extracts',
      'cat.extracts_desc': 'Pure oils and premium resins.',
      'cat.seeds':         'Seeds',
      'cat.seeds_desc':    'Premium genetics and top varieties.',
      'cat.grow':          'Grow Equipment',
      'cat.grow_desc':     'Professional growing equipment.',
      'cat.accessories':      'Accessories',
      'cat.accessories_desc': 'Grinders, papers, batteries and more.',
      'featured.eyebrow': 'Featured Selection',
      'featured.title':   'Best Sellers',
      'featured.cta':     'View all &rarr;',
      'spot.eyebrow':     'Exclusive Collection',
      'spot.title':       'Discover<br>Sativanol',
      'spot.lead':        'Our STV line offers a unique experience with organic hemp extracts of the highest purity. Compatible with 510 batteries, up to 1,200 puffs per cartridge.',
      'spot.tag3':        'Natural Terpenes',
      'spot.cta':         'Explore Collection',
      'trust.eyebrow':    'Why Choose Us',
      'trust.title':      'The Cultura Cannabica Experience',
      'trust.t1':         'Guaranteed Quality',
      'trust.d1':         'All our products pass laboratory controls and comply with current regulations.',
      'trust.t2':         'Discreet Shipping 48h',
      'trust.d2':         'Anonymous packaging with tracking. Free pickup in Madrid.',
      'trust.t3':         'Personal Support',
      'trust.d3':         'Expert team available to advise you in store and online.',
      'trust.t4':         'Complete Catalog',
      'trust.d4':         'Over 500 products including flowers, extracts, seeds and equipment.',
      'news.title':       'Stay Up to Date',
      'news.subtitle':    'Receive news, exclusive offers and growing tips directly in your inbox.',
      'news.placeholder': 'Your email',
      'news.cta':         'Subscribe',
      'news.privacy':     'We respect your privacy. Cancel anytime.',
      'footer.contact':   'Contact',
      'footer.shop':      'Shop',
      'footer.legal1':    'Ornamental or collectible use.',
      'footer.legal2':    'THC &lt; 0.02% per current regulations.',
      'footer.privacy':   'Privacy policy',
      'footer.terms':     'Terms and conditions',
    }
  };

  let currentLang = localStorage.getItem('cc-lang') || 'es';

  function applyTranslations(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    document.documentElement.lang = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';
  }

  const langSwitcher = document.querySelector('[data-lang-switcher]');
  if (langSwitcher) {
    // Set initial state
    langSwitcher.querySelectorAll('.lang-switcher__btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === currentLang);
    });
    if (currentLang !== 'es') applyTranslations(currentLang);

    langSwitcher.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-switcher__btn');
      if (!btn) return;
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;

      currentLang = lang;
      localStorage.setItem('cc-lang', lang);
      langSwitcher.querySelectorAll('.lang-switcher__btn').forEach(b => {
        b.classList.toggle('is-active', b.dataset.lang === lang);
      });
      applyTranslations(lang);
    });
  }

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
