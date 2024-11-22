const apiKey = '1127ea5aaddfa00ad5777c43df6366219ab53754'; // Replace with your CryptoPanic API Key
const apiUrl = `https://cors-anywhere.herokuapp.com/https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}&filter=rising&filter=trending&public=true`;

const newsContainer = document.getElementById('news');

async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch news');

    const data = await response.json();
    newsContainer.innerHTML = ''; // Clear the loading message

    data.results.forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';

      newsItem.innerHTML = `
        <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
        <p><small>${new Date(item.published_at).toLocaleDateString()}</small></p>
      `;

      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    newsContainer.innerHTML = `<p>Error loading news: ${error.message}</p>`;
  }
}

// Call the function on page load
fetchNews();
