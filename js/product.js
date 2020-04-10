class productLoader {
  constructor(site) {
    this.styling = `
    #product {background-color: var(--straw-brown); padding: 2rem;}
    #product .glide {max-width: 400px; margin: 0 auto 4px auto;}
    #product .slide {width: 100%;}
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
                  
                  <div class="info"></div>
              </section>    
          `;

    this.loadPageMethods();
  }

  loadPageMethods() {
    taino.changeNavColor("products");

    this.loadProduct().then((product) => {
      this.loadProductInformation(product);
      this.loadFirstSlider(product);
      this.loadSecondSlider(product);
      this.button();
    });

    setTimeout(() => {
      taino.cart();
    }, 0)
  }

  loadProductInformation(product) {
    let print = `
        <h1 class="product-title">${product.title}</h1>
        <p class="product-description">${product.description}</p>
        <form action="/products" method="post">
          <input type="numeric" id="quantity" aria-describedby="quantity" value="0" placeholder="0"/>
          <button type="submit" class="btn-base product-btn">Add To Cart</button>
        </form>
    `;

    taino.el(".info").innerHTML = print;
  }

  button() {
    let btn = taino.el(".product-btn");

    btn.addEventListener("click", () => {
      site.state.cart = true;



      let quantity = taino.elid("quantity").value;
      let itemName = taino.el(".product-title").innerText;
      if (quantity > 0) {
        if (!site.state.cartInv) {
          site.state.cartInv = [];
        }
        site.state.cartInv.push(itemName);
        site.state.cartInv = [...new Set(site.state.cartInv)];
        console.log(site.state.cartInv)
      }

    });
  }

  loadFirstSlider(product) {
    let print = ``;

    product.images.forEach((image) => {
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

  loadSecondSlider(product) {
    let print = ``;

    product.images.forEach((image) => {
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

  async loadProduct() {
    let productInformation = await fetch(site.productfile)
      .then((response) => response.json())
      .then(async function (json) {
        let products = await json.items;
        products = products
          .map((items) => {
            const { id, price, description, title, images } = items.fields;
            return { id, price, description, title, images };
          })
          .filter((items) => items.id === site.state.id);

        return products[0];
      });
    return productInformation;
  }
}
