import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'contact-form',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div class="bg-[rgba(0,_0,_0,_0)_none_repeat_scroll_0_0] mt-17.8 mb-7.5 md:px-6.2 md:pb-27.5">
          <h2 class="text-[rgb(7,_16,_65)] text-28 md:text-36 font-semibold mb-8.8 text-left">CONTACT FORM</h2>
          <form method="POST">
            <fieldset class="b-0 m-0 p-0">
              <div class="w-full relative">
                <div class="mb-4">
                  <input
                    type="text"
                    name="name"
                    class="bg-[rgba(0,_0,_0,_0)_none_repeat_scroll_0_0] border-[#dddddd] outline-none text-[#777777] block w-full h-8.5 py-1.5 px-3 border border-solid transition-colors"
                    placeholder="First Name*"
                  />
                </div>
              </div>
              <div class="w-full relative">
                <div class="mb-4">
                  <input
                    type="email"
                    name="email"
                    class="bg-[rgba(0,_0,_0,_0)_none_repeat_scroll_0_0] border-[#dddddd] outline-none text-[#777777] block w-full h-8.5 py-1.5 px-3 border border-solid transition-colors"
                    placeholder="Your Mail*"
                  />
                </div>
              </div>
              <div class="w-full relative">
                <div class="mb-4">
                  <input
                    type="text"
                    class="bg-[rgba(0,_0,_0,_0)_none_repeat_scroll_0_0] border-[#dddddd] outline-none text-[#777777] block w-full h-8.5 py-1.5 px-3 border border-solid transition-colors"
                    name="appoint-date"
                    placeholder="Appointment Date*"
                  />
                </div>
              </div>
              <div class="w-full relative">
                <div class="mb-4">
                  <input
                    type="tel"
                    name="telephone"
                    class="bg-[rgba(0,_0,_0,_0)_none_repeat_scroll_0_0] border-[#dddddd] outline-none text-[#777777] block w-full h-8.5 py-1.5 px-3 border border-solid transition-colors"
                    placeholder="Your Telephone"
                  />
                </div>
              </div>
              <div class="w-full relative">
                <div class="mb-4">
                  <textarea
                    cols="40"
                    name="message"
                    rows="5"
                    class="bg-[rgba(0,_0,_0,_0)_none_repeat_scroll_0_0] border-[#dddddd] outline-none text-[#777777] block w-full py-1.5 px-3 border border-solid transition-colors "
                    placeholder="Your Message"
                  ></textarea>
                </div>
              </div>

              <div class="w-full">
                <div class="mb-4">
                  <div
                    class="g-recaptcha"
                    data-sitekey="6Ldg5BwTAAAAACiBHibYivMN8Cz26gHmvPCErw2R"
                  >
                    <div style="width: 304px; height: 78px">
                      <div>
                        <iframe
                          title="reCAPTCHA"
                          width="304"
                          height="78"
                          role="presentation"
                          name="a-95j4bdokq9l7"
                          frameborder="0"
                          scrolling="no"
                          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                          src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6Ldg5BwTAAAAACiBHibYivMN8Cz26gHmvPCErw2R&amp;co=aHR0cHM6Ly93d3cucmFkaXVzdGhlbWUuY29tOjQ0Mw..&amp;hl=vi&amp;v=zIriijn3uj5Vpknvt_LnfNbF&amp;size=normal&amp;cb=4lb6qndefhsd"
                        ></iframe>
                      </div>
                      <textarea
                        id="g-recaptcha-response"
                        name="g-recaptcha-response"
                        class="g-recaptcha-response"
                        style="
                          width: 250px;
                          height: 40px;
                          border: 1px solid rgb(193, 193, 193);
                          margin: 10px 25px;
                          padding: 0px;
                          resize: none;
                          display: none;
                        "
                      ></textarea>
                    </div>
                    <iframe style="display: none"></iframe>
                  </div>
                </div>
              </div>
              <div class="w-full">
                <div class="mb-4">
                    <button 
                        class="bg-primary text-white font-semibold py-2.5 px-10 transition-all duration-300" 
                        type="submit"
                    >
                        SEND
                    </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
    `
})

export class ContactForm { }