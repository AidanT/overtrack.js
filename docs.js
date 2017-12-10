const Docma = require('docma')

const docma = new Docma()
const { name } = require('./package.json')

const config = {
  app: {
    entrance: 'api',
    routing: 'query',
    // server: Docma.ServerType.STATIC,
    server: Docma.ServerType.GITHUB,
    title: name
  },
  dest: './docs',
  jsdoc: {
    access: 'public',
    hierarchy: true,
    module: false,
    sort: 'grouped',
    undescribed: true
  },
  markdown: {
    sanitize: false
  },
  src: [
    { _def_: './src/index.js' },
    { _def_: './src/structures/games.js' },
    { _def_: './src/structures/gamePreview.js' },
    { _def_: './src/structures/game.js' }
  ],
  template: {
    options: {
      navbar: true,
      navItems: [
        {
          href: 'https://github.com/aidant/overtrack.js',
          iconClass: 'ico-md ico-github',
          label: 'GitHub',
          target: '_blank'
        }
      ]
    }
  }
}

docma.build(config)
  .catch(console.error)
