import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";

@Component({
    selector: 'calendar-table-event',
    template: `
    <table class="border-seperate block w-full">
              <tbody class="flex flex-wrap">
                <tr
                  class="mt-0 md:flex-[0_0_10%] md:max-w-[10%] flex-[0_0_20%] max-w-[20%] flex justify-center border-b-[1px] border-solid"
                  data-date="2024-12-08"
                >
                  <td class="bg-transparent p-0" colspan="3">
                    <a
                      class="block text-[11px] uppercase text-[#8392a5] font-[500] p-[5px] text-center"
                      data-goto='{"date":"2024-12-08","type":"day"}'
                      >Sun
                      <span class="text-[28px] md:text-[32px] block text-[#001737]"
                        >08</span
                      >
                    </a>
                  </td>
                </tr>
                <tr
                  class="border-l-[rgb(1,_104,_250)] mt-0 md:flex-[0_0_calc(90%-5px)] flex-[0_0_calc(80%-5px)] md:max-w-[calc(90%-5px)] max-w-[calc(80%-5px)] flex flex-col border-l-[4px] border-solid bg-white"
                >
                  <td
                    class="border-[rgb(1,_104,_250)] text-[rgb(1,_104,_250)] border-t-[1px] border-r-[1px] border-solid pt-[12px] px-[15px] pb-[2px] w-full uppercase text-[13px] font-[600]"
                  >
                    8:30am - 1:00pm
                  </td>
                  <td
                    class="border-[rgb(1,_104,_250)] border-b-[1px] border-r-[1px] border-solid px-[15px] pb-[12px]"
                  >
                    <a
                      class="md:text-[18px] block font-[500] text-[16px] mb-[2px] text-[#001737]"
                      >ThemeForest Meetup</a
                    ><span
                      class="md:text-[13px] text-[12px] block text-[#8392a5] limit-span"
                      >In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                      justo. Nullam dictum felis az pede mollis...</span
                    >
                  </td>
                </tr>
                <tr
                  class="border-l-[rgb(1,_104,_250)] mt-0 md:flex-[0_0_calc(90%-5px)] flex-[0_0_calc(80%-5px)] md:max-w-[calc(90%-5px)] max-w-[calc(80%-5px)] flex flex-col border-l-[4px] border-solid bg-white md:ml-[10%] ml-[20%] mt-4"
                >
                  <td
                    class="border-[rgb(1,_104,_250)] text-[rgb(1,_104,_250)] border-t-[1px] border-r-[1px] border-solid pt-[12px] px-[15px] pb-[2px] w-full uppercase text-[13px] font-[600]"
                  >
                    1:00pm - 6:30pm
                  </td>
                  <td
                    class="border-[rgb(1,_104,_250)] border-b-[1px] border-r-[1px] border-solid px-[15px] pb-[12px]"
                  >
                    <a
                      class="md:text-[18px] block font-[500] text-[16px] mb-[2px] text-[#001737]"
                      >Attend Lea's Wedding</a
                    ><span
                      class="md:text-[13px] text-[12px] block text-[#8392a5] limit-span"
                      >In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                      justo. Nullam dictum felis az pede mollis...</span
                    >
                  </td>
                </tr>
                <tr
                  class="mt-4 md:flex-[0_0_10%] md:max-w-[10%] flex-[0_0_20%] max-w-[20%] flex justify-center border-b-[1px] border-solid"
                  data-date="2024-12-08"
                >
                  <td class="bg-transparent p-0" colspan="3">
                    <a
                      class="block text-[11px] uppercase text-[#8392a5] font-[500] p-[5px] text-center"
                      data-goto='{"date":"2024-12-08","type":"day"}'
                      >Tue
                      <span class="text-[28px] md:text-[32px] block text-[#001737]"
                        >10</span
                      >
                    </a>
                  </td>
                </tr>
                <tr
                  class="border-l-[rgb(1,_104,_250)] mt-0 md:flex-[0_0_calc(90%-5px)] flex-[0_0_calc(80%-5px)] md:max-w-[calc(90%-5px)] max-w-[calc(80%-5px)] flex flex-col border-l-[4px] border-solid bg-white mt-4"
                >
                  <td
                    class="border-[rgb(1,_104,_250)] text-[rgb(1,_104,_250)] border-t-[1px] border-r-[1px] border-solid pt-[12px] px-[15px] pb-[2px] w-full uppercase text-[13px] font-[600]"
                  >
                    9:00am - 5:00pm
                  </td>
                  <td
                    class="border-[rgb(1,_104,_250)] border-b-[1px] border-r-[1px] border-solid px-[15px] pb-[12px]"
                  >
                    <a
                      class="md:text-[18px] block font-[500] text-[16px] mb-[2px] text-[#001737]"
                      >Design Review</a
                    ><span
                      class="md:text-[13px] text-[12px] block text-[#8392a5] limit-span"
                      >In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                      justo. Nullam dictum felis az pede mollis...</span
                    >
                  </td>
                </tr>
                <tr
                  class="border-l-[rgb(1,_104,_250)] mt-0 md:flex-[0_0_calc(90%-5px)] flex-[0_0_calc(80%-5px)] md:max-w-[calc(90%-5px)] max-w-[calc(80%-5px)] flex flex-col border-l-[4px] border-solid bg-white md:ml-[10%] ml-[20%] mt-4"
                >
                  <td
                    class="border-[rgb(1,_104,_250)] text-[rgb(1,_104,_250)] border-t-[1px] border-r-[1px] border-solid pt-[12px] px-[15px] pb-[2px] w-full uppercase text-[13px] font-[600]"
                  >
                    1:00pm - 6:30pm
                  </td>
                  <td
                    class="border-[rgb(1,_104,_250)] border-b-[1px] border-r-[1px] border-solid px-[15px] pb-[12px]"
                  >
                    <a
                      class="md:text-[18px] block font-[500] text-[16px] mb-[2px] text-[#001737]"
                      >Attend Lea's Wedding</a
                    ><span
                      class="md:text-[13px] text-[12px] block text-[#8392a5] limit-span"
                      >In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                      justo. Nullam dictum felis az pede mollis...</span
                    >
                  </td>
                </tr>
                <tr
                  class="border-l-[rgb(1,_104,_250)] mt-0 md:flex-[0_0_calc(90%-5px)] flex-[0_0_calc(80%-5px)] md:max-w-[calc(90%-5px)] max-w-[calc(80%-5px)] flex flex-col border-l-[4px] border-solid bg-white md:ml-[10%] ml-[20%] mt-4"
                >
                  <td
                    class="border-[rgb(1,_104,_250)] text-[rgb(1,_104,_250)] border-t-[1px] border-r-[1px] border-solid pt-[12px] px-[15px] pb-[2px] w-full uppercase text-[13px] font-[600]"
                  >
                    1:00pm - 6:30pm
                  </td>
                  <td
                    class="border-[rgb(1,_104,_250)] border-b-[1px] border-r-[1px] border-solid px-[15px] pb-[12px]"
                  >
                    <a
                      class="md:text-[18px] block font-[500] text-[16px] mb-[2px] text-[#001737]"
                      >Attend Lea's Wedding</a
                    ><span
                      class="md:text-[13px] text-[12px] block text-[#8392a5] limit-span"
                      >In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                      justo. Nullam dictum felis az pede mollis...</span
                    >
                  </td>
                </tr>
                <tr
                  class="mt-4 md:flex-[0_0_10%] md:max-w-[10%] flex-[0_0_20%] max-w-[20%] flex justify-center border-b-[1px] border-solid"
                  data-date="2024-12-08"
                >
                  <td class="bg-transparent p-0" colspan="3">
                    <a
                      class="block text-[11px] uppercase text-[#8392a5] font-[500] p-[5px] text-center"
                      data-goto='{"date":"2024-12-08","type":"day"}'
                      >Wed
                      <span class="text-[28px] md:text-[32px] block text-[#001737]"
                        >11</span
                      >
                    </a>
                  </td>
                </tr>
                <tr
                  class="border-l-[rgb(1,_104,_250)] mt-0 md:flex-[0_0_calc(90%-5px)] flex-[0_0_calc(80%-5px)] md:max-w-[calc(90%-5px)] max-w-[calc(80%-5px)] flex flex-col border-l-[4px] border-solid bg-white mt-4"
                >
                  <td
                    class="border-[rgb(1,_104,_250)] text-[rgb(1,_104,_250)] border-t-[1px] border-r-[1px] border-solid pt-[12px] px-[15px] pb-[2px] w-full uppercase text-[13px] font-[600]"
                  >
                    9:00am - 5:00pm
                  </td>
                  <td
                    class="border-[rgb(1,_104,_250)] border-b-[1px] border-r-[1px] border-solid px-[15px] pb-[12px]"
                  >
                    <a
                      class="md:text-[18px] block font-[500] text-[16px] mb-[2px] text-[#001737]"
                      >Design Review</a
                    ><span
                      class="md:text-[13px] text-[12px] block text-[#8392a5] limit-span"
                      >In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                      justo. Nullam dictum felis az pede mollis...</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
    `,
    standalone: true,
    imports: [SharedModule]
})

export class CalendarTableEvent { }