class productLoader {
  constructor(site) {
    this.title = "Product";
    this.meta_desc = "A page of all of our egg products";
    this.styling = `
    #product{background-color: var(--straw-brown); padding: 2rem 0 9rem 0;}
    #product .header-title {margin: 0.5rem; text-align: start;}
    #product .product-card  {max-width:304px; margin: 0.5rem; transition: 250ms ease-in;}
    #product .product-card::after:hover  {background-color: var(--black50);}

    #product .btn:hover {color: var(--green);}
    .product-container{margin: 0 auto;}
    .button-group{display:flex; justify-content: flex-start; align-items: center; margin-bottom:0.5rem;}
    .grid{height: auto; position: relative;}

    @media only screen and (min-width: 768px) {
      #product{background-color: var(--straw-brown); padding: 4rem 0 10rem 0;}
    }
    `;

    taino.changeNavColor("products");

    this.starthtml = `
        <main>
            <section id="product"> 
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
    this.loadData();
  }

  async loadData() {
    let cardInformation = await fetch("/productInformation.json")
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

    this.printCards(cardInformation);
    this.loadIso();
  }

  printCards(cardInformation) {
    let prints = "";
    cardInformation.forEach(product => {
      prints += `
        <div class="item" data-id="${product.id}">
            <div class="product-card">
              <a href="${product.pageLink}">
              <div class="product-card-body">
                <img class="img card-img" src="${product.image}" />
                <div class="space-between">
                  <h3 class="product-card-title">${product.title}</h3>
                  <h4 class="product-card-price">${product.price}</h4>
                </div>
                <p class="base-text product-card-text">${product.description}</p>
              </div>
              </a>
            </div>
        </div>`;
    });
    taino.el(".grid").innerHTML = prints;
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
      numberGreaterThan10: function(item) {
        let number = item.querySelector(".product-card-price").textContent;
        return parseInt(number, 10) >= 10;
      },

      numberLessThan10: function(item) {
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
