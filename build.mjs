import { mkdirSync, writeFileSync, copyFileSync, cpSync } from 'node:fs';
import { dirname } from 'node:path';
import { siteHeader, footer, pageTitle, serviceCard as card, serviceGrid as grid, homeHero, workTabs, detailLayout } from './landi.mjs';

const origin = new URL(process.env.SITE_URL || 'https://phillipaaidoo.allmorrow.com').origin;
const linkedin = 'https://gh.linkedin.com/in/phillipa-aidoo';
const amazon = 'https://www.amazon.com/dp/B0HSFRWVTC';
const essay = 'https://www.linkedin.com/pulse/maybe-my-brand-being-me-phillipa-aidoo-rtk1e';
const graphic = 'https://www.graphic.com.gh/entertainment/showbiz-news/i-dont-believe-in-competition-mzphill.html';
const bookPath = '/books/my-blue-rubber-slippers/';
const bookName = 'My Blue Rubber Slippers';
const line = 'Everyone is rich. Only the elite can afford to be poor.';
const author = 'Phillipa Aidoo';
const bookGenre = 'Speculative fiction';
const synopsis = 'In Arcca, everybody owns a fortune. Poverty is a privilege and a market. Then Abena arrives in blue rubber slippers and upsets the price of everything.';
const entity = (id) => ({'@id':id});
const personId = origin+'/#phillipa-aidoo';
const organizations = [
  {'@type':'Organization','@id':origin+'/ventures/#allmorrow',name:'ALLMORROW',founder:entity(personId)},
  {'@type':'Organization','@id':origin+'/ventures/#womate',name:'WOMATE',alternateName:'Women in Climate',sameAs:'https://www.linkedin.com/company/womeninclimategh',founder:entity(personId)},
  {'@type':'Organization','@id':origin+'/ventures/#grow-online-agency',name:'Grow-Online Agency',sameAs:'https://gh.linkedin.com/company/grow-online-agency'},
];
const person = {
  '@type':'Person','@id':personId,name:author,url:origin+'/',
  image:origin+'/assets/photos/phillipa-portrait.webp',sameAs:[linkedin],
  jobTitle:['Founder','Software Developer','Digital Strategist','Author','Chief Operating Officer at WOMATE'],
  knowsAbout:['Software development','Digital marketing','Climate technology','Fiction writing'],
  worksFor:organizations.map((organization)=>entity(organization['@id'])),
};
const book = {
  '@type':'Book','@id':origin+bookPath+'#book',name:bookName,url:origin+bookPath,
  image:origin+'/assets/photos/blue-rubber-slippers.webp',author:entity(personId),
  genre:bookGenre,inLanguage:'en',description:synopsis,
  workExample:{
    '@type':'Book','@id':origin+bookPath+'#kindle-edition',name:bookName,
    bookFormat:'https://schema.org/EBook',url:amazon,author:entity(personId),
  },
};
const nav = [['/about/','About'],['/ventures/','Ventures'],['/portfolio/','Portfolio'],['/books/','Books'],['/journal/','Journal'],['/press/','Press'],['/contact/','Contact']];
const link = (url,label,style='text-link') => `<a class="${style}" href="${url}">${label}</a>`;
const button = 'action';
const cover = `<img class="book-art" src="/assets/photos/blue-rubber-slippers.webp" alt="My Blue Rubber Slippers cover featuring blue slippers in a glass display case" width="960" height="1200" loading="lazy">`;
const feature = `<section class="book-feature"><div>${cover}</div><div><p class="label">Debut novel</p><h2>${bookName}</h2><blockquote>${line}</blockquote>${link(bookPath,'Explore the novel',button)}</div></section>`;
const pages = [
  ['/', 'Phillipa Aidoo — Founder, Developer, Strategist & Author', 'Meet Phillipa Aidoo, founder of ALLMORROW, co-founder and COO of WOMATE, software developer, digital strategist and author of My Blue Rubber Slippers.', `
    ${homeHero(bookPath,bookName)}
    ${workTabs()}
    <div class="container">${feature}</div>
    <section class="call-to-action section"><div class="container"><div class="row content justify-content-center align-items-center position-relative"><div class="col-lg-8 mx-auto text-center">
    <h2 class="display-4 mb-4">Let’s talk</h2><p class="mb-4">I’d love to hear what you’re working on or what stayed with you after reading the book.</p>${link('/contact/','Get in touch','btn btn-cta')}
    </div></div></div></section>`],
  ['/about/', 'About Phillipa Aidoo | Biography & Background', 'Read about Phillipa Aidoo’s work in software development, digital strategy, women’s climate leadership, the creative industries and fiction.', `
    <section class="about section"><div class="container"><div class="row align-items-center gy-4"><div class="col-lg-7 prose"><p>I’ve been telling stories since I was thirteen. I studied at the Ghana Institute of Journalism, and my creative work has taken me into music, artist management and fiction. African life gives me plenty to write about, especially the things people do that are hard to explain.</p>
    <p>I founded ALLMORROW to build software and work with businesses on their websites and digital strategy through Grow-Online Agency. I also co-founded WOMATE (Women in Climate), where I’m Chief Operating Officer, Chief Strategist and Full-stack Developer. I designed its integrated climate-tech ecosystem and help set the organisation’s direction.</p>
    <p>My debut novel, <a href="${bookPath}"><em>${bookName}</em></a>, takes place in a country where poverty is a privilege. I also write essays about faith, who gets to exercise authority and the versions of ourselves we put online.</p>
    ${link(linkedin,'Find Phillipa on LinkedIn',button)}</div><div class="col-lg-5"><img class="author-photo img-fluid" src="/assets/photos/phillipa-portrait.webp" alt="Professional portrait of Phillipa Aidoo" width="960" height="960"></div></div></div></section>`, 'About Phillipa', 'I’m a founder, developer and writer based in Accra, Ghana.'],
  ['/ventures/', 'Ventures | ALLMORROW, WOMATE & Grow-Online Agency', 'Explore Phillipa Aidoo’s work with ALLMORROW, women’s climate leadership through WOMATE and digital strategy at Grow-Online Agency.', grid(
    card('Founder','ALLMORROW','I founded ALLMORROW and build software there, including CIRQUVO and handEwork.','/portfolio/','Explore the portfolio'),
    card('Co-founder &amp; Chief Operating Officer','WOMATE','As Chief Strategist and Full-stack Developer, I designed WOMATE’s integrated climate-tech ecosystem and shape the organisation’s strategic direction.','https://www.linkedin.com/company/womeninclimategh','Visit WOMATE'),
    card('Digital strategy','Grow-Online Agency','I help businesses decide how to reach customers online, then work on the websites and social media that support that plan.','https://gh.linkedin.com/company/grow-online-agency','Visit Grow-Online Agency')), 'Ventures'],
  ['/portfolio/', 'Portfolio | Phillipa Aidoo’s Software & Creative Work', 'Selected work and practice areas across Phillipa Aidoo’s software development, digital strategy and artist management.', grid(
    card('Software development','CIRQUVO','In development at ALLMORROW.'),
    card('Software development','handEwork','A software project at ALLMORROW.'),
    card('Digital strategy','Web & brand strategy','At Grow-Online Agency, I develop websites and plan how businesses show up across their online channels.','/ventures/','About Grow-Online Agency'),
    card('Creative industries','Artist management','I’ve worked in music and artist management. Get in touch if you have a music or artist project in mind.','/contact/','Discuss a project')), 'Selected work'],
  ['/books/', 'Books by Phillipa Aidoo | Fiction & New Releases', 'Discover books by Phillipa Aidoo, starting with her debut novel My Blue Rubber Slippers, available on Kindle.', '<div class="container">' + feature + '</div>', 'Books'],
  [bookPath, 'My Blue Rubber Slippers | A Novel by Phillipa Aidoo', 'In Phillipa Aidoo’s debut novel, everyone in Arcca has a fortune. Then Abena arrives in blue rubber slippers and upsets the price of everything.', `
    ${detailLayout(
      `<div class="service-box"><h4>Kindle edition</h4><div class="services-list">
      <a class="active" href="${amazon}"><i class="bi bi-book" aria-hidden="true"></i><span>Buy the Kindle edition on Amazon</span></a>
      <a href="${amazon}#customerReviews"><i class="bi bi-chat" aria-hidden="true"></i><span>Reader reviews on Amazon</span></a></div></div>
      <div class="help-box d-flex flex-column justify-content-center align-items-center"><h4>Book enquiries</h4><a href="/contact/">Contact Phillipa</a></div>`,
      `<div class="book-feature detail"><div>${cover}</div><div><p class="eyebrow">${bookGenre}</p><p>By <a href="/about/">${author}</a></p><blockquote>${line}</blockquote>
      <p>${synopsis}</p>
      <section class="sample"><h2>Read a sample</h2><p>Find preview options on the Kindle page.</p>${link(amazon,'Open Kindle listing')}</section></div></div>`)}
    <section class="section book-gallery"><div class="container"><div class="section-title"><h2>Book artwork</h2></div><div class="row g-4 justify-content-center"><div class="col-sm-6 col-lg-4"><img src="/assets/photos/literary-showcase.webp" alt="Literary showcase poster for My Blue Rubber Slippers" width="960" height="1200" loading="lazy"></div><div class="col-sm-6 col-lg-4"><img src="/assets/photos/editorial-display.webp" alt="Stack of My Blue Rubber Slippers books against a lavender and turquoise background" width="853" height="1280" loading="lazy"></div></div></div></section>`],
  ['/journal/', 'Journal | Essays & Ideas by Phillipa Aidoo', 'Read Phillipa Aidoo’s essays on personal branding, identity, faith and authority, with links to her published writing.', grid(
    card('Identity & creative work','Maybe My Brand Is Being Me','I asked ChatGPT to write me a bio for my very important LinkedIn audience. Then I rewrote it to sound like me.',essay,'Read the essay'),
    card('Faith & society','The Illusion of Authority','What happens when people take dominion as permission to rule over everything?',linkedin+'#articles','Browse published essays')), 'Journal', 'On faith, authority and the strange business of being yourself online.'],
  ['/press/', 'Press & Media | Phillipa Aidoo', 'Press coverage, a short professional biography, and interview and speaking enquiries for Phillipa Aidoo.', grid(
    card('Graphic Showbiz · December 2024','I don’t believe in competition','Gifty Owusu-Amoah interviews Mzphill about the single “Josiah” and what it means to grow as an artist.',graphic,'Read the interview'),
    card('For editors & event organisers','Short biography','Phillipa Aidoo is a Ghanaian founder, software developer, digital strategist and author. She founded ALLMORROW, co-founded WOMATE and wrote the novel My Blue Rubber Slippers.','/contact/','Request press materials')), 'Press', 'Interviews and a short bio for editors and event organisers.'],
  ['/contact/', 'Contact Phillipa Aidoo | Business, Press & Readers', 'Contact Phillipa Aidoo for technology projects, partnerships, interviews, speaking, creative collaborations or reader enquiries.', grid(
    card('Business & creative work','Work with me','Tell me what you’re working on and where you’d like me to come in.',linkedin,'Connect on LinkedIn'),
    card('Press & literary enquiries','Get in touch','For interviews, speaking invitations and book enquiries, send me a note on LinkedIn. I’d love to hear from readers, too.',linkedin,'Find Phillipa on LinkedIn'),
    card('Writing updates','Follow my writing','I share new essays and book updates on LinkedIn.',linkedin,'Follow on LinkedIn')), 'Contact'],
];

function escapeHtml(value) {
  return value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}
function output(file, value) {
  const path = 'dist/' + file;
  mkdirSync(dirname(path), {recursive:true});
  writeFileSync(path, value);
}
for (const [path,title,description,body,heading,intro] of pages) {
  const canonical = origin + path;
  const pageHeading = heading || (path === bookPath ? bookName : '');
  const graph = [person, ...organizations, {'@type':'WebSite','@id':origin+'/#website',name:author,url:origin+'/',publisher:{'@id':person['@id']}},
    {'@type': path==='/' || path==='/about/' ? 'ProfilePage' : 'WebPage', '@id':canonical+'#page',url:canonical,name:title,description,isPartOf:{'@id':origin+'/#website'},mainEntity:{'@id':path===bookPath?book['@id']:person['@id']}}];
  if (path==='/' || path===bookPath || path==='/books/') graph.push(book);
  if (path==='/journal/') graph.push({'@type':'Article',headline:'Maybe My Brand Is Being Me',url:essay,datePublished:'2025-07-12',author:{'@id':person['@id']}});
  if (path!=='/') {
    const trail = [['/','Home'], ...(path===bookPath?[['/books/','Books']]:[]), [path,heading||bookName]];
    graph.push({'@type':'BreadcrumbList',itemListElement:trail.map(([url,name],i)=>({'@type':'ListItem',position:i+1,name,item:origin+url}))});
  }
  output(path.slice(1)+'index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${path==='/about/'?'profile':path===bookPath?'book':'website'}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:site_name" content="Phillipa Aidoo">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${origin}/assets/photos/${path.startsWith('/books/') ? 'blue-rubber-slippers' : 'phillipa-portrait'}.webp">
<meta name="twitter:card" content="summary">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/landi/bootstrap.min.css">
<link rel="stylesheet" href="/assets/landi/bootstrap-icons.css">
<link rel="stylesheet" href="/assets/landi/main.css">
<link rel="stylesheet" href="/assets/site.css">
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${siteHeader(nav,path)}
<main id="main" class="main">${pageHeading ? pageTitle(pageHeading,intro,path === bookPath) : ''}${body}</main>
${footer(linkedin)}
<script src="/assets/landi/bootstrap.bundle.min.js" defer></script>
<script src="/assets/site.js" defer></script>
</body>
</html>`);
}
output('404.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found | Phillipa Aidoo</title><meta name="robots" content="noindex"><link rel="stylesheet" href="/assets/site.css"><main class="error"><h1>Page not found.</h1><a class="action" href="/">Back to Phillipa Aidoo</a></main></html>');
output('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
output('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+pages.map(([path])=>`  <url><loc>${origin}${path}</loc></url>`).join('\n')+'\n</urlset>\n');
mkdirSync('dist/assets', {recursive:true});
for (const asset of ['site.css','favicon.svg','site.js']) copyFileSync('assets/'+asset,'dist/assets/'+asset);
cpSync('assets/landi','dist/assets/landi',{recursive:true});
cpSync('assets/photos','dist/assets/photos',{recursive:true});
