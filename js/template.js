class templateLoader {
  constructor(site) {
    this.navbar();
    this.header = `
    <header id="navigation" class="navigation-container">
      <div class="logo-container">
        <img src="/images/Logo.svg" />
      </div>
      <nav id="nav">
        <div class="nav-list nav-list-off">
            <a class="nav-list-item active" data-tag="home" href="/">Home</a>
            <a class="nav-list-item" data-tag="about" href="/about">About</a>
            <a class="nav-list-item" data-tag="products" href="/product">Products</a>
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
        <h2 class="header-title">Want Exclusive Deals and Updates?</h2>
        <p class="sub-text">We mostly just want an email list so we can sell your information to facebook and google.</p>
        <form class="email-form " method="POST" action="">
          <div class="sub-form-control">
              <label for="email">Email</label>
              <input type="email" id="email" aria-describedby="email" placeholder="Email"/>
              <span class="helper-text"></span>
          </div>
          <button class="btn-base sub-btn" type="submit">Subscribe Today!</button>
        </form>
      </section>
  `;

    this.footer = `
      <footer id="footer"> 
        <div class="footer-container-main">
          <div class="footer-container">
            <h4 class="footer-group-title">Phone number</h4>
            <ul class="footer-list-group">
                <li>USA: 1 (643) 594-4322</li>
                <li>Mexico: 1 (323) 865-2049</li>
                <li>Canada: 1 (069) 123-654</li>
            </ul>
          </div>
          <div class="footer-container">
            <h4 class="footer-group-title">Email</h4>
            <ul class="footer-list-group">
                <li>ChickenEggs@gmail.com</li>
                <li>CreativeLogo@gmail.com</li>
            </ul>
          </div>
          <div class="footer-container">
            <h4 class="footer-group-title">Adress</h4>
            <ul class="footer-list-group">
              <li>3186 Th Avenue,</li>
              <li>Kugaaruk, X0E 1K0</li>
            </ul>
          </div>
          <div class="footer-container">
            <h4 class="footer-group-title">Follow us on</h4>
            <div class="icons">
              <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><img src="/images/facebook.svg" alt="facebook"/></a>
              <a href="http://twitter.com" target="_blank" rel="noopener noreferrer"><img src="/images/twitter.svg" alt="twitter"/></a>
              <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer"><img src="/images/linkedin.svg" alt="linkedin"/></a>
              <a href="http://snapchat.com" target="_blank" rel="noopener noreferrer"><img src="/images/snapchat.svg" alt="snapchat"/></a>
              <a href="http://instagram.com" target="_blank" rel="noopener noreferrer"><img src="/images/instagram.svg" alt="instagram"/></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-bottom-text">Website made and designed by <a class="footer-bottom-link" target="_blank" rel="noopener noreferrer" href="https://aarontibben.netlify.com">Aaron Tibben</a><p>
        </div>
</footer>

        `;
  }
  navbar() {
    setTimeout(() => {
      const navContainer = document.getElementById("navigation");
      const burger = document.getElementById("burger");
      const navList = document.querySelector(".nav-list");

      window.onscroll = () => {
        navContainer.classList.add("nav-add-black");
      };

      navList.addEventListener("click", () => {
        navContainer.classList.add("nav-add-black");
      });

      burger.addEventListener("click", () => {
        navList.classList.toggle("nav-list-off");
      });

      if (window.innerWidth < 768) {
        navContainer.classList.add("nav-add-black");
        navList.classList.add("nav-add-black");
      } else {
        navContainer.classList.remove("nav-add-black");
        navList.classList.remove("nav-add-black");
      }
    }, 10);
  }
}
