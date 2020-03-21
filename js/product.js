class productLoader {
  constructor(site) {
    this.styling = `
    #product{
      background-color: green;
    }
    `;

    taino.changeNavColor("products");
    this.loadPage();
  }

  async loadPage() {
    this.route = site.routevars[0];
    this.title = `Product - ${this.route}`;
    this.meta_desc = `The ${this.route} product page`;
    this.starthtml = `
          <main>
              <section id="product"> 
              
              </section>
          </main>        
          `;

    taino.loadProducts().then(productInformation => {
      productInformation.filter(value => value.id === site.state.id);
      var product = productInformation.filter(
        value => value.id == site.state.id
      );

      let print = ``;
      product.forEach(item => {
        print = `
        <h1>${item.title}</h1>
        <h1>${item.price}</h1>
        <img class="img card-img" src="${item.image}" />
        <h1>${item.description}</h1>
        `;
      });

      taino.elid("product").innerHTML = print;
    });
  }
}
