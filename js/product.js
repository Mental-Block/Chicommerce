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
    taino.activeItem("products");
  }
}

class productLoader {
  constructor(site) {
    this.title = "Product";
    this.meta_desc = "A page of all of our egg products";
    this.styling = `
      #product { min-height: 60vh; background-color: #948468; }
      #product .card { width: 560px; }
      #product .btn:focus { -webkit-box-shadow: none; box-shadow: none; }
      #product .card:hover { background-color: #121111; }
      #product .btn { color: #eeefea; }
      #product .container { padding-bottom: 4rem; margin: 0 auto; }
      #product .header-title { padding-bottom: 1rem; }
      #product .button-group { display: -webkit-box; display: -ms-flexbox; display:     flex; -webkit-box-pack: end; -ms-flex-pack: end; justify-content: flex-end;       margin-bottom: 1rem; }
      #product .col-md-6, #product .col-lg-4 { padding: 4px; }
      `;

    this.starthtml = `
          <main>
              <section id="product">
                  <div class="container">
                      <h2 class="header-title">Products</h2>
                      <div id="filters" class="button-group">
                          <button class="btn price-btn active-color" data-filter="*">All Products</button>
                          <button class="btn price-btn" data-filter=".new">Newest</button>
                          <button class="btn price-btn" data-filter=".low">Low Price</button>
                          <button class="btn price-btn" data-filter=".high">Hight Price</button>
                      </div>
                  <div class="row posts">
                      
              </div>
          </div>      
       </section>
      </main>
          `;
  }
}

//       async function getCard() {
//         try {
//           let result = await fetch("/js/pages/productinfo.json");
//           let data = await result.json();
//           let products = data.items;
//           products = products.map(item => {
//             const { pricelabel, pagelink, disc, title, price } = item.fields;
//             const { id } = item.sys;
//             const image = item.fields.image.fields.file.url;
//             return { id, pricelabel, pagelink, disc, title, price, image };
//           });
//           return products;
//         } catch (error) {}
//       }

//   /*prints is not returned we instead get ....
//       Promise
//   __proto__: Promise
//   [[PromiseStatus]]: "resolved"
//   [[PromiseValue]]: "↵ "All the card data"
//

//       this.card = getCard().then(products => {
//         let prints = "";
//         products.forEach(product => {
//           prints += `
//               <div id="${product.id}" data-id="${product.id}" class="item ${product.pricelabel} col-md-6 col-lg-4">
//                 <a href="${product.pagelink}">
//                   <div class="card">
//                     <div class="card-body">
//                       <img class="card-img-top" src="${product.image}" />
//                       <h6 class="card-title">$${product.price} ${product.title}</h6>
//                       <p class="card-text">${product.disc}</p>
//                     </div>
//                   </div>
//                 </a>
//               </div>`;
//         });
//         return prints;
//       });
//    }
//   }

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
