const galeriaContainer = document.querySelector('.galeria-container');
const galeriaControlContainer = document.querySelector('.galeria-control');
const galeriaControl = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carrossel{
    constructor(container, items, controls){
        this.carrosselContainer = container;
        this.carrosselControls = controls;
        this.carrosselArray = [...items];
    }

    updateGallery(){
        this.carrosselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
            el.classList.remove('gallery-item-6');
        });

        this.carrosselArray.slice(0, 6).forEach((el, i) => {
            el.classList.add(`gallery-item-${i+1}`);
        });
    }

    setCurrentState(direction){
        if(direction.className == 'galeria-control-previous'){
            this.carrosselArray.unshift(this.carrosselArray.pop());
        }else{
            this.carrosselArray.push(this.carrosselArray.shift());
        }
        this.updateGallery();
    }
    setControls(){
        this.carrosselControls.forEach(controls => {
            galeriaControlContainer.appendChild(document.createElement('button')).className = `galeria-control-${controls}`;
            document.querySelector(`.galeria-control-${controls}`).innerText = controls;
        });
    }

    useControls(){
        const triggers = [...galeriaControlContainer.childNodes];
        triggers.forEach(controls => {
            controls.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(controls);
            });
        });
    }
}

const exampleCarrossel = new Carrossel(galeriaContainer, galleryItems, galeriaControl);

exampleCarrossel.setControls();
exampleCarrossel.useControls();