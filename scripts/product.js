const id = localStorage.getItem("id");
const container = document.querySelector(".product-information");

fetch("https://643d8cc16c30feced815307f.mockapi.io/strawberries/" + id)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    productInit(data);
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
