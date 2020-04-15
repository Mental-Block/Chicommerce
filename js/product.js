class productLoader {
  constructor(site) {
    this.styling = `
    #product {background-color: var(--straw-brown); padding: 2rem;}
    #product .glide {max-width: 400px; margin: 0 auto 4px auto;}
    #product .slide {width: 100%;}
    #product .glide__arrow--right, #product .glide__arrow--left{opacity:0.75;}
    #product .glide__arrow--right:hover, #product .glide__arrow--left:hover{opacity:1;} 
    #product .glide__arrow--right {right:1rem;}
    #product .glide__arrow--left {left:1rem;}

    #quantity{width:40px !important; height:40px !important; text-align: center; display:block; margin-bottom: 0.8rem;}

    .product-btn {background-color: var(--green); border: 4px solid var(--green); padding: 0.5rem; font-weight: var(--reg); font-size: 1.15rem; display:block;}
    .product-btn:hover {background-color: var(--green25);}

    .product-title{font-size: 1.8rem; margin: 0.6rem 0;}
    .product-description{ margin: 0.75rem 0;}

    .info{max-width: 400px; width: 100%; margin: 0 auto;}

    @media only screen and (min-width: 768px) {
      #product{padding: 4rem 2rem; display:flex; align-items:center; justify-content:center;}
      .info{margin: 0 0 0 1rem;}
    }
    `;

    this.loadPage();
  }

  async loadPage() {
    this.route = site.routevars[0];
    this.title = `Product - ${this.route}`;
    this.meta_desc = `The ${this.route} product page`;
    this.starthtml = `
              <section id="product">
                <div class="slides">
                  <div class="glide glide__one">
                      <div class="glide__track" data-glide-el="track">
                        <div class="glide__slides glide__slides__one">
                          <!-- insert images -->
                        </div>
                      </div>
                      <div class="glide__arrows" data-glide-el="controls">
                        <button class="glide__arrow glide__arrow--left" data-glide-dir="<"></button>
                        <button class="glide__arrow glide__arrow--right" data-glide-dir=">"></button>
                    </div>
                  </div>

                  <div class="glide glide__two">
                      <div class="glide__track" data-glide-el="track">
                        <div class="glide__slides glide__slides__two">
                          <!-- insert images -->
                        </div>
                      </div>
                  </div>
                </div>
              </section>    
          `;

    this.loadPageMethods();
  }

  loadPageMethods() {
    taino.changeNavColor("products");

    taino.loadProducts().then(list => {
      let product = list.filter((item) => item.id === site.state.tempId);
      product = product[0];

      this.loadProductInformation(product);
      this.loadFirstSlider(product);
      this.loadSecondSlider(product);
      this.cartAddButton(product);
      taino.cart();
    });
  }

  loadProductInformation({ title, description }) {
    let print = `
        <h1 class="product-title">${title}</h1>
        <p class="product-description">${description}</p>
        <form action="" method="post">
          <input type="numeric" id="quantity" aria-describedby="quantity" value="0" placeholder="0"/>
          <button type="submit" class="btn-base product-btn">Add To Cart</button>
        </form>
    `;
    if (!taino.el(".info")) {
      taino.elid("product").insertAdjacentHTML("beforeend", '<div class="info"></div>');
      taino.el(".info").innerHTML = print;
    }
  }

  cartAddButton({ title, id, price, mainImage }) {
    let btn = taino.el(".product-btn");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.cartAdd({ title, id, price, mainImage });
    });
  }

  loadFirstSlider({ images }) {
    let print = ``;

    images.forEach((image) => {
      print += `
          <div class="glide_slide">
            <img class="img" src="${image}" />
          </div>
          `;
    });

    taino.el(".glide__slides__one").innerHTML = print;

    let glideOne = new Glide(".glide__one", {
      bound: true,
      rewindDuration: 1000,
      dragThreshold: 40,
      startAt: 0,
      perView: 1,
      animationDuration: 500,
      gap: 4,
    });

    glideOne.mount();
  }

  loadSecondSlider({ images }) {
    let print = ``;

    images.forEach((image) => {
      print += `
          <div class="glide_slide">
            <img class="img" src="${image}" />
          </div>
          `;
    });

    taino.el(".glide__slides__two").innerHTML = print;

    let glideTwo = new Glide(".glide__two", {
      bound: true,
      rewindDuration: 1000,
      dragThreshold: 40,
      startAt: 0,
      perView: 4,
      animationDuration: 500,
      gap: 4,
    });

    glideTwo.mount();
  }

  cartAdd({ title, id, price, mainImage }) {
    let tempQuantity = taino.elid("quantity").value;
    tempQuantity = parseInt(tempQuantity);

    if (tempQuantity >= 1 && tempQuantity <= 10) {
      if (!site.state.cartOn || site.state.cartOn === false) {
        site.state.cartOn = true;
        site.state.disableCard = [];
        site.state.cart = []
      }
      site.state.disableCard.push(id)
      site.state.cart.push({ title, id, price, mainImage, quantity: tempQuantity });
      site.route("/products")
    }
  }
}
