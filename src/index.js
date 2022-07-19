import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'
let apiurl = ''
const app = new Hono()
app.use('*', prettyJSON())
app.use('*', poweredBy())

app.get('/:platform', async (c) => {
  const platform = c.req.param('platform')
  var lang1 = c.req.header('Accept-Language')
  if (lang1 == undefined) {
    lang1 = 'en'
  } else {
    lang1 = lang1.slice(0, 2)
  }
  const response = await fetch(apiurl + platform + '/?language=' + lang1, {
    cf: {
      cacheTtl: 50,
      cacheEverything: true,
    },
  })
  let res1 = await response.json()
  return c.json(res1)
})
app.get('/', (c) => {
  return c.text(' no platform selected', 404)
})
export default app
