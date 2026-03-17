function toggleBio(bioId) {
    const bio = document.getElementById(bioId);
    if (bio.style.display === "none" || bio.style.display === "") {
        bio.style.display = "block"; // Show the bio
    } else {
        bio.style.display = "none"; // Hide the bio
    }
}


var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }

    function toggleGallery(galleryId) {
        const gallery = document.getElementById(galleryId);
        gallery.classList.toggle('hidden');
    }
    
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    
    document.querySelectorAll(".card img").forEach((img) => {
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        };
    });
    
    function closeModal() {
        modal.style.display = "none";
    }
    
// Initialize cart from localStorage or start with an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add item to cart
function addToCart(packageName, packageType, price) {
    cart.push({ packageName, packageType, price });
    saveCart();
    updateCartCount();
    alert(`${packageName} - Package ${packageType} added to cart.`);
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart item count on page load
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Update the cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

// Function to open cart modal and display cart items
function openCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    // Check if cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Display each item in the cart
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <p> Package ${item.packageType}: RM${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    document.getElementById('cartModal').style.display = 'block';
}

// Function to close cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    openCart(); // Refresh cart view
}

// Function to handle checkout (you can replace this with real checkout logic)
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    alert('Proceeding to checkout.');
    cart = []; // Clear cart after checkout
    saveCart();
    updateCartCount();
    closeCart();
}

// Update buttons to call addToCart function
function redirectToBooking(packageName, packageType, price) {
    localStorage.setItem("selectedPackage", JSON.stringify({ packageName, packageType, price }));
    window.location.href = "bookingPage.html"; 
}


// Loads selected package details on the booking page
document.addEventListener("DOMContentLoaded", function () {
    const selectedPackage = JSON.parse(localStorage.getItem("selectedPackage"));
    if (selectedPackage && document.getElementById("package")) {
        document.getElementById("package").value = `${selectedPackage.packageName} ${selectedPackage.packageType}`;
        document.getElementById("totalPrice").textContent = selectedPackage.price;
    }
});

// Add to cart functionality
function addToCart() {
    const bookingDetails = getFormData();
    if (validateForm(bookingDetails)) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(bookingDetails);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Package added to cart!");

        // Optionally, redirect to a main page after adding
        window.location.href = "front_page.html";;  
    }
}

// Validation for form fields
function validateForm(details) {
    for (const key in details) {
        if (details[key] === "") {
            alert(`Please fill in your ${key}`);
            return false;
        }
    }
    return true;
}

// Collect form data
function getFormData() {
    return {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        package: document.getElementById("package").value,
        date: document.getElementById("date").value,
        address: document.getElementById("address").value,
        price: document.getElementById("totalPrice").textContent
    };
}

// Placeholder for payment
function payNow() {
    const bookingDetails = getFormData();
    if (validateForm(bookingDetails)) {
        alert("Proceeding to payment...");
        // Add any other steps for payment handling here if needed
    }
}

// Validate the email format
function validateEmail() {
    const email = document.getElementById("email").value;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address containing '@'.");
        return false;
    }
    return true;
}

// Function to validate email and add to cart if valid
function validateAndAddToCart() {
    if (validateEmail()) {
        addToCart();  // Call the addToCart function if the email is valid
    }
}

// Function to validate email and proceed to payment if valid
function validateAndPayNow() {
    if (validateEmail()) {
        payNow();  // Call the payNow function if the email is valid
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    const today = new Date();
    const minBookingDate = new Date(today.setDate(today.getDate() + 14)).toISOString().split("T")[0];
    dateInput.setAttribute("min", minBookingDate);
});

function validateDate() {
    const dateInput = document.getElementById("date").value;
    const selectedDate = new Date(dateInput);
    const today = new Date();
    const minBookingDate = new Date(today.setDate(today.getDate() + 14));

    if (selectedDate < minBookingDate) {
        alert("You must book at least 14 days before your selected date.");
        return false;
    }
    return true;
}

// Update the button functions to include date validation
function validateAndAddToCart() {
    if (validateEmail() && validateDate()) {
        addToCart();
    }
}

function validateAndPayNow() {
    if (validateEmail() && validateDate()) {
        payNow();
    }
}
