// import DOM elements
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richList = [
    'Hilary, Alannah and Galen Jr Weston and family',
    'Patrick and John Collison',
    'John Dorrance',
    'Larry, Kitty, Laurence and Mark Goodman',
    'Dermot Desmond',
    'Denis O’Brien',
    'Lady Ballyedmond and family',
    'The Dunne and Heffernan families',
    'John Magnier and family',
    'Deirdre and Mark Lyons'
];

//  Store list items
const listItems = [];

let dragStartIndex;

createList();

//Insert list items into the DOM
function createList() {
    [...richList]
        // copy the array and crate a random math value for each array item
        .map(a => ({ value: a, sort: Math.random() }))

        // sort the math value into incrementing values
        .sort((a, b) => a.sort - b.sort)

        // map the sorted values back into the array
        .map(a => a.value)
        .forEach((unit, index) => {
            const listItem = document.createElement('li');

            // class test
            // listItem.classList.add('over');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                  <p class="person-name">${unit}</p>
                  <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });

        addEventListeners();
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragstart);
    })

    dragListItems.forEach(draggable => {
        draggable.addEventListener('dragleave', dragleave);
        draggable.addEventListener('dragover', dragOver);
        draggable.addEventListener('dragenter', dragEnter);
        draggable.addEventListener('drop', dragDrop);
    })
}