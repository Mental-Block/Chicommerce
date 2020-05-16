class billingLoader {
  constructor(site) {
    this.title = "Check Out";
    this.meta_desc = "";
    this.styling = `

      `;

    this.starthtml = `
             <section id="checkout" class="checkout-container">
                <div class="checkout-billing">
                  <h1>Billing Details</h1>
                    <form id="checkout-form" class="checkout-form" action="" method="POST">
                      <label for="checkout-name"> First & Last Name</label>
                      <input class="" name="checkout-name" type="text" id="checkout-name" placeholder="first & last name"/>
                      
                      <label for="checkout-email">Email Address</label>
                      <input class="" name="checkout-email" type="text" id="checkout-email" placeholder="email"/>
                      
                      <label for="checkout-Country">Country</label>
                        <select>
                          <option>Canada</option>
                          <option>United States</option>
                          <option>Mexico</option>
                          <option>United Kingdom</option>
                          <option>France</option>
                        </select>
                      
                      <label for="checkout-state"> State / Country</label>
                      <input class="" name="checkout-state" type="text" id="checkout-state" placeholder="state / country"/>
                      
                      <label for="checkout-zip"> Zip / Postal Code</label>
                      <input class="" name="checkout-zip" type="text" id="checkout-zip" placeholder="zip / postal code"/>
                      
                      <h2>Payment Method</h2>

                      <label for="checkout-payment">Credit Card 
                        <input type="radio" id="checkout-credit" name="checkout-payment" value="Credit Card">
                      </label>

                      <div class="sr-only">
                        <label for="checkout-card">Card Number</label>
                        <input class="" name="checkout-card" type="text" id="checkout-card" placeholder="4123-4567-123-9819"/>
                        
                        <h4>Expiration Date</h4>
                        <label for="">Year</label>
                        <select>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                          </select>

                          <label for="">Month</label>
                          <select>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                          </select>

                        <label for="checkout-securityCode">Security Code</label>
                        <input class="" name="checkout-securityCode" type="text" id="checkout-securityCode" placeholder="Three Digits"/>
                      </div>

                      <label for="checkout-paypal">PayPal
                        <input type="radio" id="checkout-paypal" name="checkout-payment">
                      </label> 
                      
                      <p>By clicking the button you agree to the <a href="">terms and conditions</a></p>
                      <button type="submit" class="btn-green">Buy Now</button>
                    </form>
                  </div>
                <div class="review-summary">
                  <h3> Cart Summary [<button id="review-cart" class="btn-blue-link">Edit</button>]</h3>
                </div>  
             </section>
          `;
    this.loadPageMethods();
  }
  loadPageMethods() {
    taino.changeLinkColor("products");
    setTimeout(() => {
      templateLoader.form.checkout();
    }, 0);
    console.log(site.state.cart);
  }
}
