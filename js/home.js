class homeLoader {
  constructor(site) {
    this.title = "Home";
    this.meta_desc =
      "This is an e commerce/small business website made for fun";
    this.styling = `
    `;
    this.starthtml = `
      <main>
        <section id="landing-bg">
          <div class="center">
            <h1>Free Run</h1>
            <h2>Organic <span>Eggs</span></h2>
            <a href="/prices">Order Now!</a>
          </div>
        </section>

        <section>
          <div>
            <img class="temp" src="/images/about.png" alt="chicken coop" >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis.</p>
            <a href="/about">Learn More!</a>
          </div>
        </section>

        <section>
          <div>
          <!-- cards insert here-->
          </div>
        </section>

        <section>
          <a href="/gallery">
            <!-- insert gallery images-->
          </a>
        </section>

        <section>
            <h2>Need to get in touch?</h2>
            <div id="map">
              <iframe class="iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1197183.8373802372!2d-1.9415093691103689!3d6.781986417238027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb96f349e85efd%3A0xb8d1e0b88af1f0f5!2sKumasi+Central+Market!5e0!3m2!1sen!2sth!4v1532967884907" frameborder="0" allowfullscreen></iframe>
            </div>
              <form>
                <div>
                  <label for="name"> Name
                    <input type="text" id="name" placeholder="Name" value=""/>
                  </label
                </div>
                <div>
                  <label for="contactEmail"> Email
                    <input type="email" id="contactEmail" aria-describedby="contactEmail" placeholder="Email"/>
                  </label>
                  <span></span>
                </div>
                <div>
                  <label for="subject">
                    <input type="text" id="subject" placeholder="Subject" aria-describedby="subject"/>
                  </label>
                  <span></span>
                </div>
                <div>
                  <textarea type="text" name="message" id="message" cols="30" rows="10" placeholder="Message" aria-describedby="message"></textarea>
                </div>
                <button type="submit">Submit</button>
              </form>
          </section>
        </main>
        `;
  }
}
