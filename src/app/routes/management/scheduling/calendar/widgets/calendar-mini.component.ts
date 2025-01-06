import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";

@Component({
    selector: 'calendar-mini',
    template: `
    <div class="py-[20px] px-[12px] min-h-[273px]">
        <div id="calendarInline" class="hasDatepicker">
          <div
            class="block border-0 p-0 bg-white my-[1px] w-auto rounded-4"
          >
            <div
              class="px-[10px] mb-[10px] flex justify-end items-center relative font-[500] text-[12px] uppercase border-0 bg-transparent rounded-t"
            >
              <div class="text-[15px] font-[600] mr-auto text-[#001737]">
                <span class="ui-datepicker-month">December</span>&nbsp;<span
                  class="text-[#8392a5] ml-[2px]"
                  >2024</span
                >
              </div>
              <a
                class="relative block top-0 w-[10px] text-center text-[#8392a5]"
                data-handler="prev"
                data-event="click"
                title="Prev"
              >
                <span nz-icon nzType="left" nzTheme="outline"></span>
              </a>
              <a
                class="relative block top-0 w-[10px] text-center text-[#8392a5] ml-[10px]"
                data-handler="next"
                data-event="click"
                title="Next"
              >
                <span nz-icon nzType="right" nzTheme="outline"></span>
              </a>
            </div>
            <table
              class="w-full m-0 bg-transparent rounded-b caption-bottom border-collapse"
            >
              <thead>
                <tr>
                  <th scope="col" class="ui-datepicker-week-end">
                    <span title="Sunday">Su</span>
                  </th>
                  <th scope="col"><span title="Monday">Mo</span></th>
                  <th scope="col"><span title="Tuesday">Tu</span></th>
                  <th scope="col"><span title="Wednesday">We</span></th>
                  <th scope="col"><span title="Thursday">Th</span></th>
                  <th scope="col"><span title="Friday">Fr</span></th>
                  <th scope="col" class="ui-datepicker-week-end">
                    <span title="Saturday">Sa</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    class="border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >1</a
                    >
                  </td>
                  <td
                    class="border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >2</a
                    >
                  </td>
                  <td
                    class="border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >3</a
                    >
                  </td>
                  <td
                    class="border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >4</a
                    >
                  </td>
                  <td
                    class="border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >5</a
                    >
                  </td>
                  <td
                    class="border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >6</a
                    >
                  </td>
                  <td
                    class="ui-datepicker-week-end border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >7</a
                    >
                  </td>
                </tr>
                <tr>
                  <td
                    class="ui-datepicker-week-end border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >8</a
                    >
                  </td>
                  <td
                    class="border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >9</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >10</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >11</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >12</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >13</a
                    >
                  </td>
                  <td
                    class="ui-datepicker-week-end"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >14</a
                    >
                  </td>
                </tr>
                <tr>
                  <td
                    class="ui-datepicker-week-end"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >15</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >16</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >17</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >18</a
                    >
                  </td>
                  <td
                    class="ui-datepicker-days-cell-over ui-datepicker-current-day ui-datepicker-today"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full ui-state-highlight ui-state-active ui-state-hover"
                      href="javascript:void(0)"
                      >19</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >20</a
                    >
                  </td>
                  <td
                    class="ui-datepicker-week-end"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >21</a
                    >
                  </td>
                </tr>
                <tr>
                  <td
                    class="ui-datepicker-week-end"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >22</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >23</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >24</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >25</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >26</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >27</a
                    >
                  </td>
                  <td
                    class="ui-datepicker-week-end"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >28</a
                    >
                  </td>
                </tr>
                <tr>
                  <td
                    class="ui-datepicker-week-end"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >29</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >30</a
                    >
                  </td>
                  <td
                    class=" "
                    data-handler="selectDay"
                    data-event="click"
                    data-month="11"
                    data-year="2024"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full"
                      href="javascript:void(0)"
                      >31</a
                    >
                  </td>
                  <td
                    class="ui-datepicker-other-month border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="0"
                    data-year="2025"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full ui-priority-secondary"
                      href="javascript:void(0)"
                      >1</a
                    >
                  </td>
                  <td
                    class="ui-datepicker-other-month border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="0"
                    data-year="2025"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full ui-priority-secondary"
                      href="javascript:void(0)"
                      >2</a
                    >
                  </td>
                  <td
                    class="ui-datepicker-other-month border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="0"
                    data-year="2025"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full ui-priority-secondary"
                      href="javascript:void(0)"
                      >3</a
                    >
                  </td>
                  <td
                    class="ui-datepicker-week-end ui-datepicker-other-month border-[1px] border-solid border-white p-0 bg-white text-right"
                    data-handler="selectDay"
                    data-event="click"
                    data-month="0"
                    data-year="2025"
                  >
                    <a
                      class="text-center text-[12px] w-[32px] h-[32px] p-0 flex items-center justify-center m-auto rounded-full ui-priority-secondary"
                      href="javascript:void(0)"
                      >4</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,
    standalone: true,
    imports: [SharedModule]
})

export class CalendarMini { }