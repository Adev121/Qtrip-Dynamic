
import config from "../conf/index.js";
const backendEndpoint = config.backendEndpoint;
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  console.log(urlParams);
  const city = urlParams.get("city");
  // console.log(city);
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
 try {
  //  const response= await fetch(`http://${backendEndpoint}/adventures/?city=${city}`);
   const response= await fetch(`${backendEndpoint}/adventures/?city=${city}`);
   const city_name=await response.json();
    console.log(city_name);
    city_name.forEach(element => {
      console.log(element.name,element.id);
    });
    return city_name;
 } catch (error) {
  console.log(error)
  return null;
 }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
// function addAdventureToDOM(adventures) {
//   // TODO: MODULE_ADVENTURES
//   // 1. Populate the Adventure Cards and insert those details into the DOM
//   console.log(adventures)
//   const dataDiv = document.getElementById("data");

//   const card = document.createElement("div");

//   // Customize the card content based on adventure properties
//   card.innerHTML = `
//   <div class="card" style="width: 18rem;">
//   <img src="${adventures.image}" class="card-img-top" alt="hii">
//   <div class="${adventures.name}">
//   <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   </div>
// </div>
//   `;

//   dataDiv.appendChild(card);
// }



function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adv)=>{
  let container = document.createElement("div");
  container.setAttribute("class", "col-sm-6 col-lg-3 my-4")
  container.innerHTML += `
  <a href="detail/?adventure=${adv.id}" id="${adv.id}" target="_blank">
  <div class="activity-card">
  <div class="category-banner">
  <h5 class="my-0">${adv.category}</h5>
  </div>
  <img src="${adv.image}">
  <div class="d-flex justify-content-between align-items-center py-2" style="width: 90%">
  <div>
  <h6>${adv.name}</h6>
  <h6>Duration</h6>
  </div>
  <div>
  <h6>${adv.currency} ${adv.costPerHead}</h6>
  <h6>${adv.duration} Hours</h6>
  </div>
  </div>
  </div>
  </a>
  `
  let parent=document.getElementById("data")
  parent.append(container)
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(list);
  return list.filter(adventure => adventure.duration >= low && adventure.duration <= high);
  
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // return list.filter(adventure => categoryList.some(category => adventure.categories.includes(category)));
  let filteredList=[];
  console.log(list);
  list.filter(function (e) {
    if(categoryList.includes(e.category))
      filteredList.push(e);   
      });

      return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log(filters);
  let filteredlist =[]
  let arr=filters["duration"].split("-")
  console.log(arr);
  if(filters["category"].length>0 && filters["duration"].length>0){
    filteredlist=filterByCategory(list, filters.category)
    filteredlist=filterByDuration(filteredlist,parseInt(arr[0]),parseInt(arr[1]))
  }
  else if(filters["category"].length>0){
    filteredlist=filterByCategory(list,filters.category);
  }
  else if(filters["duration"].length>0){
  filteredlist=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
  }
  else{
    return list;
  }
  // Place holder for functionality to work in the Stubs
  return filteredlist;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // localStorage.setItem("filters", JSON.stringify(filters));
  localStorage.setItem('filters', JSON.stringify(filters));

}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // Place holder for functionality to work in the Stubs
  const filters = localStorage.getItem('filters');
  return filters ? JSON.parse(filters) : null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList=filters["category"];
  let li=[];
 for(let i=0;i<categoryList.length;i++)
 {
  // console.log(categoryList[i]);
   li.push(categoryList[i]);
 }
 //console.log(li);
 for(let i=0;i<li.length;i++)
 {
   //console.log(li[i]);
   var div=document.createElement("div");
   div.setAttribute("class","category-filter");
   div.innerText=li[i];
   document.getElementById("category-list").append(div);
 }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
