class aboutLoader {
  constructor(site) {
    this.title = "About";
    this.meta_desc = "Our story on how we became egg farmers";
    this.styling = `
    .barn-bg{background:url("/images/backgroundbarn.png") no-repeat center center; text-align: center; width: 100%; position:relative; padding: 20vh 0;}
    .barn-bg::after {position: absolute; top: 0; left: 0; right: 0; bottom: 0; content: ""; background-color: var(--black75);}
    .barn-header{font-family: var(--play-fair); font-size: 3rem;}
    .barn-text{font-size: 1.2rem; font-style: italic; margin: 1rem 2rem 0 2rem;}
    #about-one, #about-three {background-color: var(--red-bg-color);}
    #about-two{background-color: var(--grey-bg-color)}
    .about-container{max-width:500px; margin: 2rem auto;}
    .about-text{margin-top: 1rem;}

    @media only screen and (min-width: 768px) {
      .about-title {margin-bottom: 4rem;}
    }
    
    @media only screen and (min-width: 1120px) {
      .about-container { max-width: 1050px; display: flex;}
      .about-text{margin: 0 0 0 1rem;}
    }

    
    `;

    this.starthtml = `
        <main>
           <div class="barn-bg">
            <div class="center">
              <h2 class="barn-header">Our Mission</h2>
               <p class="barn-text">“This is a very awesome quote of our mission statement... kill or be killed by our glorious leader sponge bob square pants”</p>
            </div>
          </div>

            <section id="about-one">
                <h2 class="header-title about-title">Header Title</h2>
                <div class="about-container">
                  <img class="img" src="/images/aboutpage.png" alt="chickens coming out of the chicken coop"/>
                  <p class="text-base about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis. Sed sed tempor odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis.</p>
                </div>
            </section>

            <section id="about-two">
                <h2 class="header-title about-title">Another Header Title</h2>
                <div class="about-container">
                  <img class="img" src="/images/oldbarn.png" alt="The an old red barn from the 1970's that housed the chickens">
                  <p class="text-base about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis. Sed sed tempor odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis.</p>
                </div>
            </section>

            <section id="about-three">
                <h2 class="header-title about-title">Yet Another header title</h2>
                <div class="about-container">
                  <img class="img" src="/images/about.png" alt="chickens coming out of the chicken coop"/>
                  <p class="text-base about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis. Sed sed tempor odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis.</p>
                </div>
            </section>
            
           <section id="testimonials">
              <h2>Testimonials</h2>
                    <div class="card card-center">
                          <div class="card-body">
                            <img class="card-img-top" src="/images/user.svg" width="100px" height="160px" />
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu.</p>
                          </div>
                        </div>
                    </div>
            </section>
          </main>
        `;
  }
  async loadTestimonals() {
    let testimonials = await fetch("/productInfomation.json")
      .then(response => response.json())
      .then(async function(json) {
        let products = json.items;
        products = products.map(items => {
          const {
            id,
            price,
            pageLink,
            description,
            title,
            image
          } = items.fields;
          return { id, price, pageLink, description, title, image };
        });
        return products;
      });

    let prints = "";
    products.forEach(product => {
      prints += `
      <div data-id="${product.id}">
          <div class="card">
            <a href="${product.pageLink}">
            <div class="card-body">
              <img class="img card-img" src="${product.image}" />
              <div class="card-tp-container">
                <h2 class="card-title">${product.title}</h2>
                <h4 class="card-price">$${product.price}</h4>
              </div>
              <p class="card-text">${product.description}</p>
            </div>
            </a>
          </div>
      </div>`;
    });
    taino.el(".glider").innerHTML = prints;

    new Glider(document.querySelector(".glider"), {
      slidesToShow: 1,
      draggable: true,
      dots: ".dots",
      arrows: {
        prev: ".glider-prev",
        next: ".glider-next"
      },
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            duration: 0.25
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            duration: 0.25
          }
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            duration: 0.25
          }
        }
      ]
    });
  }
}
