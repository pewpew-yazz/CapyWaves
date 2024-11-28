// Menú desplegable para los submenús del menú central
const menuItems = document.querySelectorAll('.header-center nav ul li');

menuItems.forEach(item => {
    const dropdownMenu = item.querySelector('.dropdown-menu');

    item.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
});

// Menú desplegable para el perfil
const profileContainer = document.querySelector('.profile-container');

profileContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    const dropdownMenu = profileContainer.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Cerrar todos los menús al hacer clic fuera
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});
