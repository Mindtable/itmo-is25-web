import "../common/common.js"

(function () {
    document.addEventListener("DOMContentLoaded", init)
  }
)();

const FormFields = {
  Name: 'name',
  Picture: 'picture'
}

function prepareFormData(form) {
  let formData = new FormData(form)
  let object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });

  console.log("Debug infor in prepareFormData")
  console.log(object);
  console.log(JSON.stringify(object))
  object.name = object.name.trim()

  return object
}

function loadImageFromDisk(file, alt, afterImageSet) {
  let pageContentItemImage = document.createElement('img');
  pageContentItemImage.classList.add("page__content_item_image")

  let imgSrc = ""

  const reader = new FileReader()
  reader.addEventListener(
    'load',
    function (event) {
      imgSrc = reader.result
      pageContentItemImage.alt = alt
      pageContentItemImage.src = imgSrc
      console.log("addEventListener finish")
      afterImageSet(imgSrc)
    }
  )
  reader.readAsDataURL(file)

  console.log("createLegoPartImage finish")

  return pageContentItemImage
}

function loadItemFromLs(imgSrc) {
  let pageContentItemImage = document.createElement('img');
  pageContentItemImage.classList.add("page__content_item_image")

  pageContentItemImage.alt = "lego_human"
  pageContentItemImage.src = imgSrc

  return pageContentItemImage
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

function drawElement(parent, object) {
  let pageContentItem = document.createElement('div')

  pageContentItem.appendChild(createLegoPartTitle(object.name))

  if (object.imgSrc.length !== 0) {
    pageContentItem.appendChild(loadItemFromLs(object.imgSrc))
  }

  pageContentItem.classList.add("page__content_item")

  parent.appendChild(pageContentItem)
}

function drawElementByUserInput(elements, parent, object) {
  let pageContentItem = document.createElement('div')

  pageContentItem.appendChild(createLegoPartTitle(object.name))

  if (object.picture.name.length !== 0) {
    pageContentItem.appendChild(
      loadImageFromDisk(
        object.picture,
        object.name,
        function (imgSrc) {
          saveNewItemToDisk(elements, object.name, imgSrc)
        }
      )
    )
  } else {
    saveNewItemToDisk(elements, object.name, "")
  }

  pageContentItem.classList.add("page__content_item")

  parent.appendChild(pageContentItem)
}

function saveNewItemToDisk(elements, name, imgSrc) {
  const objectToStore = {};
  objectToStore.name = name
  objectToStore.imgSrc = imgSrc
  elements.push(objectToStore)
  localStorage.setItem("legoParts", JSON.stringify(elements))
}

function init() {
  const form = document.getElementById("addLegoPageForm");
  const content = document.getElementById("addLegoPageContent");

  let elementsJson = localStorage.getItem("legoParts");
  let elements;

  console.log(localStorage)
  if (elementsJson === null || elementsJson.length === 0) {
    elements = [];
    localStorage.setItem("legoParts", JSON.stringify(elements));
    console.log("Created elements and put them to localstorage");
  } else {
    elements = JSON.parse(elementsJson)
    console.log("Got elements from localstorage");
  }

  elements.forEach((element) => drawElement(content, element));

  form.addEventListener(
    "submit",
    function (event) {
      const object = prepareFormData(form);

      if (object.name.length === 0) {
        alert("Пустая строка не может быть названием детали!");
        return
      }

      drawElementByUserInput(elements, content, object)


      console.log(object, "Hello world!!!!!!!!");
    })
}
