import {chromium} from 'playwright';
import {mkdir,copyFile,writeFile,readFile} from 'node:fs/promises';
import {serve} from './server.mjs';
const names=['atlas','domus','vemka','ordian'];
await mkdir('dist/images',{recursive:true});await mkdir('public/images',{recursive:true});
const site=await serve('dist');
const browser=await chromium.launch({args:['--no-sandbox']});
try{const page=await browser.newPage({viewport:{width:1120,height:900},deviceScaleFactor:3});for(const id of names){for(let view=0;view<3;view++){await page.goto(`${site.url}/estudio/${id}?view=${view}`);await page.evaluate(()=>document.fonts.ready);const file=`${id}-${view}.png`;await page.locator('.studio').screenshot({path:`public/images/${file}`});await copyFile(`public/images/${file}`,`dist/images/${file}`)}}
await page.setViewportSize({width:1440,height:1000});await page.goto(site.url);await page.evaluate(()=>document.fonts.ready);await page.emulateMedia({reducedMotion:'reduce'});await page.screenshot({path:'public/images/social.png',clip:{x:0,y:0,width:1440,height:756}});await copyFile('public/images/social.png','dist/images/social.png');
await page.setViewportSize({width:1000,height:1200});await page.goto(site.url+'/edicao-impressa');await page.evaluate(()=>document.fonts.ready);await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
const overflow=await page.locator('.print-page').evaluateAll(pages=>pages.map(p=>{const b=p.querySelector('.print-body').getBoundingClientRect(),f=p.querySelector('.print-folio').getBoundingClientRect();return{page:p.dataset.page,bodyBottom:b.bottom,footerTop:f.top,overflow:b.bottom>f.top-10}}).filter(x=>x.overflow));if(overflow.length)throw Error('Conteúdo ultrapassa margem: '+JSON.stringify(overflow));
await page.pdf({path:'dist/Portfolio-Atlas-Domus-VemKa-Ordian.pdf',format:'A4',printBackground:true,preferCSSPageSize:true,tagged:true,outline:true});
await copyFile('dist/Portfolio-Atlas-Domus-VemKa-Ordian.pdf', 'public/Portfolio-Atlas-Domus-VemKa-Ordian.pdf');
await mkdir('docs/revisao',{recursive:true});await writeFile('docs/revisao/pdf-layout.json',JSON.stringify({pages:await page.locator('.print-page').count(),overflow,images:await page.locator('img').count()},null,2));
console.log('PDF A4 gerado: dist/Portfolio-Atlas-Domus-VemKa-Ordian.pdf · 25 páginas');
}finally{await browser.close();await site.close()}
