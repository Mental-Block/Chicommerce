class galleryLoader {
  constructor(site) {
    this.title = "Gallery";
    this.meta_desc = "Yes, we have pictures of our abused animals.";

    this.styling = `
    .gallery-images {background-color: var(--darker-black-bg-color); padding: 2rem 0; }
    .gallery-images .glide { max-width: 1200px; margin: 0 auto; }
    .img-slideshow { margin: 0 auto; max-height: 300px; }
    #appendModal { position: relative; }
    .modal-overlay { width: 100%; height: 100vh; background-color: var(--black75); position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; cursor: pointer; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; }
    .modal-image { max-width: 100%; max-height: 100%; }
    `;

    this.starthtml = `
        <section id="gallery-images" class="gallery-images"> 
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

        <section id="gallery" class="gallery-main">
          <div class="gallery-container">
        <!--Insert Images Here-->
          </div>
        </section>
        `;
    this.loadPageMethods();
  }

  loadPageMethods() {
    taino.changeLinkColor("gallery");

    taino.loadGalleryImages().then(images => {
      this.printGalleryImages(images);
      this.modalPopUp(images);
      this.slideShow(images);
    });
    setTimeout(() => {
      cart();
    }, 0)
  }

  printGalleryImages(images) {
    let prints = "";

    images.forEach(scr => {
      prints += `
        <div class="gallery-container-sec gallery-container-third">
          <img class="img gallery-img" src="${scr}"/>
        </div>
      `;
    });

    taino.el(".gallery-container").innerHTML = prints;
  }

  slideShow(images) {
    let prints = "";

    images.forEach(scr => {
      prints += `
          <div class="glide__slide">
              <img class="img img-slideshow" src="${scr}"/>
          </div>
        `;
    });

    taino.el(".glide__slides").innerHTML = prints;

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
    let container = taino.el(".gallery-container-sec", true);
    for (let i = 0; i < container.length; i++) {
      container[i].addEventListener("click", () => {
        let image = images[i];
        this.modal(image);
      });
    }
  }

  modal(image) {
    let topMargin = window.pageYOffset;
    let div = document.createElement("div");
    let appendModal = document.getElementById("tainomain");

    div.setAttribute("class", "modal-overlay");
    div.style.top = `${topMargin}px`;
    appendModal.append(div);

    taino.el(
      ".modal-overlay"
    ).innerHTML = `<img class="modal-image" src= ${image} alt="Modal Image" />`;

    div.addEventListener("click", removeModal);
    window.addEventListener("scroll", removeModal);

    function removeModal() {
      appendModal.removeChild(div);
      window.removeEventListener("scroll", removeModal);
    }
  }
}
