async function loadBlogPosts() {
    const container = document.getElementById("blog-posts");
    try {
      const res = await fetch("/blog/index.json");
      const posts = await res.json();
  
      container.innerHTML = posts.map(post => `
        <article>
          <h3><a href="/blog/${post.filename}">${post.title}</a></h3>
          <p><em>${post.date}</em></p>
          <p>${post.excerpt}</p>
        </article>
      `).join('');
    } catch (e) {
      container.innerHTML = "<p>Blog not available or index missing.</p>";
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadBlogPosts);