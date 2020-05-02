"use strict";
class taino {
  constructor(routes) {
    /*define taino global vars, mostly endpoints and public creds*/
    this.productfile = "/productInformation.json";
    this.testimonalfile = "/testimonial.json";
    this.jspath = "/js";
    this.csspath = "/css";
    this.header = "";
    this.subscribe = "";
    this.footer = "";
    this.templatefile = "/template";

    /*define current location object*/
    this.cur = {};

    /*define initial state*/
    this.state = {};

    this.routes = Object.keys(routes)
      .sort(function (a, b) {
        return b.length - a.length;
      })
      .map(function (path) {
        return {
          path: new RegExp(
            "^" + path.replace(/:[^\s/]+/g, "([\\w%+-]+)") + "$"
          ),
          module: routes[path],
        };
      });
    this.routevars = [];

    /*on browser load, identify current location object*/
    this.currentpage = this.getcurrent(window.location.pathname);

    this.main = window.document.body; /*defaults to body if no id is set*/
    if (document.getElementById("tainomain") != null) {
      this.main.content = document.getElementById("tainomain");
    } else {
      let maindiv = document.createElement("div");
      maindiv.setAttribute("id", "tainomain");
      this.main.appendChild(maindiv);
      this.main.content = document.getElementById("tainomain");
    }
    //beforebegin, afterbegin, afterend
    window.addEventListener("popstate", (event) => {
      this.update();
    });

    window.addEventListener("DOMNodeInserted", (event) => {
      this.defaultlisteners(); /* detect A tags in newly inserted nodes*/
    });

    var resizeTimer;
    window.addEventListener("resize", (event) => {
      var t = this;
      if (typeof resizeTimer != "undefined") {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function () {
        if (taino.ismobile() === false) {
          t.loadtemplate();
          t.update();
        }
      }, 250);
    });
  }

  createLoader(loader) {
    if (typeof window[loader] !== "function") {
      return Function(
        "site",
        `return new ${loader}(site)`
      )(this); /*filename+'Loader' has to be the main class.*/
    }
    throw new Error(`${loader} constructor does not exist!`);
  }

  /*additional scripts are loaded via callbacks*/
  loadScript(url) {
    /*
        This script returns a promise that resolves when the requested script loads
        or rejects if the requested script doesn't load (think 404 error)
        having a rejection on error allows us to potentially redirect gracefully to a 404 page or what have you.
         */
    if (taino.el('script[data-pageid="' + url + '"]')) {
      // script already exists. return a resolved promise.
      return Promise.resolve();
    } else {
      let resolve = null;
      let reject = null;
      let scriptPromise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      let body = document.body;
      let script = document.createElement("script");
      script.async = false;
      script.type = "text/javascript";
      script.src = url;
      script.dataset.pageid = url;
      script.onreadystatechange = resolve;
      script.onload = resolve;
      script.onerror = reject;
      body.appendChild(script);
      return scriptPromise;
    }
  }

  getcurrent(path) {
    let curr = "/fourohfour"; /*Need to make this have a 404 header*/
    for (var i = 0, l = this.routes.length; i < l; i++) {
      var found = path.replace(".html", "").match(this.routes[i].path);
      if (found) {
        this.removemeta("robots");
        curr = "/" + this.routes[i].module; // module to load
        this.routevars = found.slice(1); // arguments for module
        break;
      }
    }
    return curr;
  }

  route(path) {
    for (var i = 0, l = this.routes.length; i < l; i++) {
      var found = path.match(this.routes[i].path);
      if (found) {
        window.history.pushState(
          { html: this.main.innerHTML, pageTitle: this.cur.title },
          "",
          path
        );
        this.update();
        break;
      }
    }
  }

  loadtemplate() {
    if (taino.el("body > header").length > 0) {
      taino.el("body > header")[0].remove();
    }

    if (taino.el("body > section").length > 0) {
      taino.el("body > section")[0].remove();
    }

    if (taino.el("body > footer").length > 0) {
      taino.el("body > footer")[0].remove();
    }
    const callback = () => {
      var loader = this.templatefile.replace("/", "") + "Loader";
      this.templateobject = this.createLoader(
        loader
      ); /*filename+'Loader' has to be the main class.*/
      this.main.header = this.templateobject.header;
      this.main.subscribe = this.templateobject.subscribe;
      this.main.footer = this.templateobject.footer;
      this.main.content.insertAdjacentHTML("beforebegin", this.main.header);
      this.main.content.insertAdjacentHTML("afterend", this.main.footer);
      this.main.content.insertAdjacentHTML("afterend", this.main.subscribe);
    };
    return this.loadScript(this.jspath + this.templatefile + ".js").then(
      callback
    );
  }

  loadcontent() {
    this.main.setAttribute("class", this.currentpage.replace(/\//gi, ""));
    var loader = this.currentpage.substr(1).replace(/\//gi, "_") + "Loader";
    var hashforanchor = window.location.hash.substr(1);

    if (this.cur.constructor.name && this.cur.constructor.name === loader) {
      this.cur = this.createLoader(
        loader
      ); /*filename+'Loader' has to be the main class.*/
      this.main.content.innerHTML = this.cur.starthtml;
      document.title = this.cur.title;
      taino
        .el("meta[name=description]")
        .setAttribute("content", this.cur.meta_desc);
      this.defaultlisteners();
      this.loadstyling(loader);
      if (taino.elid(hashforanchor)) {
        window.scrollBy(0, taino.elid(hashforanchor).offsetTop);
      }
    } else {
      this.loadScript(this.jspath + this.currentpage + ".js").then(() => {
        this.cur = this.createLoader(
          loader
        ); /*filename+'Loader' has to be the main class.*/
        this.main.content.innerHTML = this.cur.starthtml;
        document.title = this.cur.title;
        taino
          .el("meta[name=description]")
          .setAttribute("content", this.cur.meta_desc);
        this.defaultlisteners();
        this.loadstyling(loader);
        if (taino.elid(hashforanchor)) {
          window.scrollBy(0, taino.elid(hashforanchor).offsetTop);
        }
      });
    }
  }

  update() {
    var path = window.location.pathname;
    this.currentpage = this.getcurrent(path);
    this.loadScript(this.jspath + this.currentpage + ".js").then(() => {
      this.loadcontent();
      //window.scrollTo(0, 0);



    });
  }

  defaultlisteners() {
    let as = taino.el(
      "a:not(.cap)",
      true
    ); /*recapture A tags when content reloads*/
    for (let i = 0; i < as.length; i++) {
      as[i].classList.add("cap");
      if (as[i].getAttribute("target") == "_blank") {
        continue;
      }
      let linkhost = as[i].hostname;
      as[i].addEventListener("click", (e) => {
        e.preventDefault();
        let href = as[i].href;
        let pathName = new URL(href);
        if (pathName.hostname === linkhost) {
          window.history.pushState({}, pathName, href);
          this.update();
        } else {
          window.location.href = pathName;
        }
        return false;
      });
    }
  }

  loadstyling(loader) {
    /*loads in styling from a component*/
    if (!this.cur.styling) {
      return;
    } else {
      if (!taino.el("style.tainocss_" + loader)) {
        let body = document.body;
        let style = document.createElement("style");
        style.type = "text/css";
        style.classList.add("tainocss_" + loader);
        style.innerHTML = this.cur.styling;
        body.appendChild(style);
      }
    }
  }

  addmeta(name, content) {
    let newmeta = document.createElement("meta");
    newmeta.name = name;
    newmeta.content = content;
    document.head.appendChild(newmeta);
  }

  removemeta(name) {
    let oldmeta = taino.el("meta[name=" + name + "]");
    if (oldmeta) {
      oldmeta.remove();
    }
  }



  static el(x, getall) {
    var s = x.trim();
    if (s.indexOf(",") > -1 || s.indexOf(" ") > -1 || getall === true) {
      return document.querySelectorAll(s);
    } else {
      return document.querySelector(s);
    }
  }

  static elid(x) {
    return document.getElementById(x);
  }

  static changeNavColor(a) {
    const navContainer = taino.elid("navigation");
    const navItem = taino.el(".nav-list-item", true);
    const findNavItem = taino.el(".nav-list-item[data-tag=" + a + "]");

    if (a === routes["/"] && window.innerWidth > 768 && site.state.cartOn != true) {
      navContainer.classList.remove("nav-add-black");
    } else {
      navContainer.classList.add("nav-add-black");
    }

    for (let i = 0; i < navItem.length; i++) {
      navItem[i].classList.remove("active");
    }
    findNavItem.classList.add("active");
  }

  static sanitize(str) {
    let temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  static ismobile() {
    let useragent = navigator.userAgent;
    if (useragent.match(/Android|iPhone|iPad/i)) {
      return true;
    } else {
      return false;
    }
  }

  static async loadProducts() {
    let productInformation = await fetch(site.productfile)
      .then((response) => response.json())
      .then(async function (json) {
        let products = await json.items;
        products = products.map((items) => {
          const { id, price, description, title, mainImage, images } = items.fields;
          return { id, price, description, title, mainImage, images };
        });
        return products;
      });
    return productInformation;
  }

  static async loadImages() {
    const images = [];
    for (let i = 0; i <= 4; i++) {
      images[i] = `/images/gallery${i}.png`;
    };
    return images;
  }

  static getId(item) {
    for (let i = 0; i < item.length; i++) {
      item[i].addEventListener("click", () => {
        let id = item[i].getAttribute("data-id");
        id = parseInt(id)
        site.state.tempId = id
      });
    }
  }

  static printProductCards(product, appendToDOM) {
    let prints = "";
    product.forEach((product) => {
      prints += `
        <div class="item" data-id="${product.id}">
            <div class="product-card">
              <a href="/products/${product.title
          .toLowerCase()
          .replace(/ /g, "")}">
              <div class="product-card-body">
                <img class="img card-img" src="${product.mainImage}" />
                <div class="product-card-container">
                  <h3 class="product-card-title">${product.title}</h3>
                  <h4 class="product-card-price">${product.price}</h4>
              </div>
                <p class="base-text product-card-text">${product.description}</p>
              </div>
              </a>
            </div>
        </div>`;
    });
    appendToDOM.innerHTML = prints;
  }

  static contactForm(appendToDOM) {
    let prints = `
      <div class="contact-container">
        <div id="map">
          <iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1197183.8373802372!2d-1.9415093691103689!3d6.781986417238027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb96f349e85efd%3A0xb8d1e0b88af1f0f5!2sKumasi+Central+Market!5e0!3m2!1sen!2sth!4v1532967884907" frameborder="0" allowfullscreen></iframe>
        </div>
        <form class="contact-form">
            <div class="contact-form-control contact-form-control-sm">
                <label class="sr-only" for="name">Name</label>
                <input class="contact-form-input" type="text" id="name" placeholder="Name" value=""/>
                <span class="helper-text"></span>
            </div>
            <div class="contact-form-control contact-form-control-sm">
                <label class="sr-only" for="contactEmail">Email</label>
                <input class="contact-form-input" type="email" id="contactEmail" aria-describedby="contactEmail" placeholder="Email"/>
                <span class="helper-text"></span>
            </div>
            <div class="contact-form-control">
                <label class="sr-only" for="subject">Subject</label>
                <input class="contact-form-input" type="text" id="subject" placeholder="Subject" aria-describedby="subject"/>
                <span class="helper-text"></span>
            </div>
            <div class="contact-form-control">
                <label class="sr-only" for="message">Message</label>
                <textarea class="contact-form-input" type="text" name="message" id="message" placeholder="Message" aria-describedby="message"></textarea>
                <span class="helper-text"></span>
            </div>
                <button class="btn-brown" type="submit">Submit</button>
          </form>
        </div>
    `;

    appendToDOM.insertAdjacentHTML("beforeend", prints);
  }

  static loadSlider() {
    let item = taino.el(".item", true);
    for (let i = 0; i < item.length; i++) {
      item[i].classList.add("glide__slide");
    }

    let glide = new Glide(".glide", {
      type: "carousel",
      bound: true,
      rewindDuration: 0,
      dragThreshold: 40,
      startAt: 0,
      perView: 4,
      animationDuration: 500,
      gap: 16,
      breakpoints: {
        1680: {
          perView: 3,
        },
        1240: {
          perView: 2,
        },
        920: {
          perView: 1,
        },
      },
    });

    glide.mount();
  }

  static cart() {
    if (site.state.cartOn === true) {
      const cartFns = {
        createCart: () => {
          const cart = `<div id="cart" class="cart"></div>`

          const slide = `
            <aside id="cart-slide" class="cart-slide dragscroll">
              <div id="cart-arrow" class="cart-arrow"></div>
              <div class="cart-container">
                <!-- insert cart items -->
              </div>
              <div class="cart-total-clear-container">
                <p class="cart-total"></p>
                <button id="clear-cart" class="btn-clear-cart">Clear Cart</button>
              </div>
              <div class="cart-btn-container">
                <a href="#" class="btn-checkOut">
                <?xml version="1.0" ?>
                <svg height="20px" version="1.1" viewBox="4 0 20 20" width="30px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title/>
                <desc/>
                <defs/>
                <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">
                  <g fill="#000000" class="cart-svg" id="Core" transform="translate(-212.000000, -422.000000)">
                    <g id="shopping-cart" transform="translate(212.000000, 422.000000)">
                    <path d="M6,16 C4.9,16 4,16.9 4,18 C4,19.1 4.9,20 6,20 C7.1,20 8,19.1 8,18 C8,16.9 7.1,16 6,16 L6,16 Z M0,0 L0,2 L2,2 L5.6,9.6 L4.2,12 C4.1,12.3 4,12.7 4,13 C4,14.1 4.9,15 6,15 L18,15 L18,13 L6.4,13 C6.3,13 6.2,12.9 6.2,12.8 L6.2,12.7 L7.1,11 L14.5,11 C15.3,11 15.9,10.6 16.2,10 L19.8,3.5 C20,3.3 20,3.2 20,3 C20,2.4 19.6,2 19,2 L4.2,2 L3.3,0 L0,0 L0,0 Z M16,16 C14.9,16 14,16.9 14,18 C14,19.1 14.9,20 16,20 C17.1,20 18,19.1 18,18 C18,16.9 17.1,16 16,16 L16,16 Z" id="Shape"/>
                    </g>
                  </g>
                </g>
                </svg>
                Check Out
                </a>
              </div>
            </aside>
            
          `;
          taino.elid("tainomain").insertAdjacentHTML("beforeend", cart);
          taino.elid("tainomain").insertAdjacentHTML("beforeend", slide);
        },
        removeCart: () => {
          slide.parentNode.removeChild(slide);
          icon.parentNode.removeChild(icon);
        },
        openCart: () => {
          icon.classList.remove("cart-hidden")
          slide.classList.remove("cart-slide-open")
          icon.classList.add("cart-visible")
          site.state.cartOpen = false
        },
        closeCart: () => {
          slide.classList.add("cart-slide-open")
          icon.classList.remove("cart-visible")
          icon.classList.add("cart-hidden")
          site.state.cartOpen = true
        },
        addTotal: () => {
          let tempTotal = site.state.cart.reduce((tempTotal, product) => {
            return product.price * product.quantity + tempTotal;
          }, 0)
          tempTotal = parseFloat(tempTotal.toFixed(2));
          totalDOM.innerText = `Total: $${tempTotal}`;
        },
        addItem: () => {
          let prints = "";

          site.state.cart.forEach(product => {
            prints += `
        <div class="cart-item item" data-id="${product.id}">
          <div class="cart-item-container">
            <ul class="cart-item-items">
              <li class="cart-item-title">${product.title}</li>
              <li class="cart-item-price">${product.price}</li>
              <li class="cart-item-quantity">Quantity: ${product.quantity}</li>
            </ul>
            <button class="btn-clear-item">remove</button>
          </div>
            <img class="img cart-img" src="${product.mainImage}" />
        </div>
        `
          })

          taino.el(".cart-container").insertAdjacentHTML("beforeend", prints);
        },
        removeItem: (event, id) => {
          id = parseInt(id);
          let index = site.state.disableCard.findIndex(index => index === id);

          container.removeChild(event.target.parentElement.parentElement);
          site.state.cart.splice(index, 1)
          site.state.disableCard.splice(index, 1)

          if (site.state.cart.length === 0) {
            site.state.cartOn = false;
            cartFns.removeCart();
          }

          if (site.currentpage === "/products") {
            taino.loadProducts().then(product => {
              product = product.filter(item => !site.state.disableCard.includes(item.id))
              taino.printProductCards(product, taino.el(".grid"));
              taino.loadIso();
              taino.getId(taino.el(".item", true));
            });
          }

          if (site.currentpage === "/" || site.currentpage === "/home") {
            taino.loadProducts().then(product => {
              product = product.filter(item => !site.state.disableCard.includes(item.id))
              taino.printProductCards(product, taino.el(".glide__slides"));
              taino.slider();
              taino.getId(taino.el(".item", true));
            });
          }
        },
        clearCart: () => {
          site.state.cart.length = 0;
          site.state.disableCard.length = 0;
          site.state.cartOn = false;
          cartFns.removeCart();

          if (site.currentpage === "/products") {
            taino.loadProducts().then(product => {
              taino.printProductCards(product, taino.el(".grid"));
              taino.loadIso();
              taino.getId(taino.el(".item", true));
            });
          }

          if (site.currentpage === "/" || site.currentpage === "/home") {
            taino.loadProducts().then(product => {
              taino.printProductCards(product, taino.el(".glide__slides"));
              taino.slider();
              taino.getId(taino.el(".item", true));
            });
          }
        }
      }

      cartFns.createCart();
      cartFns.addItem();

      const icon = taino.elid("cart")
      const slide = taino.elid("cart-slide")
      const arrow = taino.elid("cart-arrow")
      const clear = taino.elid("clear-cart");
      const itemClear = taino.el(".btn-clear-item", true);
      const item = taino.el(".cart-item", true);
      const container = taino.el(".cart-container");
      const totalDOM = taino.el(".cart-total");

      cartFns.addTotal();

      if (site.state.cartOpen === false) cartFns.closeCart(), cartFns.openCart()

      icon.addEventListener("click", cartFns.closeCart);
      arrow.addEventListener("click", cartFns.openCart);
      clear.addEventListener("click", cartFns.clearCart);

      for (let i = 0; i < itemClear.length; i++) {
        itemClear[i].addEventListener("click", event => {
          cartFns.removeItem(event, item[i].getAttribute("data-id"))
        });
      }
    }
  }

  static loadIso() {
    let iso = new Isotope(".products-container", {
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

    const filterProducts = taino.elid("filters");
    const buttons = taino.el(".btn-brown", true);

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

  static outOfProducts(appendToDOM) {
    const prints = `
      <div>
        <h1 class="flex-center-center">Sorry, we have no more products</h1>
      </div>
    `;

    appendToDOM.innerHTML = prints;
  }
}

/*define routes*/
let routes = {
  "/": "home",
  "/home": "home",
  "/about": "about",
  "/products": "products",
  "/products/:product": "product",
  "/gallery": "gallery",
  "/contact": "contact",
};

const site = new taino(routes);
site.loadtemplate();
site.loadcontent();
