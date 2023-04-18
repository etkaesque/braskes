const id = localStorage.getItem("id");
const container = document.querySelector(".product-information");
const success = document.querySelector(`.success`);

fetch("https://643d8cc16c30feced815307f.mockapi.io/strawberries/" + id)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    productInit(data);

    const deleteButton = document.querySelector(`.delete`);
    const continueYes = document.querySelector(`.continueYes`);
    const continueNo = document.querySelector(`.continueNo`);

    deleteButton.addEventListener("click", () => {
      success.style.display = `block`;
    });

    continueNo.addEventListener("click", () => {
      success.style.display = `none`;
    });

    continueYes.addEventListener("click", () => {
      fetch(`https://643d8cc16c30feced815307f.mockapi.io/strawberries/`+`${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {


          window.location.href = `index.html`


        }
        
        
        
        )
 
    });
  });

function productInit(product) {
  const date = new Date(product.date);

  const year = date.getFullYear();
  const month = date.getMonth();

  const day = date.getDate();

  let monthNames = [
    "Sausio",
    "Vasario",
    "Kovo",
    "Balandžio",
    "Gegužės",
    "Birželio",
    "Liepos",
    "Rugpjūčio",
    "Rugsėjo",
    "Spalio",
    "Lapkričio",
    "Gruodžio",
  ];
  let monthWord = monthNames[month];
  container.innerHTML = `
    <div class="img-wrapper">
        
        <img src="${product.image}" alt="${product.name}">
        
        <button class="delete"></button>
      
        
    </div>

    <div class="product-info">
     
    
            <span class="location">${product.location}</span>
            <span class="time">Įkelta ${year} m. ${monthWord} ${day} d.</span>
            <span class="price">${product.price} €/kg</span>

    

    </div>

    <div>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
    </div>



    
    `;
}
