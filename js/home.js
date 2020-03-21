class homeLoader {
  constructor(site) {
    this.title = "Home";
    this.meta_desc =
      "This is an e commerce/small business website made for fun";
    this.styling = `
    `;
    this.starthtml = `
      <main>
        <section id="landing-bg">
          <div class="center">
            <h1 class="landing-text landing-main">Free Run,</h1>
            <h2 class="landing-text landing-sec">Organic <span class="brown">Eggs</span></h2>
            <a href="/products" class="btn-base landing-btn">Order Now</a>
          </div>
        </section>

        <section id="about-info">
          <div class="about-info-container">
            <img class="img" src="/images/about.png" alt="chicken coop" >
            <div class="about-info-space">
              <p class="text-base about-info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis.</p>
              <a class="btn-base btn" href="/about">Learn More</a>
            </div>
          </div>
        </section>

      <section id="product-info">
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

        <section id="gallery-info">
            <!-- insert gallery images-->
        </section>

        <section id="contact">
            <h2 class="header-title">Need to get in touch?</h2>
            <div class="contact-container">
              <div id="map">
                <iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1197183.8373802372!2d-1.9415093691103689!3d6.781986417238027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb96f349e85efd%3A0xb8d1e0b88af1f0f5!2sKumasi+Central+Market!5e0!3m2!1sen!2sth!4v1532967884907" frameborder="0" allowfullscreen></iframe>
              </div>
                <form class="contact-form">
                  <div class="form-control form-control-sm">
                    <label for="name">Name</label>
                      <input type="text" id="name" placeholder="Name" value=""/>
                      <span class="helper-text"></span>
                  </div>
                  <div class="form-control form-control-sm">
                    <label for="contactEmail">Email</label>
                      <input type="email" id="contactEmail" aria-describedby="contactEmail" placeholder="Email"/>
                      <span class="helper-text"></span>
                  </div>
                  <div class="form-control">
                    <label for="subject">Subject</label>
                      <input type="text" id="subject" placeholder="Subject" aria-describedby="subject"/>
                      <span class="helper-text"></span>
                  </div>
                  <div class="form-control">
                    <label for="message">Message</label>
                      <textarea  type="text" name="message" id="message" cols="30" rows="10" placeholder="Message" aria-describedby="message"></textarea>
                      <span class="helper-text"></span>
                    </div>
                  <button class="btn-base btn" type="submit">Submit</button>
                </form>
              </div>
          </section>
        </main>
        `;

    this.loadPageMethods();
  }

  loadPageMethods() {
    taino.changeNavColor("home");

    taino.loadProducts().then(productInformation => {
      taino.printProductCards(productInformation, taino.el(".glide__slides"));
      taino.getCardId(productInformation);
      this.slider();
    });

    taino.loadImages().then(images => {
      this.printGalleryImages(images);
    });
  }

  printGalleryImages(images) {
    let prints = "";

    images.forEach(scr => {
      prints += `
      <a class="gallery-info-a" href="/gallery">
        <div class="gallery-info-container">
          <img class="img" src="${scr}"/>
        </div>
      </a>
      `;
    });

    taino.elid("gallery-info").innerHTML = prints;
  }

  addAsSlide() {
    let item = taino.el(".item", true);
    for (let i = 0; i < item.length; i++) {
      item[i].classList.add("glide__slide");
    }
  }

  slider() {
    this.addAsSlide();
    let glide = new Glide(".glide", {
      bound: true,
      rewindDuration: 0,
      dragThreshold: 40,
      startAt: 0,
      perView: 4,
      animationDuration: 1000,
      gap: 16,
      breakpoints: {
        1680: {
          perView: 3
        },
        1240: {
          perView: 2
        },
        920: {
          perView: 1
        }
      }
    });

    glide.mount();
  }
}
