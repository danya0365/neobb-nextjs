import { SearchView } from "@/src/presentation/components/search/SearchView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ค้นหา - NeoBB",
  description: "ค้นหากระทู้และโพสต์ใน NeoBB",
};

export default function SearchPage() {
  return <SearchView />;
}
