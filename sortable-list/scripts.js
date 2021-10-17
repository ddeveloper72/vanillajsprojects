// import DOM elements
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richList = [
    {
        name: "John Dorrance III",
        networth: 2.8,
        source: "Campbell Soup Company"
    },
    {
        name: "John Magnier",
        networth: 2.5,
        source: "Coolmore Stud"
    },
    {
        name: "J. P. McManus",
        networth: 2.3,
        source: "Foreign exchange market"
    },
    {
        name: "Dermot Desmond",
        networth: 2.1,
        source: "Celtic F.C."
    },
    {
        name: "Patrick Collis",
        networth: 1.9,
        source: "Stripe (company)"
    },
    {
        name: "John Collison",
        networth: 1.9,
        source: "Stripe (company)"
    },
    {
        name: "Martin Naughto",
        networth: 1.6,
        source: "GlenDimplex"
    },
    {
        name: "Eugene Murtagh",
        networth: 1.4,
        source: "Kingspan Group"
    },
    {
        name: "Luke and Brianomer",
        networth: 1.6,
        source: "Comer Group"
    },
    {
        name: "David McMurtry",
        networth: 1.2,
        source: "Renishaw plc"
    }
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
                  <p class="person-name">${unit.name}</p>
                  <p class="person-networth" id="networth">${unit.networth} billion</p>
                  <p class="person-source">${unit.source}</p>
                  
                  <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);

           
        });


    addEventListeners();
}

function dragStart() {
    // console.log('Event: ', 'dragstart');
    // Get drag start index of closest li element
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}

function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}

function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}

function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragDrop() {
    // console.log('Event: ', 'drop');
    // get drag end index of closest li element
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// swap the dom elements for the li items
function swapItems(fromIndex, toIndex) {

    // get the dom elements
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    //swap the items to respective indexes
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne)
}

// Check the li order
function checkOrder() {
    listItems.forEach((listItem, index) => {
        // console.log(richList[index].name);


        const unitName = listItem.querySelector('.draggable .person-name')
            .innerText.trim();

        if (unitName != richList[index].name) {
            listItem.classList.add('wrong');
            listItem.classList.remove('right');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }



    });

}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('drop', dragDrop);
    })
}

check.addEventListener('click', checkOrder);