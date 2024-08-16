const galeriaContainer = document.querySelector('.galeria-container');
const galeriaControlContainer = document.querySelector('.galeria-control');
const galeriaControl = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');


class Carrossel {
    constructor(container, items, controls) {
        this.carrosselContainer = container;
        this.carrosselControls = controls;
        this.carrosselArray = [...items];
        this.mySlideInterval = null;
        this.mySlideInterval = setInterval(
            this.autoSlide.bind(this),
            5000
        );
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

        clearInterval(this.mySlideInterval);
        this.updateGallery();
        this.mySlideInterval = setInterval(
            this.autoSlide.bind(this),
            5000
        );
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

                if (controls.className == 'galeria-Control-add') {
                    const newItem = document.createElement('img');
                    const latestItem = this.carrosselArray.length;
                    const latestIndex = this.carrosselArray.findIndex(item => item.getAttribute('data-index') == this.carrosselArray.length)+1;
          
                    Object.assign(newItem,{
                      className: 'gallery-item',
                      src: `http://fakeimg.pl/300/?text=${this.carrosselArray.length+1}`
                    });
                    newItem.setAttribute('data-index', this.carrosselArray.length+1);
          
                    this.carrosselArray.splice(latestIndex, 0, newItem);
                    document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
                    this.updateGallery();
          
                  } else {
                    this.setCurrentState(controls);
                  }
            });
        });
    }
}

const exampleCarrossel = new Carrossel(galeriaContainer, galleryItems, galeriaControl);

exampleCarrossel.setControls();
exampleCarrossel.useControls();