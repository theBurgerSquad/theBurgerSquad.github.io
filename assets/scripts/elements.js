export const createAddIngredient = ({title, price}) => {
    return parseToHTML(`
        <li class="list-group-item d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <i class="fas fa-plus-circle pr-2"></i>
                <h6 class="my-0">${title}</h6>
            </div>
            <span class="text-muted">$${price}</span>
        </li>
    `);
}
export const createRemoveIngredient = ({title, price}) => {
    return parseToHTML(`
        <li class="list-group-item d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <i class="fas fa-minus-circle pr-2"></i>
                <h6 class="my-0">${title}</h6>
            </div>
            <span class="text-muted">$${price}</span>
        </li>
    `);
}
export const createCartItem = ({ID}) => {
    return parseToHTML(`
        <div class="burger rounded m-1 d-flex justify-content-center align-items-center position-relative">
            <h4 class="position-absolute text-light">${ID}</h4>
            <img class=" img-fluid" src="/assets/images/burger.png" alt="">
        </div> 
    `);
}

// Parse String to HTML
const parseToHTML = (string) => new DOMParser().parseFromString(string, "text/html").body.firstChild;
