document.addEventListener('DOMContentLoaded', () => {
    // Selecting the Thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('currentImage');
    
    // Set the first thumbnail as active on page load
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
        mainImage.src = thumbnails[0].getAttribute('data-big');
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const bigImage = thumbnail.getAttribute('data-big');
            mainImage.src = bigImage;

            thumbnails.forEach(thumb => {
                thumb.classList.remove('active');
            });
            thumbnail.classList.add('active');
        });
    });


    // Selecting the Modal Thumbnail
    const modalThumbnails = document.querySelectorAll('.small-modal-thumbnail');
    const modalMainImage = document.getElementById('modalCurrentImage');
    
    // Set the first modal thumbnail as active on page load
    if (modalThumbnails.length > 0) {
        modalThumbnails[0].classList.add('active-modal');
        modalMainImage.src = modalThumbnails[0].getAttribute('modal-data-big');
    }

    modalThumbnails.forEach(modalThumbnail => {
        modalThumbnail.addEventListener('click', () => {
            const modalBigImage = modalThumbnail.getAttribute('modal-data-big');
            modalMainImage.src = modalBigImage;

            modalThumbnails.forEach(thumb => {
                thumb.classList.remove('active-modal');
            });
            modalThumbnail.classList.add('active-modal');
        });
    });

    // Quantity Buttons
    let realNumber = 0;
    const minusOne = document.getElementById("negative");
    const display = document.getElementById("display");
    const plusOne = document.getElementById("positive");

    plusOne.addEventListener("click", function() {
        realNumber += 1;
        display.textContent = realNumber;
    });

    minusOne.addEventListener("click", function() {
        if (realNumber > 0) {
            realNumber -= 1;
        }
        display.textContent = realNumber;
    });

    // Add to Cart
    const addToCartBtn = document.getElementById('addtocart');
    const cartItemsContainer = document.getElementById('cart-container');
    const notification = document.querySelector('.notification');
    const emptyCartMessage = cartItemsContainer.querySelector('p');

    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(display.textContent, 10);
        if (quantity > 0) {
            const activeThumbnail = document.querySelector('.thumbnail.active');
            if (!activeThumbnail) {
                alert('Please select a product thumbnail.');
                return;
            }
            const product = document.querySelector('.right-main-page');
            const productName = product.querySelector('h1').textContent;
            const productPrice = parseFloat(product.querySelector('.product-price').getAttribute('data-price'));
            const productImageSrc = activeThumbnail.getAttribute('data-big');
            const totalPrice = productPrice * quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${productImageSrc}" alt="">
                <div class="cart-item-details">
                    <p>${productName}</p>
                    <span>$${productPrice.toFixed(2)} x ${quantity} = $${totalPrice.toFixed(2)}</span>
                </div>
                <button class="bin"><img src="image/icon-delete.svg" alt="Remove"></button>
            `;

            cartItemsContainer.appendChild(cartItem);

            // Hide the "Your cart is empty" message
            emptyCartMessage.style.display = 'none';

            // Reset quantity display
            display.textContent = 0;
            realNumber = 0;

            // Add event listener to remove item from cart
            cartItem.querySelector('.bin').addEventListener('click', () => {
                cartItemsContainer.removeChild(cartItem);
                updateNotification();
            });

            updateNotification();
        }
    });

    // Show the cart dropdown on click
    const cartIcon = document.getElementById('carts');
    const cartDropdown = document.querySelector('.cart-dropdown');
    
    cartIcon.addEventListener('click', () => {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close the cart dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.style.display = 'none';
        }
    });

    function updateNotification() {
        const itemCount = cartItemsContainer.querySelectorAll('.cart-item').length;
        if (itemCount > 0) {
            notification.textContent = itemCount;
            notification.style.display = 'block';
        } else {
            notification.style.display = 'none';
            emptyCartMessage.style.display = 'block';
        };
    };
    

    const productImg = document.querySelector(".product-img img");
    const modalDetails = document.querySelector('.modal-details');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    // Open modal 
    productImg.addEventListener('click', () => {
        modalDetails.style.display = 'flex';
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modalDetails.style.display = 'none';
    });


    // Modal navigation (next and previous buttons)
    const nextBtn = document.querySelector('.next-btn');
    const previousBtn = document.querySelector('.previous-btn');
    const modalImages = [...document.querySelectorAll('.small-modal-thumbnail')];

    let currentIndex = modalImages.findIndex(image => image.classList.contains('active-modal'));

    function updateModalImage(index) {
        modalImages.forEach((image, idx) => {
            if (idx === index) {
                image.classList.add('active-modal');
                modalMainImage.src = image.getAttribute('modal-data-big');
            } else {
                image.classList.remove('active-modal');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % modalImages.length;
        updateModalImage(currentIndex);
    });

    previousBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + modalImages.length) % modalImages.length;
        updateModalImage(currentIndex);
    });


    hamburger = document.querySelector(".meun");
        hamburger.onclick = function () {
            navBar = document.querySelector(".links");
            navBar.classList.toggle("active-nav");
        };
});
