const searchBtn = document.querySelector(".search");
const List = document.getElementById("food");

const mealDetailsContent = document.querySelector(".meal-data");
const modal = document.querySelector(".modale");
const recipie = document.getElementById(".recipe-link");
const close = document.querySelector(".closebtn");

searchBtn.addEventListener("click", info);
List.addEventListener("click", popUp);
close.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

function info(e) {
  e.preventDefault();
  let searchInputTxt = document.getElementById("text-input").value.trim();

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
          
          <div class="result" id="${meal.idMeal}">
                    <div class="meals-img" id="meals-img">
                      <img src="${meal.strMealThumb}"/>
                    </div>
                      <div class="meals-title" id="meals-title">
                         <h2>${meal.strMeal}</h2>
                      </div>
                     <a href = "#" class="recipe-btn" id="link">RECIPE</a>
                  </div>
                 `;
        });

        List.classList.remove("notFound");
      } else {
        html = "Sorry, no such meals with this ingredient!";
        List.classList.add("notFound");
      }

      List.innerHTML = html;
    });
}
function popUp(e) {
  e.preventDefault();

  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement; // gives element id number of the selected recipie.

    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())

      .then((data) => mealRecipeModal(data.meals));
  }
  function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = ` <div class="meal-title" id="meal-title">
                <h2>${meals.strMeal}</h2>
                  <div class="meal-img" id="meal-img">
                   <img src="${meals.strMealThumb}"/>
                  </div>
                    <div class="meal-recipie-steps" id="meal-recipie-steps">
                     <p class="category">${meals.strCategory}</p>
                      <h2>INSTRUCTIONS:</h2>
                       <p>${meals.strInstructions}</p>
                    </div>
                  <div class="meal-video-link" id="meal-video-link">
                      <h3> Here the video link to the recipie. <i class="far fa-hand-point-down"></i></h3>
                         <a href="${meals.strYoutube}">Recipe Video</a>
                  </div>
</div>     
                   
                  
    
  `;

    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add("showRecipe");
  }
}
