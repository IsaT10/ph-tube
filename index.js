const sortBtn = document.querySelector("#sort-btn");
const catContainer = document.querySelector("#categories-container");
const cardContainer = document.querySelector("#card-container");
const noDataFound = document.querySelector("#no-data-found");

const blogPage = () => {
  window.location.href = "blog.html";
};

const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );

  const data = await res.json();
  displayCategories(data.data);
};

const displayCategories = (categories) => {
  categories.forEach((category) => {
    const div = document.createElement("div");

    div.innerHTML = `        
    
      <button 
           onClick="handlecontent('${category.category_id}')"
            class="bg-stone-200 text-sm font-semibold text-stone-500 px-4 py-1 rounded-sm"
          >
            ${category.category}
      </button>
        `;

    catContainer.appendChild(div);
  });
};

const handlecontent = async (categoryID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await res.json();

  sortBtn.addEventListener("click", function () {
    data.data.sort(function (a, b) {
      const num1 = parseFloat(a.others.views);
      const num2 = parseFloat(b.others.views);

      if (num1 > num2) {
        return -1;
      } else if (num1 < num2) {
        return 1;
      } else {
        return 0;
      }
    });
    displaycontent(data.data);
  });

  displaycontent(data.data);
};

const displaycontent = (data) => {
  cardContainer.innerHTML = "";
  noDataFound.innerHTML = "";

  if (!data.length) {
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "mt-32"
    );
    div.innerHTML = `
       <img class="object-cover rounded-md" src="${`./img/Icon.png`}" alt="" />
        <h3 class="text-2xl font-bold text-stone-800 text-center mt-3">Oops!! Sorry, There is no </br> content here</h3>
    `;
    noDataFound.appendChild(div);
  }

  data.forEach((content) => {
    const duration = content.others.posted_date;
    const hours = Math.floor(duration / 3600);
    const remainingSec = duration % 3600;
    const minutes = Math.floor(remainingSec / 60);

    const div = document.createElement("div");
    div.innerHTML = `
   <div class="">
          <figure class="relative">
            <img
              class="w-80 h-52 object-cover rounded-md"
              src="${content.thumbnail}"
              alt=""
            />
            
            <div>
            ${
              duration
                ? `<p class="bg-stone-800 text-xs px-2 py-0.5  rounded-md  text-white absolute right-3 sm:right-10 md:right-3 bottom-5">  ${hours}hrs ${minutes}min ago</p>`
                : ""
            } 
           </div>
          </figure>
          <div class="mt-5 flex gap-3 items-start ">
            <img
              class="w-10 h-10 rounded-full object-cover"
              src="${content.authors[0].profile_picture}"
              alt="author"
            />
        <div class="flex flex-col">
          <h3 class="font-bold text-stone-800 ">
            ${content.title}
            </h3>
           <div class="flex gap-4 items-center mt-1">
             <p class="text-sm text-stone-500">
            ${content.authors[0].profile_name}
            </p>
            <p>
             ${
               content.authors[0].verified
                 ? `<img
                      class="h-6 w-6"
                      src="${`./img/blueMark.png`}"
                      alt="author"
                    />
                   `
                 : ""
             }
            </p>
           </div>
            <p class="text-sm text-stone-500 mt-1">${
              content.others.views
            } views</p>
        </div>

          </div>
        </div>
    `;

    cardContainer.appendChild(div);
  });
};

loadCategories();
handlecontent("1000");
