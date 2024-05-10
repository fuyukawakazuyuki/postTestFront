"use client";
import { use, useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  boardId: number;
}

export default function Post({
  params,
}: {
  params: { boardId: number; postId: number };
}) {
  console.log(params.postId);
  const [post, setPost] = useState<Post>();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    image: "",
  });
  const deletePost = async () => {
    console.log("zzz");
    try {
      const response = await fetch(
        `https://127.0.0.1:8080/posts/${params.postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      ).then((res) => res.json());
      if (response.statusCode !== 401) {
        location.href=`https://127.0.0.1:3000/board/${params.boardId}`
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPost = async () => {
      console.log("zzz");
      try {
        const response = await fetch(
          `https://127.0.0.1:8080/posts/${params.postId}`,
          {
            method: "GET",
            credentials: "include",
          }
        ).then((res) => res.json());
        if (response.statusCode !== 401) {
          setPost(response);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
    const authCheck = async () => {
      try {
        const response = await fetch("https://127.0.0.1:8080/auth/user", {
          method: "GET",
          credentials: "include",
        }).then((res) => res.json());
        if (response.statusCode !== 401) {
          setUser(response);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    authCheck();
  }, []);
  console.log(user);
  return (
    <div className="container">
      <div className="w-100 flex justify-between">
        <h1 className="text-[50px]">{post?.title}</h1>
        {post?.authorId === Number(user?.id) ? (        <Button color="danger" variant="bordered" onClick={()=>{deletePost()}}>삭제</Button>
) : "" }

      </div>
      <hr></hr>
      <div className="flex mt-5 flex-wrap gap-5 text-[26px]">
        {post?.content}

      </div>
    </div>
  );
}
