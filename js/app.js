const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const showInstructionsButton = document.getElementById('showInstructionsButton');

let recipes = []; 
let selectedRecipe = null; 

searchInput.addEventListener('input', search);

// document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     search();
// });

// ---------------------------------------------------------------------------------------------------------------------
function search() {
    // Gauname įvesto teksto reikšmę
    let searchTerm = searchInput.value.trim();

    // Tikriname, ar įvestas tekstas nėra tuščias
    if (searchTerm === '') {
        return;
    }
//------------------------Paieska-------------------------------------------------------
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((response) => {
            // Tikriname, ar atsakymas yra sėkmingas (status 200)
            if (!response.ok) {
                throw new Error('Užklausa nepavyko');
            }
            return response.json();
        })
        .then((data) => {
            recipes = data.meals;
            displayResults(recipes);
        })
        .catch((error) => {
            // Apdorojame klaidas
            console.error('Klaida yra cia:', error.message);
        });
}

//-------------------------Funkcija-------------------------------------------------------
function displayResults(meals) {
    // Išvalome senus rezultatus
    searchResults.innerHTML = '';

            // Tikriname, ar gauti receptai
    // if (!meals || meals.length === 0) {
    //     const noResultsMessage = document.createElement('div');
    //     noResultsMessage.classList.add('alert', 'alert-warning');
    //     noResultsMessage.textContent = 'This recipe is not exist.';
    //     searchResults.appendChild(noResultsMessage);
    //     return;
    // }

    // Įdedame naujus rezultatus į HTML
    for (let i = 0; i < meals.length; i++) {     
        const meal = meals[i];
        const { strMeal, strMealThumb, strCategory, idMeal } = meal;
        const categoryText = strCategory || 'Tasty food';
        const card = document.createElement('div');
        
        card.classList.add('col');
        card.innerHTML = `
        <div class="card" data-recipe-id="${idMeal}">
          <!-- Image -->
          <img src="${strMealThumb}" class="card-img-top"  alt="${strMeal}">
          <!-- Heart on image -->
          <svg  class="heart" xmlns="http://www.w3.org/2000/svg" width="55" height="51" viewBox="0 0 55 51" fill="none">
              <g filter="url(#filter0_d_2_49)">
                <path d="M38.8308 16.2021C35.8943 13.2664 31.1173 13.2664 28.1816 16.2021L27.4998 16.8835L26.8183 16.2021C23.8826 13.266 19.1052 13.266 16.1695 16.2021C13.2935 19.0781 13.2748 23.637 16.1262 26.8067C18.7269 29.6967 26.3971 35.9404 26.7225 36.2046C26.9435 36.3842 27.2093 36.4716 27.4735 36.4716C27.4823 36.4716 27.491 36.4716 27.4994 36.4712C27.7727 36.4839 28.0481 36.3902 28.2762 36.2046C28.6016 35.9404 36.2726 29.6967 38.8741 26.8063C41.7251 23.637 41.7065 19.0781 38.8308 16.2021ZM37.1019 25.2117C35.0742 27.4643 29.5005 32.1102 27.4994 33.7589C25.4983 32.1106 19.9257 27.4651 17.8984 25.2121C15.9093 23.0012 15.8906 19.8526 17.8551 17.888C18.8584 16.8851 20.1761 16.3832 21.4937 16.3832C22.8114 16.3832 24.129 16.8847 25.1323 17.888L26.6311 19.3869C26.8096 19.5653 27.0345 19.6718 27.2705 19.7091C27.6535 19.7914 28.0692 19.6845 28.3672 19.3873L29.8668 17.888C31.8739 15.8818 35.1386 15.8822 37.1444 17.888C39.1089 19.8526 39.0903 23.0012 37.1019 25.2117Z" fill="#F89B29"/>
              </g>
              <defs>
                <filter id="filter0_d_2_49" x="0" y="0" width="55" height="50.4724" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="7"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_49"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_49" result="shape"/>
                </filter>
              </defs>
            </svg>
          <div class="card-body d-flex justify-content-between">
              <div>
                  <!-- Name of recipie -->
            <h5 class="card-title">${strMeal}</h5>
            <!-- List  -->
            <ul class="d-flex list-unstyled">
              <!-- Time -->
              <li class="me-1">25 min</li>
              <li class="me-1"><svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#797979"/>
                  </svg></li>
                  <!-- Category -->
              <li>${categoryText}</li>
            </ul>
          </div>
          <div class="me-3">
              <!-- Ivertinimas -->
              <ul class="list-unstyled">
                  <!-- Star -->
                  <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12.0175L12.944 14.8571L11.636 9.50171L16 5.90019L10.2472 5.4301L8 0.380953L5.7528 5.4301L0 5.90019L4.364 9.50171L3.056 14.8571L8 12.0175Z" fill="#FFBA34"/>
              </svg></li>
              <!-- Rating -->
              <li>4.6</li>
              </ul> 
          </div>
          </div>
        </div>
      </div>
        `;
        card.addEventListener('click', () => {
            // Saugo informaciją apie pasirinktą receptą
            selectedRecipe = meal;
            showRecipeDetails(selectedRecipe);
        });

        searchResults.appendChild(card);
    };
}
//-------------------------------------------------------------------------------------------------------
fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Užklausa nepavyko');
        }
        return response.json();
    })
    .then((data) => {
        recipes = data.meals; 
        categories = data.categories;
        displayCategories();
    })
    .catch((error) => {
        console.error('Klaida cia:', error.message);
    });
//-------------------------------------------------------------------------------------------------
    function displayCategories() {
        const linksContainer = document.querySelector('.links');
    
        // Iteruojame per kategorijų masyvą ir sukurtas nuorodas pridėdame į linksContainer
        categories.forEach((category) => {
            const strCategory = category.strCategory;
    
            const link = document.createElement('a');
            link.className = 'btn mb-3';
            link.role = 'button';
            link.href = '#';
            link.innerHTML = strCategory;
    
            // Pridedame įvykio klausytoją kiekvienam kategorijos mygtukui
            link.addEventListener('click', () => {
                showRecipesByCategory(strCategory);
            });
    
            linksContainer.appendChild(link);
        });
    }
 //----------------------------------------------------------------------------------------------------   
    function showRecipesByCategory(category) {
        console.log(category)

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Užklausa nepavyko');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                recipes = data.meals; 
                displayResults(data.meals);
            })
            .catch((error) => {
                console.error('Klaida cia:', error.message);
            });
    }
    //---------------------------Nukreipti į kitą puslapį------------------------------------------
    const container = document.getElementById('searchResults');

    container.addEventListener("click", event => {
        const card = event.target.closest(".card");
        if (card) {
            // Gauti recepto ID iš kortelės
            const recipeId = card.dataset.recipeId;
            const recipe = recipes.find(recipe => recipe.idMeal === recipeId);

            if (recipe) {
                console.log('Gautas receptas:', recipe);
                // Nukreipti į recipe.html su pasirinktu receptu
               // window.location.href = `recipe.html?recipeId=${recipeId}`;
                details(recipe);
            } 
        }
        document.querySelector('section').style.display = 'block'; 
        document.querySelector('header').style.display = 'none';
        document.querySelector('main').style.display = 'none';
    });
    // --------------------Gaminimo instrukcija------------------------------------------------
   
const detailsButton = document.querySelector('.details-btn');
const recipeDetailsDiv = document.querySelector('.recipe-details');

detailsButton.addEventListener('click', () => {
    // Gauti pasirinkto recepto ID
    const recipeId = selectedRecipe.idMeal;

    // Funkciją, kuri rodo aprašymą pagal pasirinktą receptą
    details(recipeId);
    document.getElementById('recipeIngredientsSection').style.display = 'none';
});

function details(recipeId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Užklausa nepavyko');
            }
            return response.json();
        })
        .then((data) => {
            if (data.meals && data.meals.length > 0) {
                const recipe = data.meals[0];
                const strInstructions = recipe.strInstructions;
                const idMeal = recipe.idMeal; // Paimame idMeal

                // Sukuriame p elementą
                const pElement = document.createElement("p");

                // Pridedame tekstą į p elementą iš kintamojo strInstructions
                pElement.innerText = `${strInstructions}`;

                // Įdedame p elementą į div elementą
                recipeDetailsDiv.innerHTML = ''; // Išvalome senus duomenis
                recipeDetailsDiv.appendChild(pElement);
            } else {
                console.error('Nerasta recepto informacijos');
            }
        })
        .catch((error) => {
            console.error('Klaida čia:', error.message);
        });
}
// ---------------------------------------------------------------------------------------------------------------
const ingredientsButton = document.querySelector('.ingredients-btn');

ingredientsButton.addEventListener('click', () => {
    // Gauti pasirinkto recepto ID
    const recipeId = selectedRecipe.idMeal;
    
    // Iškviečiama funkciją, kuri rodo ingredientus pagal pasirinktą receptą
    showIngredients(recipeId);
});

function showIngredients(recipeId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Užklausa nepavyko');
            }
            return response.json();
        })
        .then((data) => {
            if (data.meals && data.meals.length > 0) {
                const recipe = data.meals[0];

                const recipeIngredients = document.getElementById('recipeIngredients');

                recipeIngredients.innerHTML = '';
                
// Skaitiklis
let ingredientCount = 0;

// Iteruojame per ingredientus ir matavimus
for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    const ingredient = recipe[ingredientKey];
    const measure = recipe[measureKey];

    // Tikriname, ar ingredientas ne null ir ne tuščias
    if (ingredient && ingredient !== "") {
        // Sukuriame div elementą ir pridedame tekstą
        const divElement = document.createElement("div");
        divElement.className = 'listas mb-3 ps-3';
        divElement.innerText = `${measure} ${ingredient}`;
        // Įdedame div elementą tiesiogiai į recipeIngredients
        recipeIngredients.appendChild(divElement);

        ingredientCount++;
    }
}

// Items kiekis
const itemCountElement = document.querySelector('#itemCount');
itemCountElement.innerText = `${ingredientCount} items`;

}
})}  

document.querySelector('section').style.display = 'none';

function showRecipeDetails(recipe) {
    // Paveikslėlis
    const recipeImage = document.getElementById('recipeImage');
    recipeImage.src = recipe.strMealThumb;

    // Recepto pavadinimas
    const recipeTitle = document.getElementById('recipeTitle');
    recipeTitle.innerText = recipe.strMeal;

    const recipeDetailsContainer = document.getElementById('recipeDetailsContainer');
    recipeDetailsContainer.style.display = 'block';
}
