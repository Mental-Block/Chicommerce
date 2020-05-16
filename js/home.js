class homeLoader {
  constructor(site) {
    this.title = "Home";
    this.meta_desc =
      "This is an e commerce/small business website made for fun";
    this.starthtml = `
        <section id="landing" class="landing">
          <div class="landing-container">
            <h1 class="landing-title">Free Run,</h1>
            <h2 class="landing-title-green">Organic <span class="landing-title-brown">Eggs</span></h2>
            <a href="/products" class="btn-main">Order Now</a>
          </div>
        </section>

        <section id="landing-about" class="landing-about">
          <div class="landing-about-container">
            <img class="img" src="/images/about.png" alt="chicken coop" >
            <div class="landing-about-container-sec">
              <p class="landing-about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis.</p>
              <a class="btn-brown" href="/about">Learn More</a>
            </div>
          </div>
        </section>

      <section id="landing-product" class="landing-product">
         <!-- insert glide --> 
            <!-- insert cards -->
        <!-- insert glide --> 
      </section>

        <section id="landing-gallery" class="gallery-main">
          <div class="gallery-container">
            <!-- insert gallery images-->
          </div>
        </section>

        <section id="landing-contact" class="contact-main">
          <h2 class="contact-title">Need to get in touch?</h2>
          </section>
        `;

    this.loadPageMethods();
  }

  loadPageMethods() {
    taino.changeLinkColor("home");
    taino.loadProducts().then((products) => {
      if (site.state.disableCard)
        products = products.filter(
          (product) => !site.state.disableCard.includes(product.id)
        );
      templateLoader.productCards(products);
    });

    taino.loadGalleryImages().then((images) => {
      this.printImages(images);
    });

    setTimeout(() => {
      templateLoader.form.contact(taino.elid("landing-contact"));
      templateLoader.cart();
    }, 0);
  }

  printImages(images) {
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
}
