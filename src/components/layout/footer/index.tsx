import { HugeiconsFacebook } from "../../../../public/svg/HugeiconsFacebook01"
import HugeiconsInstagram from "../../../../public/svg/HugeiconsInstagram"
import HugeiconsTiktok from "../../../../public/svg/HugeiconsTiktok"
import HugeiconsYoutube from "../../../../public/svg/HugeiconsYoutube"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <hr className="mx-auto my-2 w-[90%] border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-2 " />
      <div className=" max-w-screen-2xl py-2 md:mx-4 md:flex md:justify-between md:px-4 lg:mx-16 lg:px-2 lg:py-4">
        {/* 左盒子 */}
        <div className="flex-col md:flex lg:gap-12 ">
          {/* site name */}
          <div>
            <a href="#" className="flex items-center">
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Site name
              </span>
            </a>
          </div>

          <div className="flex gap-4 sm:mt-0 sm:justify-center">
            <HugeiconsInstagram className="size-5" />
            <HugeiconsYoutube className="size-5" />
            <HugeiconsFacebook className="size-5" />
            <HugeiconsTiktok className="size-5" />
          </div>
        </div>

        {/* 右盒子 */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="grid grid-cols-3 sm:grid-cols-3 sm:gap-4 md:gap-8 lg:gap-24">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white">
                Topic
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Page
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Page
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Page
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white">
                Topic
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline "
                  >
                    Page
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline "
                  >
                    Page
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Page
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white">
                Topic
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Page
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Page
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Page
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
