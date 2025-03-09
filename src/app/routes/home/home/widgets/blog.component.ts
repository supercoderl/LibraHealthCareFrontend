import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Post } from "../../../../types";
import { HOME_POSTS } from "../../../../constants";

@Component({
    selector: 'blog',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <section class="py-7.5 md:py-15">
            <div class="container px-4 max-w-1200 mx-auto">
                <!-- section title -->
                <div class="relative mb-7.5 md:mb-17">
                    <div class="pb-0 text-center">
                        <h3 class="text-[#33d687] uppercase leading-6 font-bold mb-1 inline-block">{{ "app.home.blog.title" | i18n }}</h3>
                        <h2 class="text-2xl md:text-10.8 leading-12.8 font-semibold tracking-0 mb-3 uppercase">{{ "app.home.blog.subTitle" | i18n }}</h2>
                    </div>
                </div><!-- section title end -->
                <div class="flex flex-wrap md:-mx-4">
                    <!--Start single blog item-->
                    <div 
                        class="w-full md:w-1/3 md:px-4"
                        *ngFor="let post of posts; let i = index"
                        data-aos="flip-left"
                        [attr.data-aos-delay]="i * 250"
                    >
                        <div 
                            class="relative overflow-hidden rounded-5 bg-section block border-b border-solid border-[#f4f4f4] p-4.9 pb-4.5 mb-10"
                            [id]="post.id.toString()"
                        >
                            <div class="overflow-hidden relative">
                                <img [src]="post.img" alt="Awesome Image" class="scale-110 transition-all duration-500 w-full">
                                <div class="opacity-0 absolute w-full h-full top-[100%] bg-[rgba(3,_146,_206,_.8)] text-white transition-all duration-500">
                                    <div class="table h-full w-full">
                                        <div class="table-cell text-center">
                                            <a href="blog-single.html" class="h-7.5 w-7.5 inline-block"><span class="flaticon-plus-symbol"></span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="transition-all duration-500">
                                <a href="blog-single.html">
                                    <h3 class="text-[#222222] text-20 leading-7.5 pt-5 pb-2 block transition-all duration-500">{{post.title}}</h3>
                                </a>
                                <div class="border-b border-solid border-[#f0f0f0] pb-3.75 block">
                                    <p class="m-0">{{post.description}}</p>
                                </div>
                                <ul class="overflow-hidden pt-5">
                                    <li class="inline-block float-left leading-4 mr-5">
                                        <a href="#" class="text-[#848484] text-15">
                                            <span nz-icon nzType="calendar" nzTheme="outline" class="mr-2"></span>
                                            {{post.date}}
                                        </a>
                                    </li>
                                    <li class="inline-block float-left leading-4 mr-5">
                                        <a href="#" class="text-[#848484] text-15">
                                            <span nz-icon nzType="comment" nzTheme="outline" class="mr-2"></span>
                                            {{post.comments?.length ?? 0}} Comments
                                        </a>
                                    </li>
                                </ul>
                            </div>    
                        </div>    
                    </div>
                    <!--End single blog item-->
                </div>
            </div>
        </section>
    `
})

export class HomeBlog 
{ 
    posts: Post[] = HOME_POSTS;
}