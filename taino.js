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
    let images = [];
    for (let i = 0; i <= 4; i++) {
      images[i] = `/images/gallery${i}.png`;
    };
    return images;
  }

  static getCardId(productInformation) {
    const card = taino.el(".product-card", true);
    for (let i = 0; i < card.length; i++) {
      card[i].addEventListener("click", () => {
        site.state.tempId = productInformation[i].id;
      });
    }
  }

  static printProductCards(productInformation, appendToDOM) {
    let print = "";
    productInformation.forEach((product) => {
      print += `
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
                <p class="base-text product-card-text">${
        product.description
        }</p>
              </div>
              </a>
            </div>
        </div>`;
    });
    appendToDOM.innerHTML = print;
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

  static cart() {
    if (site.state.cartOn === true) {
      if (site.state.cart.length === 0) {
        site.state.cartOn = false
        return;
      }
      if (!site.state.cartOpen) {
        site.state.cartOpen = false
      }

      const cartIcon = () => {
        let prints = `<div id="cart"></div>`
        taino.elid("tainomain").insertAdjacentHTML("beforeend", prints);
      }
      const cartSlide = () => {
        let prints = `
            <div id="cart-slide" class="dragscroll">
              <div id="cart-arrow"></div>
              <div class="cart-container"></div>
              <div class="cart-total-clear">
                <p class="total"></p>
                <button id="clear-all-btn" class="btn-main">Clear Cart</button>
              </div>
              <a href="#" class="btn-base btn-check-out green-btn">Check Out</a>
            </div>
            
          `;
        taino.elid("tainomain").insertAdjacentHTML("beforeend", prints);
      }

      const cartFns = {
        closeCart: () => {
          slide.style.transform = "translate(320px)"
          icon.style.visibility = "visible"
          icon.style.opacity = "1"
          site.state.cartOpen = false
        },
        openCart: () => {
          slide.style.transform = "translate(0px)"
          icon.style.visibility = "hidden"
          icon.style.transition = "visibility 0s, opacity 1s ease-in"
          icon.style.opacity = "0"
          site.state.cartOpen = true
        },
        addTotal: () => {
          let totalDOM = taino.el(".total");
          let tempTotal = 0;
          site.state.cart.forEach(product => {
            tempTotal += product.quantity * product.price;
          })
          tempTotal = parseFloat(tempTotal.toFixed(2));
          totalDOM.innerText = `Total: $${tempTotal}`;
        },
        removeItem: () => {
          let id = taino.el(".cart-item").getAttribute("data-id");
          let item = taino.el(".cart-item");
          let index = site.state.disableCard.findIndex(index => {
            return index == id;
          })
          item.parentNode.removeChild(item);
          site.state.cart.splice(index, 1)
          site.state.disableCard.splice(index, 1);
          site.update();
        },
        clearCart: () => {
          const item = taino.el(".cart-container");
          item.parentNode.removeChild(item);
          site.state.cart.length = 0;
          site.state.disableCard.length = 0;
          site.update();
        },
        addItem: () => {
          let prints = "";

          site.state.cart.forEach(product => {
            prints += `
        <div class="cart-item" data-id="${product.id}">
          <ul class="cart-info">
            <li class="cart-title">${product.title}</li>
            <li class="cart-price">${product.price}</li>
            <li class="quantity">Quantity: ${product.quantity}</li>
            <button class="btn-base clear-item-btn">remove</button>
          </ul>
            <img class="img cart-img" src="${product.mainImage}" />
          </div>
        `
          })

          taino.el(".cart-container").insertAdjacentHTML("beforeend", prints);
        }
      }

      cartIcon();
      cartSlide();
      cartFns.addItem();
      cartFns.addTotal();

      const icon = taino.elid("cart")
      const slide = taino.elid("cart-slide")
      const arrow = taino.elid("cart-arrow")
      const btnClearAll = taino.elid("clear-all-btn");
      const btnClearItem = taino.el(".clear-item-btn", true);

      if (site.state.cartOpen === true) {
        cartFns.openCart()
      }
      else {
        cartFns.closeCart()
      }

      icon.addEventListener("click", cartFns.openCart);
      arrow.addEventListener("click", cartFns.closeCart);
      btnClearAll.addEventListener("click", cartFns.clearCart);
      for (let i = 0; i < btnClearItem.length; i++) {
        btnClearItem[i].addEventListener("click", cartFns.removeItem)
      }

    }
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
