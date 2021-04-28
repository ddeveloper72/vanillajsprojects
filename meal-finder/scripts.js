// Import DOM elements
const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultsHeading = document.getElementById('results-heading'),
    single_mealEl = document.getElementById('single-meal')


// Search meal and fetch data from API
function searchMeal(e) {
    // this is a submit, so prevent default method of submitting data to a file
    e.preventDefault();

    // Clear single meal if it's already shown
    single_mealEl.innerHTML = '';

    // Get the search term
    const term = search.value;
    
    
    // Check if a term was submitted
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(response => response.json()) // fetch returns promise, then caught & format to json
            .then(data => {  // this returns another promise with the data.
            console.log(data);
            resultsHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

            if (data.meals === null) {
                resultsHeading.innerHTML = `<p>There are no search results for '${term}'</p>`;
            } else { // meal tags are sourced from studying the api key value fields
                mealsEl.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                </div>`)
                .join('');  // join string data combined using map
            }
        }); 

        // Clear search text once submitted
        search.value = '';

    } else {
        alert('Please enter a search term')
    }


}

// Fetch meal by Id
function getMealById(mealId) {  // Return a single meal array from mealId
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
    })
}

// Add meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];  // init an array of ingredients

    for (let i = 1; i <= 20; i++) {  // create an index for each ingredient in the array
        if (meal[`strIngredient${i}`]) {  // align each ingredient with its own measure
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }

    // render the DOM elements
    // map through each ingredient and render list item with ingredient as a string
    single_mealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<P>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>`;
}

// Event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', randomMeal);


mealsEl.addEventListener('click', e => { // search through each meal-info divs
    const mealInfo = e.path.find(item => {  // search the child elements
        if(item.classList) {
            return item.classList.contains('meal-info');  // the class on the element
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealId');  // get the attribute for the mealId
        getMealById(mealId);
    }
});