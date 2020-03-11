class galleryLoader {
  constructor(site) {
    this.title = "Gallery";
    this.meta_desc = "Yes, we have pictures of our abused animals.";

    this.styling = `
    #gallery{background-color: var(--darker-black-bg-color); padding: 2rem 0;}
    .img-center{margin: 0 auto; max-height: 300px;}
    .modal {width: 100vw; hight: 100vh; background-color: var(black50); }
    `;

    taino.changeNavColor("gallery");

    this.starthtml = `
      <main id="appendModal">
        <section id="gallery"> 
          <div class="glide">
            <div class="glide__track" data-glide-el="track">
              <div class="glide__slides">
                <!--Insert Images Here-->
                </div>
              </div>
              <div class="glide__arrows" data-glide-el="controls">
                <button class="glide__arrow glide__arrow--left" data-glide-dir="<"></button>
                <button class="glide__arrow glide__arrow--right" data-glide-dir=">"></button>
              </div>
            </div>
        </section>

        <section id="gallery-images">
        <!--Insert Images Here-->
        </section>
      </main>
        `;
    this.loadImages();
  }

  loadImages() {
    let images = [];
    for (let i = 0; i <= 4; i++) {
      images[i] = "/images/gallery" + i + ".png";
    }

    setTimeout(() => {
      this.setOne(images);
      this.setTwo(images);
      this.modalPopUp(images);
      this.slideShow();
    }, 0);
  }

  setOne(images) {
    let prints = "";

    images.forEach(image => {
      prints += `
        <div class="gallery-image-container">
          <img class="img modal" src="${image}"/>
        </div>
      `;
    });

    taino.elid("gallery-images").innerHTML = prints;
  }

  setTwo(images) {
    let prints = "";

    images.forEach(image => {
      prints += `
          <div class="glide__slide">
              <img class="img img-center" src="${image}"/>
          </div>
        `;
    });

    taino.el(".glide__slides").innerHTML = prints;
  }

  slideShow() {
    let glide = new Glide(".glide", {
      bound: true,
      rewindDuration: 1000,
      dragThreshold: 40,
      startAt: 0,
      perView: 1,
      animationDuration: 500,
      gap: 16
    });
    glide.mount();
  }

  modalPopUp(images) {
    let container = taino.el(".gallery-image-container", true);
    for (let i = 0; i < container.length; i++) {
      container[i].addEventListener("click", () => {
        let image = images[i];
        this.loadModal(image);
      });
    }
  }

  loadModal(image) {
    if (taino.el("modal")) {
      return;
    } else {
      // taino
      // .el("body")
      // .insertAdjacentHTML(
      //   "beforeend",
      //   '<div class="puppyoverlay"></div><div class="puppymodal"></div>'
      // );

      taino.elid("appendModal").innerHTML =
        '<img src="' + image + '" alt="Modal Image" />';
    }
  }
}
