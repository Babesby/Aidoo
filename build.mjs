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
const person = {'@type':'Person','@id':origin+'/#phillipa-aidoo',name:author,url:origin+'/',image:origin+'/assets/photos/phillipa-portrait.webp',sameAs:[linkedin],jobTitle:['Author','Software Developer','Digital Strategist','Chief Operating Officer at WOMATE'],worksFor:[{'@type':'Organization',name:'ALLMORROW'},{'@type':'Organization',name:'WOMATE',sameAs:'https://www.linkedin.com/company/womeninclimategh'},{'@type':'Organization',name:'Grow-Online Agency',sameAs:'https://gh.linkedin.com/company/grow-online-agency'}]};
const book = {'@type':'Book','@id':origin+bookPath+'#book',name:bookName,url:origin+bookPath,image:origin+'/assets/photos/blue-rubber-slippers.webp',author:{'@id':person['@id']},bookFormat:'https://schema.org/EBook',sameAs:[amazon],inLanguage:'en',description:line};
const nav = [['/about/','About'],['/ventures/','Ventures'],['/portfolio/','Portfolio'],['/books/','Books'],['/journal/','Journal'],['/press/','Press'],['/contact/','Contact']];
const link = (url,label,style='text-link') => `<a class="${style}" href="${url}">${label}</a>`;
const button = 'action';
const cover = `<img class="book-art" src="/assets/photos/blue-rubber-slippers.webp" alt="My Blue Rubber Slippers cover featuring blue slippers in a glass display case" width="960" height="1200" loading="lazy">`;
const feature = `<section class="book-feature"><div>${cover}</div><div><p class="label">Debut novel</p><h2>${bookName}</h2><blockquote>${line}</blockquote>${link(bookPath,'Explore the novel',button)}</div></section>`;
const pages = [
  ['/', 'Phillipa Aidoo | Founder, Developer & Author', 'Official website of Phillipa Aidoo, founder of ALLMORROW, co-founder of WOMATE, digital strategist, software developer and author of My Blue Rubber Slippers.', `
    ${homeHero(bookPath,bookName)}
    ${workTabs()}
    <div class="container">${feature}</div>
    <section class="call-to-action section"><div class="container"><div class="row content justify-content-center align-items-center position-relative"><div class="col-lg-8 mx-auto text-center">
    <h2 class="display-4 mb-4">Let’s talk</h2><p class="mb-4">For projects, interviews and notes from readers.</p>${link('/contact/','Get in touch','btn btn-cta')}
    </div></div></div></section>`],
  ['/about/', 'About Phillipa Aidoo | Biography & Background', 'Read about Phillipa Aidoo’s work in software development, digital strategy, women’s climate leadership, the creative industries and fiction.', `
    <section class="about section"><div class="container"><div class="row align-items-center gy-4"><div class="col-lg-7 prose"><p>Phillipa Aidoo is a Ghanaian founder, software developer, digital strategist and author. She founded ALLMORROW and co-founded WOMATE (Women in Climate), where she serves as Chief Operating Officer, Chief Strategist and Full-stack Developer. She designed WOMATE’s integrated climate-tech ecosystem and shapes the organisation’s strategic direction.</p>
    <p>Her background includes the Ghana Institute of Journalism and work in web development and digital strategy through Grow-Online Agency. Her creative experience spans music, artist management and writing.</p>
    <p>Her debut novel is <a href="${bookPath}"><em>${bookName}</em></a>. In her nonfiction, she writes about authority, spirituality and identity, with a particular interest in the assumptions people inherit and the voices that get heard.</p>
    ${link(linkedin,'Find Phillipa on LinkedIn',button)}</div><div class="col-lg-5"><img class="author-photo img-fluid" src="/assets/photos/phillipa-portrait.webp" alt="Professional portrait of Phillipa Aidoo" width="960" height="960"></div></div></div></section>`, 'About me', 'Founder, developer, digital strategist and author based in Accra, Ghana.'],
  ['/ventures/', 'Ventures | ALLMORROW, WOMATE & Grow-Online Agency', 'Explore Phillipa Aidoo’s work with ALLMORROW, women’s climate leadership through WOMATE and digital strategy at Grow-Online Agency.', grid(
    card('Founder','ALLMORROW','My technology venture and the home of my software projects, including CIRQUVO and handEwork.','/portfolio/','Explore the portfolio'),
    card('Co-founder &amp; Chief Operating Officer','WOMATE','As Chief Strategist and Full-stack Developer, I designed WOMATE’s integrated climate-tech ecosystem and shape the organisation’s strategic direction.','https://www.linkedin.com/company/womeninclimategh','Visit WOMATE'),
    card('Digital strategy','Grow-Online Agency','My work with GoA spans digital strategy, web development, social media and brand visibility.','https://gh.linkedin.com/company/grow-online-agency','Visit Grow-Online Agency')), 'Ventures', 'Technology, digital strategy and women’s climate leadership.'],
  ['/portfolio/', 'Portfolio | Phillipa Aidoo’s Software & Creative Work', 'Selected work and practice areas across Phillipa Aidoo’s software development, digital strategy and artist management.', grid(
    card('Software development','CIRQUVO','A software project I’m building through ALLMORROW.'),
    card('Software development','handEwork','A software project within my ALLMORROW portfolio.'),
    card('Digital strategy','Web & brand strategy','I work on websites, social media and digital visibility through Grow-Online Agency.','/ventures/','About Grow-Online Agency'),
    card('Creative industries','Artist management','My creative work includes artist management and music. For project or collaboration enquiries, get in touch.','/contact/','Discuss a project')), 'Selected work', 'Software projects, digital strategy and creative work.'],
  ['/books/', 'Books by Phillipa Aidoo | Fiction & New Releases', 'Discover books by Phillipa Aidoo, starting with her debut novel My Blue Rubber Slippers, available on Kindle.', '<div class="container">' + feature + '</div>', 'Books', 'Fiction by Phillipa Aidoo.'],
  [bookPath, 'My Blue Rubber Slippers | A Novel by Phillipa Aidoo', 'My Blue Rubber Slippers is the debut novel by Phillipa Aidoo. Explore the book and find the Kindle edition on Amazon.', `
    ${detailLayout(
      `<div class="service-box"><h4>Kindle edition</h4><div class="services-list">
      <a class="active" href="${amazon}"><i class="bi bi-book" aria-hidden="true"></i><span>View Kindle on Amazon</span></a>
      <a href="${amazon}#customerReviews"><i class="bi bi-chat" aria-hidden="true"></i><span>Reader reviews on Amazon</span></a></div></div>
      <div class="help-box d-flex flex-column justify-content-center align-items-center"><h4>Book enquiries</h4><a href="/contact/">Contact Phillipa</a></div>`,
      `<div class="book-feature detail"><div>${cover}</div><div><p class="eyebrow">Debut novel</p><blockquote>${line}</blockquote>
      <p>In Arcca, everybody owns a fortune. Poverty is a privilege and a market. Then Abena arrives in blue rubber slippers and upsets the price of everything.</p>
      <section class="sample"><h2>Read a sample</h2><p>Check the Kindle listing for Amazon’s sample and preview options.</p>${link(amazon,'Open Kindle listing')}</section></div></div>`)}
    <section class="section book-gallery"><div class="container"><div class="section-title"><h2>Book artwork</h2></div><div class="row g-4 justify-content-center"><div class="col-sm-6 col-lg-4"><img src="/assets/photos/literary-showcase.webp" alt="Literary showcase poster for My Blue Rubber Slippers" width="960" height="1200" loading="lazy"></div><div class="col-sm-6 col-lg-4"><img src="/assets/photos/editorial-display.webp" alt="Stack of My Blue Rubber Slippers books against a lavender and turquoise background" width="853" height="1280" loading="lazy"></div></div></div></section>`],
  ['/journal/', 'Journal | Essays & Ideas by Phillipa Aidoo', 'Read Phillipa Aidoo’s essays on personal branding, identity, faith and authority, with links to her published writing.', grid(
    card('Identity & creative work','Maybe My Brand Is Being Me','A funny, candid look at personal branding and the pressure to sound polished online.',essay,'Read the essay'),
    card('Faith & society','The Illusion of Authority','A reflection on the idea of dominion and what it asks us to accept about who gets to have power.',linkedin+'#articles','Browse published essays')), 'Journal', 'Essays and reflections on identity, faith, authority and making things.'],
  ['/press/', 'Press & Media | Phillipa Aidoo', 'Press coverage, a short professional biography, and interview and speaking enquiries for Phillipa Aidoo.', grid(
    card('Graphic Showbiz · December 2024','I don’t believe in competition','Gifty Owusu-Amoah interviews Mzphill about the single “Josiah” and what it means to grow as an artist.',graphic,'Read the interview'),
    card('For editors & event organisers','Short biography','Phillipa Aidoo is a Ghanaian founder, software developer, digital strategist and author. She founded ALLMORROW, co-founded WOMATE and wrote the novel My Blue Rubber Slippers.','/contact/','Request press materials')), 'Press', 'Coverage, biography and media enquiries.'],
  ['/contact/', 'Contact Phillipa Aidoo | Business, Press & Readers', 'Contact Phillipa Aidoo for technology projects, partnerships, interviews, speaking, creative collaborations or reader enquiries.', grid(
    card('Business & creative work','Work with me','For software, digital strategy, climate partnerships or creative collaborations, reach out with a short note about what you have in mind.',linkedin,'Connect on LinkedIn'),
    card('Press & literary enquiries','Get in touch','For interviews, speaking invitations, book enquiries and reader notes, contact me through my LinkedIn profile.',linkedin,'Find Phillipa on LinkedIn'),
    card('Writing updates','Follow my writing','Find my latest essays and publishing updates on LinkedIn.',linkedin,'Follow on LinkedIn')), 'Contact', 'For projects, conversations and notes from readers.'],
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
  const graph = [person, {'@type':'WebSite','@id':origin+'/#website',name:author,url:origin+'/',publisher:{'@id':person['@id']}},
    {'@type': path==='/about/'?'ProfilePage':'WebPage', '@id':canonical+'#page',url:canonical,name:title,description,isPartOf:{'@id':origin+'/#website'},mainEntity:{'@id':path===bookPath?book['@id']:person['@id']}}];
  if (path===bookPath || path==='/books/') graph.push(book);
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
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script>
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
