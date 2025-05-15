document.addEventListener('DOMContentLoaded', function() {
// ===== NAVEGACIÓN MÓVIL =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', function() {
navLinks.classList.toggle('active');
});
// Cerrar el menú al hacer clic en un enlace (delegación de eventos)
document.querySelector('.nav-links').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
    }
});
// ===== BOTONES DE CATEGORÍA =====
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');
categoryButtons.forEach(button => {
button.addEventListener('click', function() {
// Quitar la clase active de todos los botones
categoryButtons.forEach(btn => btn.classList.remove('active'));
// Añadir la clase active al botón clicado
this.classList.add('active');
// Filtrar productos según la categoría seleccionada
const category = this.getAttribute('data-category');
productCards.forEach(card => {
if (category === 'todos') {
card.style.display = 'block';
} else {
if (card.getAttribute('data-category') === category) {
card.style.display = 'block';
} else {
card.style.display = 'none';
}
}
});
});
});
// ===== BOTÓN PARA VER CATÁLOGO DE PRECIOS =====
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalProductTitle');
const pdfContainer = document.getElementById('pdfContainer');
const closeModal = document.querySelector('.close-modal');
const viewCatalogButton = document.getElementById('viewCatalogButton');
// Configurar el botón único para abrir el enlace al catálogo en Google Docs
if (viewCatalogButton) {
viewCatalogButton.addEventListener('click', function(e) {
e.preventDefault();
// Redirigir al documento de Google Docs
window.open('https://drive.google.com/file/d/1aDCceP-dzRH2GL22fhMczVr7liIs7GHe/view?pli=1', '_blank');
});
}
// Cerrar modal
if (closeModal) {
closeModal.addEventListener('click', function() {
modal.style.display = 'none';
document.body.style.overflow = 'auto'; // Restaurar scroll del body
});
}
// Cerrar modal haciendo clic fuera del contenido
window.addEventListener('click', function(e) {
if (e.target === modal) {
modal.style.display = 'none';
document.body.style.overflow = 'auto';
}
});
// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
if (contactForm) {
contactForm.addEventListener('submit', function(e) {
e.preventDefault();
// Validar campos del formulario
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const phone = document.getElementById('phone').value.trim();
const message = document.getElementById('message').value.trim();
if (name === '' || email === '' || message === '') {
errorMessage.textContent = 'Por favor, completa todos los campos requeridos.';
errorMessage.style.display = 'block';
successMessage.style.display = 'none';
return;
}
// Validar formato de correo electrónico
if (!isValidEmail(email)) {
errorMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
errorMessage.style.display = 'block';
successMessage.style.display = 'none';
return;
}
// Crear objeto de datos del formulario
const formData = new FormData(contactForm);
const data = {};
formData.forEach((value, key) => data[key] = value);
// Mostrar indicador de carga (opcional)
document.querySelector('.submit-btn').textContent = 'ENVIANDO...';
document.querySelector('.submit-btn').disabled = true;
// Enviar el formulario usando FormSubmit AJAX
fetch('https://formsubmit.co/ajax/alejoimb10@outlook.com', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Accept': 'application/json'
},
body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
// Restaurar botón
document.querySelector('.submit-btn').textContent = 'ENVIAR MENSAJE';
document.querySelector('.submit-btn').disabled = false;
if (data.success === 'true' || data.success === true) {
// Mostrar mensaje de éxito
successMessage.style.display = 'block';
errorMessage.style.display = 'none';
// Resetear el formulario
contactForm.reset();
// Ocultar mensaje de éxito después de 5 segundos
setTimeout(function() {
successMessage.style.display = 'none';
}, 5000);
} else {
throw new Error('Error en el envío del formulario');
}
})
.catch(error => {
// Restaurar botón
document.querySelector('.submit-btn').textContent = 'ENVIAR MENSAJE';
document.querySelector('.submit-btn').disabled = false;
// Mostrar mensaje de error
errorMessage.textContent = 'Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.';
errorMessage.style.display = 'block';
successMessage.style.display = 'none';
console.error('Error:', error);
});
});
}
// Función para validar formato de correo electrónico
function isValidEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}
// Función para validar formato de teléfono
function isValidPhone(phone) {
// Acepta formatos como: +123456789, 123-456-7890, (123) 456-7890, etc.
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,9}$/;
return phoneRegex.test(phone);
}
// ===== ANIMACIONES DE SCROLL =====
const fadeElements = document.querySelectorAll('.fade-in');
function checkScroll() {
fadeElements.forEach(element => {
const elementPosition = element.getBoundingClientRect().top;
const screenPosition = window.innerHeight / 1.3;
if (elementPosition < screenPosition) {
element.classList.add('active');
}
});
}
// Comprobar al cargar la página
checkScroll();
// Comprobar al hacer scroll
window.addEventListener('scroll', checkScroll);
// ===== NAVEGACIÓN SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
e.preventDefault();
const targetId = this.getAttribute('href');
const targetElement = document.querySelector(targetId);
if (targetElement) {
window.scrollTo({
top: targetElement.offsetTop - 80, // Ajuste para el header fijo
behavior: 'smooth'
});
}
});
});

// ===== FUNCIONALIDAD PARA ELEMENTOS LEGALES =====

// Mostrar banner de cookies si no se ha aceptado antes
if (!localStorage.getItem('cookiesAccepted') && !localStorage.getItem('cookiesRejected')) {
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        cookieBanner.style.display = 'block';
    }
}

// Botones de cookies
const acceptCookiesBtn = document.getElementById('acceptCookies');
if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        document.getElementById('cookieBanner').style.display = 'none';
    });
}

const rejectCookiesBtn = document.getElementById('rejectCookies');
if (rejectCookiesBtn) {
    rejectCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesRejected', 'true');
        document.getElementById('cookieBanner').style.display = 'none';
    });
}

// Enlaces a políticas
const privacyPolicyLink = document.getElementById('privacyPolicyLink');
if (privacyPolicyLink) {
    privacyPolicyLink.addEventListener('click', function(e) {
        e.preventDefault();
        const privacyModal = document.getElementById('privacyPolicyModal');
        if (privacyModal) {
            privacyModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        }
    });
}

const termsLink = document.getElementById('termsLink');
if (termsLink) {
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        const termsModal = document.getElementById('termsModal');
        if (termsModal) {
            termsModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        }
    });
}

const cookiePolicyLink = document.getElementById('cookiePolicyLink');
if (cookiePolicyLink) {
    cookiePolicyLink.addEventListener('click', function(e) {
        e.preventDefault();
        const privacyModal = document.getElementById('privacyPolicyModal');
        if (privacyModal) {
            privacyModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevenir scroll
            
            // Desplazar al apartado de cookies si existe
            const cookiesSection = document.querySelector('#privacyPolicyModal h3:nth-of-type(6)');
            if (cookiesSection) {
                setTimeout(() => {
                    cookiesSection.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        }
    });
}

// Cerrar modales legales
const closeButtons = document.querySelectorAll('.close-modal');
closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        if (modalId) {
            document.getElementById(modalId).style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll
        } else if (this.parentElement && this.parentElement.parentElement) {
            this.parentElement.parentElement.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }
    });
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
});

// Cerrar modales con la tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restaurar scroll
            }
        });
    }
});

// Añadir fecha actual al copyright
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.footer-copyright');
if (copyrightElement) {
    copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
}
// Función para manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error global capturado:', e.message);
    // Evitar que errores menores afecten la experiencia del usuario
    return true;
});

// Verificar si las imágenes se cargan correctamente
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Error al cargar la imagen:', this.src);
        this.src = 'img/placeholder.png'; // Imagen de respaldo
        this.alt = 'Imagen no disponible';
    });
});
});