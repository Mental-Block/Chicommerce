"use strict";
class taino {
  constructor(routes) {
    /*define taino global vars, mostly endpoints and public creds*/
    this.productfile = "/productInformation.json";
    this.testimonalfile = "/testimonial.json";
    this.galleryimagepath = "/images/gallery/"
    this.jspath = "/js";
    this.csspath = "/css";
    this.header = "";
    this.subscribe = "";
    this.footer = "";
    this.templatefile = "/template";

    /*define current location object*/
    this.cur = {};

    /*define initial state for transfer data between pages*/
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

  static ismobile() {
    var useragent = navigator.userAgent;
    if (useragent.match(/Android|iPhone|iPad/i)) {
      return true;
    } else {
      return false;
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

  static sanitize(str) {
    let temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  static changeLinkColor(tagStr) {
    const navContainer = taino.elid("navigation");
    const links = taino.el(".nav-list-item", true);
    const findLink = taino.el(".nav-list-item[data-tag=" + tagStr + "]");

    //checking for home page to see if we need to add black to the navigation
    if (tagStr === routes["/"] && window.innerWidth > 768 && site.state.cartOn !== true) {
      navContainer.classList.remove("nav-add-black");
    }
    else {
      navContainer.classList.add("nav-add-black");
    }

    links.forEach(link => link.classList.remove("active"));
    findLink.classList.add("active");
  }

  static async loadProducts() {
    let products = await fetch(site.productfile)
      .then((response) => response.json())
      .then(async function (json) {
        let items = await json.items;
        items = items.map((items) => {
          const { id, price, description, title, mainImage, images } = items.fields;
          return { id, price, description, title, mainImage, images };
        });
        return items;
      });
    return products;
  }

  static async loadGalleryImages() {
    const images = []
    // return the first 5 images for gallery
    for (let index = 0; index < 5; index++) {
      let image = await fetch(site.galleryimagepath + `gallery${index}.png`)
      images.push(image.url)
    }
    return images;
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
  "/checkout": "checkout"
};

const site = new taino(routes);
site.loadtemplate();
site.loadcontent();


const productCards = (products) => {
  const cardFns = (() => {
    const card = (products, appendToDOM) => {
      let prints = "";

      products.forEach((product) => {
        prints += `
          <div class="item" data-id="${product.id}">
            <div class="product-card">
              <a href="/products/${product.title.replace(/ /g, "").toLowerCase()}">
                <div class="product-card-body">
                  <img class="img card-img" src="${product.mainImage}"/>
                  <div class="product-card-container">
                    <h3 class="product-card-title">${product.title}</h3>
                    <h4 class="product-card-price">${product.price}</h4>
                  </div>
                  <p class="product-card-text">${ product.description}</p>
                </div>
              </a>
            </div>
          </div>`;
      });

      appendToDOM.innerHTML = prints;
      _getCardId();
    }
    const noCards = (appendToDOM) => {
      const prints = `
          <h1 class="product-out">Sorry, we have no more products</h1>
        `;

      appendToDOM.classList.add("product-out-no-padding");
      appendToDOM.innerHTML = prints;
    }
    const printSlider = () => {
      let slider = `
      <div class="glide">
      <div class="glide__track" data-glide-el="track">
        <div class="glide__slides">
          <!-- insert cards -->
        </div>
          </div>
      <div class="glide__arrows" data-glide-el="controls">
        <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
        <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
          </div>
        </div>
      `;

      taino.elid("landing-product").innerHTML = slider;
    }
    const initSlider = () => {
      _cardAsSlide(taino.el(".item", true))

      new Glide(".glide", {
        type: "slider",
        bound: true,
        rewindDuration: 800,
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
      }).mount();
    }
    const printIso = () => {
      if (taino.el(".product-out-no-padding")) taino.el(".product-out-no-padding").classList.remove("products-out-no-padding");

      let prints = `
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
        `;

      taino.elid("products").innerHTML = prints;
    }
    const initIso = () => {
      let iso = new Isotope(".products-container", {
        itemSelector: ".item",
        masonry: {
          columnWidth: 320,
          isFitWidth: true
        }
      });

      const filterFns = {
        numberGreaterThan10: item => {
          const number = item.querySelector(".product-card-price").textContent;
          return parseInt(number, 10) >= 10;
        },

        numberLessThan10: item => {
          const number = item.querySelector(".product-card-price").textContent;
          return parseInt(number, 10) < 10;
        }
      };

      const buttons = taino.el(".btn-brown", true);
      buttons.forEach(btn => btn.addEventListener("click", event => {
        let filterValue = event.target.getAttribute("data-filter")

        buttons.forEach(btn => btn.classList.remove("active"));
        if (btn.getAttribute("data-filter") === filterValue) btn.classList.add("active");

        filterValue = filterFns[filterValue] || filterValue;
        iso.arrange({ filter: filterValue });
      }))
    }
    const _cardAsSlide = (items) => {
      items.forEach(item => item.classList.add("glide__slide"));
    }
    const _getCardId = () => {
      const items = taino.el(".item", true);
      for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", () => {
          let tempId = items[i].getAttribute("data-id");
          tempId = parseInt(tempId);
          site.state.tempId = tempId;
        });
      }
    }
    return {
      homePrintSlider: printSlider,
      homeSlider: initSlider,
      productsPrintIso: printIso,
      productsIso: initIso,
      createCard: card,
      noCards: noCards,
    }
  })()

  if (site.currentpage === "/" || site.currentpage === "/home") {
    if (products.length === 0) {
      cardFns.noCards(taino.elid("landing-product"))
    } else {
      cardFns.homePrintSlider()
      cardFns.createCard(products, taino.el(".glide__slides"))
      cardFns.homeSlider()
    }
  }

  if (site.currentpage === "/products") {
    if (products.length === 0) {
      cardFns.noCards(taino.elid("products"))
    } else {
      cardFns.productsPrintIso()
      cardFns.createCard(products, taino.el(".grid"))
      cardFns.productsIso()
    }
  }
};

const form = (() => {
  const formValidation = (() => {
    const name = name => {
      if (_empty(name) === false &&
        _letters(name) === true &&
        _StrLength(name, 20) === true
      ) {
        return true
      }
    }

    const email = email => {
      if (
        _empty(email) === false &&
        _validEmail(email) === true
      ) {
        return true;
      }
    }

    const message = message => {
      if (
        _empty(message) === false &&
        _StrLength(message, 1000) == true
      ) {
        return true
      }
    }

    const subject = subject => {
      if (
        _empty(subject) === false &&
        _letters(subject) === true &&
        _StrLength(subject, 40) === true
      ) {
        return true
      }
    }

    const _empty = input => {
      let message = "fill in the box";
      if (input.value === "" || input.value.trim() === "") {
        _setInvalidate(input, message);
        return true
      } else {
        _setValidate(input)
        return false
      }
    }

    const _letters = input => {
      let regex = /^[A-Za-z]+$/;
      let removeWhiteSpace = /\s/g;
      let message = "use letters only"

      if (input.value.replace(removeWhiteSpace, '').match(regex)) {
        _setValidate(input)
        return true
      }
      else {
        _setInvalidate(input, message);
        return false
      }
    }

    const _validEmail = input => {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let message = "Not a valid email adress"
      if (input.value.match(regex)) {
        _setValidate(input)
        return true
      } else {
        _setInvalidate(input, message);
        return false
      }
    }

    const _StrLength = (input, number) => {
      let message = `Too many characters, please keep it under ${number}`
      if (input.value.length < number) {
        _setValidate(input)
        return true
      } else {
        _setInvalidate(input, message);
        return false
      }
    }

    const _setValidate = input => {
      input.nextElementSibling.innerHTML = "";
    }

    const _setInvalidate = (input, message) => {
      input.nextElementSibling.innerHTML = message;
    }

    return {
      validateName: name,
      validateEmail: email,
      validateMessage: message,
      validateSubject: subject
    }
  })()

  const contact = (appendToDOM) => {
    const prints = `
                  <div class="contact-container">
                    <div id="map">
                      <iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1197183.8373802372!2d-1.9415093691103689!3d6.781986417238027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb96f349e85efd%3A0xb8d1e0b88af1f0f5!2sKumasi+Central+Market!5e0!3m2!1sen!2sth!4v1532967884907" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <form id="contact-form" class="contact-form" method="POST" action="">
                        <div class="contact-form-control contact-form-control-sm">
                            <label class="sr-only" for="contact-name">Name</label>
                            <input class="contact-form-input" name="contact-name" type="text" id="contact-name" placeholder="Name" value=""/>
                            <span class="helper-text"></span>
                        </div>
                        <div class="contact-form-control contact-form-control-sm">
                            <label class="sr-only" for="contact-email">Email</label>
                            <input class="contact-form-input" name="contact-email" type="email" id="contact-email" aria-describedby="contactEmail" placeholder="Email"/>
                            <span class="helper-text"></span>
                        </div>
                        <div class="contact-form-control">
                            <label class="sr-only" for="contact-subject">Subject</label>
                            <input class="contact-form-input" name="contact-subject" type="text" id="contact-subject" placeholder="Subject" aria-describedby="subject"/>
                            <span class="helper-text"></span>
                        </div>
                        <div class="contact-form-control">
                            <label class="sr-only" for="contact-message">Message</label>
                            <textarea class="contact-form-input" name="contact-message" type="text" name="message" id="contact-message" placeholder="Message" aria-describedby="message"></textarea>
                            <span class="helper-text"></span>
                        </div>
                            <button id="contact-submit" class="btn-brown">Submit</button>
                            <span class="contact-form-sent"></span>
                      </form>
                    </div>
                `;

    appendToDOM.insertAdjacentHTML("beforeend", prints);

    const form = taino.elid("contact-form")
    const name = taino.elid("contact-name")
    const email = taino.elid("contact-email")
    const message = taino.elid("contact-message")
    const subject = taino.elid("contact-subject")

    name.addEventListener("focusout", () => formValidation.validateName(name));
    email.addEventListener("focusout", () => formValidation.validateEmail(email));
    message.addEventListener("focusout", () => formValidation.validateMessage(message));
    subject.addEventListener("focusout", () => formValidation.validateSubject(subject));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        formValidation.validateName(name) === true &&
        formValidation.validateEmail(email) === true &&
        formValidation.validateSubject(subject) === true &&
        formValidation.validateMessage(message) === true
      ) {
        //Send the data to server

        const messageSent = taino.el(".contact-form-sent");
        const prints = `
        Message Sent
          <svg height="20pt" class="contact-form-sent-svg" viewBox="0 0 510 512" width="20pt" xmlns="http://www.w3.org/2000/svg">
            <path d="m369.164062 174.769531c7.8125 7.8125 7.8125 20.476563 0 28.285157l-134.171874 134.175781c-7.8125 7.808593-20.472657 7.808593-28.285157 0l-63.871093-63.875c-7.8125-7.808594-7.8125-20.472657 0-28.28125 7.808593-7.8125 20.472656-7.8125 28.28125 0l49.730468 49.730469 120.03125-120.035157c7.8125-7.808593 20.476563-7.808593 28.285156 0zm142.835938 81.230469c0 141.503906-114.515625 256-256 256-141.503906 0-256-114.515625-256-256 0-141.503906 114.515625-256 256-256 141.503906 0 256 114.515625 256 256zm-40 0c0-119.394531-96.621094-216-216-216-119.394531 0-216 96.621094-216 216 0 119.394531 96.621094 216 216 216 119.394531 0 216-96.621094 216-216zm0 0"/>
          </svg>
        `;
        messageSent.innerHTML = prints

        name.value = "";
        email.value = "";
        message.value = "";
        subject.value = "";

        setTimeout(() => {
          messageSent.innerHTML = "";
        }, 5000);

      } else {
        return formValidation.validateName(name),
          formValidation.validateEmail(email),
          formValidation.validateSubject(subject),
          formValidation.validateMessage(message)
      }
    });
  }

  const subscribe = () => {
    const form = taino.elid("subscribe-form")
    const email = taino.elid("subscribe-email")

    email.addEventListener("focusout", () => formValidation.validateEmail(email));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        formValidation.validateEmail(email) === true
      ) {
        email.value = "";
        email.nextElementSibling.innerHTML = "Thanks for signing up!";
        email.nextElementSibling.classList.add("active");

        setTimeout(() => {
          email.nextElementSibling.innerHTML = "";
          email.nextElementSibling.classList.remove("active");
        }, 5000);
      } else {
        return formValidation();
      }
    })
  }

  return {
    contact: contact,
    subscribe: subscribe
  }
})()

const cart = () => {
  const cartFns = (() => {
    const createCart = () => {
      _createIcon();
      _createSlide();
      _addItem();
      _addTotal()
    }
    const dragScrollOn = () => {
      const slide = taino.elid("cart-slide")
      slide.classList.add('cart-slide-grabbing');
      slide.classList.add('cart-slide-grab');
      let isDown = false;
      let startY;
      let scrollTop;

      const mouseUp = () => {
        isDown = false;
      }

      const mouseMove = (event) => {
        if (!isDown) return;
        event.preventDefault();
        const y = event.pageY - slide.offsetTop;
        const walk = (y - startY) * 1;
        slide.scrollTop = scrollTop - walk;
      }

      const mouseDown = (event) => {
        isDown = true;
        startY = event.pageY - slide.offsetTop;
        scrollTop = slide.scrollTop;
      }

      const mouseLeave = () => {
        isDown = false;
      }

      slide.addEventListener('mousedown', (event) => mouseDown(event))
      slide.addEventListener('mousemove', (event) => mouseMove(event));
      slide.addEventListener('mouseleave', mouseLeave);
      slide.addEventListener('mouseup', mouseUp);
    }
    const dragScrollOff = () => {
      const slide = taino.elid("cart-slide")
      slide.classList.remove('cart-slide-grabbing');
      slide.classList.remove('cart-slide-grab');
    }
    const open = () => {
      const icon = taino.elid("cart")
      const slide = taino.elid("cart-slide")
      icon.classList.remove("cart-hidden")
      slide.classList.remove("cart-slide-open")
      icon.classList.add("cart-visible")
      site.state.cartOpen = false
    }
    const close = () => {
      const icon = taino.elid("cart")
      const slide = taino.elid("cart-slide")
      slide.classList.add("cart-slide-open")
      icon.classList.remove("cart-visible")
      icon.classList.add("cart-hidden")
      site.state.cartOpen = true
    }
    const clear = () => {
      const icon = taino.elid("cart")
      const slide = taino.elid("cart-slide")
      site.state.cart.length = 0;
      site.state.disableCard.length = 0;
      site.state.cartOn = false;
      slide.parentNode.removeChild(slide);
      icon.parentNode.removeChild(icon);
    }
    const removeItem = (event, id) => {
      const cartContainer = taino.el(".cart-container")
      id = parseInt(id)
      let index = site.state.disableCard.findIndex(index => index === id);

      cartContainer.removeChild(event.target.parentElement.parentElement);
      site.state.cart.splice(index, 1)
      site.state.disableCard.splice(index, 1)

      _addTotal();

      if (cartContainer.offsetHeight + 150 > taino.elid("cart-slide").offsetHeight) {
        cartFns.dragScrollOn()
      }
      else {
        cartFns.dragScrollOff()
      }

      if (site.currentpage === "/products" || site.currentpage === "/" || site.currentpage === "/home") {
        taino.loadProducts().then(product => {
          if (site.state.disableCard) product = product.filter(item => !site.state.disableCard.includes(item.id))
          productCards(product);
        });
      }

      if (site.state.cart.length === 0) clear();
    }
    const _addTotal = () => {
      let tempTotal = site.state.cart.reduce((tempTotal, product) => {
        return product.price * product.quantity + tempTotal;
      }, 0)
      tempTotal = parseFloat(tempTotal.toFixed(2));
      taino.el(".cart-total").innerHTML = `Total: $${tempTotal}`;
    }
    const _addItem = () => {
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
    }
    const _createSlide = () => {
      const prints = `
              <aside id="cart-slide" class="cart-slide">
                <div id="cart-arrow" class="cart-arrow"></div>
                <div class="cart-container">
                  <!-- insert cart items -->
                </div>
                <div class="cart-total-clear-container">
                  <p class="cart-total"></p>
                  <button id="clear-cart" class="btn-clear-cart">Clear Cart</button>
                </div>
                <div class="cart-btn-container">
                  <a href="/checkout" class="btn-checkOut">
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
      taino.elid("tainomain").insertAdjacentHTML("beforeend", prints);
    }
    const _createIcon = () => {
      const cart = `<div id="cart" class="cart"></div>`
      taino.elid("tainomain").insertAdjacentHTML("beforeend", cart);
    }

    return {
      removeItem: removeItem,
      createCart: createCart,
      dragScrollOn: dragScrollOn,
      dragScrollOff: dragScrollOff,
      openCart: open,
      closeCart: close,
      clearCart: clear
    }
  })()

  if (site.state.cartOn === true) {
    cartFns.createCart();

    if (site.state.cartOpen === false) {
      cartFns.openCart()
    } else {
      cartFns.closeCart()
    }
    if (taino.el(".cart-container").offsetHeight + 150 > taino.elid("cart-slide").offsetHeight) {
      cartFns.dragScrollOn()
    } else {
      cartFns.dragScrollOff()
    }

    taino.elid("cart").addEventListener("click", cartFns.closeCart);
    taino.elid("cart-arrow").addEventListener("click", cartFns.openCart);
    taino.elid("clear-cart").addEventListener("click", cartFns.clearCart);

    const itemClear = taino.el(".btn-clear-item", true);
    const item = taino.el(".cart-item", true);

    for (let i = 0; i < itemClear.length; i++) {
      itemClear[i].addEventListener("click", event => {
        cartFns.removeItem(event, item[i].getAttribute("data-id"))
      });
    }
  }
}

