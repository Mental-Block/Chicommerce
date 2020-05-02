class contactLoader {
    constructor(site) {
        this.title = "Contact";
        this.meta_desc = "Contact us for more information or questions";

        this.styling = `
        .information { color: var(--white); background-color: var(--red-bg-color); padding: 2rem; }
        .information .about-title {font-size: 1.5rem; text-align: center; }

        @media only screen and (min-width: 768px) { #information { padding: 4rem 2rem 3rem 2rem; }
            .information .about-title { margin-bottom: 3rem; }
            .contact-fix { padding-top: 4rem !important; } }
            .information-container { display: -webkit-box; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; -webkit-box-align: start; -ms-flex-align: start; align-items: flex-start; }
            .information-container-sec { width: 100%; margin: 1rem 0; display: -webkit-box; display: -ms-flexbox; display: flex; -ms-flex-line-pack: center; align-content: center; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; justify-items: center; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; }
            .information-title { line-height: 2.5rem; font-size: 1rem; }
            .information-group { list-style: none; line-height: 1.5rem; }
        
        @media only screen and (min-width: 768px) { .information-container-sec { width: 50%; } }
        @media only screen and (min-width: 1024px) { .information-container-sec { width: 25%; } }
    `;

        this.starthtml = `
        <section id="information" class="information">
            <h2 class="about-title">Have any questions or need to get in touch?</h2>
        <div class="information-container">
          <div class="information-container-sec">
              <h5 class="information-title">Phone number</h5>
              <ul class="information-group">
                  <li>USA: 1  (643) 594-4322</li>
                  <li>Mexico: 1 (323) 865-2049</li>
                  <li>Canada: 1 (069) 123-654</li>
              </ul>
          </div>
          <div class="information-container-sec">
              <h5 class="information-title">Email</h5>
              <ul class="information-group">
                  <li>ChickenEggs@gmail.com</li>
                  <li>CreativeLogo@gmail.com</li>
              </ul>
          </div>
          <div class="information-container-sec">
              <h5 class="information-title">Adress</h5>
              <ul class="information-group">
                  <li>3186 Th Avenue,</li>
                  <li>Kugaaruk, X0E 1K0</li>
              </ul>
          </div>
          <div class="information-container-sec">
              <h5 class="information-title">Business Hours</h5>
              <ul class="information-group">
                  <li>Monday to Saturday</li>
                  <li>7:00-4:00 PM</li>
                  <li>Sunday: closed</li>
              </ul>
          </div>
        </div>
    </section>
    
    <section id="contact" class="contact-main contact-fix">
            <!--Insert form -->
    </section>
        `;

        this.loadPageMethods();
    }
    loadPageMethods() {
        taino.changeNavColor("contact");

        setTimeout(() => {
            taino.contactForm(taino.elid("contact"))
            taino.cart();
        }, 0)
    }
}
