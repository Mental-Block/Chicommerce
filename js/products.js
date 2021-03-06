class productsLoader {
  constructor(site) {
    this.title = "Products";
    this.meta_desc = "A page of all of our egg products";
    this.styling = `
    .products-main { background-color: var(--straw-brown); padding: 2rem 0 9rem 0; }
    .products-main .product-card { max-width: 304px; margin: 0.5rem; -webkit-transition: 250ms ease-in; transition: 250ms ease-in; }
    .products-main .product-card::after:hover { background-color: var(--black50); }
    .products-main .btn-brown:hover { color: var(--green); }
    
    .products-container { margin: 0 auto; }
    .products-title { margin: 0.5rem; text-align: start; font-size: 1.675rem; }
    .button-group { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: start; -ms-flex-pack: start; justify-content: flex-start; -webkit-box-align: center; -ms-flex-align: center; align-items: center; margin-bottom: 0.5rem; }
    .grid { height: auto; position: relative; }
    
    @media only screen and (min-width: 768px) { .products-main { background-color: var(--straw-brown); padding: 4rem 0 10rem 0; } }
    `;

    this.starthtml = `
            <section id="products" class="products-main"></section>
        `;

    this.loadMethods();
  }
  loadMethods() {
    taino.changeLinkColor("products");

    taino.loadProducts().then((products) => {
      if (site.state.disableCard)
        products = products.filter(
          (product) => !site.state.disableCard.includes(product.id)
        );
      templateLoader.productCards(products);
    });

    setTimeout(() => {
      templateLoader.cart();
    }, 0);
  }
}
