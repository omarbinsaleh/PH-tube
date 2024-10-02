// when the DOM is done loading:
document.addEventListener("DOMContentLoaded", function() {
   initApp();

})

const initApp = () => {
   displayCategories()
   displayVideos();
}

const displayCategories = () => {
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
      .then(response => response.json())
      .then(data => showCategories(data.categories))
      .catch((error) => console.error(error));
};

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
};

const addClickHandler = (button) => {
   button.addEventListener("click", () => {
      const allButtons = document.querySelectorAll("button");
      allButtons.forEach(btn => {
         btn.classList.remove("bg-green-400", "ring-1", "ring-green-400", "ring-offset-1");
      })

      button.classList.add("bg-green-400", "ring-1", "ring-green-400", "ring-offset-1");
   })
};

const displayVideos = () => {
   fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
      .then(response => response.json())
      .then(data => showVideos(data.videos))
      .catch((error) => console.error(error));
};

const showVideos = (data) => {
   const videoContainer = document.getElementById("videos");
   console.log(videoContainer);

   data.forEach((video) => {
      console.log(video);
      const {thumbnail, title, description} = video;
      const {profile_picture:profilePicture, profile_name:profileName} = video.authors[0];
      const {views, posted_date:publishDate} = video.others;

      // create the video card:
      const card = document.createElement("div");
      card.classList = "card card-compact bg-base-100 w-full shadow-sm";
      card.innerHTML = `
         <figure class="">
            <img class="w-full aspect-[5/3]"
            src=${video.thumbnail}
            alt="thumbnail" />
         </figure>
         <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
         </div>
      `;
      videoContainer.appendChild(card);

   })
}

