class templateLoader {
  constructor(site) {
    this.header = `
    <header class="navigation-container">
      <div class="logo-container">
        <img src="/images/Logo.svg" />
      </div>
      <nav id="navigation">
        <div class="nav-list-off">
            <a class="nav-list-item active" href="/">Home</a>
            <a class="nav-list-item" href="/about">About</a>
            <a class="nav-list-item" href="/product">products</a>
            <a class="nav-list-item" href="/gallery">Gallery</a>
            <a class="nav-list-item" href="/contact">Contact</a>
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
      <section>
        <h3>Want Exclusive Deals and Updates? Subscribe Today!</h3>
        <p>Integer vel turpis ultricies, lacinia ligula id, lobortis augue. Vivamus porttitor dui id dictum efficitur. Phasellus vel interdum elit.</p>
        <form method="POST" action="">
          <label for="email"> Email
            <input type="email" id="email" aria-describedby="email" placeholder="Email"/>
          </label>
          <button type="submit">Subscribe Today!</button>
        </form>
      </section>
  `;

    this.footer = `
      <footer>         
        <div>
          <h4>Phone number</h4>
          <ul>
              <li>USA: 1 (643) 594-4322</li>
              <li>Mexico: 1 (323) 865-2049</li>
              <li>Canada: 1 (069) 123-654</li>
          </ul>
        </div>
        <div>
          <h4>Email</h4>
          <ul>
              <li>ChickenEggs@gmail.com</li>
              <li>CreativeLogo@gmail.com</li>
          </ul>
        </div>
        <div>
          <h4>Adress</h4>
          <ul>
            <li>3186 Th Avenue,</li>
            <li>Kugaaruk, X0E 1K0</li>
          </ul>
        </div>
        <div>
          <h4>Follow us on</h4>
          <div>
            <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><img src="/images/facebook.svg" alt="facebook"/></a>
            <a href="http://twitter.com" target="_blank" rel="noopener noreferrer"><img src="/images/twitter.svg" alt="twitter"/></a>
            <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer"><img src="/images/linkedin.svg" alt="linkedin"/></a>
            <a href="http://snapchat.com" target="_blank" rel="noopener noreferrer"><img src="/images/snapchat.svg" alt="snapchat"/></a>
            <a href="http://instagram.com" target="_blank" rel="noopener noreferrer"><img src="/images/instagram.svg" alt="instagram"/></a>
          </div>
  <p>Website made and designed by <a target="_blank" rel="noopener noreferrer" href="https://aarontibben.netlify.com">Aaron Tibben<p>
</footer>


        `;

    this.navListShow();
  }
  navListShow() {
    const navList = taino.el("nav-list", true);
    const burger = taino.elid("burger");
  }
}
