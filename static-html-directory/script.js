window.addEventListener('DOMContentLoaded', async () => {
    const repository = 'ghndrx/docker-test-image'; // Replace with your desired repository
    const commitCount = 5; // Number of commits to display
  
    try {
      const response = await fetch(`https://api.github.com/repos/${repository}/commits?per_page=${commitCount}`);
      const commits = await response.json();
  
      const commitList = document.getElementById('commit-list');
  
      if (commits.length > 0) {
        commits.forEach(commit => {
          const commitElement = document.createElement('div');
          commitElement.classList.add('commit');
          commitElement.innerHTML = `
            <p><strong>Commit: </strong>${commit.sha}</p>
            <p><strong>Date: </strong>${commit.commit.author.date}</p>
            <p><strong>Message: </strong>${commit.commit.message}</p>
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
  