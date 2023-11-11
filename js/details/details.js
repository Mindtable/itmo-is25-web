// data : {
//    "title": String,
// }

function createPageTitleError(text) {
  let pageTitleContainer = document.createElement('div')
  let pageTitle = document.createElement('span')
  let pageTitleText = document.createTextNode(text)

  pageTitle.appendChild(pageTitleText)
  pageTitleContainer.appendChild(pageTitle)
  pageTitleContainer.classList.add("page__header")
  pageTitleContainer.classList.add("page__header_error")

  return pageTitleContainer
}

function createLegoPartTitle(text) {
  let pageContentItemTitleContainer = document.createElement('div')
  let pageContentItemTitle = document.createElement('span')
  let pageContentItemText = document.createTextNode(text)
  pageContentItemTitle.appendChild(pageContentItemText)
  pageContentItemTitle.classList.add("page__content_item_title")
  pageContentItemTitleContainer.appendChild(pageContentItemTitle)

  return pageContentItemTitleContainer
}

export function drawPageTitle(parentElement, text) {
  const title = createPageTitleError(text)

  parentElement.appendChild(title)
}

export function drawDetail(parentElement, data) {
  const title = createLegoPartTitle(data.title)

  let pageContentItem = document.createElement('div')

  pageContentItem.appendChild(title)

  pageContentItem.classList.add("page__content_item")

  parentElement.appendChild(pageContentItem)
}
