const elements = [
    {
        id: 0,
        name: 'Top bun',
        price: 1,
        image: 'burger/top_bun.png'
    },
    {
        id: 1,
        name: 'Bottom bun',
        price: 2,
        image: 'burger/bottom_bun.png'
    },
    {
        id: 2,
        name: 'Patty',
        price: 3,
        image: 'burger/patty.png'
    },
    {
        id: 3,
        name: 'Salad',
        price: 4,
        image: 'burger/lettuce.png'
    }
    ,
    {
        id: 4,
        name: 'Ham',
        price: 4,
        image: 'burger/ham.png'
    }
    ,
    {
        id: 5,
        name: 'Tomatoes',
        price: 4,
        image: 'burger/tomatoes.png'
    }
];

var offset = 0;

document.onload = do_layout();
window.addEventListener('resize', set_layers);

function do_layout() {
    for(let i=0;i<elements.length;i++) {
        show_add_layer_element(elements[i]);
    }
    set_layers();
}

function set_layers() {
    //update_offset();
    for (i = 0; layer_exists(i); i++) {
        let burger = document.querySelector('#burger');
        let layer = get_layer(i);
        let val = i * (layer.clientHeight/5);
        layer.style.bottom = `${val}px`;
    }
}

function layer_exists(i) {
    if (get_layer(i) != null) return true;
    return false;
}

function get_layer(i) {
    return document.querySelector('#layer-' + i);
}

function add_layer(elementID) {
    let i = 0;
    while (layer_exists(i)) {
        i++;
    }

    let burgers = document.querySelector('#burger');
    burgers.innerHTML += `
        <div class="burger-layer center" id="layer-${i}" style="z-index:${i};">
            <img src="${elements[elementID].image}" alt="">
        </div>
    `;

    offset+=1;
    show_remove_layer_element(i, elementID);
    set_layers();
}

function show_add_layer_element(element) {
    let i = 0;
    while (layer_exists(i)) {
        i++;
    }

    let add = document.querySelector('#add');
    add.innerHTML += `
        <div class="element center add" onclick="add_layer(${elements.indexOf(element)})">
            <img src="${element.image}" alt="">
            <p>${element.name}</p>
        </div>
    `;
    set_layers();
}

function show_remove_layer_element(j, id) {

    let add = document.querySelector('#remove');
    add.innerHTML += `
        <div class="element center cancel" onclick="remove_layer(${j})" id="layer-remove-${j}">
            <img src="${elements[id].image}" alt="">
            <p>${elements[id].name}</p>
        </div>
    `;
}

function remove_layer(i) {
    if(layer_exists(i))get_layer(i).remove();
    else return;
    
    let j = 0;
    while (layer_exists(j)) j++;
    for (j += 1; layer_exists(j); j++) {
        let layer = get_layer(j);
        layer.id = `layer-${j - 1}`;
        let rel_el = get_remove_layer_element(j);
        rel_el.id = `layer-remove-${j-1}`;
        rel_el.setAttribute( "onClick", `remove_layer(${j-1})`);
    }
    hide_remove_layer_element(i);
    offset-=1;
    set_layers();
}

function hide_remove_layer_element(i){
    let element = document.querySelector(`#layer-remove-${i}`);
    if(element!=null)element.remove();
    else return;
}

function get_remove_layer_element(i){
    return document.querySelector(`#layer-remove-${i}`);
}


function get_parent_height(object){
    return object.clientHeight;
}