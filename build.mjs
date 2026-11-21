import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname } from 'node:path';

const origin = new URL(process.env.SITE_URL || 'https://phillipaaidoo.com').origin;
const linkedin = 'https://gh.linkedin.com/in/phillipa-aidoo';
const amazon = 'https://www.amazon.com/dp/B0HSFRWVTC';
const essay = 'https://www.linkedin.com/pulse/maybe-my-brand-being-me-phillipa-aidoo-rtk1e';
const graphic = 'https://www.graphic.com.gh/entertainment/showbiz-news/i-dont-believe-in-competition-mzphill.html';
const bookPath = '/books/my-blue-rubber-slippers/';
const bookName = 'My Blue Rubber Slippers';
const line = 'Everyone is rich. Only the elite can afford to be poor.';
const author = 'Phillipa Aidoo';
const person = {'@type':'Person','@id':origin+'/#phillipa-aidoo',name:author,url:origin+'/',sameAs:[linkedin],jobTitle:['Author','Software Developer','Digital Strategist'],worksFor:[{'@type':'Organization',name:'ALLMORROW'},{'@type':'Organization',name:'WOMATE',sameAs:'https://www.linkedin.com/company/womeninclimategh'},{'@type':'Organization',name:'Grow-Online Agency',sameAs:'https://gh.linkedin.com/company/grow-online-agency'}]};
const book = {'@type':'Book','@id':origin+bookPath+'#book',name:bookName,url:origin+bookPath,author:{'@id':person['@id']},bookFormat:'https://schema.org/EBook',sameAs:[amazon],inLanguage:'en',description:line};
const nav = [['/about/','About'],['/ventures/','Ventures'],['/portfolio/','Portfolio'],['/books/','Books'],['/journal/','Journal'],['/press/','Press'],['/contact/','Contact']];
const link = (url,label,style='text-link') => `<a class="${style}" href="${url}">${label}</a>`;
const button = 'action';
const card = (label,title,body,url,cta) => `<article class="editorial-card"><p class="label">${label}</p><h2>${title}</h2><p>${body}</p>${url?link(url,cta):''}</article>`;
const grid = (...cards) => `<div class="editorial-grid">${cards.join('')}</div>`;
const cover = `<div class="book-art" aria-hidden="true"><span>A NOVEL</span><strong>My Blue<br>Rubber<br><i>Slippers</i></strong><span>PHILLIPA AIDOO</span></div>`;
const feature = `<section class="book-feature"><div>${cover}</div><div><p class="label">Debut novel</p><h2>${bookName}</h2><blockquote>${line}</blockquote>${link(bookPath,'Explore the novel',button)}</div></section>`;
const pages = [
  ['/', 'Phillipa Aidoo | Founder, Developer & Author', 'Official website of Phillipa Aidoo, founder of ALLMORROW, co-founder of WOMATE, digital strategist, software developer and author of My Blue Rubber Slippers.', `
    <section class="home-hero">
      <div class="hero-copy"><p class="label"><span class="dot"></span> Founder · Developer · Author</p><h1>Phillipa<br><em>Aidoo.</em></h1>
      <p class="manifesto">I build things. I write things.<br>Occasionally, I question everything.</p>
      <p class="lede">I work across software, digital strategy, climate action and fiction. Some ideas turn into platforms. One turned into an entire fictional civilisation.</p>
      <div class="actions">${link('/portfolio/','Explore my work',button)}${link('/books/','Browse my books','action secondary')}</div></div>
      <div class="monogram" aria-hidden="true"><div class="orbit"></div><span class="initial-p">P</span><span class="initial-a">a.</span></div>
    </section>
    <div class="affiliations"><span>Founder, ALLMORROW</span><span>Co-founder, WOMATE</span><span>Author, <i>My Blue Rubber Slippers</i></span></div>
    ${feature}
    <section class="below"><p class="label">Explore the work</p><h2>Across disciplines</h2>${grid(
      card('Technology & climate','Ventures','The organisations where I build products, support climate leadership and work on digital strategy.','/ventures/','Explore the ventures'),
      card('Essays & ideas','Journal','Writing about identity, authority, faith and the things we take for granted.','/journal/','Read the journal'))}</section>`],
  ['/about/', 'About Phillipa Aidoo | Biography & Background', 'Read about Phillipa Aidoo’s work in software development, digital strategy, women’s climate leadership, the creative industries and fiction.', `
    <div class="prose"><p>Phillipa Aidoo is a Ghanaian founder, software developer, digital strategist and author. She founded ALLMORROW and co-founded WOMATE (Women in Climate), an initiative connecting women with climate leadership, learning and community.</p>
    <p>Her background includes the Ghana Institute of Journalism and work in web development and digital strategy through Grow-Online Agency. Her creative experience spans music, artist management and writing.</p>
    <p>Her debut novel is <a href="${bookPath}"><em>${bookName}</em></a>. In her nonfiction, she writes about authority, spirituality and identity, with a particular interest in the assumptions people inherit and the voices that get heard.</p>
    ${link(linkedin,'Find Phillipa on LinkedIn',button)}</div>`, 'About me', 'Founder, developer, digital strategist and author based in Accra, Ghana.'],
  ['/ventures/', 'Ventures | ALLMORROW, WOMATE & Grow-Online Agency', 'Explore Phillipa Aidoo’s work with ALLMORROW, women’s climate leadership through WOMATE and digital strategy at Grow-Online Agency.', grid(
    card('Founder','ALLMORROW','My technology venture and the home of my software projects, including CIRQUVO and handEwork.','/portfolio/','Explore the portfolio'),
    card('Co-founder','WOMATE','Women in Climate brings together training, mentorship and community to support women’s leadership in climate action.','https://www.linkedin.com/company/womeninclimategh','Visit WOMATE'),
    card('Digital strategy','Grow-Online Agency','My work with GoA spans digital strategy, web development, social media and brand visibility.','https://gh.linkedin.com/company/grow-online-agency','Visit Grow-Online Agency')), 'Ventures', 'Technology, digital strategy and women’s climate leadership.'],
  ['/portfolio/', 'Portfolio | Phillipa Aidoo’s Software & Creative Work', 'Selected work and practice areas across Phillipa Aidoo’s software development, digital strategy and artist management.', grid(
    card('Software development','CIRQUVO','A software project I’m building through ALLMORROW.'),
    card('Software development','handEwork','A software project within my ALLMORROW portfolio.'),
    card('Digital strategy','Web & brand strategy','I work on websites, social media and digital visibility through Grow-Online Agency.','/ventures/','About Grow-Online Agency'),
    card('Creative industries','Artist management','My creative work includes artist management and music. For project or collaboration enquiries, get in touch.','/contact/','Discuss a project')), 'Selected work', 'Software projects, digital strategy and creative work.'],
  ['/books/', 'Books by Phillipa Aidoo | Fiction & New Releases', 'Discover books by Phillipa Aidoo, starting with her debut novel My Blue Rubber Slippers, available on Kindle.', feature, 'Books', 'Fiction by Phillipa Aidoo.'],
  [bookPath, 'My Blue Rubber Slippers | A Novel by Phillipa Aidoo', 'My Blue Rubber Slippers is the debut novel by Phillipa Aidoo. Explore the book and find the Kindle edition on Amazon.', `
    <section class="book-feature detail"><div>${cover}</div><div><p class="label">Debut novel · Kindle edition</p><h1>${bookName}</h1><blockquote>${line}</blockquote>
    <p>My debut novel starts from a question about wealth and status. What would it take for poverty itself to become a luxury?</p>
    <div class="actions">${link(amazon,'View Kindle on Amazon',button)}${link(amazon+'#customerReviews','Reader reviews on Amazon','action secondary')}</div>
    <section class="sample"><h2>Read a sample</h2><p>Check the Kindle listing for Amazon’s sample and preview options.</p>${link(amazon,'Open Kindle listing')}</section></div></section>`],
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
  const current = (url) => path.startsWith(url) ? ' aria-current="page"' : '';
  const links = nav.map(([url,label])=>`<a href="${url}"${current(url)}>${label}</a>`).join('');
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
<meta name="twitter:card" content="summary">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/bootstrap-grid.min.css">
<link rel="stylesheet" href="/assets/site.css">
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="container header-inner"><a class="wordmark" href="/">Phillipa Aidoo<span>.</span></a><nav aria-label="Main navigation">${links}</nav></div></header>
<main id="main" class="container">${heading?`<header class="page-hero"><h1>${heading}</h1><p class="lede">${intro}</p></header>`:''}${body}</main>
<footer class="site-footer"><div class="container footer-inner"><div><a class="wordmark" href="/">Phillipa Aidoo<span>.</span></a><p>From Accra, Ghana.</p></div><div class="footer-links">${link('/contact/','Contact')}${link(linkedin,'LinkedIn')}${link('/books/','Books')}</div></div></footer>
</body>
</html>`);
}
output('404.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found | Phillipa Aidoo</title><meta name="robots" content="noindex"><link rel="stylesheet" href="/assets/site.css"><main class="error"><h1>Page not found.</h1><a class="action" href="/">Back to Phillipa Aidoo</a></main></html>');
output('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
output('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+pages.map(([path])=>`  <url><loc>${origin}${path}</loc></url>`).join('\n')+'\n</urlset>\n');
mkdirSync('dist/assets', {recursive:true});
for (const asset of ['site.css','favicon.svg','bootstrap-grid.min.css']) copyFileSync('assets/'+asset,'dist/assets/'+asset);



