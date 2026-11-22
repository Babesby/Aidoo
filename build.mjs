import { mkdirSync, writeFileSync, copyFileSync, cpSync } from 'node:fs';
import { dirname } from 'node:path';
import { siteHeader, footer, pageTitle, serviceCard as card, serviceGrid as grid, homeHero, workTabs, detailLayout, projectPreview } from './landi.mjs';

const origin = new URL(process.env.SITE_URL || 'https://phillipaaidoo.allmorrow.com').origin;
const mwahli = 'https://mwahli.allmorrow.com/';
const womate = 'https://www.womate.org/';
const contactEmail = 'phillipaaidoo12345@gmail.com';
const emailLink = 'mailto:'+contactEmail;
const linkedin = 'https://gh.linkedin.com/in/phillipa-aidoo';
const editions = [
  ['Kindle','B0HSFRWVTC','EBook','tablet'],
  ['Paperback','B0HSFYVZBQ','Paperback','book'],
  ['Hardcover','B0HSFHCJ8B','Hardcover','book-half'],
].map(([label,asin,format,icon])=>({label,url:'https://www.amazon.com/dp/'+asin,format,icon}));
const amazon = editions[0].url;
const essay = 'https://www.linkedin.com/pulse/maybe-my-brand-being-me-phillipa-aidoo-rtk1e';
const graphic = 'https://www.graphic.com.gh/entertainment/showbiz-news/i-dont-believe-in-competition-mzphill.html';
const bookPath = '/books/my-blue-rubber-slippers/';
const bookName = 'My Blue Rubber Slippers';
const line = 'Everyone is rich. Only the elite can afford to be poor.';
const author = 'Phillipa Aidoo';
const bookGenre = 'Speculative satire';
const allmorrowPath = '/ventures/allmorrow/';
const professionalBio = 'Phillipa Aidoo is a Ghanaian software developer, digital strategist and novelist based in Accra. She founded ALLMORROW and is cofounder and Chief Operating Officer of WOMATE, where she leads strategy and designed the technology behind its climate leadership programmes. My Blue Rubber Slippers is her debut novel.';
const image = (file, caption, width, height) => ({
  '@type':'ImageObject','@id':origin+'/assets/photos/'+file+'#image',
  contentUrl:origin+'/assets/photos/'+file,caption,width,height,
});
const heroPortrait = image('phillipa-hero.webp','Phillipa Aidoo, Ghanaian novelist and founder of ALLMORROW',960,960);
const professionalPortrait = image('phillipa-portrait.webp','Professional portrait of Phillipa Aidoo',960,960);
const bookCover = image('blue-rubber-slippers.webp','Cover of My Blue Rubber Slippers by Phillipa Aidoo',960,1200);
const synopsis = 'In Arcca, everybody owns a fortune. Poverty is a privilege and a market. Then Abena arrives in blue rubber slippers and upsets the price of everything.';
const entity = (id) => ({'@id':id});
const personId = origin+'/#phillipa-aidoo';
const organizations = [
  {'@type':'Organization','@id':origin+'/ventures/#allmorrow',name:'ALLMORROW',url:origin+allmorrowPath,description:'Software ventures founded by Phillipa Aidoo in Accra, Ghana.',founder:entity(personId)},
  {'@type':'Organization','@id':origin+'/ventures/#womate',name:'WOMATE',alternateName:'Women in Climate',url:womate,sameAs:'https://www.linkedin.com/company/womeninclimategh',founder:entity(personId)},
  {'@type':'Organization','@id':origin+'/ventures/#grow-online-agency',name:'Grow-Online Agency',sameAs:'https://gh.linkedin.com/company/grow-online-agency'},
];
const person = {
  '@type':'Person','@id':personId,name:author,url:origin+'/',
  image:[entity(professionalPortrait['@id']),entity(heroPortrait['@id'])],sameAs:[linkedin],
  description:professionalBio,nationality:{'@type':'Country',name:'Ghana'},
  workLocation:{'@type':'Place',name:'Accra, Ghana'},
  jobTitle:['Founder','Software Developer','Digital Strategist','Author','Chief Operating Officer at WOMATE'],
  knowsAbout:['Software development','Digital marketing','Climate technology','Fiction writing'],
  worksFor:[entity(organizations[1]['@id'])],
};
const book = {
  '@type':'Book','@id':origin+bookPath+'#book',name:bookName,url:origin+bookPath,
  image:entity(bookCover['@id']),author:entity(personId),mainEntityOfPage:origin+bookPath,
  genre:['Satire','Speculative fiction'],inLanguage:'en',description:synopsis,
  workExample:editions.map(({label,url,format})=>({
    '@type':'Book','@id':origin+bookPath+'#'+label.toLowerCase()+'-edition',name:bookName,
    bookFormat:'https://schema.org/'+format,url,author:entity(personId),
  })),
};
const nav = [['/about/','About'],['/ventures/','Ventures'],['/portfolio/','Portfolio'],['/books/','Books'],['/journal/','Journal'],['/press/','Press'],['/contact/','Contact']];
const link = (url,label,style='text-link') => `<a class="${style}" href="${url}">${label}</a>`;
const button = 'action';
const cover = `<img class="book-art" src="/assets/photos/blue-rubber-slippers.webp" alt="My Blue Rubber Slippers cover featuring blue slippers in a glass display case" width="960" height="1200" loading="lazy">`;
const feature = `<section class="book-feature"><div>${cover}</div><div><p class="label">Debut novel</p><h2><a href="${bookPath}">${bookName}</a></h2><p>Speculative satire by Ghanaian novelist Phillipa Aidoo. Available in Kindle, paperback and hardcover.</p><blockquote>${line}</blockquote>${link(bookPath,'Explore the novel',button)}</div></section>`;
const pages = [
  ['/', 'Phillipa Aidoo | Ghanaian Author, Developer and Founder', 'Phillipa Aidoo is a Ghanaian novelist, software developer and founder of ALLMORROW. Explore her work and her debut novel, My Blue Rubber Slippers.', `
    ${homeHero(bookPath,bookName,allmorrowPath)}
    ${workTabs(womate)}
    <div class="container">${feature}</div>
    <section class="call-to-action section"><div class="container"><div class="row content justify-content-center align-items-center position-relative"><div class="col-lg-8 mx-auto text-center">
    <h2 class="display-4 mb-4">Let’s talk</h2><p class="mb-4">I’d love to hear what you’re working on or what stayed with you after reading the book.</p>${link('/contact/','Get in touch','btn btn-cta')}
    </div></div></div></section>`],
  ['/about/', 'About Phillipa Aidoo | Biography & Background', 'Read the biography of Phillipa Aidoo, Ghanaian novelist, founder of ALLMORROW and cofounder and COO of WOMATE.', `
    <section class="about section"><div class="container"><div class="row align-items-center gy-4"><div class="col-lg-7 prose"><p>I’ve been telling stories since I was thirteen. I studied at the Ghana Institute of Journalism, and my creative work has taken me into music, artist management and fiction. African life gives me plenty to write about, especially the things people do that are hard to explain.</p>
    <p>I founded <a href="${allmorrowPath}">ALLMORROW</a> to build software and work with businesses on their websites and digital strategy through Grow-Online Agency. I also co-founded WOMATE (Women in Climate), where I’m Chief Operating Officer, Chief Strategist and Full-stack Developer. I designed its integrated climate-tech ecosystem and help set the organisation’s direction.</p>
    <p>My debut novel, <a href="${bookPath}"><em>${bookName}</em></a>, takes place in a country where poverty is a privilege. I also write essays about faith, who gets to exercise authority and the versions of ourselves we put online.</p>
    ${link(linkedin,'Find Phillipa on LinkedIn',button)}</div><div class="col-lg-5"><img class="author-photo img-fluid" src="/assets/photos/phillipa-portrait.webp" alt="Professional portrait of Phillipa Aidoo" width="960" height="960"></div></div></div></section>`, 'About Phillipa', 'I’m a Ghanaian novelist, software developer and digital strategist based in Accra.'],
  ['/ventures/', 'Ventures | ALLMORROW, WOMATE & Grow-Online Agency', 'Explore Phillipa Aidoo’s work with ALLMORROW, women’s climate leadership through WOMATE and digital strategy at Grow-Online Agency.', `
    <section class="services section light-background">
      <div class="container">
        <div class="row align-items-center gy-3">
          <div class="col-lg-7">
            <p class="eyebrow">Co-founder &amp; Chief Operating Officer</p>
            <h2>WOMATE</h2>
            <p>As Chief Strategist and Full-stack Developer, I designed WOMATE’s integrated climate-tech ecosystem and shape the organisation’s strategic direction.</p>
            ${link(womate,'Visit WOMATE')}
          </div>
          <div class="col-lg-5">${projectPreview(womate,'WOMATE','womate',555)}</div>
        </div>
      </div>
    </section>` + grid(
    card('Founder','ALLMORROW','I founded ALLMORROW and build software there, including MWAHLI, CIRQUVO and handEwork.',allmorrowPath,'About ALLMORROW'),
    card('Digital strategy','Grow-Online Agency','I help businesses decide how to reach customers online, then work on the websites and social media that support that plan.','https://gh.linkedin.com/company/grow-online-agency','Visit Grow-Online Agency')), 'Ventures'],
  [allmorrowPath, 'ALLMORROW | Software Ventures by Phillipa Aidoo', 'Meet ALLMORROW, the software venture founded by Phillipa Aidoo in Accra, Ghana. Explore MWAHLI and her other development projects.', `
    <section class="section"><div class="container"><div class="row align-items-center gy-4">
      <div class="col-lg-7 prose"><h2>What I build at ALLMORROW</h2>
        <p>I founded ALLMORROW in Accra, Ghana. It’s where I develop my own software projects, including MWAHLI, CIRQUVO and handEwork.</p>
        <p>MWAHLI gives people a place to send personal letters, voice notes and keepsakes.</p>
        ${link('/portfolio/','See the software portfolio',button)} ${link('/about/','Meet the founder')}
      </div><div class="col-lg-5">${projectPreview(mwahli,'MWAHLI','mwahli',508)}</div>
    </div></div></section>`, 'ALLMORROW'],
  ['/portfolio/', 'Portfolio | Phillipa Aidoo’s Software & Creative Work', 'Selected work and practice areas across Phillipa Aidoo’s software development, digital strategy and artist management.', `
    <section class="services section light-background">
      <div class="container">
        <div class="row align-items-center gy-3">
          <div class="col-lg-7">
            <p class="eyebrow">Software development</p>
            <h2>MWAHLI</h2>
            <p>An ALLMORROW platform for sending personal letters, voice notes and keepsakes.</p>
            ${link(mwahli,'Visit MWAHLI')}
          </div>
          <div class="col-lg-5">${projectPreview(mwahli,'MWAHLI','mwahli',508)}</div>
        </div>
      </div>
    </section>` + grid(
    card('Software development','CIRQUVO','In development at ALLMORROW.'),
    card('Software development','handEwork','A software project at ALLMORROW.'),
    card('Digital strategy','Web & brand strategy','At Grow-Online Agency, I develop websites and plan how businesses show up across their online channels.','/ventures/','About Grow-Online Agency'),
    card('Creative industries','Artist management','I’ve worked in music and artist management. Get in touch if you have a music or artist project in mind.','/contact/','Discuss a project')), 'Selected work'],
  ['/books/', 'Books by Phillipa Aidoo | Ghanaian Fiction and Satire', 'Discover books by Phillipa Aidoo, starting with her debut novel My Blue Rubber Slippers, available in Kindle, paperback and hardcover editions.', '<div class="container">' + feature + '</div>', 'Books'],
  [bookPath, 'My Blue Rubber Slippers | Satire by Phillipa Aidoo', 'A speculative satire by Ghanaian novelist Phillipa Aidoo. Meet Abena, explore the novel’s themes and find Kindle, paperback and hardcover editions.', `
    ${detailLayout(
      `<div class="service-box" id="buy-editions"><h2 class="edition-heading">Buy on Amazon</h2><div class="services-list">
      ${editions.map(({label,url,icon})=>`<a href="${url}"><i class="bi bi-${icon}" aria-hidden="true"></i><span>${label}</span></a>`).join('')}
      <a href="${amazon}#customerReviews"><i class="bi bi-chat" aria-hidden="true"></i><span>Reader reviews on Amazon</span></a></div></div>
      <div class="help-box d-flex flex-column justify-content-center align-items-center"><h4>Book enquiries</h4><a href="/contact/">Contact Phillipa</a></div>`,
      `<div class="book-feature detail"><div>${cover}</div><div><p class="eyebrow">${bookGenre}</p><p>By <a href="/about/">${author}</a></p><blockquote>${line}</blockquote>
      <p>${synopsis}</p>
      <a class="action d-lg-none" href="#buy-editions">Choose an edition</a>
      </div></div>
      <section class="prose my-5" aria-labelledby="reading-guide">
        <h2 id="reading-guide">A satire about who gets to be poor</h2>
        <p>In Arcca, wealth is ordinary and poverty is scarce enough to confer status. The novel takes that reversal seriously. If everyone can buy what they need, what will they pay for the appearance of having less?</p>
        <p>Abena’s blue rubber slippers bring that question down to something you can hold in your hands. When an everyday object becomes a marker of privilege, who gets to decide what it’s worth?</p>
        <h3>Questions for book clubs</h3>
        <ul>
          <li>What changes about the meaning of wealth when everyone in Arcca has it?</li>
          <li>What would the slippers tell you about Abena before and after you learned how Arcca values poverty?</li>
          <li>Where do you see people paying for the appearance of simplicity in the world you live in?</li>
        </ul>
      </section>
      <section class="sample" aria-labelledby="sample-heading">
        <div class="sample-icon" aria-hidden="true"><i class="bi bi-book"></i></div>
        <div class="sample-copy">
          <h2 id="sample-heading">Read a sample</h2>
          <p>Open the Kindle edition on Amazon and select <strong>Read sample</strong> to preview the book.</p>
        </div>
        ${link(amazon,'Find the sample on Amazon',button)}
      </section>`)}
    <section class="section book-reveal" aria-labelledby="book-reveal-title">
      <div class="container">
        <div class="section-title"><h2 id="book-reveal-title">Book reveal</h2></div>
        <video controls playsinline preload="none" width="720" height="900" poster="/assets/photos/blue-rubber-slippers.webp" aria-labelledby="book-reveal-title">
          <source src="/assets/video/my-blue-rubber-slippers-reveal.mp4" type="video/mp4">
          <a href="/assets/video/my-blue-rubber-slippers-reveal.mp4">Open the book reveal video</a>
        </video>
      </div>
    </section>
    <section class="section book-gallery"><div class="container"><div class="section-title"><h2>Book artwork</h2></div><div class="row g-4 justify-content-center"><div class="col-sm-6 col-lg-4"><img src="/assets/photos/literary-showcase.webp" alt="Literary showcase poster for My Blue Rubber Slippers" width="960" height="1200" loading="lazy"></div><div class="col-sm-6 col-lg-4"><img src="/assets/photos/editorial-display.webp" alt="Stack of My Blue Rubber Slippers books against a lavender and turquoise background" width="853" height="1280" loading="lazy"></div></div></div></section>`],
  ['/journal/', 'Journal | Essays & Ideas by Phillipa Aidoo', 'Read Phillipa Aidoo’s essays on personal branding, identity, faith and authority, with links to her published writing.', grid(
    card('Identity & creative work','Maybe My Brand Is Being Me','I asked ChatGPT to write me a bio for my very important LinkedIn audience. Then I rewrote it to sound like me.',essay,'Read the essay'),
    card('Faith & society','The Illusion of Authority','What happens when people take dominion as permission to rule over everything?',linkedin+'#articles','Browse published essays')), 'Journal', 'On faith, authority and the strange business of being yourself online.'],
  ['/press/', 'Press & Media | Phillipa Aidoo', 'Press coverage, a short professional biography, and interview and speaking enquiries for Phillipa Aidoo.', `
    <section class="section"><div class="container"><div class="row align-items-center gy-4">
      <div class="col-md-8 prose"><h2>Short biography</h2><p>${professionalBio}</p>${link('/contact/','Contact Phillipa for interviews and events')}</div>
      <div class="col-md-4"><a href="${professionalPortrait.contentUrl}" download><img class="author-photo img-fluid" src="${professionalPortrait.contentUrl}" alt="Download a professional portrait of Phillipa Aidoo" width="960" height="960" loading="lazy"></a></div>
    </div></div></section>` + grid(
    card('Graphic Showbiz · December 2024','I don’t believe in competition','Gifty Owusu-Amoah interviews Mzphill about the single “Josiah” and what it means to grow as an artist.',graphic,'Read the interview')), 'Press', 'Interviews and a short bio for editors and event organisers.'],
  ['/contact/', 'Contact Phillipa Aidoo | Business, Press & Readers', 'Contact Phillipa Aidoo for technology projects, partnerships, interviews, speaking, creative collaborations or reader enquiries.', grid(
    card('Business & creative work','Work with me','Tell me what you’re working on and where you’d like me to come in.',emailLink,contactEmail),
    card('Press & literary enquiries','Get in touch','For interviews, speaking invitations and book enquiries, send me an email. I’d love to hear from readers, too.',emailLink,'Email Phillipa'),
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
const imageByPage = new Map([
  ['/',heroPortrait],
  ['/about/',professionalPortrait],
  ['/books/',bookCover],
  [bookPath,bookCover],
  ['/press/',professionalPortrait],
]);
const websiteId = origin+'/#website';
const website = {'@type':'WebSite','@id':websiteId,name:author,url:origin+'/',inLanguage:'en',publisher:entity(personId)};
const catalogue = {'@type':'ItemList','@id':origin+'/books/#catalogue',name:'Books by Phillipa Aidoo',
  itemListElement:[{'@type':'ListItem',position:1,item:entity(book['@id'])}]};
const mainEntityByPage = new Map([
  ['/',person], ['/about/',person], ['/books/',catalogue], [bookPath,book], [allmorrowPath,organizations[0]],
]);
const parentByPage = new Map([[bookPath,['/books/','Books']],[allmorrowPath,['/ventures/','Ventures']]]);
const pageTypes = new Map([['/','ProfilePage'],['/about/','ProfilePage'],['/books/','CollectionPage'],['/contact/','ContactPage']]);

for (const [path,title,description,body,heading,intro] of pages) {
  const canonical = origin + path;
  const pageHeading = heading || (path === bookPath ? bookName : '');
  const previewImage = imageByPage.get(path) || professionalPortrait;
  const primaryEntity = mainEntityByPage.get(path);
  const parent = parentByPage.get(path);
  const breadcrumbId = canonical+'#breadcrumb';
  const page = {
    '@type':pageTypes.get(path) || 'WebPage','@id':canonical+'#page',
    url:canonical,name:title,description,inLanguage:'en',isPartOf:entity(websiteId),
    primaryImageOfPage:entity(previewImage['@id']),
    ...(primaryEntity ? {mainEntity:entity(primaryEntity['@id'])} : {about:entity(personId)}),
    ...(path !== '/' ? {breadcrumb:entity(breadcrumbId)} : {}),
  };
  const graph = [website,page,person,...organizations,heroPortrait,professionalPortrait];
  if (path==='/' || path===bookPath || path==='/books/') graph.push(book,bookCover);
  if (path==='/books/') graph.push(catalogue);
  if (path!=='/') {
    const trail = [['/','Home'], ...(parent ? [parent] : []), [path,pageHeading]];
    graph.push({'@type':'BreadcrumbList','@id':breadcrumbId,itemListElement:trail.map(([url,name],i)=>({'@type':'ListItem',position:i+1,name,item:origin+url}))});
  }
  output(path.slice(1)+'index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="robots" content="max-image-preview:large">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${path==='/about/'?'profile':path===bookPath?'book':'website'}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:site_name" content="Phillipa Aidoo">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${previewImage.contentUrl}">
<meta property="og:image:width" content="${previewImage.width}">
<meta property="og:image:height" content="${previewImage.height}">
<meta property="og:image:alt" content="${escapeHtml(previewImage.caption)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${previewImage.contentUrl}">
<meta name="twitter:image:alt" content="${escapeHtml(previewImage.caption)}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700&family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/landi/bootstrap.min.css">
<link rel="stylesheet" href="/assets/landi/bootstrap-icons.css">
<link rel="stylesheet" href="/assets/landi/main.css">
<link rel="stylesheet" href="/assets/site.css">
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${siteHeader(nav,path)}
<main id="main" class="main">${pageHeading ? pageTitle(pageHeading,intro,parent) : ''}${body}</main>
${footer(linkedin)}
<script src="/assets/landi/bootstrap.bundle.min.js" defer></script>
<script src="/assets/site.js" defer></script>
</body>
</html>`);
}
output('404.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found | Phillipa Aidoo</title><meta name="robots" content="noindex"><link rel="stylesheet" href="/assets/site.css"><main class="error"><h1>Page not found.</h1><a class="action" href="/">Back to Phillipa Aidoo</a></main></html>');
output('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
const sitemapEntries = pages.map(([path])=>{
  const pageImage = imageByPage.get(path);
  const imageEntry = pageImage ? `<image:image><image:loc>${escapeHtml(pageImage.contentUrl)}</image:loc></image:image>` : '';
  return `  <url><loc>${escapeHtml(origin+path)}</loc>${imageEntry}</url>`;
}).join('\n');
output('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries}
</urlset>
`);
mkdirSync('dist/assets', {recursive:true});
for (const asset of ['site.css','favicon.svg','site.js']) copyFileSync('assets/'+asset,'dist/assets/'+asset);
cpSync('assets/landi','dist/assets/landi',{recursive:true});
cpSync('assets/photos','dist/assets/photos',{recursive:true});
cpSync('assets/video','dist/assets/video',{recursive:true});
