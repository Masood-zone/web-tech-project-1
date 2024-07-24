document.addEventListener("DOMContentLoaded", function () {
  // Product cards data
  const cards = [
    {
      imgSrc: "/assets/images/iphone14.png",
      title: "Apple iPhone 14 Pro Max 128GB Deep Purple (MQ9T3RX/A)",
      description:
        "The iPhone 14 Pro Max is the most advanced iPhone ever. It features the powerful A16 Bionic chip, a Pro camera system, and a stunning Super Retina XDR display.",
      price: "$999",
      likeIcon: "/assets/svg/like.svg",
    },
    {
      imgSrc: "/assets/images/pocketcamera.png",
      title: "Blackmagic Pocket Cinema Camera 6k",
      description:
        "The Blackmagic Pocket Cinema Camera 6K features a Super 35 size sensor, 13 stops of dynamic range and dual native ISO up to 25,600 for HDR images and incredible low light performance.",
      price: "$2535",
      likeIcon: "/assets/svg/like.svg",
    },
    {
      imgSrc: "/assets/images/applewatch.png",
      description:
        "The Apple Watch Series 9 is the ultimate device for a healthy life. Get the most out of your workouts, track your activity, and stay connected with the people and information you care about.",
      title: "Apple Watch Series 9 GPS 41mm Starlight Aluminium Case",
      price: "$399",
      likeIcon: "/assets/svg/like.svg",
    },
    {
      imgSrc: "/assets/images/airpodsmax.png",
      description:
        "AirPods Max reimagine over-ear headphones. An Apple-designed dynamic driver provides immersive high-fidelity audio. Every detail, from canopy to cushions, has been designed for an exceptional fit.",
      title: "Airpods Max Silver",
      price: "$549",
      likeIcon: "/assets/svg/like.svg",
    },
    {
      imgSrc: "/assets/images/galaxywatch6.png",
      description:
        "The Samsung Galaxy Watch6 Classic is a premium smartwatch with a timeless design. It features a rotating bezel, a large display, and a variety of health and fitness tracking features.",
      title: "Samsung Galaxy Watch6 Classic 47mm Black",
      price: "$369",
      likeIcon: "/assets/svg/like.svg",
    },
    {
      imgSrc: "/assets/images/galaxy6.png",
      description:
        "The Galaxy S21 Ultra is the ultimate smartphone. It features a 108MP camera, a 6.8-inch Dynamic AMOLED 2X display, and a powerful Exynos 2100 processor.",
      title: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
      price: "$1799",
      likeIcon: "/assets/svg/like.svg",
    },
    {
      imgSrc: "/assets/images/buds.png",
      description:
        "The Galaxy Buds FE are the perfect wireless earbuds for everyday use. They feature a comfortable design, long battery life, and rich sound quality.",
      title: "Galaxy Buds FE Graphite",
      price: "$99.99",
      likeIcon: "/assets/svg/like.svg",
    },
    {
      imgSrc: "/assets/images/appleipad.png",
      description:
        "The iPad 9 is the perfect tablet for everyday use. It features a 10.2-inch Retina display, an A13 Bionic chip, and support for the Apple Pencil and Smart Keyboard.",
      title: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
      price: "$398",
      likeIcon: "/assets/svg/like.svg",
    },
  ];

  // Function to generate card HTML
  function generateCardHTML(card, index) {
    return `
        <div class="col-md-3 mb-4">
          <div class="card h-100 text-center">
            <div class="position-absolute top-0 start-0 p-2">
              <img src="${card.likeIcon}" alt="like-icon" />
            </div>
            <div class="card-body d-flex flex-column align-items-center justify-content-center">
              <img src="${card.imgSrc}" alt="product" class="img-fluid mb-3" />
              <h5 class="card-title">${card.title}</h5>
              <p class="card-text">${card.price}</p>
              <a href="/pages/product.html?product=${index}" class="btn btn-dark w-100">View Details</a>
            </div>
          </div>
        </div>
      `;
  }

  // Function to display related products
  function displayRelatedProducts(currentIndex) {
    const relatedProducts = cards
      .filter((_, index) => index !== currentIndex)
      .slice(0, 4) // Limit to 4 related products
      .map(generateCardHTML)
      .join("");

    document.querySelector(".related-card").innerHTML = relatedProducts;
  }

  // Insert cards into the DOM
  const cardContainer = document.getElementById("card-container");
  if (cardContainer) {
    cardContainer.innerHTML = cards.map(generateCardHTML).join("");
  }

  // Handle product detail page
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productIndex = urlParams.get("product");

  if (productIndex !== null) {
    const index = parseInt(productIndex, 10);
    if (index >= 0 && index < cards.length) {
      const product = cards[index];
      document.getElementById("product-image").src = product.imgSrc;
      document.getElementById("product-title").innerText = product.title;
      document.getElementById("product-description").innerText =
        product.description || "No description available.";
      document.getElementById("product-price").innerText = product.price;

      // Display related products
      displayRelatedProducts(index);
    } else {
      document.querySelector(".container.my-5").innerHTML =
        "<p>No product found.</p>";
    }
  }

  // Form validations
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (this.checkValidity()) {
        showToast(
          "Success",
          "Your message has been sent successfully!",
          "bg-success"
        );
        this.reset();
      } else {
        showToast(
          "Error",
          "Please fill out all fields correctly.",
          "bg-danger"
        );
      }
    });

  document
    .getElementById("newsletter-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (this.checkValidity()) {
        showToast(
          "Success",
          "You have successfully subscribed to the newsletter!",
          "bg-success"
        );
        this.reset();
      } else {
        showToast("Error", "Please enter a valid email address.", "bg-danger");
      }
    });

  function showToast(title, message, className) {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast ${className} text-white`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");
    toast.setAttribute("data-delay", "3000");

    toast.innerHTML = `
        <div class="toast-header">
          <strong class="mr-auto">${title}</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">${message}</div>
      `;

    toastContainer.appendChild(toast);
    $(toast).toast("show");
    toast.addEventListener("hidden.bs.toast", () => {
      toast.remove();
    });
  }
});
