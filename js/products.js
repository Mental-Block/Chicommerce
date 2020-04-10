class productsLoader {
  constructor(site) {
    this.title = "Products";
    this.meta_desc = "A page of all of our egg products";
    this.styling = `
    #products {background-color: var(--straw-brown); padding: 2rem 0 9rem 0;}
    #products .header-title {margin: 0.5rem; text-align: start;}
    #products .product-card  {max-width:304px; margin: 0.5rem; transition: 250ms ease-in;}
    #products .product-card::after:hover  {background-color: var(--black50);}

    #products .btn:hover {color: var(--green);}
    .product-container{margin: 0 auto;}
    .button-group{display:flex; justify-content: flex-start; align-items: center; margin-bottom:0.5rem;}
    .grid{height: auto; position: relative;}

    @media only screen and (min-width: 768px) {
      #product{background-color: var(--straw-brown); padding: 4rem 0 10rem 0;}
    }
    `;

    this.starthtml = `
        <main>
            <section id="products"> 
              <div class="product-container">
                <h2 class="header-title">Products</h2>   
                    <div id="filters" class="button-group">
                        <button class="btn btn-base active" data-filter="*">
                            All Products
                        </button>
                        <button class="btn btn-base" data-filter="numberLessThan10">
                            Low Price
                        </button>
                        <button class="btn btn-base" data-filter="numberGreaterThan10">
                            High Price
                        </button>
                  </div>
                  <div class="grid">

                  </div>
              </div>
            </section>
        </main>        
        `;
    this.loadPageMethods();
  }

  loadPageMethods() {
    taino.changeNavColor("products");

    taino.loadProducts().then(productInformation => {
      taino.printProductCards(productInformation, taino.el(".grid"));
      taino.getCardId(productInformation);
      this.loadIso();
    });

    setTimeout(() => {
      taino.cart();
    }, 0)
  }

  loadIso() {
    let iso = new Isotope(".product-container", {
      itemSelector: ".item",
      masonry: {
        columnWidth: 320,
        isFitWidth: true
      }
    });

    const filterFns = {
      numberGreaterThan10: item => {
        let number = item.querySelector(".product-card-price").textContent;
        return parseInt(number, 10) >= 10;
      },

      numberLessThan10: item => {
        let number = item.querySelector(".product-card-price").textContent;
        return parseInt(number, 10) < 10;
      }
    };

    const filterProducts = document.getElementById("filters");
    const buttons = document.querySelectorAll(".btn");

    filterProducts.addEventListener("click", event => {
      let filterValue = event.target.getAttribute("data-filter");

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");

        if (buttons[i].getAttribute("data-filter") === filterValue) {
          buttons[i].classList.add("active");
        }
      }

      filterValue = filterFns[filterValue] || filterValue;
      iso.arrange({ filter: filterValue });
    });
  }
}
