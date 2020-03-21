class contactLoader {
  constructor(site) {
    this.title = "Contact";
    this.meta_desc = "Contact us for more information or questions";

    this.styling = `
    #information{color: var(--white); background-color: var(--red-bg-color); padding: 2rem;}

    @media only screen and (min-width: 768px){
      #information{padding: 4rem 2rem 3rem 2rem;}
      #information .header-title {margin-bottom: 3rem;}
            .fix-contact{padding-top: 4rem !important;}
        }
    `;

    this.starthtml = `
    <main>
        <section id="information">
            <h2 class="header-title">Have any questions or need to get in touch?</h2>
        <div class="information-container-main">
          <div class="information-container">
              <h5 class="information-group-title">Phone number</h5>
              <ul class="information-list-group">
                  <li>USA: 1  (643) 594-4322</li>
                  <li>Mexico: 1 (323) 865-2049</li>
                  <li>Canada: 1 (069) 123-654</li>
              </ul>
          </div>
          <div class="information-container">
              <h5 class="information-group-title">Email</h5>
              <ul class="information-list-group">
                  <li>ChickenEggs@gmail.com</li>
                  <li>CreativeLogo@gmail.com</li>
              </ul>
          </div>
          <div class="information-container">
              <h5 class="information-group-title">Adress</h5>
              <ul class="information-list-group">
                  <li>3186 Th Avenue,</li>
                  <li>Kugaaruk, X0E 1K0</li>
              </ul>
          </div>
          <div class="information-container">
              <h5 class="information-group-title">Business Hours</h5>
              <ul class="information-list-group">
                  <li>Monday to Saturday</li>
                  <li>7:00-4:00 PM</li>
                  <li>Sunday: closed</li>
              </ul>
          </div>
        </div>
    </section>
    
    <section id="contact" class="fix-contact">
            <div class="contact-container">
              <div id="map">
                <iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1197183.8373802372!2d-1.9415093691103689!3d6.781986417238027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb96f349e85efd%3A0xb8d1e0b88af1f0f5!2sKumasi+Central+Market!5e0!3m2!1sen!2sth!4v1532967884907" frameborder="0" allowfullscreen></iframe>
              </div>
                <form class="contact-form">
                  <div class="form-control form-control-sm">
                    <label for="name">Name</label>
                      <input type="text" id="name" placeholder="Name" value=""/>
                      <span class="helper-text"></span>
                  </div>
                  <div class="form-control form-control-sm">
                    <label for="contactEmail">Email</label>
                      <input type="email" id="contactEmail" aria-describedby="contactEmail" placeholder="Email"/>
                      <span class="helper-text"></span>
                  </div>
                  <div class="form-control">
                    <label for="subject">Subject</label>
                      <input type="text" id="subject" placeholder="Subject" aria-describedby="subject"/>
                      <span class="helper-text"></span>
                  </div>
                  <div class="form-control">
                    <label for="message">Message</label>
                      <textarea  type="text" name="message" id="message" cols="30" rows="10" placeholder="Message" aria-describedby="message"></textarea>
                      <span class="helper-text"></span>
                    </div>
                  <button class="btn-base btn" type="submit">Submit</button>
                </form>
              </div>
          </section>
</main>
        `;

    this.loadPageMethods();
  }
  loadPageMethods() {
    taino.changeNavColor("contact");
  }
}
