$(document).ready(function () {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  $.get(apiUrl, function (data) {
    const posts = data.slice(0, 10); // Display the first 10 posts
    const postContainer = document.getElementById("post-container");

    for (let i = 0; i < posts.length; i += 3) {
      // Create a row for every three posts
      const row = document.createElement("div");
      row.classList.add("row", "mb-4");

      for (let j = i; j < i + 3 && j < posts.length; j++) {
        const post = posts[j];

        const card = document.createElement("div");
        card.classList.add("card", "col-md-4");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = post.title;

        const content = document.createElement("p");
        content.classList.add("card-text");
        content.textContent = post.body;

        cardBody.appendChild(title);
        cardBody.appendChild(content);
        card.appendChild(cardBody);
        row.appendChild(card);
      }

      postContainer.appendChild(row);
    }
  });
});
$(document).ready(function () {
  // Handle adding products to the wishlist
  $(".add-to-wishlist").click(function (e) {
    let productTitle = $(e.target).closest(".card").find(".card-title").text();

    // Send the product title to the wishlist page
    console.log(window.location.href);
    window.location.href =
      "wishtemp.html?product=" + encodeURIComponent(productTitle);
  });
});

// WISHLIST PAGE

$(document).ready(function () {
  // Retrieve product title from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productTitle = urlParams.get("product");

  // If a product title exists, add it to the wishlist
  if (productTitle) {
    let wishlistItem = $(
      "<li class='list-group-item'>" + productTitle + "</li>"
    );
    $("#wishlist").append(wishlistItem);
  }
});
