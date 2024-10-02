// when the DOM is done loading:
document.addEventListener("DOMContentLoaded", function() {
   initApp();

})

const initApp = () => {
   displayCategories()
}

const displayCategories = () => {
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
      .then(response => response.json())
      .then(data => showCategories(data.categories))
      .catch((error) => console.error(error));
}

const showCategories = (data) => {
   const categoryContainer = document.querySelector("#categories");
   data.forEach(item => {
      const {id, category} = item;
      const button = document.createElement("button");
      button.classList.add("btn");
      button.innerText = category;
      categoryContainer.appendChild(button);
   });
}

