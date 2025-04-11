import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "../home/navbar"

export default function TravelItinerary() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Header with logo */}
      <div className="h-15"></div>
      <div className="justify-center p-6">
        <div className="flex ">
          <svg width="129" height="35" viewBox="0 0 129 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M51.516 16.084C51.516 16.78 51.276 17.36 50.796 17.824C50.324 18.28 49.6 18.508 48.624 18.508H47.016V22H45.924V13.636H48.624C49.568 13.636 50.284 13.864 50.772 14.32C51.268 14.776 51.516 15.364 51.516 16.084ZM48.624 17.608C49.232 17.608 49.68 17.476 49.968 17.212C50.256 16.948 50.4 16.572 50.4 16.084C50.4 15.052 49.808 14.536 48.624 14.536H47.016V17.608H48.624ZM55.7412 22.108C55.1252 22.108 54.5652 21.968 54.0612 21.688C53.5652 21.408 53.1732 21.012 52.8852 20.5C52.6052 19.98 52.4652 19.38 52.4652 18.7C52.4652 18.028 52.6092 17.436 52.8972 16.924C53.1932 16.404 53.5932 16.008 54.0972 15.736C54.6012 15.456 55.1652 15.316 55.7892 15.316C56.4132 15.316 56.9772 15.456 57.4812 15.736C57.9852 16.008 58.3812 16.4 58.6692 16.912C58.9652 17.424 59.1132 18.02 59.1132 18.7C59.1132 19.38 58.9612 19.98 58.6572 20.5C58.3612 21.012 57.9572 21.408 57.4452 21.688C56.9332 21.968 56.3652 22.108 55.7412 22.108ZM55.7412 21.148C56.1332 21.148 56.5012 21.056 56.8452 20.872C57.1892 20.688 57.4652 20.412 57.6732 20.044C57.8892 19.676 57.9972 19.228 57.9972 18.7C57.9972 18.172 57.8932 17.724 57.6852 17.356C57.4772 16.988 57.2052 16.716 56.8692 16.54C56.5332 16.356 56.1692 16.264 55.7772 16.264C55.3772 16.264 55.0092 16.356 54.6732 16.54C54.3452 16.716 54.0812 16.988 53.8812 17.356C53.6812 17.724 53.5812 18.172 53.5812 18.7C53.5812 19.236 53.6772 19.688 53.8692 20.056C54.0692 20.424 54.3332 20.7 54.6612 20.884C54.9892 21.06 55.3492 21.148 55.7412 21.148ZM69.309 15.424L67.257 22H66.129L64.545 16.78L62.961 22H61.833L59.769 15.424H60.885L62.397 20.944L64.029 15.424H65.145L66.741 20.956L68.229 15.424H69.309ZM76.3928 18.46C76.3928 18.668 76.3808 18.888 76.3568 19.12H71.1008C71.1408 19.768 71.3608 20.276 71.7608 20.644C72.1688 21.004 72.6608 21.184 73.2368 21.184C73.7088 21.184 74.1008 21.076 74.4128 20.86C74.7328 20.636 74.9568 20.34 75.0848 19.972H76.2608C76.0848 20.604 75.7328 21.12 75.2048 21.52C74.6768 21.912 74.0208 22.108 73.2368 22.108C72.6128 22.108 72.0528 21.968 71.5568 21.688C71.0688 21.408 70.6848 21.012 70.4048 20.5C70.1248 19.98 69.9848 19.38 69.9848 18.7C69.9848 18.02 70.1208 17.424 70.3928 16.912C70.6648 16.4 71.0448 16.008 71.5328 15.736C72.0288 15.456 72.5968 15.316 73.2368 15.316C73.8608 15.316 74.4128 15.452 74.8928 15.724C75.3728 15.996 75.7408 16.372 75.9968 16.852C76.2608 17.324 76.3928 17.86 76.3928 18.46ZM75.2648 18.232C75.2648 17.816 75.1728 17.46 74.9888 17.164C74.8048 16.86 74.5528 16.632 74.2328 16.48C73.9208 16.32 73.5728 16.24 73.1888 16.24C72.6368 16.24 72.1648 16.416 71.7728 16.768C71.3888 17.12 71.1688 17.608 71.1128 18.232H75.2648ZM78.9262 16.492C79.1182 16.116 79.3902 15.824 79.7422 15.616C80.1022 15.408 80.5382 15.304 81.0502 15.304V16.432H80.7622C79.5382 16.432 78.9262 17.096 78.9262 18.424V22H77.8342V15.424H78.9262V16.492ZM88.3107 18.46C88.3107 18.668 88.2987 18.888 88.2747 19.12H83.0187C83.0587 19.768 83.2787 20.276 83.6787 20.644C84.0867 21.004 84.5787 21.184 85.1547 21.184C85.6267 21.184 86.0187 21.076 86.3307 20.86C86.6507 20.636 86.8747 20.34 87.0027 19.972H88.1787C88.0027 20.604 87.6507 21.12 87.1227 21.52C86.5947 21.912 85.9387 22.108 85.1547 22.108C84.5307 22.108 83.9707 21.968 83.4747 21.688C82.9867 21.408 82.6027 21.012 82.3227 20.5C82.0427 19.98 81.9027 19.38 81.9027 18.7C81.9027 18.02 82.0387 17.424 82.3107 16.912C82.5827 16.4 82.9627 16.008 83.4507 15.736C83.9467 15.456 84.5147 15.316 85.1547 15.316C85.7787 15.316 86.3307 15.452 86.8107 15.724C87.2907 15.996 87.6587 16.372 87.9147 16.852C88.1787 17.324 88.3107 17.86 88.3107 18.46ZM87.1827 18.232C87.1827 17.816 87.0907 17.46 86.9067 17.164C86.7227 16.86 86.4707 16.632 86.1507 16.48C85.8387 16.32 85.4907 16.24 85.1067 16.24C84.5547 16.24 84.0827 16.416 83.6907 16.768C83.3067 17.12 83.0867 17.608 83.0307 18.232H87.1827ZM89.3441 18.688C89.3441 18.016 89.4801 17.428 89.7521 16.924C90.0241 16.412 90.3961 16.016 90.8681 15.736C91.3481 15.456 91.8841 15.316 92.4761 15.316C92.9881 15.316 93.4641 15.436 93.9041 15.676C94.3441 15.908 94.6801 16.216 94.9121 16.6V13.12H96.0161V22H94.9121V20.764C94.6961 21.156 94.3761 21.48 93.9521 21.736C93.5281 21.984 93.0321 22.108 92.4641 22.108C91.8801 22.108 91.3481 21.964 90.8681 21.676C90.3961 21.388 90.0241 20.984 89.7521 20.464C89.4801 19.944 89.3441 19.352 89.3441 18.688ZM94.9121 18.7C94.9121 18.204 94.8121 17.772 94.6121 17.404C94.4121 17.036 94.1401 16.756 93.7961 16.564C93.4601 16.364 93.0881 16.264 92.6801 16.264C92.2721 16.264 91.9001 16.36 91.5641 16.552C91.2281 16.744 90.9601 17.024 90.7601 17.392C90.5601 17.76 90.4601 18.192 90.4601 18.688C90.4601 19.192 90.5601 19.632 90.7601 20.008C90.9601 20.376 91.2281 20.66 91.5641 20.86C91.9001 21.052 92.2721 21.148 92.6801 21.148C93.0881 21.148 93.4601 21.052 93.7961 20.86C94.1401 20.66 94.4121 20.376 94.6121 20.008C94.8121 19.632 94.9121 19.196 94.9121 18.7ZM102.153 16.648C102.377 16.256 102.705 15.936 103.137 15.688C103.569 15.44 104.061 15.316 104.613 15.316C105.205 15.316 105.737 15.456 106.209 15.736C106.681 16.016 107.053 16.412 107.325 16.924C107.597 17.428 107.733 18.016 107.733 18.688C107.733 19.352 107.597 19.944 107.325 20.464C107.053 20.984 106.677 21.388 106.197 21.676C105.725 21.964 105.197 22.108 104.613 22.108C104.045 22.108 103.545 21.984 103.113 21.736C102.689 21.488 102.369 21.172 102.153 20.788V22H101.061V13.12H102.153V16.648ZM106.617 18.688C106.617 18.192 106.517 17.76 106.317 17.392C106.117 17.024 105.845 16.744 105.501 16.552C105.165 16.36 104.793 16.264 104.385 16.264C103.985 16.264 103.613 16.364 103.269 16.564C102.933 16.756 102.661 17.04 102.453 17.416C102.253 17.784 102.153 18.212 102.153 18.7C102.153 19.196 102.253 19.632 102.453 20.008C102.661 20.376 102.933 20.66 103.269 20.86C103.613 21.052 103.985 21.148 104.385 21.148C104.793 21.148 105.165 21.052 105.501 20.86C105.845 20.66 106.117 20.376 106.317 20.008C106.517 19.632 106.617 19.192 106.617 18.688ZM114.834 15.424L110.874 25.096H109.746L111.042 21.928L108.39 15.424H109.602L111.666 20.752L113.706 15.424H114.834ZM124.075 20.14H120.427L119.755 22H118.603L121.627 13.684H122.887L125.899 22H124.747L124.075 20.14ZM123.763 19.252L122.251 15.028L120.739 19.252H123.763ZM128.309 13.636V22H127.217V13.636H128.309Z" fill="#333333" />
            <rect width="36" height="35" rx="17.5" fill="#FEC4C4" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5739 10.3292C15.8003 10.0545 15.0978 9.62191 14.5147 9.06124C13.9316 8.50056 13.4817 7.82507 13.1961 7.08125C13.0791 6.775 12.6176 6.775 12.5006 7.08125C12.2171 7.8258 11.7684 8.50205 11.1857 9.06295C10.6029 9.62385 9.90003 10.0559 9.12597 10.3292C8.80747 10.4417 8.80747 10.8854 9.12597 10.9979C9.89954 11.2726 10.6021 11.7052 11.1852 12.2658C11.7683 12.8265 12.2181 13.502 12.5038 14.2458C12.6208 14.5521 13.0823 14.5521 13.1993 14.2458C13.485 13.502 13.9348 12.8265 14.518 12.2658C15.1011 11.7052 15.8036 11.2726 16.5771 10.9979C16.8956 10.8854 16.8956 10.4417 16.5771 10.3292H16.5739ZM18.4535 9.89375C18.239 9.89375 18.0333 9.97568 17.8816 10.1215C17.73 10.2673 17.6448 10.4651 17.6448 10.6714C17.6448 10.8776 17.73 11.0754 17.8816 11.2212C18.0333 11.367 18.239 11.449 18.4535 11.449C21.7641 11.449 24.4421 14.001 24.4421 17.075C24.4421 18.6885 23.569 20.4625 22.2213 22.2333C21.0351 23.7906 19.617 25.1792 18.4643 26.2771C17.3051 25.1792 15.8654 23.776 14.6694 22.2042C13.3326 20.4438 12.467 18.6812 12.467 17.075C12.467 16.8688 12.3818 16.671 12.2301 16.5252C12.0784 16.3793 11.8727 16.2974 11.6583 16.2974C11.4438 16.2974 11.2381 16.3793 11.0864 16.5252C10.9348 16.671 10.8496 16.8688 10.8496 17.075C10.8496 19.1781 11.9589 21.2719 13.3629 23.1208C14.7701 24.9687 16.4742 26.5792 17.6746 27.7115L17.7179 27.7531L17.8912 27.9198C18.041 28.0647 18.2442 28.147 18.4567 28.149C18.6692 28.1509 18.8739 28.0723 19.0266 27.9302L19.1891 27.7781L19.2107 27.7573L19.2681 27.699L19.2714 27.6969C20.4652 26.5615 22.1368 24.975 23.5256 23.1531C24.9405 21.2937 26.0596 19.1865 26.0596 17.075C26.0596 13.1135 22.6276 9.89375 18.4535 9.89375ZM17.3485 15.3562C17.681 15.2235 18.0546 15.2219 18.3884 15.3517C18.7222 15.4815 18.9896 15.7323 19.1327 16.05C19.1994 16.2056 19.2333 16.3724 19.2325 16.5407C19.2316 16.709 19.196 16.8755 19.1276 17.0305C19.0593 17.1854 18.9596 17.3258 18.8344 17.4434C18.7092 17.561 18.5609 17.6536 18.3982 17.7156C18.0656 17.8484 17.6921 17.85 17.3583 17.7202C17.0245 17.5904 16.7571 17.3396 16.614 17.0219C16.5471 16.8661 16.5131 16.6992 16.514 16.5307C16.5149 16.3622 16.5506 16.1956 16.619 16.0405C16.6874 15.8854 16.7873 15.745 16.9127 15.6273C17.0381 15.5097 17.1866 15.4172 17.3496 15.3552M16.7364 13.9083C18.2498 13.3146 19.9972 13.9885 20.6321 15.4448C20.7818 15.7908 20.8587 16.162 20.8582 16.5368C20.8577 16.9116 20.7799 17.2826 20.6293 17.6283C20.4786 17.9739 20.2582 18.2874 19.9806 18.5506C19.7031 18.8138 19.374 19.0214 19.0125 19.1615C17.4991 19.7552 15.7516 19.0802 15.1168 17.624C14.9668 17.278 14.8897 16.9069 14.89 16.5321C14.8904 16.1573 14.9682 15.7863 15.1188 15.4406C15.2695 15.0949 15.4901 14.7815 15.7678 14.5185C16.0454 14.2554 16.3747 14.048 16.7364 13.9083ZM9.01764 12.4687C9.22154 13.0003 9.54293 13.4829 9.95963 13.8834C10.3763 14.2839 10.8784 14.5927 11.4313 14.7885H11.4335C11.661 14.8687 11.661 15.1865 11.4335 15.2667C10.881 15.4631 10.3792 15.7721 9.96257 16.1725C9.54595 16.573 9.22434 17.0553 9.01981 17.5865C8.93639 17.8052 8.60814 17.8052 8.52364 17.5865C8.31922 17.0554 7.99778 16.5731 7.58135 16.1727C7.16492 15.7723 6.66336 15.4632 6.11105 15.2667C5.88355 15.1865 5.88355 14.8687 6.11105 14.7885C6.66404 14.5936 7.16617 14.285 7.58247 13.8844C7.99876 13.4837 8.3192 13.0006 8.52147 12.4687C8.60489 12.25 8.93422 12.25 9.01764 12.4687Z" fill="#EE6E6E" />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column - Itinerary content */}
          <div className="lg:col-span-2">
            {/* Destination header */}
            <div className="mb-6">
              <h1 className="mb-1 text-2xl font-semibold">PONDICHERRY</h1>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Section 1: Architectural Wonders */}
            <div className="mb-10">
              <h2 className="mb-2 text-2xl font-semibold">Architectural Wonders: Serene Churches by the Sea</h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-700">
                Explore the spiritual beauty of two remarkable churches nestled near the coast, where history and
                architecture come together in a tapestry of color and grace. Both sites offer a peaceful retreat,
                inviting visitors of all ages to bask in their serene atmospheres and stunning designs.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {/* Church 1 */}
                <Card className="overflow-hidden border-none shadow-none">
                  <div className="relative">
                    <div className="relative h-32 w-full">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* <div className="absolute right-2 top-2 rounded-full bg-white p-1">
                      <Check className="h-4 w-4 text-green-600" />
                    </div> */}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium">Eglise de Notre Dame des Anges</h3>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="text-xs text-green-600">●●●●</div>
                      <div className="text-xs text-gray-300">●</div>
                      <span className="text-xs text-gray-500">(462)</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">Churches & Cathedrals</p>
                  </CardContent>
                </Card>

                {/* Church 2 */}
                <Card className="overflow-hidden border-none shadow-none">
                  <div className="relative">
                    <div className="relative h-32 w-full">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Immaculate Conception"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* <div className="absolute right-2 top-2 rounded-full bg-white p-1">
                      <Check className="h-4 w-4 text-green-600" />
                    </div> */}
                  </div>
                  <CardContent className="p-3 ">
                    <h3 className="text-sm font-medium">Immaculate Conception</h3>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="text-xs text-green-600">●●●●</div>
                      <div className="text-xs text-gray-300">●</div>
                      <span className="text-xs text-gray-500">(213)</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">Churches & Cathedrals</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 2: Cultural Gems */}
            <div className="mb-10">
              <h2 className="mb-2 text-2xl font-bold">Cultural Gems to Explore</h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-700">
                Discover a collection of stunning architectural wonders and sacred sites that showcase the rich history
                and vibrant culture of the region. These must-visit landmarks offer an enriching experience, perfect for
                all ages and a variety of interests.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {/* Cultural Place 1 */}
                <Card className="overflow-hidden border-none shadow-none">
                  <div className="relative">
                    <div className="relative h-32 w-full">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Arulmigu Manakula"
                        fill
                        className="object-cover"
                      />
                    </div>

                  </div>
                  <CardContent className="p-3 ">
                    <h3 className="text-sm font-medium">Arulmigu Manakula</h3>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="text-xs text-green-600">●●●●</div>
                      <div className="text-xs text-gray-300">●</div>
                      <span className="text-xs text-gray-500">(1,599)</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">Religious Sites</p>
                  </CardContent>
                </Card>

                {/* Cultural Place 2 */}
                <Card className="overflow-hidden border-none shadow-none">
                  <div className="relative">
                    <div className="relative h-32 w-full">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="The Basilica of the Sacred"
                        fill
                        className="object-cover"
                      />
                    </div>
                
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium">The Basilica of the Sacred</h3>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="text-xs text-green-600">●●●●</div>
                      <div className="text-xs text-gray-300">●</div>
                      <span className="text-xs text-gray-500">(969)</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">Churches & Cathedrals</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: Tranquil Shores */}
            <div className="mb-10">
              <h2 className="mb-2 text-2xl font-bold">Tranquil Shores: A Coastal Retreat in Pondicherry</h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-700">
                Discover the tranquil beauty and vibrant ambiance of Pondicherry&apos;s stunning beaches. From the pristine
                sands of Paradise Beach, perfect for relaxation and family picnics, to the captivating atmosphere of
                Rock Beach with its scenic promenade and local eateries, these coastal gems offer an invitation to
                unwind amidst nature&apos;s embrace.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {/* Beach 1 */}
                <Card className="overflow-hidden border-none shadow-none">
                  <div className="relative">
                    <div className="relative h-32 w-full">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Paradise Beach"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="absolute bottom-2 left-2 rounded-md bg-green-600 px-2 py-0.5 text-xs text-white">
                      2024
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium">Paradise Beach</h3>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="text-xs text-green-600">●●●●</div>
                      <div className="text-xs text-gray-300">●</div>
                      <span className="text-xs text-gray-500">(2,379)</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">Beaches</p>
                  </CardContent>
                </Card>

                {/* Beach 2 */}
                <Card className="overflow-hidden border-none shadow-none">
                  <div className="relative">
                    <div className="relative h-32 w-full">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Rock Beach"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="absolute bottom-2 left-2 rounded-md bg-green-600 px-2 py-0.5 text-xs text-white">
                      2024
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium">Rock Beach</h3>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="text-xs text-green-600">●●●●</div>
                      <div className="text-xs text-gray-300">●</div>
                      <span className="text-xs text-gray-500">(554)</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">Beaches</p>
                    <p className="mt-1 text-xs text-gray-500">Duration: 2-3 hours</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* <hr className="my-6 border-gray-200" /> */}
          </div>

          {/* Right column - Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg border">
              <div className="relative h-[600px] w-full overflow-hidden rounded-lg bg-gray-200">
                <Image src="/placeholder.svg?height=500&width=400" alt="Map" fill className="object-cover" priority />
              </div>
              {/* <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Select all</span>
                  <div className="relative h-5 w-10 rounded-full bg-gray-200">
                    <div className="absolute left-5 top-0.5 h-4 w-4 rounded-full bg-black transition-all"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">(10/13 selected)</div>
                <button className="rounded-full bg-black px-3 py-1 text-sm text-white">Next</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
