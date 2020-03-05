class productLoader {
  constructor(site) {
    this.title = "Product";
    this.meta_desc = "A page of all of our egg products";
    this.starthtml = `
        <main>
            <section>
                <h2 class="text-center header-title">Products</h2>
                <div>
                    <div id="filters" class="button-group">
                        <button class="btn btn-primary" data-filter="*">
                            All Products
                        </button>
                        <button class="btn btn-primary" data-filter=".new">
                            Newest
                        </button>
                        <button class="btn btn-primary" data-filter=".low">
                            Low Price
                        </button>
                        <button class="btn btn-primary" data-filter=".high">
                            Hight Price
                        </button>
                    </div>
                </div>
                <div class="container">
                    <div id="1" class="item card">
                        <div class="card-body">
                        <img class="card-img-top" src="/images/product.png" />
                        <h6 class="card-title">$8.00</h6>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu.</p>
                        </div>
                    </div>
            </section>
        </main>        
        `;
  }
}

// import * as isotope from "../node_modules/isotope-layout/dist/isotope.pkgd";

// cleared[0] = cleared[1] = cleared[2] = 0; //set a cleared flag for each field
// function clearField(t) {
//   //declaring the array outside of the
//   if (!cleared[t.id]) {
//     // function makes it static and global
//     cleared[t.id] = 1; // you could use true and false, but that's more typing
//     t.value = ""; // with more chance of typos
//     t.style.color = "#fff";
//   }
// }
