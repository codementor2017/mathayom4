document.addEventListener('DOMContentLoaded', function () {
  // Get all term buttons and panels
  const termButtons = document.querySelectorAll('.term-btn');
  const termPanels = document.querySelectorAll('.term-panel');

  // Function to switch active tab
  function switchTerm(termId) {
    // Remove active class from all buttons
    termButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    // Add active class to the clicked button
    const activeButton = document.querySelector(`.term-btn[data-term="${termId}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }

    // Hide all panels
    termPanels.forEach(panel => {
      panel.classList.remove('active');
    });

    // Show the selected panel
    const activePanel = document.getElementById(termId);
    if (activePanel) {
      activePanel.classList.add('active');
    }
  }

  // Add click event listeners to each term button
  termButtons.forEach(button => {
    button.addEventListener('click', function () {
      const termId = this.getAttribute('data-term');
      switchTerm(termId);
    });
  });

  // Optional: Add keyboard support for accessibility
  termButtons.forEach(button => {
    button.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const termId = this.getAttribute('data-term');
        switchTerm(termId);
      }
    });
  });

  // Smooth fade-in for cards when they become visible (optional touch)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  // Apply initial styles for fade-in to phase cards
  document.querySelectorAll('.phase-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease, transform 0.2s ease';
    observer.observe(card);
  });

  // Re-observe cards when switching tabs (since they might be hidden initially)
  termButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Small delay to allow the panel to become visible
      setTimeout(() => {
        document.querySelectorAll('.term-panel.active .phase-card').forEach(card => {
          // If the card hasn't been animated yet, set it up
          if (card.style.opacity === '0' || card.style.opacity === '') {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease, transform 0.2s ease';
            observer.observe(card);
          }
        });
      }, 50);
    });
  });
});