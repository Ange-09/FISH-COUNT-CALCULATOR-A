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
    const desc = document.getElementById("ov-description");
    const image = document.getElementById("ov-image");
  
    // Add fade-out
    desc.classList.remove("fade-in");
    image.classList.remove("fade-in");
    desc.classList.add("fade-out");
    image.classList.add("fade-out");
  
    // After fade-out is done, update content and fade in
    setTimeout(() => {
      desc.textContent = reasons[index].text;
      image.src = reasons[index].image;
  
      desc.classList.remove("fade-out");
      image.classList.remove("fade-out");
      desc.classList.add("fade-in");
      image.classList.add("fade-in");
    }, 300); // match your CSS transition time
    
  
    // Update button active class
    const allButtons = document.querySelectorAll(".reason-btn");
    allButtons.forEach(button => button.classList.remove("selected"));
    btn.classList.add("selected");
  }
  