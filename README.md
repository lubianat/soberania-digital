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
