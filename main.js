const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector("#primary-navigation");
const userContainer = document.querySelector("#user-container");
const hamburgerIcon = document.querySelector("#hamburger");
const xIcon = document.querySelector("#x");

const form = document.querySelector("#form");
const results = document.querySelector("#results");
const submitBtn = document.querySelector("#submitBtn");

// Navbar

navToggle.addEventListener("click", () => {
  primaryNav.hasAttribute("data-visible")
    ? navToggle.setAttribute("aria-expanded", false)
    : navToggle.setAttribute("aria-expanded", true);
  hamburgerIcon.classList.toggle("hide");
  xIcon.classList.toggle("hide");
  primaryNav.toggleAttribute("data-visible");
  userContainer.toggleAttribute("data-visible");
});

// URL Shortener

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
});

function handleSubmit() {
  const linkInput = form.value;
  let myData;
  if (!validator.isURL(linkInput)) {
    alert("Please insert valid URL!");
    form.value = "";
  } else {
    fetch(`https://api.shrtco.de/v2/shorten?url=${linkInput}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then(function (data) {
        myData = data.result;
        let result = document.createElement("div");
        result.className = "link-result | padding-block-sm";
        result.innerHTML = `<a class="original-link" href="#">${linkInput}</a><div>
        <a href="#">${myData.full_short_link}</a>
        <button onclick="copyToClipboard()" class="button">Copy</button>
      </div>`;
        results.appendChild(result);
      });
    form.value = "";
  }
}

// copy to clipboard

function copyToClipboard() {
  const btnText = event.target;
  const shortLink = btnText.previousElementSibling;
  navigator.clipboard
    .writeText(shortLink.innerText)
    .then(() => {
      btnText.innerText = "Copied!";
      btnText.classList.toggle("copied");
      setTimeout(() => {
        btnText.innerText = "Copy";
        btnText.classList.toggle("copied");
      }, 3000);
    })
    .catch(() => {
      alert("Oops! Not able to copy to clipboard");
      console.log("not copied");
    });
}
