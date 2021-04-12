import { createAddIngredient, createRemoveIngredient, createCartItem } from "./elements.js";

(() => {

    // HTML Buttons
    let btnClear = null;
    let btnAddToCart = null;
    let btnDeleteSession = null;
    let btnReloadPage = null;

    // HTML Containers
    let contCart = null;
    let contJson = null;
    let contAddIngredient = null;
    let contRemoveIngredient = null;
    let contBurgerPrice = null;

    // Data
    let cart = null;
    let burger = null;
    let burgerPrice = null;
    let ingredients = null;

    // Initialization Function (Setup)
    const init = () => {
        initData();
        initButtons();
        initHandlers();
        initElements();
        updateScreen();
    }

    const initData = () => {
        burger = [];
        ingredients = loadJSON("assets/data/ingredients.json");
        //drinks = loadJSON("assets/data/drinks.json");
        //fries = loadJSON("assets/data/fries.json");
    }

    const initButtons = () => {
        btnClear = document.querySelector("#btn-clear");
        btnAddToCart = document.querySelector("#btn-add-to-cart");
        btnDeleteSession = document.querySelector("#btn-delete-session");
        btnReloadPage = document.querySelector("#btn-reload-page");
    }

    const initElements = () => {
        contCart = document.querySelector("#cont-cart");
        contJson = document.querySelector("#cont-json");
        contAddIngredient = document.querySelector("#cont-add-ingredient");
        contRemoveIngredient = document.querySelector("#cont-remove-ingredient");
        contBurgerPrice = document.querySelector("#cont-burger-price");
    }

    const initHandlers = () => {
        btnClear.onclick = () => {
            burger = [];
            updateScreen();
        };
        btnAddToCart.onclick = () => {
            addToCart({
                ID: cart.length > 0 ? cart[cart.length - 1].ID + 1 : 0
            });
            updateScreen();
        };
        btnDeleteSession.onclick = () => {
            clearSession();
            updateScreen();
        };
        btnReloadPage.onclick = () => reloadPage();
    };

    const updateScreen = () => {
        updateCart();
        updateJson();
        updateAddList();
        updateRemoveList();
        updateBurgerPrice();
    }

    const addToCart = (data) => {
        cart.push(data);
        setSession("cart", cart);
    };

    const updateCart = () => {
        cart = getSession("cart") ? getSession("cart") : [];
        clearContainer(contCart);
        for (let item of cart) {
            contCart.appendChild(createCartItem(item));
        };
    };

    const updateAddList = () => {
        clearContainer(contAddIngredient);
        for (let ingredient of ingredients) {
            let addIng = createAddIngredient(ingredient);
            addIng.onclick = () => {
                burger.push(ingredient);
                let remIng = createRemoveIngredient(ingredient);
                remIng.onclick = () => {
                    removeFrom(burger, ingredient);
                    uupdateScreen();
                }
                contRemoveIngredient.appendChild(
                    remIng
                );
                updateScreen();
            }
            contAddIngredient.appendChild(
                addIng
            );
        };
    }

    const removeFrom = (arr, toDelete) => {
        arr.splice(arr.indexOf(toDelete), 1);
    }

    const updateRemoveList = () => {
        clearContainer(contRemoveIngredient);
        for (let ingredient of burger) {
            let remIng = createRemoveIngredient(ingredient);
            remIng.onclick = () => {
                removeFrom(burger, ingredient);
                updateScreen();
            }
            contRemoveIngredient.appendChild(
                remIng
            );
        }
    }

    const updateJson = () => {
        contJson.innerHTML = prettyJson();
    }

    const updateBurgerPrice = () => {
        burgerPrice = 0;
        for (let ingredient of burger) {
            burgerPrice += ingredient.price;
        }
        contBurgerPrice.innerHTML = `$${burgerPrice}`;
    }

    const loadJSON = (url) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return JSON.parse(xhr.responseText);
    }

    const prettyJson = () => {
        let ugly = JSON.stringify(cart, null, ' ');
        let pretty = "";
        let depth = 0;
        for (let word of ugly.split(" ")) {
            if (word.trim() == "[" || word.trim() == "{") depth++;
            if (word.trim() == "]" || word.trim() == "},") depth--;
            if (["}\n]"].includes(word.trim())) {
                pretty += `<br/>${"&#8195;".repeat(depth)}}<br/>]`;
            } else {
                pretty += `${["]", "},"].includes(word.trim()) ? "<br/>" : ""}${"&#8195;".repeat(depth)}${word}${["[", "{"].includes(word.trim()) ? "<br/>" : ""}`;
            }
        }
        return pretty;
    }

    const main = () => {

    };

    // Set and Get data from local storage
    const setSession = (key, value) => sessionStorage[key] = JSON.stringify(value);
    const getSession = (key) => JSON.parse(sessionStorage[key] ? sessionStorage[key] : null);

    // Clear session
    const clearSession = () => sessionStorage.clear();

    // Parse String to HTML
    const parseToHTML = (string) => new DOMParser().parseFromString(string, "text/html").body.firstChild;

    // Clear container
    const clearContainer = (container) => container.innerHTML = "";

    // Reload page
    const reloadPage = () => location.reload();

    window.onload = () => {
        init();
        main();
    }
})();