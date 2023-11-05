import '../submit/script.js'

const Buttons = {
  Sets: 'setsNavButton',
  Details: 'detailsNavButton',
  Personal: 'personalNavButton',
  AboutUs: 'aboutUsNavButton',
  FaQ: 'faqNavButton',
  AddLegoPart: 'addLegoPartButton',
}

const Pages = {
  Sets: 'setsPage',
  Details: 'detailsPage',
  Personal: 'personalPage',
  AboutUs: 'aboutUsPage',
  FaQ: 'faqPage',
  AddLegoPart: 'addLegoPartPage',
}

const buttonsToSections = new Map()
buttonsToSections.set(
  Buttons.Sets,
  {id: Pages.Sets,}
)
buttonsToSections.set(
  Buttons.Details,
  {id: Pages.Details})
buttonsToSections.set(
  Buttons.Personal,
  {id: Pages.Personal})
buttonsToSections.set(
  Buttons.AboutUs,
  {id: Pages.AboutUs})
buttonsToSections.set(
  Buttons.FaQ,
  {id: Pages.FaQ})
buttonsToSections.set(
  Buttons.AddLegoPart,
  {id: Pages.AddLegoPart}
)

let activeElement = {
  button: Buttons.Sets,
  page: Object.assign({}, buttonsToSections.get(Buttons.Sets))
}

function init() {
  for (const y of buttonsToSections.keys()) {
    const x = buttonsToSections.get(y)
    console.log(x)
    let elementById = document.getElementById(x.id);
    if (elementById === null) {
      console.log(`Element by id ${x.id} is not found`)
      continue
    }

    hideElement(elementById)

    initButton(y, x.id)
  }
}

function initButton(buttonId, pageId) {
  console.log(`button init ${buttonId} ${pageId}`)
  document.getElementById(buttonId).addEventListener(
    "click",
    function () {
      if (buttonId === activeElement.button) return

      console.log(`button ${buttonId} call with ${pageId}`)
      let page = document.getElementById(buttonsToSections.get(buttonId).id);
      let button = document.getElementById(buttonId)
      activateButton(button)

      showElement(page)

      console.log(`Hide the element ${activeElement.page.id}`)
      hideElement(document.getElementById(activeElement.page.id))

      deactivateButton(document.getElementById(activeElement.button))

      activeElement.button = buttonId
      activeElement.page = page

      localStorage.setItem("activeElement", JSON.stringify({
        "page": pageId,
        "button": buttonId,
      }))
    }
  )
}

function showElement(element) {
  element.classList.remove("hidden")
  console.log("Show element ", element)
}

function hideElement(element) {
  element.classList.add("hidden")
}

function activateButton(button) {
  button.classList.add("navigation__item_active")
}

function deactivateButton(button) {
  button.classList.remove("navigation__item_active")
}

function initRedirectButton() {
  let buttonId = "redirectButton"
  let button = document.getElementById(buttonId)

  button.addEventListener(
    "click",
    function () {
      window.location.href = "pages/submit/index.html"
    }
  )

  console.log(button, "is initialized with click listeners kek")
}

function main(event) {
  init()
  initRedirectButton()

  const item = localStorage.getItem("activeElement");
  if (item !== null && item.length !== 0) {
    let activeElementCache = JSON.parse(item)
    activeElement.button = activeElementCache.button
    activeElement.page.id = activeElementCache.page
  }

  console.log(activeElement)
  console.log(Pages.Sets)
  console.log(document.getElementById(Pages.Sets))
  showElement(document.getElementById(activeElement.page.id))
  activateButton(document.getElementById(activeElement.button))

  const timeElapsed = (new Date() - currentTime) / 1000
  let footer = document.createElement('footer')
  let formattedTime = document.createElement("span");
  formattedTime.textContent = `${timeElapsed}`
  formattedTime.style.fontWeight = 'bold'
  formattedTime.style.color = 'red'

  let footerText = document.createTextNode(`Time elaped `)
  let secondsPostfix = document.createTextNode(`sec.`)
  footer.appendChild(footerText)
  footer.appendChild(formattedTime)
  footer.appendChild(secondsPostfix)

  document.getElementsByTagName("main")[0].parentElement.appendChild(footer)
}


const currentTime = new Date()
document.addEventListener("DOMContentLoaded", main);



