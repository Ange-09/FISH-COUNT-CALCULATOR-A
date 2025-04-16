document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".ov-description");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("SlideInRight"); // Add animation
          observer.unobserve(entry.target); // Don't repeat
        }
      });
    }, {
      threshold: 0.2 // Trigger when 10% of element is visible
    });
  
    faders.forEach(fader => {
      observer.observe(fader);
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".ov-image");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("SlideInLeft"); // Add animation
          observer.unobserve(entry.target); // Don't repeat
        }
      });
    }, {
      threshold: 0.2 // Trigger when 10% of element is visible
    });
  
    faders.forEach(fader => {
      observer.observe(fader);
    });
  });