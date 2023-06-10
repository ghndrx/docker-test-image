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
  document.addEventListener("DOMContentLoaded", function() {
    // Hamburger menu toggle
    var menuToggle = document.getElementById("menu-toggle");
    var mainNav = document.getElementById("main-nav");
  
    menuToggle.addEventListener("click", function() {
      mainNav.classList.toggle("active");
    });
  
    // Hide menu when scrolling down
    var prevScrollPos = window.pageYOffset;
    var header = document.querySelector("header");
  
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
  
      if (prevScrollPos > currentScrollPos) {
        header.classList.remove("hidden");
      } else {
        header.classList.add("hidden");
      }
  
      prevScrollPos = currentScrollPos;
    };
  });
  