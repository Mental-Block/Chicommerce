class homeLoader {
  constructor(site) {
    this.title = "Home";
    this.meta_desc =
      "This is an e commerce/small business website made for fun";
    this.starthtml = `
        <section id="landing">
          <div class="landing">
            <h1 class="landing-title">Free Run,</h1>
            <h2 class="landing-title-green">Organic <span class="landing-title-brown">Eggs</span></h2>
            <a href="/products" class="btn-main">Order Now</a>
          </div>
        </section>

        <section id="landing-about">
          <div class="landing-about-container">
            <img class="img" src="/images/about.png" alt="chicken coop" >
            <div class="landing-about-container-sec">
              <p class="landing-about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis.</p>
              <a class="btn-brown" href="/about">Learn More</a>
            </div>
          </div>
        </section>

      <section id="landing-product">
        <div class="glide">
            <div class="glide__track" data-glide-el="track">
              <div class="glide__slides">
                <!-- insert cards -->
              </div>
            </div>
            <div class="glide__arrows" data-glide-el="controls">
              <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
              <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
          </div>
        </div>
      </section>

        <section id="landing-gallery">
          <div class="gallery-container">
            <!-- insert gallery images-->
          </div>
        </section>

        <section id="contact">
          <h2 class="contact-title">Need to get in touch?</h2>
          </section>
        `;

    this.loadPageMethods();
  }

  loadPageMethods() {
    taino.changeNavColor("home");

    taino.loadProducts().then((productInformation) => {
      taino.printProductCards(productInformation, taino.el(".glide__slides"));
      taino.getCardId(productInformation);

      this.slider();
      taino.contactForm(taino.elid("contact"));
      taino.cart();
    });

    taino.loadImages().then((images) => {
      this.printGalleryImages(images);
    });

    setTimeout(() => {

    }, 0)

  }

  printGalleryImages(images) {
    let prints = "";

    images.forEach((scr) => {
      prints += `
      <a href="/gallery">
        <div class="gallery-container-sec">
          <img class="img gallery-img" src="${scr}"/>
        </div>
      </a>
      `;
    });

    taino.el(".gallery-container").innerHTML = prints;
  }

  slider() {
    let item = taino.el(".item", true);
    for (let i = 0; i < item.length; i++) {
      item[i].classList.add("glide__slide");
    }

    let glide = new Glide(".glide", {
      type: "carousel",
      bound: true,
      rewindDuration: 0,
      dragThreshold: 40,
      startAt: 0,
      perView: 4,
      animationDuration: 500,
      gap: 16,
      breakpoints: {
        1680: {
          perView: 3,
        },
        1240: {
          perView: 2,
        },
        920: {
          perView: 1,
        },
      },
    });

    glide.mount();
  }
}
