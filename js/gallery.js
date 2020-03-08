class galleryLoader {
  constructor(site) {
    this.title = "Gallery";
    this.meta_desc = "Yes, we have pictures of our abused animals.";
    taino.changeNavColor("gallery");
    this.starthtml = `
      <main>
        <section> 
        </section>

        <section id="gallery-images">
        <!--Insert Images Here-->
        </section>
      </main>
        `;
  }
}
