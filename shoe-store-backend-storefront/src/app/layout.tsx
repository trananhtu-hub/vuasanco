import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"

// @ts-ignore
import "../styles/globals.css"

import { Inter, Oswald } from "next/font/google"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
})

const oswald = Oswald({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-oswald",
  weight: ["400", "500", "700"],
})
     
export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Vuasanco",
    template: "%s | Vuasanco",
  },
  description: "Hệ thống phân phối giày bóng đá chính hãng hàng đầu.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-mode="light" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans bg-[#F9F9F9] text-editorial-dark noise-bg antialiased selection:bg-editorial-neonVolt selection:text-editorial-dark">
        <div id="custom-cursor" className="pointer-events-none fixed top-0 left-0 z-[9999] h-4 w-4 rounded-full bg-editorial-neonVolt opacity-0 transition-opacity duration-300 mix-blend-difference hidden md:block"></div>
        <main className="relative flex min-h-screen flex-col overflow-x-hidden">
          {props.children}
        </main>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="mXQaVd5C2d-aLeSo0KQRr";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`
          }}
        />
      </body>
    </html>
  )
}