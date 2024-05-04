import axios from 'axios'
import csvToJson from 'convert-csv-to-json'
import { writeFile } from 'fs/promises'
import set from 'lodash.set'

const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQHF8F6D7JrhD582SnST_iUMwA4xcwR95OtwNgRgyW-a1jDXt2klavZoXP9WECFYlxSsaI50R4WJXbZ/pub?gid=0&single=true&output=csv'

async function downloadI18nMessages () {
  const { data } = await axios.get(csvUrl)
  const json = csvToJson.fieldDelimiter(',').csvStringToJson(data)

  const locales = Object.keys(json[0]).filter(key => key !== 'path')

  locales.forEach(async (locale) => {
    const output = {}
    const filePath = `./messages/${locale}.json`

    json.forEach((row) => {
      const { path } = row
      if (!path) return
      set(output, path, row[locale])
    })

    await writeFile(filePath, JSON.stringify(output, null, 2))
  })
}

void downloadI18nMessages()
