const content = document.querySelector(".content");

const filterElement = document.querySelector("#filter");

function applyFilter(data) {
  console.log(data);
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

fetch("https://643d8cc16c30feced815307f.mockapi.io/strawberries")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    applyFilter(data);

    filterElement.addEventListener("change", () => applyFilter(data));
  });

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
