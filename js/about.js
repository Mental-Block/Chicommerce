class aboutLoader {
  constructor(site) {
    this.title = "About";
    this.meta_desc = "Our story on how we became egg farmers";
    this.styling = `
    .barn-bg{background:url("/images/backgroundbarn.png") no-repeat center center; text-align: center; width: 100%; position:relative; padding: 20vh 0;}
    .barn-bg::after {position: absolute; top: 0; left: 0; right: 0; bottom: 0; content: ""; background-color: var(--black75);}
    .barn-header{font-family: var(--play-fair); font-size: 3rem;}
    .barn-text{font-size: 1.2rem; font-style: italic; margin: 1rem 2rem 0 2rem;}
    .barn-text:before, .barn-text:after {content:'" '; font-size: 1.5rem;}
    
    #about, #about-one, #testimonial, #review {padding: 2rem;}
    #about, #testimonial {background-color: var(--red-bg-color);}
    #about-one, #review {background-color: var(--grey-bg-color)}
    #about .header-title2, #about-one .header-title2, #testimonial .header-title2 {text-align:center; margin-bottom: 2rem;}
    
    .about-text{margin-top: 1rem;}
    
    .testimonial-card{background-color:var(--black75); margin: 0 auto; border-radius: 4px; max-width: 320px; height: 360px; padding: 1rem;}
    .testimonial-card-title{margin: 1rem 0; }
    .testimonial-card-text{ font-style: italic; }
    .testimonial-card-text:after, .testimonial-card-text:before  {content:' " '; font-size: 1.25rem;}
    
    .review-container, .about-container {max-width:500px; margin: 0 auto;}
    .form-add-quote{max-width: 500px;}
    
    @media only screen and (min-width: 768px) {
      #about, #about-one, #testimonial, #review {padding: 4rem 2rem;}
      #about, #about-one, #testimonial {padding-top: 3rem;}
      #about .header-title2, #about-one .header-title2, #testimonial .header-title2 {margin-bottom: 3rem;}
    }
    
    @media only screen and (min-width: 1120px) {
      .about-container { max-width: 1050px; display: flex;}
      .about-text{margin: 0 0 0 1rem;}
    }
    `;

    this.starthtml = `
           <section class="barn-bg">
            <div class="center">
              <h2 class="barn-header">Our Mission</h2>
               <p class="barn-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc.</p>
            </div>
          </section>

              <section id="about">
                <h2 class="header-title2">Header Title</h2>
                <div class="about-container">
                  <img class="img" src="/images/aboutpage.png" alt="chickens coming out of the chicken coop"/>
                  <p class="text-base about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis. Sed sed tempor odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis.</p>
                </div>
             </section>

            <section id="about-one">
              <h2 class="header-title2">Another Header Title</h2>
              <div class="about-container">
                <img class="img" src="/images/oldbarn.png" alt="The an old red barn from the 1970's that housed the chickens">
                <p class="text-base about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis. Sed sed tempor odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis.</p>
              </div>
            </section>
            
          <section id="testimonial">
            <div class="glide">
            <h2 class="header-title2">Testimonials</h2>
              <div class="glide__track" data-glide-el="track">
                <div class="glide__slides">
                <!-- insert cards -->
                </div>
              </div>
            </div>
          </section>

            <section id="review">
              <div class="review-container">
                <h2 class="header-title2" >Add Your Own Review<h2> 
                <form class="form-add-quote">
                  <div class="form-control">
                    <label for="reviewname">Name</label>
                      <input type="text" id="reviewname" placeholder="Name" value=""/>
                      <span class="helper-text"></span>
                  </div>
                  <div class="form-control">
                    <label for="reviewEmail">Email</label>
                      <input type="email" id="reviewEmail" aria-describedby="reviewEmail" placeholder="Email"/>
                      <span class="helper-text"></span>
                  </div>
                  <div class="form-control">
                    <label for="reviewmessage">Message</label>
                      <textarea  type="text" name="reviewmessage" id="reviewmessage" cols="30" rows="10" placeholder="Message" aria-describedby="message"></textarea>
                      <span class="helper-text"></span>
                    </div>
                  <button class="btn-base btn" type="submit">Add Quote</button>
                  </form>
                </div>
            </section>
        `;
    this.loadPageMethods();
  }

  loadPageMethods() {
    taino.changeNavColor("about");

    this.loadTestimonial().then(testimonialInformation => {
      this.carousel(testimonialInformation);
      taino.cart();
    });
  }

  async loadTestimonial() {
    let testimonialInformation = await fetch(site.testimonalfile)
      .then(response => response.json())
      .then(async function (json) {
        let test = json.items;
        test = test.map(items => {
          const { id, name, description } = items.fields;
          return { id, description, name };
        });
        return test;
      });
    return testimonialInformation;
  }

  carousel(testimonialInformation) {
    let prints = "";
    testimonialInformation.forEach(test => {
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
          perView: 4
        },
        1400: {
          perView: 3
        },
        1080: {
          perView: 2
        },
        760: {
          perView: 1
        }
      }
    });

    glide.mount();
  }
}
