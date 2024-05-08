'use client'
import { Button } from "@nextui-org/button";
import { Checkbox, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { Input } from '@nextui-org/input';
import { useEffect, useState } from "react";

interface post{
  id:Number,      
  createdAt:String, 
  updatedAt:String ,
  title:String,
  content:String,
  published:Boolean,  
  authorId:Number,
  boardId:Number,
}

interface boardAndPost{
  id: Number,
  name:string,
  posts:post[]
}
async function getBoardAndPost(id: Number):Promise<boardAndPost>{
  const res = await fetch(`https://127.0.0.1:8080/boards/${id}`,{
    headers: {
	    Accept: "application / json",
	  },
    method:"GET"
  })
  return res.json();
}
 
export default function Board({ params }: { params: { boardId: number } }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [boardAndPost,setBoardAndPost] = useState<boardAndPost>();
  useEffect(()=>{
    async function fetchData() {

    const res = await getBoardAndPost(params.boardId);
    setBoardAndPost(res);
  }
  fetchData()
  },[params.boardId])
  console.log(boardAndPost);
  return (
    <div className="container">
      <div className="w-100 flex justify-between">
        <h2></h2>
        <>
          <Button onPress={onOpen} color="primary">
            글쓰기
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Log in
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                     
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                    />
                    <Input
                 
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        classNames={{
                          label: "text-small",
                        }}
                      >
                        Remember me
                      </Checkbox>
                      <Link color="primary" href="#">
                        Forgot password?
                      </Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Sign in
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
    </div>
  );
}
