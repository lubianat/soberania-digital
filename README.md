# Soberania Digital

Guia de alternativas brasileiras, livres e públicas às big techs. Uma página só, sem banco de dados e sem conta.

## Publicar

Suba esta pasta inteira em qualquer hospedagem de site estático com HTTPS:

- **Codeberg Pages:** crie um repositório no codeberg.org, envie os arquivos e publique com o git-pages.
- **Hospedagem brasileira:** envie os arquivos por FTP para a pasta pública do site.
- **Domínio .br:** registre no registro.br e aponte o DNS para a hospedagem escolhida.

O app só fica instalável quando aberto por HTTPS, com os arquivos na mesma pasta.

## Arquivos

- `index.html`: o guia completo
- `manifest.webmanifest`: nome, cores e ícones do app
- `sw.js`: guarda o guia no aparelho para abrir sem internet
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`: ícones

## Atualizar

Ao mudar o `index.html`, troque também a versão em `sw.js` (`soberania-v1` para `soberania-v2`) para os aparelhos baixarem a versão nova.

## Editar a lista

As alternativas ficam em `dados.yaml`. Edite à mão, salve e recarregue a página.
O cabeçalho do arquivo explica cada campo. Se algo estiver errado no YAML,
a página mostra o erro e a linha.

Para testar no computador, abra por um servidor local (o navegador não lê
`dados.yaml` direto do disco):

    python3 -m http.server -d soberania-digital

e acesse http://localhost:8000

Ao publicar, o GitHub Actions roda `node build.js`, que copia a lista do `dados.yaml` para dentro do `index.html` (para buscadores e prévias de links). Não precisa rodar à mão.

## Sobre o GitHub Actions

Hoje o site é publicado pelo GitHub Pages, com o GitHub Actions. O GitHub é da Microsoft, uma big tech, e isso contradiz a proposta do guia. É uma dependência digital da qual o autor ainda não conseguiu sair, por praticidade e por costume. O site foi feito para não depender dela: são só arquivos estáticos, e o `build.js` roda em qualquer computador com Node. Dá para migrar para o Codeberg (com Forgejo Actions ou Woodpecker CI) ou para uma hospedagem brasileira sem mudar o código. A migração está nos planos. Sugestões e ajuda são bem-vindas.
