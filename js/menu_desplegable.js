//Menu desplegable carrousel

// Obtén todos los elementos de los menús desplegables
const menuItems = document.querySelectorAll('.header-center nav ul li');

// Itera sobre cada elemento de menú
menuItems.forEach(item => {
    const dropdownArrow = item.querySelector('.dropdown-arrow');
    const dropdownMenu = item.querySelector('.dropdown-menu');

    // Cambiar la flecha cuando se pasa el ratón por encima
    item.addEventListener('mouseover', () => {
        dropdownArrow.innerHTML = '&#9650;';  // Flecha hacia arriba
        dropdownMenu.style.display = 'block';  // Muestra el menú desplegable
    });

    // Volver a la flecha hacia abajo cuando el ratón sale
    item.addEventListener('mouseout', () => {
        dropdownArrow.innerHTML = '&#9660;';  // Flecha hacia abajo
        dropdownMenu.style.display = 'none';  // Oculta el menú desplegable
    });
});

