import { BookmarksView } from "@/src/presentation/components/bookmarks/BookmarksView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "บุ๊คมาร์ค - NeoBB",
  description: "กระทู้ที่บันทึกไว้",
};

export default function BookmarksPage() {
  return <BookmarksView />;
}
