export function siteHeader(nav, path) {
  const navigation = [['/','Home'], ...nav.filter(([url]) => url !== '/contact/')];
  return `<header id="header" class="header d-flex align-items-center fixed-top">
    <div class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      <a href="/" class="logo d-flex align-items-center me-auto me-xl-0"><span class="sitename">Phillipa Aidoo<span>.</span></span></a>
      <nav id="navmenu" class="navmenu" aria-label="Main navigation">
        <ul id="site-navigation">${navigation.map(([url,label]) => {
          const active = url === '/' ? path === '/' : path.startsWith(url);
          return `<li><a href="${url}"${active ? ' class="active" aria-current="page"' : ''}>${label}</a></li>`;
        }).join('')}<li class="d-xl-none"><a href="/contact/">Contact</a></li></ul>
        <button class="mobile-nav-toggle d-xl-none bi bi-list" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-navigation"></button>
      </nav>
      <a class="btn-getstarted d-none d-xl-inline-block" href="/contact/"${path === '/contact/' ? ' aria-current="page"' : ''}>Contact</a>
    </div>
  </header>`;
}

export function footer(linkedin) {
  return `<footer id="footer" class="footer">
    <div class="container footer-top"><div class="row gy-4">
      <div class="col-lg-6 footer-about">
        <a href="/" class="logo d-flex align-items-center"><span class="sitename">Phillipa Aidoo.</span></a>
        <p class="mt-2 mb-0">Founder, developer and author in Accra, Ghana.</p>
        <div class="social-links d-flex mt-3"><a href="${linkedin}" aria-label="Phillipa Aidoo on LinkedIn"><i class="bi bi-linkedin" aria-hidden="true"></i></a></div>
      </div>
      <div class="col-6 col-lg-3 footer-links"><h4>Explore</h4><ul><li><a href="/about/">About</a></li><li><a href="/ventures/">Ventures</a></li><li><a href="/portfolio/">Portfolio</a></li></ul></div>
      <div class="col-6 col-lg-3 footer-links"><h4>Writing &amp; media</h4><ul><li><a href="/books/">Books</a></li><li><a href="/journal/">Journal</a></li><li><a href="/press/">Press</a></li><li><a href="/contact/">Contact</a></li></ul></div>
    </div></div>
  </footer><button class="scroll-top d-flex align-items-center justify-content-center" type="button" aria-label="Back to top"><i class="bi bi-arrow-up" aria-hidden="true"></i></button>`;
}

export function pageTitle(heading, intro, parent) {
  return `<div class="page-title light-background"><div class="container">
    <h1>${heading}</h1>
    <nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li>${parent ? '<li><a href="/books/">Books</a></li>' : ''}<li class="current" aria-current="page">${heading}</li></ol></nav>
    ${intro ? `<p class="page-intro">${intro}</p>` : ''}
  </div></div>`;
}

export function serviceCard(label, title, body, url, cta) {
  return `<div class="col-lg-6"><article class="service-card d-flex">
    <div class="icon flex-shrink-0"><i class="bi bi-${url ? 'bookmark' : 'code-square'}" aria-hidden="true"></i></div>
    <div><p class="eyebrow">${label}</p><h3>${title}</h3><p>${body}</p>${url ? `<a href="${url}" class="read-more">${cta}</a>` : ''}</div>
  </article></div>`;
}
export function serviceGrid(...cards) {
  return `<section class="services section light-background" aria-label="Explore this page"><div class="container"><div class="row g-4">${cards.join('')}</div></div></section>`;
}

export function homeHero(bookPath, bookName) {
  const roles = [
    ['code-slash','ALLMORROW','Founder','/ventures/'],
    ['globe-africa','WOMATE','Co-founder &amp; COO','/ventures/'],
    ['window','Grow-Online Agency','Digital strategy','/portfolio/'],
    ['book','Fiction & essays','Author','/books/'],
  ];
  return `<section id="hero" class="hero section">
    <div class="container">
      <div class="row align-items-center gy-4">
        <div class="col-lg-6"><div class="hero-content">
          <div class="company-badge mb-4"><i class="bi bi-geo-alt me-2" aria-hidden="true"></i> Accra, Ghana</div>
          <h1 class="mb-4">Phillipa <span class="accent-text">Aidoo.</span></h1>
          <p class="manifesto mb-3">I build things. I write things.<br>Occasionally, I question everything.</p>
          <p class="mb-4">I work across software, digital strategy, climate action and fiction. Some ideas turn into platforms. One turned into an entire fictional civilisation.</p>
          <div class="hero-buttons"><a href="/portfolio/" class="btn btn-primary me-2">Explore my work</a><a href="/books/" class="btn btn-link"><i class="bi bi-book me-1" aria-hidden="true"></i> Browse my books</a></div>
        </div></div>
        <div class="col-lg-6"><div class="hero-image">
          <img class="author-photo hero-photo img-fluid" src="/assets/photos/phillipa-hero.webp" alt="Phillipa Aidoo in a patterned pink dress" width="960" height="960" fetchpriority="high">
          <div class="customers-badge"><p class="mb-1 eyebrow">Debut novel</p><a href="${bookPath}">${bookName}</a></div>
        </div></div>
      </div>
      <div class="row stats-row gy-4 mt-5">
        ${roles.map(([icon,name,role,url]) => `<div class="col-lg-3 col-md-6"><a href="${url}" class="stat-item"><span class="stat-icon"><i class="bi bi-${icon}" aria-hidden="true"></i></span><span class="stat-content"><strong>${name}</strong><span class="d-block">${role}</span></span></a></div>`).join('')}
      </div>
    </div>
  </section>`;
}

export function workTabs() {
  const tabs = [
    ['technology','Technology','Building software and digital experiences','My work at ALLMORROW includes CIRQUVO and handEwork. Through Grow-Online Agency I work across web development, digital strategy and brand visibility.','/portfolio/','Explore the portfolio','code-square'],
    ['climate','Climate','Supporting women in climate leadership','As WOMATE’s COO, Chief Strategist and Full-stack Developer, I shape its strategy and build its integrated climate-tech ecosystem.','/ventures/','Explore the ventures','globe-africa'],
    ['writing','Writing','Fiction, essays and inconvenient questions','My debut novel is My Blue Rubber Slippers. In my essays, I write about faith, identity, authority and the pressure to sound polished online.','/journal/','Read the journal','pen'],
  ];
  return `<section id="features" class="features section">
    <div class="container section-title"><h2>Across disciplines</h2></div>
    <div class="container">
      <div class="d-flex justify-content-center"><ul class="nav nav-tabs" role="tablist">${tabs.map(([id,label],index) => `<li class="nav-item" role="presentation"><button class="nav-link${index === 0 ? ' active' : ''}" id="tab-${id}" type="button" data-bs-toggle="tab" data-bs-target="#panel-${id}" role="tab" aria-controls="panel-${id}" aria-selected="${index === 0}">${label}</button></li>`).join('')}</ul></div>
      <div class="tab-content">${tabs.map(([id,label,title,description,url,cta,icon],index) => `<div class="tab-pane fade${index === 0 ? ' show active' : ''}" id="panel-${id}" role="tabpanel" aria-labelledby="tab-${id}" tabindex="0"><div class="row align-items-center gy-4"><div class="col-lg-7"><h3>${title}</h3><p>${description}</p><a class="read-more" href="${url}">${cta}</a></div><div class="col-lg-5"><div class="feature-art" aria-hidden="true"><i class="bi bi-${icon}"></i></div></div></div></div>`).join('')}</div>
    </div>
  </section>`;
}

export function detailLayout(sidebar, body) {
  return `<section id="service-details" class="service-details section"><div class="container"><div class="row gy-5"><aside class="col-lg-4 order-2 order-lg-1">${sidebar}</aside><div class="col-lg-8 ps-lg-5 order-1 order-lg-2">${body}</div></div></div></section>`;
}

