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

  const reasons = [
    {
      text: "Forecasting fish count allows fishing communities around Laguna Lake to anticipate changes in fish availability. With over 13,000 fishermen relying on the lake for income and Metro Manila depending on it for fish supply, being able to predict declines or increases in fish populations helps communities plan ahead, reduce losses, and maintain stable food access.",
      image: "images/ovimage.png"
    },
    {
      text: "By predicting fish count based on water quality indicators like dissolved oxygen, BOD, and nutrient levels, environmental agencies such as LLDA and DENR can detect early warning signs of ecological stress. This empowers policymakers to respond proactively, enforce regulations, and manage water hyacinth proliferation more effectively to protect the lake’s biodiversity.",
      image: "image2.jpg"
    },
    {
      text: "The predictive model developed from this study can be scaled and applied to other lakes in the Philippines. By understanding how water quality affects fish populations, researchers and stakeholders across the country can replicate this forecasting method to monitor aquatic health, manage invasive species, and foster long-term ecological sustainability in other freshwater bodies.",
      image: "image3.jpg"
    }
  ];
  
  function showReason(index, btn) {
    // Update content
    document.getElementById("ov-description").textContent = reasons[index].text;
    document.getElementById("ov-image").src = reasons[index].image;
  
    // Remove "selected" from all buttons
    const allButtons = document.querySelectorAll(".reason-btn");
    allButtons.forEach(button => button.classList.remove("selected"));
  
    // Add "selected" to the clicked button
    btn.classList.add("selected");
  }

  // Buttons Stay Lit When Clicked
  const buttons = document.querySelectorAll('.ov-buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active')); // clear others
    button.classList.add('active'); // light up clicked
  });
});