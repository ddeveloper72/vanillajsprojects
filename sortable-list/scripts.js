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
        .forEach((unit, index) => {
            const listItem = document.createElement('li');

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

}
