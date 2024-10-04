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

   // add "all category" button:
   const btnAll = document.createElement("button");
   btnAll.dataset.categoryId = "all";
   btnAll.classList.add("btn", "bg-red-500", "text-white", "hover:bg-red-500", "hover:text-white", "duration-400", "ring-1", "ring-red-500", "ring-offset-1", "btn-category")
   btnAll.innerText = "All";
    addClickHandler(btnAll);
   categoryContainer.appendChild(btnAll);

   data.forEach(item => {
      const {id, category, category_id:categoryId} = item;

      // create and show category button
      const button = document.createElement("button");
      button.dataset.categoryId = `${categoryId}`;
      button.classList.add("btn", "hover:bg-red-500", "hover:text-white", "duration-400", "btn-category");
      button.innerText = category;
      addClickHandler(button);
      categoryContainer.appendChild(button);
   });
};

const addClickHandler = (button) => {
   button.addEventListener("click", () => {
      const allButtons = document.querySelectorAll(".btn-category");
      allButtons.forEach(btn => {
         btn.classList.remove("text-white", "bg-red-500", "ring-1", "ringredn-500", "ring-offset-1");
      })

      // add styles for the active button:
      button.classList.add("text-white", "bg-red-500", "ring-1", "ring-red-500", "ring-offset-1");

      // display videos based on category:
      if (button.dataset.categoryId === "all") {
         displayVideos();
      } 
      else {
         fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${button.dataset.categoryId}`)
         .then(response => response.json())
         .then(data => {
            console.log(data.category);
            showVideos(data.category)
         })
         .catch(error => console.error(error));
      }
      
   })
};

const displayVideos = () => {
   fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
      .then(response => response.json())
      .then(data => showVideos(data.videos))
      .catch((error) => console.error(error));
};

const showVideos = (data) => {
   // get the videos container:
   const videoContainer = document.getElementById("videos");
   console.log(videoContainer);
   // clear the contents of the videos container:
   clearContent(videoContainer);

   // create and display videos in the UI;
   if (data.length >= 1) {
      data.forEach((video) => {
         console.log(video);
         const {thumbnail, title, description} = video;
         const {profile_picture:profilePicture, profile_name:profileName, verified} = video.authors[0];
         const {views, posted_date:publishDate} = video.others;
   
         // create the video card:
         const card = document.createElement("div");
         card.classList = "card card-compact bg-base-100 w-full shadow-md rounded-none";
         card.innerHTML = `
            <figure class="rounded-tr-lg rounded-tl-lg">
               <img class="w-full aspect-[5/3]"
               src=${video.thumbnail}
               alt="thumbnail" />
            </figure>
            <div class="p-1 py-3 flex gap-3">
               <div class="pt-1">
                  <img class="w-10 aspect-square rounded-full object-cover border border-red-500" src=${profilePicture} alt=${profileName}>
               </div>
               <div class="">
                  <h2 class="font-bold text-lg">${title}</h2>
                  <div class="flex items-center gap-2 text-gray-500">
                     <p class="">${profileName}</p>
                     ${verified ? `<img class="w-4" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"></img>` : ""}
                  </div>
                  <p class="text-sm text-gray-500">${views} Views</p>
               </div>
            </div>
         `;
         videoContainer.appendChild(card);
      })
   }
   else {
      videoContainer.innerHTML = `
         <div class="w-full col-span-full pt-20 flex items-center justify-center flex-col gap-5">
            <img class="w-[140px] mx-auto" src="../assets/icon.png">
            <div class="text-center">
               <p>No Videos to Display</p>
               <p>☹</p>
            </div>
         </div>
      `
   }
}

const clearContent = (parentElement) => {
   let child = parentElement.lastElementChild;

   while(child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
   }
}

