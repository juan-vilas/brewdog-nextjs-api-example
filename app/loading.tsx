import Link from "next/link";
import SearchBy from "./components/SearchBy";

export default function Loading() {
  return (
    <main className="px-3 py-6">
      <div className="w-max mx-auto">
        <Link href="/" className="w-max">
          <img
            src="/brewdog-logo.png"
            alt="brewdog-logo"
            className="mx-auto p-6 mb-10 max-w-[175px] w-full"
          />
        </Link>
      </div>
      <SearchBy />
      <p className="w-full text-center">Loading...</p>
    </main>
  );
}
