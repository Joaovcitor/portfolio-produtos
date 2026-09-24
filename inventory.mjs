import fs from 'fs';
import path from 'path';

const PROJECTS = [
  { name: 'ATLAS', front: '../atlas-front-end/src', back: '../SIMGEP' },
  { name: 'DOMUS', front: '../domus-front-end/src', back: '/home/joao/RiderProjects/Domus' },
  { name: 'VEMKA', front: '../vemka-front-end/src', back: '../VemKa' },
  { name: 'ORDIAN', front: '../ordian-front-end/src', back: '../OrdianApi' }
];

function findFiles(dir, matchFiles) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('bin') && !full.includes('obj')) {
        results = results.concat(findFiles(full, matchFiles));
      }
    } else if (matchFiles(full)) {
      results.push(full);
    }
  }
  return results;
}

function extractActions(fileContent) {
  const actions = [];
  // Procura por atributos HTTP ou métodos retornando IActionResult, ActionResult, Task<IActionResult>, etc.
  const regex = /\[Http(Get|Post|Put|Delete|Patch)[^\]]*\]\s*(?:\[[^\]]*\]\s*)*public\s+(?:async\s+)?(?:Task<[^>]+>|IActionResult|ActionResult|Task)\s+(\w+)\s*\(/g;
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    actions.push(match[2]);
  }
  return actions;
}

let md = `# COBERTURA TOTAL\n\n`;

for (const p of PROJECTS) {
  md += `# ${p.name}\n\n`;
  md += `## Frontend\n\n`;
  md += `| # | Page | Rota | Arquivo original | Representação no portfólio | Status |\n`;
  md += `|---|------|------|------------------|-----------------------------|--------|\n`;
  
  const pagesFiles = findFiles(p.front, f => f.match(/\.(tsx|jsx)$/i));
  let countPages = 1;
  let totalPages = 0;
  
  if (p.name === 'ATLAS') {
    // Atlas tem lógica específica no App.tsx
    const atlasPages = ['inicio', 'pessoas', 'profissionais', 'locais', 'funcoes', 'vinculos', 'usuarios', 'sistemas', 'seguranca'];
    for (const page of atlasPages) {
      md += `| ${countPages++} | ${page} | / | App.tsx | - | PENDENTE |\n`;
      totalPages++;
    }
  } else {
    for (const f of pagesFiles) {
      if (f.toLowerCase().includes('/components/') || f.toLowerCase().includes('/ui/') || f.toLowerCase().includes('layout') || f.toLowerCase().includes('index.ts')) continue;
      const rel = path.relative(p.front, f);
      if (rel.toLowerCase().includes('pages') || rel.toLowerCase().includes('views') || rel.toLowerCase().includes('features') || rel.toLowerCase().includes('routes') || rel.toLowerCase().includes('screens')) {
        md += `| ${countPages++} | ${path.basename(f, path.extname(f))} | (a avaliar) | ${rel} | - | PENDENTE |\n`;
        totalPages++;
      }
    }
  }

  md += `\n**Pages/experiências encontradas: ${totalPages}**\n`;
  md += `**Pages cobertas: 0**\n`;
  md += `**Cobertura: 0%**\n\n`;

  md += `## Backend\n\n`;
  md += `| Controller | Funcionalidade | Possui Page? | Representação | Status |\n`;
  md += `|------------|----------------|--------------|---------------|--------|\n`;
  
  let totalControllers = 0;
  
  if (p.back) {
    const controllers = findFiles(p.back, f => f.match(/Controller\.(cs|java|ts)$/i));
    for (const c of controllers) {
      totalControllers++;
      const content = fs.readFileSync(c, 'utf8');
      const actions = extractActions(content);
      const controllerName = path.basename(c, path.extname(c));
      
      if (actions.length === 0) {
         md += `| ${controllerName} | (a avaliar) | SIM | - | PENDENTE |\n`;
      } else {
         for (const act of actions) {
           md += `| ${controllerName} | ${act} | SIM | - | PENDENTE |\n`;
         }
      }
    }
  } else {
    md += `| (Não encontrado) | - | - | - | - |\n`;
  }
  
  md += `\n**Controllers encontrados: ${totalControllers}**\n`;
  md += `**Controllers mapeados: 0**\n\n`;
  md += `\n---\n\n`;
}

fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/COBERTURA-TOTAL.md', md, 'utf8');
console.log('docs/COBERTURA-TOTAL.md generated with full counting and actions.');
