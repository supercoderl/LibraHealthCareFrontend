import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Post } from "../../../../types";
import { POSTS } from "../../../../constants";

@Component({
  selector: 'care-health-right',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
      <div class="grid md:grid-cols-2 gap-10">
        <div 
          class="w-full h-full relative"
          *ngFor="let post of posts"
        >
            <div 
              class="bg-transparent flex flex-col h-full rounded-sm"
              [id]="post.id.toString()"
            >
              <div class="px-5 md:px-0 w-full flex relative items-stretch">
                <div class="overflow-hidden">
                  <div class="w-full block">
                    <a
                      href="/blogs/news/give-your-beauty-of-skin-an-new-glow"
                      class="block max-w-full h-full w-full transition-all duration-300"
                      ><img
                        srcset="
                          //{{post.img}}&amp;width=165   165w,
                          //{{post.img}}&amp;width=360   360w,
                          //{{post.img}}&amp;width=533   533w,
                          //{{post.img}}&amp;width=720   720w,
                          //{{post.img}}&amp;width=1000 1000w,
                          //{{post.img}}                1400w
                        "
                        src="//{{post.img}}&amp;width=1500"
                        sizes="(min-width: 1560px) 730px, (min-width: 750px) calc((100vw - 130px) / 2), calc((100vw - 50px) / 2)"
                        alt="Give your beauty of skin an new glow"
                        class="object-cover object-center w-full"
                        loading="lazy"
                        width="1400"
                        height="932"
                    /></a>
                  </div>
                </div>
              </div>

              <div class="p-0 pb-10 grid w-full grow">
                <div class="px-5 pt-6 text-left grow-start-1">
                  <div
                    class="mb-1.5 pt-0 text-16 leading-6.2 capitalize text-[#534439] transition-all duration-300 flex"
                  >
                    <div class="flex items-baseline gap-1">
                      <span
                        nz-icon
                        nzType="calendar"
                        nzTheme="outline"
                        class="text-xs"
                      ></span>

                      <span
                        class="text-xs after:content-['|'] after:inline-block after:relative after:-translate-y-px after:px-3"
                      >
                        <time datetime="2021-11-23T10:09:02Z"
                          >{{post.date}}</time
                        >
                      </span>
                    </div>
                    <div class="flex items-baseline gap-1">
                      <span
                        nz-icon
                        nzType="user"
                        nzTheme="outline"
                        class="text-xs"
                      ></span>
                      <span
                        class="text-xs after:content-['|'] after:inline-block after:relative after:-translate-y-px after:px-3"
                        >{{post.author}}</span
                      >
                    </div>
                    <div class="flex items-baseline gap-1">
                      <span
                        nz-icon
                        nzType="comment"
                        nzTheme="outline"
                        class="text-xs"
                      ></span>
                      <span class="text-xs">{{post.comments?.length ?? 0}} comments</span>
                    </div>
                  </div>
                  <h3
                    class="text-24 font-medium my-2.5 transition-all duration-300"
                  >
                    <a
                      href="/blogs/news/give-your-beauty-of-skin-an-new-glow"
                      class="block max-w-full h-full w-full transition-all duration-300"
                    >
                      {{post.title}}
                    </a>
                  </h3>
                  <p
                    class="mb-1.5 w-full text-16 transition-all duration-300 max-w-1320"
                  >
                    {{post.description}}
                  </p>
                  <a
                    href="/blogs/news/give-your-beauty-of-skin-an-new-glow"
                    class="transition-all duration-300 mb-1.5 mt-[1.5rem] text-16 inline-flex justify-center items-center border-0 px-12 cursor-pointer text-[rgb(247,_242,_239)] whitespace-nowrap appearance-none bg-[rgb(60,_56,_54)] capitalize pt-1.5 pb-2"
                    >Read More</a
                  >
                </div>
              </div>
            </div>
        </div>
      </div>
    `
})

export class CareHealthRightSide {
  posts: Post[] = POSTS;
}