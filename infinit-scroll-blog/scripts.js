// DOM ID imports
const filter = document.getElementById('filter');
const postContainer = document.getElementById('post-container');
const loading = document.getElementsByClassName('.loader');


let limit = 3;
let page = 1;

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_pages=${page}`);

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
            <p class="post.body">${post.body}</p>
        </div>
        `;

    });
}

showPosts();