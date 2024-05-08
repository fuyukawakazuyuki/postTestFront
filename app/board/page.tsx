import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Key } from "react";

async function getData(url: string) {
  const res = await fetch(url);
  return await res.json();
}
interface boardData{
  name:String,
  id:Key,
}

export default async function BoardPage() {
  let data = await getData('https://127.0.0.1:8080/boards');
  return (
    <div className="container ">
      <h1 className="text-[36px]">게시판</h1>
      <div className="mt-5 flex flex-wrap gap-5 w-100">
      {data.map((item:boardData) => (
        <div key={item.id}>
          <Link
          href={`/board/${item.id}`}
          >
            <Button variant="faded">{item.name}</Button>
          </Link>
        </div>
      ))}
      </div>
    </div>
  );
}
