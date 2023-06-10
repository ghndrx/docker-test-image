window.addEventListener('DOMContentLoaded', async () => {
    const repository = 'ghndrx/docker-test-image'; // Replace with your desired repository
  
    try {
      const response = await fetch(`https://api.github.com/repos/${repository}/commits`);
      const commits = await response.json();
  
      const commitList = document.getElementById('commit-list');
  
      if (commits.length > 0) {
        commits.forEach(commit => {
          const commitElement = document.createElement('div');
          commitElement.classList.add('commit');
          commitElement.innerHTML = `
            <p><strong>${commit.commit.author.name}</strong></p>
            <p>${commit.commit.message}</p>
          `;
          commitList.appendChild(commitElement);
        });
      } else {
        commitList.innerHTML = '<p>No commits found.</p>';
      }
    } catch (error) {
      console.error('Error fetching commits:', error);
    }
  });
  