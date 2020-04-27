// Code your solution here
let shoeList = document.querySelector('#shoe-list')
let shoeDisplay = document.querySelector('#main-shoe')

fetch('http://localhost:3000/shoes')
    .then(r => r.json())
    .then((shoes) => {
        shoes.forEach((shoe) => addShoeLi(shoe))
    })

function addShoeLi(shoe) {
    let shoeLi = document.createElement('li')
    shoeLi.innerText = shoe.name
    shoeLi.className = "list-group-item"
    shoeList.append(shoeLi)

    shoeLi.addEventListener("click", (evt)=>{
        addShoeToMain(shoe)
        addReviewsToMain(shoe)
    })
}

function addShoeToMain(shoe) {
    let shoeImg = document.querySelector('#shoe-image')
    shoeImg.src = shoe.image
    
    let shoeHeader = document.querySelector('#shoe-name')
    shoeHeader.innerText = shoe.name
    
    let shoeDesc = document.querySelector('#shoe-description')
    shoeDesc.innerText = shoe.description
    
    let shoePx = document.querySelector('#shoe-price')
    shoePx.innerText = shoe.price

    let reviewFormBox = document.querySelector('#form-container')
    reviewFormBox.innerHTML = `<form id="new-review"><div class="form-group"><textarea class="form-control" id="review-content" rows="3"></textarea><input type="submit" class="btn btn-primary"></input></div></form>`

    let reviewForm = document.querySelector('#new-review')

    reviewForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        let content = evt.target.elements[0].value
        newReviewRequest(shoe.id, content)
    })
}

function addSingleReview(review) {
    let reviewsUl = document.querySelector('#reviews-list')
    let reviewLi = document.createElement('li')
        reviewLi.className = 'list-group-item'
        reviewLi.innerText = review
    
        reviewsUl.append(reviewLi)
}

function addReviewsToMain(shoe) {
    let reviewsUl = document.querySelector('#reviews-list')
    resetChildren(reviewsUl)
    shoe.reviews.forEach((review) =>{
        let reviewLi = document.createElement('li')
        reviewLi.className = 'list-group-item'
        reviewLi.innerText = review.content
    
        reviewsUl.append(reviewLi)
    })
}

function resetChildren(element) {
    let child = element.lastElementChild
    while (child) {
        element.removeChild(child)
        child = element.lastElementChild
    } 
}

function newReviewRequest(shoeId, content) {
    fetch(`http://localhost:3000/shoes/${shoeId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({content: content})
    })
    .then(r => r.json())
    .then((response) => {
        console.log(response)
        addSingleReview(response.content)})
}

