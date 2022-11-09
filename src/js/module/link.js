import $ from 'jquery'

$(() => {
  const anchor = 'website.com?stag=' // Указать в случае оффера, иначе оставить пустым ``
  const link = $('.promo-link')

  const searchParams = new URLSearchParams(window.location.search)
  const paramName = 'stag'
  $(document).on('click', link, () => {
    let param = paramName
    if (searchParams.has(paramName)) {
      param = searchParams.get(paramName)
    }
    const url = `${anchor}${param}`

    window.location.href = url
  })
})
