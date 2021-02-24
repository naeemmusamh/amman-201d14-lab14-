'use strict';
// Set up an empty cart for use on this page.
const cart = new Cart([]);
// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
    const selectElement = document.getElementById('items');
    for (let i in Product.allProducts) {
        let optionElement = document.createElement('option');
        optionElement.setAttribute("value", Product.allProducts[i].name);
        optionElement.textContent = Product.allProducts[i].name;
        selectElement.appendChild(optionElement);
    }
}
// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
    event.preventDefault();
    // Do all the things ...
    addSelectedItemToCart();
    cart.saveToLocalStorage();
    updateCounter();
    updateCartPreview();
}

function addSelectedItemToCart() {
    let selectElement = document.getElementById('items');
    let pickedItem = selectElement.options[selectElement.selectedIndex].value.toLowerCase();
    let quantitySelected = document.getElementById('quantity').value;
    cart.items.push(new CartItem(pickedItem, quantitySelected));
    console.log(cart);
}
// TODO: Update the cart count in the header nav with the number of items in the Cart
let counter = 0;

function updateCounter() {
    counter++;
    let spanEl = document.getElementById('itemCount');
    spanEl.textContent = counter;
}

function updateCartPreview() {
    let selectElement = document.getElementById('items');
    let pickedItem = selectElement.options[selectElement.selectedIndex].value.toLowerCase();
    let quantitySelected = document.getElementById('quantity').value;
    let previewElement = document.getElementById('cartContents');
    previewElement.innerHTML = '';
    let ulEl = document.createElement('ul');
    for (let i in cart.items) {
        let liEl = document.createElement('li');
        liEl.textContent = 'product is ' + cart.items[i].product + ', quantity is ' + cart.items[i].quantity;
        ulEl.appendChild(liEl);
    }
    previewElement.appendChild(ulEl);
};
// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);
// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();