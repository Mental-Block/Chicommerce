class templateLoader {
  constructor(site) {
    this.header = `
    <header id="navigation" class="nav-container nav-add-black">
      <div class="logo-container">
        <img src="/images/Logo.svg" />
      </div>
      <nav id="nav">
        <div class="nav-list nav-list-off">
            <a class="nav-list-item" data-tag="home" href="/">Home</a>
            <a class="nav-list-item" data-tag="about" href="/about">About</a>
            <a class="nav-list-item" data-tag="products" href="/products">Products</a>
            <a class="nav-list-item" data-tag="gallery" href="/gallery">Gallery</a>
            <a class="nav-list-item" data-tag="contact" href="/contact">Contact</a>
          </div>
          <div id="burger">
            <div class="burger-line"></div>
            <div class="burger-line"></div>
            <div class="burger-line"></div>
          </div>
        </nav>
      </header> 
  `;

    this.subscribe = `
      <section id="subscribe">
        <h2 class="subscribe-title"> Want Exclusive Deals and Updates?</h2>
        <p class="subscribe-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. </p>
        <form  class="subscribe-form" method="POST" action="">
          <div class="subscribe-container">
              <label for="email" class="subscribe-form-label sr-only">Email</label>
              <input class="subscribe-form-input" type="email" id="email" aria-describedby="email" placeholder="Email"/>
              <span class="helper-text"></span>
          </div>
          <button class="btn-red" type="submit">Subscribe Today!</button>
        </form>
      </section>
  `;

    this.footer = `
      <footer id="footer"> 
        <div class="footer-container">
          <div class="footer-container-sec">
            <h4 class="footer-title">Phone number</h4>
            <ul class="footer-group">
                <li>USA: 1 (643) 594-4322</li>
                <li>Mexico: 1 (323) 865-2049</li>
                <li>Canada: 1 (069) 123-654</li>
            </ul>
          </div>
          <div class="footer-container-sec">
            <h4 class="footer-title">Email</h4>
            <ul class="footer-group">
                <li>ChickenEggs@gmail.com</li>
                <li>CreativeLogo@gmail.com</li>
            </ul>
          </div>
          <div class="footer-container-sec">
            <h4 class="footer-title">Adress</h4>
            <ul class="footer-group">
              <li>3186 Th Avenue,</li>
              <li>Kugaaruk, X0E 1K0</li>
            </ul>
          </div>
          <div class="footer-container-sec">
            <h4 class="footer-title">Follow us on</h4>
            <div class="footer-icons">
              <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><img src="/images/facebook.svg" alt="facebook"/></a>
              <a href="http://twitter.com" target="_blank" rel="noopener noreferrer"><img src="/images/twitter.svg" alt="twitter"/></a>
              <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer"><img src="/images/linkedin.svg" alt="linkedin"/></a>
              <a href="http://snapchat.com" target="_blank" rel="noopener noreferrer"><img src="/images/snapchat.svg" alt="snapchat"/></a>
              <a href="http://instagram.com" target="_blank" rel="noopener noreferrer"><img src="/images/instagram.svg" alt="instagram"/></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-bottom-text">Website made and designed by <a class="footer-bottom-link" target="_blank" rel="noopener noreferrer" href="https://aarontibben.netlify.com">Aaron Tibben</a></p>
        </div>
</footer>

        `;


    this.navbar();
  }
  navbar() {
    setTimeout(() => {
      const navContainer = taino.elid("navigation");
      const burger = taino.elid("burger");
      const navList = taino.el(".nav-list");

      window.onscroll = () => {
        navContainer.classList.add("nav-add-black");
      };

      burger.addEventListener("click", () => {
        navList.classList.toggle("nav-list-off");
        navList.classList.add("nav-add-black");
        navContainer.classList.add("nav-add-black");
      });
    }, 0);
  }
}
