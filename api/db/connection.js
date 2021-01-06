const Airtable = require('airtable')
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyHGaaIxSdIZcsgK',
})
const base = Airtable.base('appNF0spVTtuVwyaT')

module.exports = base
