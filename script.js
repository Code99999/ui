document.addEventListener("DOMContentLoaded", () => {
  // LOGIN FORM HANDLING
  const loginForm = document.querySelector("#loginForm form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (email && password) {
        alert("Login successful!");
        // Store logged-in state
        sessionStorage.setItem("loggedIn", "true");
        // Redirect to evaluation form page
        window.location.href = "form.html";
      } else {
        alert("Please enter your email and password.");
      }
    });
  }

  // CONSENT & RATING FLOW
  const consentForm = document.getElementById("consent-form");
  const ratingSection = document.getElementById("rating-section");
  const consentSection = document.getElementById("consent-section");
  const finishSection = document.getElementById("finish-section");
  const ratingForm = document.getElementById("rating-form");
  const finalSubmit = document.getElementById("submit-final");

  const imageUrls = ["placeholder.jpg"]; // Add your actual image URLs
  let currentImage = 0;
  let results = [];

  // Show consent/rating only if logged in
  if (sessionStorage.getItem("loggedIn") && sessionStorage.getItem("consentGiven")) {
    consentSection.classList.add("hidden");
    ratingSection.classList.remove("hidden");
    loadImage();
  } else if (sessionStorage.getItem("loggedIn")) {
    consentSection.classList.remove("hidden");
    ratingSection.classList.add("hidden");
  } else {
    // User not logged in - optionally redirect to login page
    // window.location.href = "login.html";
  }

  if (consentForm) {
    consentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sessionStorage.setItem("consentGiven", "true");

      const formData = new FormData(consentForm);
      sessionStorage.setItem("demographics", JSON.stringify(Object.fromEntries(formData)));

      consentSection.classList.add("hidden");
      ratingSection.classList.remove("hidden");
      loadImage();
    });
  }

  function loadImage() {
    if (currentImage < 10) {
      document.getElementById("rating-image").src = imageUrls[currentImage % imageUrls.length];
    } else {
      ratingSection.classList.add("hidden");
      finishSection.classList.remove("hidden");
    }
  }

  if (ratingForm) {
    ratingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(ratingForm);
      const entry = {
        image: imageUrls[currentImage % imageUrls.length],
        severity: formData.get("severity"),
        types: formData.getAll("types"),
        notes: formData.get("notes"),
      };
      results.push(entry);
      ratingForm.reset();
      currentImage++;
      loadImage();
    });
  }

  if (finalSubmit) {
    finalSubmit.addEventListener("click", () => {
      const finalFeedback = document.querySelector("[name='final-feedback']").value;
      const demographics = JSON.parse(sessionStorage.getItem("demographics"));
      const submission = {
        demographics,
        ratings: results,
        finalFeedback,
        timestamp: new Date().toISOString(),
      };

      console.log("Submission Data:", submission);

      alert("Your responses have been submitted. Thank you!");
      sessionStorage.clear();
      window.location.reload();
    });
  }
});
