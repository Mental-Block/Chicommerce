class productsLoader {
  constructor(site) {
    this.title = "Products";
    this.meta_desc = "A page of all of our egg products";
    this.styling = `
    .products-main { background-color: var(--straw-brown); padding: 2rem 0 9rem 0; }
    .products-main .product-card { max-width: 304px; margin: 0.5rem; -webkit-transition: 250ms ease-in; transition: 250ms ease-in; }
    .products-main .product-card::after:hover { background-color: var(--black50); }
    .products-main .btn-brown:hover { color: var(--green); }
    .products-main .flex-center-center{margin:4rem 0;}
    
    .products-container { margin: 0 auto; }
    .products-title { margin: 0.5rem; text-align: start; font-size: 1.675rem; }
    .button-group { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: start; -ms-flex-pack: start; justify-content: flex-start; -webkit-box-align: center; -ms-flex-align: center; align-items: center; margin-bottom: 0.5rem; }
    .grid { height: auto; position: relative; }
    
    @media only screen and (min-width: 768px) { .products-main { background-color: var(--straw-brown); padding: 4rem 0 10rem 0; } }
    `;

    this.starthtml = `
            <section id="products" class="products-main"> 
              <div class="products-container">
                <h2 class="products-title">Products</h2>   
                    <div id="filters" class="button-group">
                        <button class="btn-brown active" data-filter="*">
                            All Products
                        </button>
                        <button class="btn-brown" data-filter="numberLessThan10">
                            Low Price
                        </button>
                        <button class="btn-brown" data-filter="numberGreaterThan10">
                            High Price
                        </button>
                  </div>
                  <div class="grid">

                  </div>
              </div>
            </section>
        `;
    this.loadPageMethods();
  }

  loadPageMethods() {
    taino.changeNavColor("products");
    taino.loadProducts().then(product => {
      if (site.state.disableCard) product = product.filter(item => !site.state.disableCard.includes(item.id))
      if (product.length === 0) return taino.outOfProducts(taino.el(".grid"));
      taino.printProductCards(product, taino.el(".grid"));
      taino.getId(taino.el(".item", true));
      taino.loadIso();
      taino.cart();
    });
  }
}
