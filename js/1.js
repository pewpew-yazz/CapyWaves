//PAGINA DE BASEBOL NO CAPY


//variables
var selectedColor = null;
var selectedElement = null;
var menuOpen = false;


//initialize document
function init() {
    console.log('initializing document...');
    loadColors();//load colors
    if(colors.length > 0) selectColor (colors[0]);

    //element events
    elements.forEach(e =>{
        document.getElementById(e).addEventListener('click', () =>{selectedElement(e); });
    });
    }

    //load colors
    function loadColors() { 
        colors.forEach(c => {
            var divColor = document.createElement('div');
            divColor.className = 'palette-color';
            divColor.style.background = c.hex;
            //event
            divColor.addEventListener('click', () => {})
            document.getElementById('palette').appendChild(divColor);
        });
    }

    //select colors
    function selectColor(color){
        selectedColor = color;
        console.log(selectedColor);
        //show selected color
        document.getElementById('div-selected-color').style.background = selectedColor;
        document.getElementById('div-selected-color-name').textContent = selectedColor.name;
        document.getElementById('div-selected-color-rgb').textContent = selectedColor.rgb;
        document.getElementById('div-selected-color-hex').textContent = selectedColor.hex;
        document.getElementById('div-selected-color-element').textContent = selectedColor.element;

        //apply color to element
        if(selectedElement != null)
            document.getElementById(selectedElement).style.fill = selectedColor.hex;
    }




function init() {
    console.log('Initializing document...')
    createHeader();
    toggleMenu();
    showMenu();
    palette();
    setupSvgElements(); //SVG seleccionables
}

//create header
function createHeader() {
    var parent = document.getElementById('header');

    //create header left
    var divHeaderLeft = document.createElement('div');
    divHeaderLeft.id = 'header-left';
    parent.appendChild(divHeaderLeft);

    //create header menu
    var divHeaderMenu = document.createElement('div');
    divHeaderMenu.id = 'header-menu';
    divHeaderLeft.appendChild(divHeaderMenu);

    //icon
    var iconMenu = document.createElement('i');
    iconMenu.className = 'fas fa-bars icon icon-light icon-clickable';
    iconMenu.addEventListener('click', () => { toggleMenu(); });
    divHeaderMenu.appendChild(iconMenu);

    //create header logo
    var divHeaderLogo = document.createElement('div');
    divHeaderLogo.id = 'header-logo';
    divHeaderLeft.appendChild(divHeaderLogo);

    var imgLogo = document.createElement('img');
    imgLogo.src = 'images/1.svg';
    imgLogo.alt = 'Logo';
    divHeaderLogo.appendChild(imgLogo);

    //create header right
    var divHeaderRight = document.createElement('div');
    divHeaderRight.id = 'header-right';
    parent.appendChild(divHeaderRight);

    //create user photo
    var divUserPhoto = document.createElement('div');
    divUserPhoto.id = 'user-photo';
    divHeaderRight.appendChild(divUserPhoto);

    var imgUserPhoto = document.createElement('img');
    imgUserPhoto.src = 'photos/photos.jpg';
    imgUserPhoto.alt = 'User Photo';
    divUserPhoto.appendChild(imgUserPhoto);

    //create user icons
    var divUserIcons = document.createElement('div');
    divUserIcons.id = 'user-icons';
    divHeaderRight.appendChild(divUserIcons);

    //cog icon
    var cogIcon = document.createElement('i');
    cogIcon.className = 'fas fa-cog icon icon-light icon-clickable';
    divUserIcons.appendChild(cogIcon);
    
    //globe icon
    var globeIcon = document.createElement('i');
    globeIcon.className = 'fas fa-globe icon icon-light icon-clickable';
    divUserIcons.appendChild(globeIcon);
    
    //sign-out icon
    var signOutIcon = document.createElement('i');
    signOutIcon.className = 'fas fa-sign-out-alt icon icon-light icon-clickable';
    divUserIcons.appendChild(signOutIcon);
}




//toggle menu (apagado a encendido)
function toggleMenu() {
    if (menuOpen) 
        document.getElementById('menu').style.display = 'none';
    else
        document.getElementById('menu').style.display = 'block';

    //toggle menuOpen
    menuOpen = !menuOpen;
}
//show menu
function showMenu() {
    //parent
    var parent = document.getElementById('menu');
    //read menu items
    menu.forEach(item => {
        //create item
        var divItem = createMunuItem(item);  
        //event
        divItem.addEventListener('click', () => {
            window.location.href = item.url;
        })
        //add to parent
        parent.appendChild(divItem);      
    });
}

//create menu item
function createMunuItem(item) {
    console.log(item);

    //create item div
    var divItem = document.createElement('div');
    divItem.className = 'menu-item';
    divItem.id = 'div-menu-item-' + item.id;

    //create icon div
    var divIcon = document.createElement('div');
    divIcon.className = 'menu-item-icon';
    divIcon.style.background = item.color;
    divItem.appendChild(divIcon); //add to parent

    //create Icon
    var icon = document.createElement('i');
    icon.className = 'fas fa-' + item.icon;
    divIcon.appendChild(icon);

    //label
    var label = document.createElement('label');
    label.textContent = item.title;
    divItem.appendChild(label);
    
    //return item div
    return divItem;
}



// Elementos SVG
function setupSvgElements() {
    var svgElements = document.querySelectorAll('svg .blank-element'); // Selecciona todos los elementos SVG
    svgElements.forEach(element => {
        element.addEventListener('click', () => { selectElement(element.id); }); // Añadir evento de selección
    });
}

//paleta de colores
function palette() {
    var parent = document.getElementById('palette');
    //colors
    color.forEach(item => {
        //Div para cada color
        var divColor = document.createElement('div');
        divColor.className = 'color-item';
        divColor.style.backgroundColor = item.hex; 
        divColor.title = item.name;
        divColor.addEventListener('click', () => { selectColor(item); });
        parent.appendChild(divColor);
    });
}


// Seleccionar un color
function selectColor(color) {
    selectedColor = color;
    console.log('Color seleccionado:', selectedColor);
    // Mostrar la información del color en la barra de estado
    document.getElementById('label-selected-color-name').textContent = selectedColor.name;
    document.getElementById('label-selected-color-rgb').textContent = selectedColor.rgb;
    document.getElementById('label-selected-color-hex').textContent = selectedColor.hex;

    // Aplicar el color al elemento seleccionado (si hay uno seleccionado)
    if (selectedElement != null) {
        document.getElementById(selectedElement).style.fill = selectedColor.hex;
    }
}

// Seleccionar un elemento
function selectElement(elementId) {
    // Si el mismo elemento ya está seleccionado, lo deseleccionamos
    if (selectedElement === elementId) {
        document.getElementById(selectedElement).classList.remove('selected-element');
        // Reiniciar la variable para indicar que no hay nada seleccionado
        selectedElement = null; 
        // Limpiar la barra de estado
        document.getElementById('label-selected-color-element').textContent = 'none'; 
        return; // Salimos de la función
    }

    // Deseleccionar el elemento anterior, si existe
    if (selectedElement != null) {
        document.getElementById(selectedElement).classList.remove('selected-element');
    }

    // Seleccionar el nuevo elemento
    selectedElement = elementId;
    console.log('Elemento seleccionado:', selectedElement);

    // Mostrar el nombre del elemento en la barra de estado
    document.getElementById('label-selected-color-element').textContent = elementId;

    // Añadir clase para mostrar que está seleccionado
    document.getElementById(selectedElement).classList.add('selected-element');
}












































































