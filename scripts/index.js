const searchItemForm = document.querySelector(".seach-item");
const content = document.querySelector(".content");
const message = document.querySelector(".message");
const filterElement = document.querySelector("#filter");

function applyFilter(data) {

  let sortedData;

  if (filterElement.value === "cheapest") {
    sortedData = sortSmallToBig(data);
  } else if (filterElement.value === "expensive") {
    sortedData = sortBigToSmall(data);
  } else if (filterElement.value === "old") {
    sortedData = sortNewtoOld(data);
  } else if (filterElement.value === "new") {
    sortedData = sortOldtoNew(data);
  }


  init(sortedData);
}

function search(data, searchText, searchCity) {
  message.textContent = "";
  let searchedArray = [];
  if (searchCity === "All") {
    data.forEach((obj) => {
      if (obj.name.includes(searchText)) {
        searchedArray.push(obj);
      }
    });
  } else {
    data.forEach((obj) => {
      if (obj.name.includes(searchText) && obj.location.includes(searchCity)) {
        searchedArray.push(obj);
      }
    });
  }

  if (searchedArray.length === 0) {
    message.textContent = "Pagal pateiktą užklausą rezultatų neradome.";
  }

  applyFilter(searchedArray);

  filterElement.addEventListener("change", () => applyFilter(searchedArray));
}

searchItemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch("https://643d8cc16c30feced815307f.mockapi.io/strawberries")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const searchText = event.target.search.value;
      const searchCity = event.target.cities.value;
      console.log("search text is:", !!searchText)
      console.log("searchCity  is:", searchCity)

      search(data, searchText, searchCity);
    });
});

fetch("https://643d8cc16c30feced815307f.mockapi.io/strawberries")
  .then((res) => {
    return res.json();
  })
  .then((data) => {


    const searchText = localStorage.getItem("searchText");
    const searchCity = localStorage.getItem("searchCity");

   

    if (searchText || searchCity) {
      search(data, searchText, searchCity);

    
    } else {
      applyFilter(data);
      filterElement.addEventListener("change", () => applyFilter(data));
    }

  
  });

////

function init(array) {
  content.innerHTML = "";
  array.forEach((arrayObj) => {
    const timePassed = time(arrayObj.date);
    const shortDescription = shotifyDescription(arrayObj.description);
    const card = document.createElement("article");
    card.setAttribute("class", "card");
    content.append(card);

    card.innerHTML += `
    
  

        <div class="card-info-aside">
            <span class="location">${arrayObj.location}</span>
            <span class="time">Prieš ${timePassed}</span>
        </div>

        
        <div class="card-image">
            <a href="./product.html" class="item-link">
    
                <img src="${arrayObj.image}" alt="${arrayObj.name}">
    
            </a>
        </div>

        <div class="card-info">
            <a href="./product.html" class="item-link">
                <h3>${arrayObj.name}</h3>
            </a>
        <p>${shortDescription}</p>
        <span class="price">${arrayObj.price} €/kg</span>
        </div>

    
    
    `;

    localStorage.removeItem("searchText");
    localStorage.removeItem("searchCity");


    card.addEventListener("click", () =>
      localStorage.setItem("id", `${arrayObj.id}`)
    );
  });
}

function time(dateString) {
  const timeThen = new Date(dateString);
  const timeNow = new Date();
  const timePassed = timeNow - timeThen;

  const timePassedInSeconds = Math.floor(timePassed / 1000);
  const timePassedInMinutes = Math.floor(timePassed / 60000);
  const timePassedInHours = Math.floor(timePassed / 3600000);
  const timePassedInDays = Math.floor(timePassed / 86400000);

  if (timePassedInSeconds < 60) {
    return `${timePassedInSeconds} s.`;
  } else if (timePassedInMinutes < 60) {
    return `${timePassedInMinutes} min.`;
  } else if (timePassedInHours < 24) {
    return `${timePassedInHours} val.`;
  } else {
    return `${timePassedInDays} d.`;
  }
}

function shotifyDescription(description) {
  if (!description.includes(" ")) {
    console.log("i dont inclinde");
    let sliced = description.slice(0, 80);
    return sliced + "...";
  } else if (description.length < 40) {
    return description;
  } else {
    let sliced = description.slice(0, 100);
    let lastWord = sliced.lastIndexOf(" ");
    let slicedDescription = sliced.slice(0, lastWord);
    return slicedDescription + "...";
  }
}

function sortSmallToBig(array) {
  return array.sort((a, b) => a.price - b.price);
}

function sortBigToSmall(array) {
  return array.sort((a, b) => b.price - a.price);
}

function sortNewtoOld(array) {
  return array.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortOldtoNew(array) {
  return array.sort((a, b) => new Date(b.date) - new Date(a.date));
}
