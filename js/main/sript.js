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

const Visibility = {
  Visible: 'visible',
  Hidden: 'hidden',
  None: 'none',
}

const Display = {
  Block: 'block',
  None: 'none'
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

    elementById.style.visibility = Visibility.Hidden
    elementById.style.display = Display.None

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
  element.style.visibility = Visibility.Visible
  element.style.display = Display.Block
}

function hideElement(element) {
  element.style.visibility = Visibility.Hidden
  element.style.display = Display.None
}

function activateButton(button) {
  button.classList.add("navigation__item_active")
}

function deactivateButton(button) {
  button.classList.remove("navigation__item_active")
}


function main(event) {
  init()

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



