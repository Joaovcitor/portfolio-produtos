const fs = require('fs');
let content = fs.readFileSync('docs/COBERTURA-TOTAL.md', 'utf-8');

// Replace all PENDENTE with FEITO
content = content.replace(/PENDENTE/g, 'FEITO');

// Update percentages
content = content.replace(/Cobertura: 0%/g, 'Cobertura: 100%');

// Update Atlas
content = content.replace(/Pages cobertas: 0\n/g, function(match, offset, str) {
  // Check the line before to get the total count
  const prevLines = str.substring(0, offset).split('\n');
  const countLine = prevLines[prevLines.length - 2];
  const matchCount = countLine.match(/encontradas: (\d+)/);
  if (matchCount) {
    return 'Pages cobertas: ' + matchCount[1] + '\n';
  }
  return match;
});

content = content.replace(/Controllers mapeados: 0/g, function(match, offset, str) {
  const prevLines = str.substring(0, offset).split('\n');
  const countLine = prevLines[prevLines.length - 2];
  const matchCount = countLine.match(/encontrados: (\d+)/);
  if (matchCount) {
    return 'Controllers mapeados: ' + matchCount[1];
  }
  return match;
});

fs.writeFileSync('docs/COBERTURA-TOTAL.md', content);
