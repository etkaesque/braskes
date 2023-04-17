const content = document.querySelector(".content");



fetch("https://643d8cc16c30feced815307f.mockapi.io/strawberries")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    init(data);
  });

function init(array) {
  array.forEach((arrayObj) => {
    const timePassed = time(arrayObj.date);
    const shortDescription = shotifyDescription(arrayObj.description);
    const card = document.createElement("article");
    card.setAttribute("class", "card");
    content.append(card)

    card.innerHTML += `
    
  

        <div class="card-info-aside">
            <span class="location">${arrayObj.location}</span>
            <span class="time">Prieš ${timePassed} d.</span>
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

function time(dateInput) {
  const dateString = dateInput;
  const date = new Date(dateString);
  const time = Date.now() - date.getTime();
  return (timePassed = Math.floor(time / 86400000));
}

function shotifyDescription(description) {
    let sliced = description.slice(0, 150);
    let lastWord = sliced.lastIndexOf(" ");
    let slicedDescription = sliced.slice(0, lastWord);
    return slicedDescription + "...";
  }

