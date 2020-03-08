class productLoader {
  constructor(site) {
    this.title = "Product";
    this.meta_desc = "A page of all of our egg products";
    this.styling = `
    #products{background-color: var(--straw-brown); }
    .button-group{display:flex; justify-content: flex-start; align-items: center;}
    .product-card-price:before{content: '$';}
    `;

    taino.changeNavColor("products");

    this.starthtml = `
        <main>
            <section id="products">    
                <div id="filters" class="button-group">
                    <button class="btn btn-base active" data-filter="*">
                        All Products
                    </button>
                    <button class="btn btn-base" data-filter="">
                        Newest
                    </button>
                    <button class="btn btn-base" data-filter="numberLessThan10">
                        Low Price
                    </button>
                    <button class="btn btn-base" data-filter="numberGreaterThan10">
                        Hight Price
                    </button>
                </div>
                <div class="grid">

                </div>
            </section>
        </main>        
        `;
    this.loadProductIsoData();
  }

  async loadProductIsoData() {
    let cardInformation = await fetch(site.productInfo)
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
            image,
            date
          } = items.fields;
          return { id, date, price, pageLink, description, title, image };
        });
        return products;
      });

    let prints = "";
    cardInformation.forEach(product => {
      prints += `
        <div class="item" data-id="${product.id}">
            <div class="product-card">
              <a href="${product.pageLink}">
              <div class="product-card-body">
                <img class="img card-img" src="${product.image}" />
                <div class="product-card-tp-container">
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

    let iso = new Isotope(".grid", {
      itemSelector: ".item",
      layoutMode: "fitRows"
    });

    const filterFns = {
      numberGreaterThan10: function(item) {
        let number = item.querySelector(".product-card-price").textContent;
        return parseInt(number, 10) > 10;
      },

      numberLessThan10: function(item) {
        let number = item.querySelector(".product-card-price").textContent;
        return parseInt(number, 10) < 10;
      }
    };

    const filterProducts = document.getElementById("filters");

    filterProducts.addEventListener("click", function(event) {
      let filterValue = event.target.getAttribute("data-filter");
      filterValue = filterFns[filterValue] || filterValue;
      iso.arrange({ filter: filterValue });
    });
  }
}

function grabDate() {
  let a = new Date();
  let b = a.getDate();
  let c = a.getFullYear();
  let d = a.getMonth();
  let currentDate = c + "/" + d + "/" + b;
  return currentDate;
}
