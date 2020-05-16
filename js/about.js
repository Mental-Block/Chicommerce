class aboutLoader {
  constructor(site) {
    this.title = "About";
    this.meta_desc = "Our story on how we became egg farmers";
    this.styling = `
    #barn { background: url("/images/backgroundbarn.png") no-repeat center center; text-align: center; width: 100%; position: relative; padding: 20vh 0; }
    #barn::after { position: absolute; top: 0; left: 0; right: 0; bottom: 0; content: ""; background-color: var(--black75); }
    
    .barn-center { text-align: center; position: relative; z-index: 1; }
    .barn-header { font-family: var(--play-fair); font-size: 3rem; }
    .barn-text { font-size: 1.2rem; font-style: italic; margin: 1rem 2rem 0 2rem; }
    .barn-text:before, .barn-text:after { content: '" '; font-size: 1.5rem; }

    #about, #about-one, #testimonial, #review { padding: 2rem; }
    #about, #testimonial { background-color: var(--red-bg-color); }
    #about-one, #review { background-color: var(--grey-bg-color); }

    .about-title { text-align: center; margin-bottom: 2rem; line-height: auto; }
    .about-text { margin-top: 1rem; line-height: 1.5rem; }

    .testimonial-card { background-color: var(--black75); margin: 0 auto; border-radius: 4px; max-width: 320px; height: 360px; padding: 1rem 1.25rem; }
    .testimonial-card-title { margin: 1rem 0; font-size: 1.25rem; }
    .testimonial-card-text { font-style: italic; }
    .testimonial-card-text:after, .testimonial-card-text:before { content: ' " '; font-size: 1.25rem; }
    
    .about-container { max-width: 500px; margin: 0 auto; }

    .review-container { max-width: 360px; margin: 0 auto; }
    .review-form-control { margin: 1rem 0; display: block; }
    .review-form-input { background-color: #ffffff; font-family: var(--roboto); padding: 0.5rem; font-weight: var(--med); border: none; resize: none; width: 100%; }
    .review-form-input:nth-child(1) { margin-top: 0; }
    .review-form textarea { height: 240px; }
    
    @media only screen and (min-width: 768px) { #about, #about-one, #testimonial, #review { padding: 4rem 2rem; }
      #about, #about-one, #testimonial { padding-top: 3rem; }
      .about-title { margin-bottom: 3rem; } }
    
    @media only screen and (min-width: 1120px) { .about-container { max-width: 1050px; display: -webkit-box; display: -ms-flexbox; display: flex; }
      .about-text { margin: 0 0 0 1rem; } }
    `;

    this.starthtml = `
           <section id="barn">
            <div class="barn-center">
              <h2 class="barn-header">Our Mission</h2>
               <p class="barn-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc.</p>
            </div>
          </section>

              <section id="about">
                <h2 class="about-title">Header Title</h2>
                <div class="about-container">
                  <img class="img" src="/images/aboutpage.png" alt="chickens coming out of the chicken coop"/>
                  <p class="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis. Sed sed tempor odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis.</p>
                </div>
             </section>

            <section id="about-one">
              <h2 class="about-title">Another Header Title</h2>
              <div class="about-container">
                <img class="img" src="/images/oldbarn.png" alt="The an old red barn from the 1970's that housed the chickens">
                <p class="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis. Sed sed tempor odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis.</p>
              </div>
            </section>
            
          <section id="testimonial">
            <div class="glide">
            <h2 class="about-title">Testimonials</h2>
              <div class="glide__track" data-glide-el="track">
                <div class="glide__slides">
                <!-- insert cards -->
                </div>
              </div>
            </div>
          </section>

            <section id="review">
              <div class="review-container">
                <h2 class="about-title" >Add Your Own Review</h2> 
                <form id="review-form" class="review-form" method="GET" action="">
                  <div class="review-form-control">
                    <label class="sr-only" for="review-name">Name</label>
                      <input class="review-form-input" type="text" id="reviewName" name="review-name" placeholder="Name" value=""/>
                      <span class="helper-text"></span>
                  </div>
                  <div class="review-form-control">
                    <label class="sr-only" for="reviewMessage">Message</label>
                      <textarea class="review-form-input" type="text" name="reviewMessage" id="reviewmessage" placeholder="Message" aria-describedby="message"></textarea>
                      <span class="helper-text"></span>
                    </div>
                  <button class="btn-brown" type="submit">Add Quote</button>
                  </form>
                </div>
            </section>
        `;
    this.loadPageMethods();
  }

  loadPageMethods() {
    taino.changeLinkColor("about");

    this.loadTestimonial().then((testimonialInformation) => {
      this.carousel(testimonialInformation);
    });

    setTimeout(() => {
      this.addQuote();
      templateLoader.cart();
    }, 0);
  }

  async loadTestimonial() {
    let testimonialInformation = await fetch(site.testimonalfile)
      .then((response) => response.json())
      .then(async function (json) {
        let test = json.items;
        test = test.map((items) => {
          const { id, name, description } = items.fields;
          return { id, description, name };
        });
        return test;
      });
    return testimonialInformation;
  }

  addQuote() {
    const form = taino.elid("review-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  carousel(testimonialInformation) {
    let prints = "";
    testimonialInformation.forEach((test) => {
      prints += `
          <div class="glide__slide" data-id="${test.id}">
              <div class="testimonial-card">
                <div class="testimonial-card-body">
                  <h3 class="testimonial-card-title">${test.name}</h3>
                  <p class="base-text testimonial-card-text">${test.description}</p>
                </div>
              </div>
          </div>`;
    });
    taino.el(".glide__slides").innerHTML = prints;

    let glide = new Glide(".glide", {
      type: "carousel",
      swipeThreshold: false,
      dragThreshold: false,
      bound: true,
      startAt: 0,
      perView: 5,
      animationDuration: 1000,
      autoplay: 6000,
      gap: 16,
      breakpoints: {
        1720: {
          perView: 4,
        },
        1400: {
          perView: 3,
        },
        1080: {
          perView: 2,
        },
        760: {
          perView: 1,
        },
      },
    });

    glide.mount();
  }
}
