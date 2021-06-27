import Link from "next/link";

export default function Links() {
  return (
    <div className="flex text-center mt-3">
      <Link href="/items/">
        <a className="p-4 bg-blue-300 hover:bg-blue-500 w-24">Home</a>
      </Link>
      <Link href="/gacha/">
        <a className="p-4 bg-blue-300 hover:bg-blue-500 w-24">ガチャ</a>
      </Link>
      <Link href="/items/show">
        <a className="p-4 bg-blue-300 hover:bg-blue-500 w-24">獲得詳細</a>
      </Link>
    </div>
  );
}
