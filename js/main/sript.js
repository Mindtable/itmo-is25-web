const Buttons = {
  Sets: 'setsNavButton',
  Details: 'detailsNavButton',
  Personal: 'personalNavButton',
  AboutUs: 'aboutUsNavButton',
  FaQ: 'faqNavButton',
}

const Pages = {
  Sets: 'setsPage',
  Details: 'detailsPage',
  Personal: 'personalPage',
  AboutUs: 'aboutUsPage',
  FaQ: 'faqPage',
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

let activeElement = {
  button: Buttons.Sets,
  page: buttonsToSections.get(Buttons.Sets)
}

function init() {
  for (const y of buttonsToSections.keys()) {
    const x = buttonsToSections.get(y)
    console.log(x)
    let elementById = document.getElementById(x.id);
    if (elementById === null) continue

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
    }
  )
}

function showElement(element) {
  element.classList.remove("hidden")
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
  console.log(activeElement)
  console.log(Pages.Sets)
  console.log(document.getElementById(Pages.Sets))
  showElement(document.getElementById(Pages.Sets))
  activateButton(document.getElementById(Buttons.Sets))

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



