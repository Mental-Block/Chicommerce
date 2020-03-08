class contactLoader {
  constructor(site) {
    this.title = "Contact us about TainoJS";
    this.meta_desc = "Contact us about TainoJS";
    taino.changeNavColor("contact");
    this.starthtml = `
    <main>
        <section id="information">
            <h2>Have any questions or need to get in touch?</h2>
        <div>
            <h6>Phone number</h6>
            <ul>
                <li>USA: 1  (643) 594-4322</li>
                <li>Mexico: 1 (323) 865-2049</li>
                <li>Canada: 1 (069) 123-654</li>
            </ul>
        </div>
        <div>
            <h6>Email</h6>
            <ul>
                <li>ChickenEggs@gmail.com</li>
                <li>CreativeLogo@gmail.com</li>
            </ul>
        </div>
        <div>
            <h6>Adress</h6>
            <ul>
                <li>3186 Th Avenue,</li>
                <li>Kugaaruk, X0E 1K0</li>
            </ul>
        </div>
        <div>
            <h6 >Business Hours</h6>
            <ul>
                <li>Monday to Saturday</li>
                <li>7:00-4:00 PM</li>
                <li>Sunday: closed</li>
            </ul>
        </div>
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
