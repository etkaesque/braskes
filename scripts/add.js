let id = localStorage.getItem("id");
let form = document.querySelector(".form");
let success = document.querySelector(`.success`);
const buttonContinue = document.querySelector(`.continue`);
const searchItemForm = document.querySelector(".seach-item");

searchItemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchText = event.target.search.value;
  const searchCity = event.target.cities.value;

  localStorage.setItem("searchText", searchText);
  localStorage.setItem("searchCity", searchCity);

  window.location.href = `index.html`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.name.value;
  const price = event.target.price.value;
  const image = event.target.image.value;
  const description = event.target.description.value;
  const location = event.target.inputcities.value;
  const date = new Date();

  console.log(name);
  console.log(price);
  console.log(image);
  console.log(description);
  console.log(location);
  console.log(date);

  fetch(`https://643d8cc16c30feced815307f.mockapi.io/strawberries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      price: price,
      image: image,
      description: description,
      location: location,
      date: date,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      success.style.display = `flex`;

      buttonContinue.addEventListener("click", () => {
        success.style.display = `none`;

        form.reset()
      
      });
    });
});
