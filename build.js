// Gera a lista estática (para buscadores) e o JSON-LD a partir de dados.yaml.
// Uso: node build.js   (rode sempre que editar dados.yaml)
const fs = require('fs');
const yaml = require('./vendor/js-yaml.min.js');
const URL = 'https://tiago.bio.br/soberania-digital/';
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const D = yaml.load(fs.readFileSync('dados.yaml', 'utf8'));
const html = D.areas.map(a => `<h3>${esc(a.area)}: alternativas a ${esc(a.no_lugar_de)}</h3>
<p>${esc(a.resumo)}</p>
<ul>${(a.opcoes || []).map(o => `<li>${o.site ? `<a href="${esc(o.site)}">${esc(o.nome)}</a>` : esc(o.nome)}: ${esc(o.ponto_forte)}</li>`).join('')}</ul>`).join('\n');

const items = D.areas.flatMap(a => (a.opcoes || []).map(o => ({ nome: o.nome, site: o.site, desc: `Alternativa a ${a.no_lugar_de}. ${o.ponto_forte || ''}`.trim() })));
const ld = {
  '@context': 'https://schema.org', '@type': 'WebSite', name: 'Soberania Digital', url: URL, inLanguage: 'pt-BR',
  description: 'Guia de alternativas nacionais, livres e públicas aos serviços das big techs.',
  mainEntity: { '@type': 'ItemList', numberOfItems: items.length, itemListElement: items.map((it, i) => ({
    '@type': 'ListItem', position: i + 1, name: it.nome, description: it.desc, ...(it.site && { url: it.site }) })) },
};

let page = fs.readFileSync('index.html', 'utf8');
const swap = (tag, body) => {
  const re = new RegExp(`(<!--${tag}-->)[\\s\\S]*?(<!--/${tag}-->)`);
  if (!re.test(page)) throw new Error(`marcador <!--${tag}--> não encontrado em index.html`);
  page = page.replace(re, (_, a, b) => `${a}\n${body}\n${b}`);
};
swap('estatico', html);
swap('ld', `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
fs.writeFileSync('index.html', page);
console.log(`ok: ${D.areas.length} áreas, ${items.length} opções`);
