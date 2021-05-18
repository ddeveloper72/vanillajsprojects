// DOM ID imports
const filter = document.getElementById('filter');
const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');


let limit = 5;
let page = 1;

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
        `;

        postContainer.appendChild(postEl);
    });
}

// Show loader and fetch more posts
function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);

    }, 1000);
}

// filter posts
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    // search the tile and body for the term
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        // check is term is in the the array by searching all the indexes
        if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display =  'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

// Show initial posts
showPosts();

// Event Listeners
window.addEventListener('scroll', () => {
    // reference https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
    // console.log(document.documentElement.scrollTop);
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    // determine the scroll range
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

// Filter posts
filter.addEventListener('input', filterPosts);