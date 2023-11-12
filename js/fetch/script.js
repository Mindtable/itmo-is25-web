import {CommonEvents} from "../common/common.js";
import {drawDetail, drawPageTitle} from "../details/details.js";

const Events = {
  DataLoaded: 'DataLoaded',
  Error: 'Error',
  HideLoader: 'HideLoader',
  ShowContent: 'ShowContent',
};

const Elements = {
  Loader: "detailsPageLoader",
  PageWrapper: "detailsPageWrapper",
  PageContent: "detailsPageContent",
  Page: "detailsPage",
};

const States = {
  INACTIVE: "INACTIVE",
  FETCH_DATA: "FETCH_DATA",
  OK: "OK",
  ERROR: "ERROR",
};

let state = States.INACTIVE;
let filter = {
  number: 1,
};

(function () {
  document.addEventListener(
    Events.DataLoaded,
    function (event) {
      console.log(`MyCustomEvent received ${JSON.stringify(event.detail)}`)
      state = States.OK
      const content = document.getElementById(Elements.PageContent)

      event.detail.details
        .map((json) => {
          return {
            title: json.title
          }
        })
        .forEach((object) => drawDetail(content, object))

      document.dispatchEvent(new Event(Events.HideLoader))
      document.dispatchEvent(new Event(Events.ShowContent))
    }
  )

  document.addEventListener(
    Events.Error,
    function (event) {
      state = States.ERROR
      console.log(`Error happened ${JSON.stringify(event.detail)}`)

      const content = document.getElementById(Elements.Page)

      drawPageTitle(
        content,
        `Error during request! Code: ${event.detail.code}, Message: ${event.detail.message}`
      )

      document.dispatchEvent(new Event(Events.HideLoader))
    }
  )

  document.addEventListener(
    Events.HideLoader,
    function () {
      document.getElementById(Elements.Loader).classList.add("hidden")
    }
  )

  document.addEventListener(
    Events.ShowContent,
    function () {
      document.getElementById(Elements.PageWrapper).classList.remove("hidden")
    }
  )

  document.addEventListener(
    CommonEvents.DetailsPageOpened,
    function () {
      console.log("Details page event received")

      if (state === States.INACTIVE) {
        state = States.FETCH_DATA
        document.getElementById(Elements.PageWrapper).classList.add("hidden")
        main()
      }
    }
  )
})()

function main() {
  restoreFilterFromLocalStorage();

  getData(filter.number)
    .then((data) => {
      console.log(`Request finished ${JSON.stringify(data)}`)
      document.dispatchEvent(new CustomEvent(
        Events.DataLoaded,
        {
          "detail": data
        }
      ))
    })
    .catch((error) => {
      console.log(error)
      document.dispatchEvent(new CustomEvent(
        Events.Error,
        {
          "detail": error
        }
      ))
    })

  incrementFilterAndSave()
  console.log(`Filter ${filter.number}`)
}

async function getData(filter) {
  const url = `www.mindtable.ru`;
  let response = await fetch(`https://${url}/details?filter=${filter}`)

  let json = await response.json()
  await sleep(3000)

  if (response.ok) {
    console.log("Request successful")
    return json
  } else if (response.status >= 400 && response.status < 500) {
    console.log(`Got client error. Response code: ${response.status}`)
    throw json
  } else if (response.status >= 500) {
    console.log(`Got server error. Response code: ${response.status}`)
    throw json
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function restoreFilterFromLocalStorage() {
  const filterFromCache = localStorage.getItem("detailPageFilter");
  if (filterFromCache !== null) {
    console.log("Get detailPageFilter from cache")
    filter.number = parseInt(filterFromCache)
  } else {
    localStorage.setItem("detailPageFilter", filter)
  }
}

function incrementFilterAndSave() {
  filter.number += 1
  filter.number = (filter.number - 1) % 5 + 1
  localStorage.setItem("detailPageFilter", filter.number)
}
