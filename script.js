const galeriaContainer = document.querySelector('.galeria-container');
const galeriaControlContainer = document.querySelector('.galeria-control');
const galeriaControl = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');
const toggleAutoSlideButton = document.getElementById('toggleAutoSlide');

class Carrossel {
    constructor(container, items, controls) {
        this.carrosselContainer = container;
        this.carrosselControls = controls;
        this.carrosselArray = [...items];
        this.mySlideInterval = null;
        this.isAutoSliding = true;  // Flag para controle do auto-slide

        this.startAutoSlide();  // Inicia o auto-slide
    }

    startAutoSlide() {
        if (this.mySlideInterval) clearInterval(this.mySlideInterval);
        this.mySlideInterval = setInterval(
            this.autoSlide.bind(this),
            5000
        );
    }

    stopAutoSlide() {
        clearInterval(this.mySlideInterval);
        this.mySlideInterval = null;
    }

    toggleAutoSlide() {
        if (this.isAutoSliding) {
            this.stopAutoSlide();
            toggleAutoSlideButton.textContent = 'Ativar Auto Slide';
        } else {
            this.startAutoSlide();
            toggleAutoSlideButton.textContent = 'Desativar Auto Slide';
        }
        this.isAutoSliding = !this.isAutoSliding;
    }

    autoSlide() {
        this.carrosselArray.push(this.carrosselArray.shift());
        this.updateGallery();
    }

    updateGallery() {
        this.carrosselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
            el.classList.remove('gallery-item-6');
        });

        this.carrosselArray.slice(0, 6).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });
    }

    setCurrentState(direction) {
        if (direction.className == 'galeria-control-previous') {
            this.carrosselArray.unshift(this.carrosselArray.pop());
        } else {
            this.carrosselArray.push(this.carrosselArray.shift());
        }

        if (this.isAutoSliding) this.startAutoSlide();  // Reinicia o intervalo se estiver em auto-slide
        this.updateGallery();
    }

    setControls() {
        this.carrosselControls.forEach(controls => {
            galeriaControlContainer.appendChild(document.createElement('button')).className = `galeria-control-${controls}`;
            document.querySelector(`.galeria-control-${controls}`).innerText = controls;
        });
    }

    useControls() {
        const triggers = [...galeriaControlContainer.childNodes];
        triggers.forEach(controls => {
            controls.addEventListener('click', e => {
                e.preventDefault();
                if (controls.className === 'galeria-control-previous' || controls.className === 'galeria-control-next') {
                    this.setCurrentState(controls);
                }
            });
        });

        // Adiciona o evento para o botão de ativar/desativar auto-slide
        toggleAutoSlideButton.addEventListener('click', () => {
            this.toggleAutoSlide();
        });
    }
}

const exampleCarrossel = new Carrossel(galeriaContainer, galleryItems, galeriaControl);

exampleCarrossel.setControls();
exampleCarrossel.useControls();
