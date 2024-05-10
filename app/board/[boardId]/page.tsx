"use client";
import { Button } from "@nextui-org/button";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { Input, Textarea } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface post {
  id: Number;
  createdAt: String;
  updatedAt: String;
  title: String;
  content: String;
  published: Boolean;
  authorId: Number;
  boardId: Number;
}

interface boardAndPost {
  id: Number;
  name: string;
  posts: post[];
}

interface PostType {
  title: string;
  content: string;
}

export default function Board({ params }: { params: { boardId: number } }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [render, setRender] = useState(false);
  console.log(render);
  const [boardAndPost, setBoardAndPost] = useState<boardAndPost>();
  const { register, handleSubmit } = useForm<PostType>();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    image: "",
  });
  
  useEffect(() => {
    const getBoardAndPost = async () => {
      try {
        const response = await fetch(
          `https://127.0.0.1:8080/boards/${params.boardId}`,
          {
            method: "GET",
            credentials: "include",
          }
        ).then((res) => res.json());
        if (response.statusCode !== 401) {
          setBoardAndPost(response);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBoardAndPost();
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
  }, [params.boardId,render]);

  const onSubmit: SubmitHandler<PostType> = async (data: PostType) => {
    const formBody = {
      title: data.title,
      content: data.content,
      authorId: user.id,
      boardId: Number(params.boardId),
    };
    console.log(JSON.stringify(formBody));
    try {
      const response = await fetch("https://127.0.0.1:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify(formBody),
      });

      if (response.ok) {
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="w-100 flex justify-between">
        <h1 className="text-[50px]">{boardAndPost?.name}</h1>

        <>
          <Button onPress={onOpen} color="primary">
            글쓰기
          </Button>
          <Modal
            size="4xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            className="w-full"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    글 쓰기
                  </ModalHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                      <Input
                        isRequired
                        autoFocus
                        label="제목"
                        placeholder="글 제목을 입력해주세요"
                        variant="bordered"
                        {...register("title")}
                      />

                      <Textarea
                        isRequired
                        {...register("content")}
                        label="글 내용"
                        placeholder="글 내용을 입력해주세요"
                        variant="bordered"
                        className="mt-4"
                        classNames={{
                          input: "resize-y min-h-[300px]",
                        }}
                      />
                      <div className="flex py-2 px-1 justify-between"></div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        닫기
                      </Button>
                      <Button color="primary" onPress={onClose} onClick={()=>{
                        setRender(true);

                        }} type="submit">
                        글 작성
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
      <div className="flex mt-5 flex-wrap gap-5">
        {boardAndPost?.posts.map((post) => (
          <Link
          href={`/board/${params.boardId}/${post.id}`}
          >
            <Card className="py-4 post_event" key={post.id}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-large uppercase font-bold">{post.title}</p>
                <small className="text-default-500">{post.createdAt.split('T')[0]}</small>
                <p className="font-bold text-tiny mt-3">{post.content.substr(0,50)}...</p>
              </CardHeader>
              <CardBody className="overflow-visible py-2"></CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
