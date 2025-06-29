document.addEventListener("DOMContentLoaded", () => {
  const consentForm = document.getElementById("consent-form");
  const ratingSection = document.getElementById("rating-section");
  const consentSection = document.getElementById("consent-section");
  const finishSection = document.getElementById("finish-section");
  const ratingForm = document.getElementById("rating-form");
  const finalSubmit = document.getElementById("submit-final");

  const imageUrls = ["placeholder.jpg"]; // Add your actual image URLs
  let currentImage = 0;
  let results = [];

  // Check if already logged in
  if (sessionStorage.getItem("consentGiven")) {
    consentSection.classList.add("hidden");
    ratingSection.classList.remove("hidden");
  }

  consentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sessionStorage.setItem("consentGiven", "true");

    // Save demographics
    const formData = new FormData(consentForm);
    sessionStorage.setItem("demographics", JSON.stringify(Object.fromEntries(formData)));

    consentSection.classList.add("hidden");
    ratingSection.classList.remove("hidden");
    loadImage();
  });

  function loadImage() {
    if (currentImage < 10) {
      document.getElementById("rating-image").src = imageUrls[currentImage % imageUrls.length];
    } else {
      ratingSection.classList.add("hidden");
      finishSection.classList.remove("hidden");
    }
  }

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

  finalSubmit.addEventListener("click", () => {
    const finalFeedback = document.querySelector("[name='final-feedback']").value;
    const demographics = JSON.parse(sessionStorage.getItem("demographics"));
    const submission = {
      demographics,
      ratings: results,
      finalFeedback,
      timestamp: new Date().toISOString(),
    };

    // 🔐 Replace this with actual backend or Firebase code
    console.log("Submission Data:", submission);

    alert("Your responses have been submitted. Thank you!");
    sessionStorage.clear();
    window.location.reload(); // Optional: Restart form
  });
});
