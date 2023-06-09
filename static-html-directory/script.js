const commitInfoElement = document.getElementById('commit-info');

fetch('https://api.github.com/repos/ghndrx/docker-test-image/commits')
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      const latestCommit = data[0];
      const commitMessage = latestCommit.commit.message;
      const commitAuthor = latestCommit.commit.author.name;
      const commitDate = new Date(latestCommit.commit.author.date).toLocaleString();

      commitInfoElement.innerHTML = `
        <p><strong>Message:</strong> ${commitMessage}</p>
        <p><strong>Author:</strong> ${commitAuthor}</p>
        <p><strong>Date:</strong> ${commitDate}</p>
      `;
    } else {
      commitInfoElement.innerHTML = '<p>No commits found.</p>';
    }
  })
  .catch(error => {
    commitInfoElement.innerHTML = '<p>Error loading commit information.</p>';
    console.error(error);
  });
