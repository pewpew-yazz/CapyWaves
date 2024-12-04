//variables
var selectedColor = null;
var selectedElement = null;
var menuOpen = true;


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
   
    palette();
    setupSvgElements(); //SVG seleccionables
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












































































