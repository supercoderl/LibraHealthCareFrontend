import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'care-health-pagination',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <nav class="relative">
            <ul class="flex flex-wrap justify-center m-0 p-0" role="list">
              <li class="bg-black mr-4 flex-pagination max-w-8.8">
                <span
                  class="bg-[#a5816a] transition-all duration-300 text-white inline-flex justify-center items-center relative h-8.8 w-full p-0 text-4"
                  aria-current="page"
                  aria-label="Page 1"
                  >1</span
                >
              </li>
              <li class="bg-black mr-4 flex-pagination max-w-8.8">
                <a
                  href="/blogs/news?page=2"
                  class="transition-all duration-300 text-white inline-flex justify-center items-center relative h-8.8 w-full p-0 text-4"
                  aria-label="Page 2"
                  >2</a
                >
              </li>
              <li class="bg-black mr-4 flex-pagination max-w-8.8">
                <a
                  href="/blogs/news?page=3"
                  class="transition-all duration-300 text-white inline-flex justify-center items-center relative h-8.8 w-full p-0 text-4"
                  aria-label="Page 3"
                  >3</a
                >
              </li>
              <li class="bg-black mr-4 flex-pagination max-w-8.8">
                <a
                  href="/blogs/news?page=4"
                  class="transition-all duration-300 text-white inline-flex justify-center items-center relative h-8.8 w-full p-0 text-4"
                  aria-label="Page 4"
                  >4</a
                >
              </li>
              <li class="bg-white mr-4 flex-pagination max-w-8.8">
                <a
                  href="/blogs/news?page=2"
                  class="transition-all duration-300 text-white inline-flex justify-center items-center relative h-8.8 w-full p-0 text-4"
                  aria-label="Next page"
                >
                  <span
                    nz-icon
                    nzType="right"
                    nzTheme="outline"
                    class="!text-black"
                  ></span>
                </a>
              </li>
            </ul>
        </nav>
    `
})

export class CareHealthPagination { }