class aboutLoader {
  constructor(site) {
    this.title = "About";
    this.meta_desc = "Our story on how we became egg farmers";
    this.starthtml = `
        <main>
           <div>
              <h2 class="main-header">Our Mission</h2>
               <h5>“Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit…”</h5>
           </div>

            <section>
                <h2>Our Story</h2>
                <div>
                  <div>
                    <img src="/images/aboutpage.png" alt="chickens coming out of the chicken coop"/>
                  </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis. Sed sed tempor odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis.</p>
                  </div>
                </div>
             </section>
             
            <section>
              <div>
                <div>
                  <img src="/images/oldbarn.png" alt="The an old red barn from the 1970's that housed the chickens">
                </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis. Sed sed tempor odio.</p>
                </div>
                <div>
                  <img src="/images/about.png" alt="chickens coming out of the chicken coop"/>
                </div>
                <div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu. Suspendisse tempor, sem id porta laoreet, tellus mauris scelerisque urna, ac pellentesque dui massa at justo. Aenean nisl nisi, pharetra non tellus eget, iaculis porttitor arcu. Sed pharetra iaculis rhoncus. Nullam euismod nunc ultricies lorem lacinia, elementum semper nulla elementum. Mauris accumsan ante sit amet velit commodo, dignissim posuere diam lacinia. Sed mattis at justo gravida lobortis. Sed sed tempor odio.</p>
                </div>
              </div>
            </section>
            
            
           <section>
              <h2>Testimonials</h2>
                    <div class="card card-center">
                          <div class="card-body">
                            <img class="card-img-top" src="/images/user.svg" width="100px" height="160px" />
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in justo at nisi venenatis viverra ut molestie nunc. Pellentesque nunc nibh, fringilla nec ex et, porttitor ultrices arcu.</p>
                          </div>
                        </div>
                    </div>
            </section>
          </main>
        `;
  }
}
