class billingLoader {
  constructor(site) {
    this.title = "Check Out";
    this.meta_desc = "";
    this.styling = `

      `;

    this.starthtml = `
             <section id="billing" class="billing-main">
             <div class="billing-egg">
              <div class="billing-container">
                  <div class="billing-summary">
                    <button id="billing-cart" class="btn-white-link">
                                    <?xml version="1.0" ?>
                        <svg height="20px" version="1.1" viewBox="2 0 20 20" width="25px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title/>
                        <desc/>
                        <defs/>
                        <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">
                          <g fill="" class="cart-svg" id="Core" transform="translate(-212.000000, -422.000000)">
                            <g id="shopping-cart" transform="translate(212.000000, 422.000000)">
                            <path d="M6,16 C4.9,16 4,16.9 4,18 C4,19.1 4.9,20 6,20 C7.1,20 8,19.1 8,18 C8,16.9 7.1,16 6,16 L6,16 Z M0,0 L0,2 L2,2 L5.6,9.6 L4.2,12 C4.1,12.3 4,12.7 4,13 C4,14.1 4.9,15 6,15 L18,15 L18,13 L6.4,13 C6.3,13 6.2,12.9 6.2,12.8 L6.2,12.7 L7.1,11 L14.5,11 C15.3,11 15.9,10.6 16.2,10 L19.8,3.5 C20,3.3 20,3.2 20,3 C20,2.4 19.6,2 19,2 L4.2,2 L3.3,0 L0,0 L0,0 Z M16,16 C14.9,16 14,16.9 14,18 C14,19.1 14.9,20 16,20 C17.1,20 18,19.1 18,18 C18,16.9 17.1,16 16,16 L16,16 Z" id="Shape"/>
                            </g>
                          </g>
                        </g>
                        </svg> Summary
                    </button>
                            </div>
                      <form id="billing-form" class="billing-form" action="" method="POST"> 
                      
                        <h1>Billing Details</h1>
                          <div class="form-control">
                              <label for="billing-name-first">First Name</label>
                              <input class="form-input" name="billing-name-first" type="text" id="billing-name-first" placeholder="First Name"/>
                          </div>

                          <div class="form-control">
                              <label for="billing-name-last">Last Name</label>
                              <input class="form-input" name="billing-name-last" type="text" id="billing-name-last"  placeholder="Last Name"/>
                          </div>

                          <div class="form-control">
                              <label for="billing-email">Email Address</label>
                              <input class="form-input" name="billing-email" type="text" id="billing-email" placeholder="Email Address"/>
                          </div>

                          <div class="form-control">
                              <label for="billing-phone">Phone Number</label>
                              <input class="form-input" name="billing-email" type="text" id="billing-email" placeholder="Phone Number (optional)"/>
                          </div>
                          <div class="form-control">
                              <label for="billing-country">Country</label>
                              <select class="form-select" name="billing-country">
                                  <option>Canada</option>
                                  <option>United States</option>
                                  <option>Mexico</option>
                                  <option>United Kingdom</option>
                                  <option>France</option>
                              </select>
                          </div>
                          <div class="form-control">
                              <label for="billing-state"> State / province</label>
                              <input class="form-input" name="billing-state" type="text" id="billing-state" placeholder="State / province"/>
                          </div>
                          <div class="form-control">
                              <label for="billing-state"> Town / City</label>
                              <input class="form-input" name="billing-state" type="text" id="billing-state" placeholder="Town / City"/>
                          </div>
                          <div class="form-control">
                              <label for="billing-address"> Address</label>
                              <input class="form-input" name="billing-address" type="text" id="billing-address" placeholder="Street Adress"/>
                          </div>
                          <div class="form-control">
                              <label for="billing-zip"> Zip / Postal Code</label>
                              <input class="form-input" name="billing-zip" type="text" id="billing-zip" placeholder="X0E 1K0"/>
                          </div>    
                          
                              <h2>Payment Method</h2>
                          
                          <div class="form-control">
                              <label for="billing-payment">Credit Card </label>
                              <input type="radio" id="billing-credit" name="billing-payment" value="Credit Card">
                          </div>

                        <div class="sr-only">
                          <label for="billing-card">Card Number</label>
                          <input class="" name="billing-card" type="text" id="billing-card" placeholder="4123-4567-123-9819"/>
                          
                          <h2>Expiration Date</h2>
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

                          <label for="billing-securityCode">Security Code</label>
                          <input class="" name="billing-securityCode" type="text" id="billing-securityCode" placeholder="Three Digits"/>
                        </div>

                      <div class="form-control">
                          <label for="billing-paypal">PayPal</label> 
                          <input type="radio" id="billing-paypal" name="billing-payment">
                      </div>
                        
                        <button type="submit" class="btn-green">Finish Order</button>
                      </form>
                    </div>
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
  }
}
