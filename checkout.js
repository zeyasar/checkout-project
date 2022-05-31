const taxRate = 0.18;
const shippingPrice = 15.0;

window.addEventListener('load', () => {
    localStorage.setItem('taxRate', taxRate);
    localStorage.setItem('shippingPrice', shippingPrice);

    sessionStorage.setItem('taxRate', taxRate);
    sessionStorage.setItem('shippingPrice', shippingPrice);
    calculateCartTotal();
})

let productsDiv = document.querySelector('.products');
productsDiv.addEventListener('click', (e) => {
    let quantityP = e.target.parentElement.parentElement.querySelector('#product-quantity');
    
    if (e.target.classList.contains('fa-minus') || e.target == quantityP.parentElement.firstElementChild) {
        console.log(e);
        if (quantityP.innerText > 1) {
            quantityP.innerText--;
            calculateProductTotal(quantityP);
        }else {
            if (confirm('Pruduct will be removed!')) {
                quantityP.parentElement.parentElement.parentElement.remove();
                calculateCartTotal();
            }
        }

    }
    else if (e.target.classList.contains('fa-plus') || e.target == quantityP.parentElement.lastElementChild) {
        quantityP.innerText++;
        calculateProductTotal(quantityP);
    }
    else if(e.target.className == "remove-product"){
        if (confirm("Product will be removed")) {
            quantityP.parentElement.parentElement.parentElement.remove();
            calculateCartTotal()
        }
        
    }

});

const calculateProductTotal = (quantityP) => {
    
    let productPrice = quantityP.parentElement.parentElement.querySelector('strong');
    let productTotalPriceDiv = quantityP.parentElement.parentElement.querySelector('.product-line-price');

    productTotalPriceDiv.innerText = (quantityP.innerText * productPrice.innerText).toFixed(2);

    calculateCartTotal();
};


const calculateCartTotal = () => {

    let productTotalPriceDivs = document.querySelectorAll('.product-line-price');
    let subtotal = 0;
    productTotalPriceDivs.forEach(eachProductTotalPriceDiv => {
        subtotal += parseFloat(eachProductTotalPriceDiv.innerText)
    });

    let taxPrice = subtotal * localStorage.getItem('taxRate');

    let shipping = (subtotal > 0 ? parseFloat(localStorage.getItem('shippingPrice')) : 0);

    let cartTotal = subtotal + taxPrice + shipping;


    document.querySelector("#cart-subtotal p:nth-child(2)").innerText = subtotal.toFixed(2);
    document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice.toFixed(2);
    document.querySelector("#cart-shipping p:nth-child(2)").innerText = shipping.toFixed(2);
    document.querySelector("#cart-total").lastElementChild.innerText = cartTotal.toFixed(2);
}