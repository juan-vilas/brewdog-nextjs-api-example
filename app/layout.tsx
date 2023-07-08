import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brewdog Brewery",
  description: "Browse our range of BrewDog beers, ciders, seltzers & merch.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="lofi">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        />
      </Head>
      <body className={inter.className}>
        <NextTopLoader />
        {children}

        {process.env.NODE_ENV == "development" ? (
          <div className="fixed top-0 left-0 z-50 flex w-[30px] items-center justify-center bg-gray-200 py-[2.5px] text-[12px] uppercase text-black sm:bg-red-200 md:bg-yellow-200 lg:bg-green-200 xl:bg-blue-200 2xl:bg-pink-200">
            <span className="block sm:hidden">all</span>
            <span className="hidden sm:block md:hidden">sm</span>
            <span className="hidden md:block lg:hidden">md</span>
            <span className="hidden lg:block xl:hidden">lg</span>
            <span className="hidden xl:block 2xl:hidden">xl</span>
            <span className="hidden 2xl:block">2xl</span>
          </div>
        ) : null}
      </body>
    </html>
  );
}
