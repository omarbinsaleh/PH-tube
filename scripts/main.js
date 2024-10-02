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

      // create and show category button
      const button = document.createElement("button");
      button.classList.add("btn");
      button.innerText = category;
      addClickHandler(button);
      categoryContainer.appendChild(button);
   });
}

const addClickHandler = (button) => {
   button.addEventListener("click", () => {
      const allButtons = document.querySelectorAll("button");
      allButtons.forEach(btn => {
         btn.classList.remove("bg-green-400", "ring-2", "ring-green-300", "ring-offset-2");
      })

      button.classList.add("bg-green-400", "ring-2", "ring-green-300", "ring-offset-2");
   })
}

