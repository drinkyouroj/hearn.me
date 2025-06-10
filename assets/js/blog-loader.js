// Blog loader with markdown rendering
const container = document.getElementById('blog-posts');

async function renderMarkdown(markdown) {
  // Basic markdown rendering with marked.js
  return marked.parse(markdown);
}

async function loadBlogPost(filename) {
  try {
    const response = await fetch(`blog/${filename}`);
    if (!response.ok) throw new Error('Post not found');
    const markdown = await response.text();
    const html = await renderMarkdown(markdown);
    container.innerHTML = `
      <div class="blog-post">
        <button id="back-to-blog" class="back-button">← Back to All Posts</button>
        <div class="markdown-content">${html}</div>
      </div>
    `;
    
    // Add event listener to back button
    document.getElementById('back-to-blog').addEventListener('click', loadBlogPosts);
  } catch (e) {
    container.innerHTML = `
      <div class="error">
        <p>Error loading post. <a href="#" id="back-link">Return to blog</a></p>
      </div>
    `;
    document.getElementById('back-link').addEventListener('click', (e) => {
      e.preventDefault();
      loadBlogPosts();
    });
  }
}

async function loadBlogPosts() {
  try {
    const res = await fetch('blog/index.json');
    const posts = await res.json();
    
    if (!Array.isArray(posts) || posts.length === 0) {
      container.textContent = 'No blog posts found.';
      return;
    }
    
    container.innerHTML = `
      <div class="blog-list">
        ${posts.map(post => `
          <article class="blog-preview" data-filename="${post.filename}">
            <h3>${post.title}</h3>
            <p class="post-date">${post.date}</p>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="#" class="read-more" data-filename="${post.filename}">Read more →</a>
          </article>
        `).join('')}
      </div>
    `;
    
    // Add click handlers to all read more links
    document.querySelectorAll('.read-more, .blog-preview').forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        const filename = element.dataset.filename || element.closest('[data-filename]')?.dataset.filename;
        if (filename) {
          history.pushState({ filename }, '', `#${filename}`);
          loadBlogPost(filename);
        }
      });
    });
    
  } catch (e) {
    container.innerHTML = "<p>Unable to load blog posts. Please try again later.</p>";
    console.error('Error loading blog posts:', e);
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.filename) {
    loadBlogPost(e.state.filename);
  } else {
    loadBlogPosts();
  }
});

// Load appropriate content based on URL hash
function initBlog() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    loadBlogPost(hash);
  } else {
    loadBlogPosts();
  }
}

document.addEventListener('DOMContentLoaded', initBlog);