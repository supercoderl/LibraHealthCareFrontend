import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { BLOG_CATEGORIES, RECENT_POSTS, TAGS } from "../../../../constants";
import { Post } from "../../../../types";

@Component({
  selector: 'care-health-left',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
        <aside
          class="md:w-300 p-5 md:shadow-primary"
        >
          <div class="mb-11.2">
            <h3
              class="text-20 leading-6.5 text-[#303745] font-medium capitalize relative before:content-[''] before:absolute before:bg-primary before:h-0.5 before:w-10 before:left-0 before:-bottom-3 before:block"
            >
            {{ "app.search" | i18n }}
            </h3>
          </div>
          <div class="mb-11.2 relative">
            <input
              type="search"
              [placeholder]="'app.search' | i18n"
              name="s"
              class="border border-solid border-[#ddd] text-[#444444] py-2 px-4.2 w-full rounded-5 relative outline-none"
              value=""
            />
            <button
              type="submit"
              value="Search"
              class="bg-transparent text-[#494949] px-4 absolute block right-0 top-0 text-24"
            >
              <span nz-icon nzType="search" nzTheme="outline" class="!text-20"></span>
            </button>
          </div>
          <div class="mb-7.5">
            <h3
              class="text-20 leading-6.5 text-[#303745] font-medium capitalize relative before:content-[''] before:absolute before:bg-primary before:h-0.5 before:w-10 before:left-0 before:-bottom-3 before:block"
            >
            {{ "app.categories" | i18n }}
            </h3>
          </div>
          <div class="mb-7.5">
            <ul class="m-0 p-0">
              <li
                class="text-15 leading-6.5 text-[#494949] relative py-1.5"
                *ngFor="let category of categories"
              >
                {{category}}
              </li>
            </ul>
          </div>
          <div class="mb-11.2">
            <div>
              <h3
                class="mb-12.5 text-20 leading-6.5 text-[#303745] font-medium capitalize relative before:content-[''] before:absolute before:bg-primary before:h-0.5 before:w-10 before:left-0 before:-bottom-3 before:block"
              >
              {{ "app.careHealth.title" | i18n }}
              </h3>
            </div>
  
            <div
              class="flex items-center border-b border-solid border-careHealth pb-4 mb-4"
              *ngFor="let post of posts"
            >
              <div class="w-25 pr-4 rounded-3 overflow-hidden" [id]="post.id.toString()">
                <img [src]="post.img" alt="" />
              </div>
              <div>
                <a href="#" class="text-15 leading-5.5 text-[#494949]">
                  {{post.title}}
                </a>
                <span class="text-12 leading-5 text-[#494949] block">
                  <span nz-icon nzType="calendar" nzTheme="outline"></span>
                    {{post.date}}
                </span>
              </div>
            </div>
          </div>
          <div class="mb-8.8">
            <h3
              class="text-20 leading-6.5 text-[#303745] font-medium capitalize relative before:content-[''] before:absolute before:bg-primary before:h-0.5 before:w-10 before:left-0 before:-bottom-3 before:block"
            >
            {{ "app.tags" | i18n }}
            </h3>
          </div>
          <div>
            <ul class="m-0 p-0">
              <li class="inline-block" *ngFor="let tag of tags">
                <a
                  href="#"
                  class="text-13 leading-6 inline-block mt-2.5 mr-0.75 py-1.5 px-3 capitalize transition-all duration-300 bg-white text-[#444444] border border-solid border-[#f0f0f0] rounded-5"
                >{{tag}}
                </a>
              </li>
            </ul>
          </div>
        </aside>
    `
})

export class CareHealthLeftSide {
  categories = BLOG_CATEGORIES;
  posts: Post[] = RECENT_POSTS;
  tags = TAGS;
}