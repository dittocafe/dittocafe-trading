export const onRequestGet = async () => {
  return new Response(
`User-agent: *
Allow: /

Sitemap: https://trading.dittocafe.com/sitemap.xml
`,
    {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    }
  )
}