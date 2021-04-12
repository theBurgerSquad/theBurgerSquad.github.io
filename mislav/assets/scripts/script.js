(()=>{

    // HTML Buttons
    let btnClear = null;
    let btnAddToCart = null;
    let btnDeleteCookies = null;
    let btnReloadPage = null;

    // HTML Containers
    let contCart = null;
    let contJson = null;

    // Data
    let cart = null;
    let json = null;

    // Initialization Function (Setup)
    const init = () => {
        // loadData();
        initButtons();
        initHandlers();
        initElements();
        updateScreen();
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
    }

    const initHandlers = () => {
        btnClear.onclick = () => {

        };
        btnAddToCart.onclick = () => {
            addToCart({
                ID: cart.length>0?cart[cart.length-1].ID+1:0
            });
            updateScreen();
        };
        btnDeleteSession.onclick = () => {
            clearSession();
            updateScreen();
        };
        btnReloadPage.onclick = () => {
            reloadPage();
        };
    };

    const updateScreen = () => {
        updateCart();
        updateJson();
    }

    const addToCart = (data) => {
        cart.push(data);
        setSession("cart", cart);
    };

    const updateCart = () => {
        cart = getSession("cart")?getSession("cart"):[];
        clearContainer(contCart);
        for (item of cart) {
            contCart.appendChild(parseToHTML(
                `
                <div class="burger rounded m-1 d-flex justify-content-center align-items-center position-relative">
                <h4 class="position-absolute text-light">${item.ID}</h4>
                <img class=" img-fluid" src="/assets/images/burger.png" alt="">
                </div>
                `
            ));
        };
    };

    const updateJson = () => {
        contJson.innerHTML = prettyJson();
    }

    const prettyJson = () => {
        let ugly = JSON.stringify(cart, null, ' ');
        let pretty = "";
        let depth = 0;
        for (word of ugly.split(" ")) {
            if (word.trim() == "[" || word.trim() == "{") depth++;
            if (word.trim() == "]" || word.trim() == "},") depth--;
            if (["}\n]"].includes(word.trim())) {
                pretty += `<br/>${"&#8195;".repeat(depth)}}<br/>]`;
            } else {
                pretty += `${["]", "},"].includes(word.trim())?"<br/>":""}${"&#8195;".repeat(depth)}${word}${["[","{"].includes(word.trim())?"<br/>":""}`;
            }
        }
        return pretty;
    }

    const main = () => {
        
    };

    // Set and Get data from local storage
    const setSession = (key, value) => sessionStorage[key] = JSON.stringify(value);
    const getSession = (key) => JSON.parse(sessionStorage[key]?sessionStorage[key]:null);

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