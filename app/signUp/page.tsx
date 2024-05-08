"use client";
import { Input } from "@nextui-org/input";
import React, { FormEvent, useState } from "react";
import { EyeSlashFilledIcon } from "./../../components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./../../components/EyeFilledIcon";
import { Button } from "@nextui-org/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import Link from "next/link";
interface RegisterType {
  email: string;
  name: string;
  password: string;
  image: string;
  bio: string;
}

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { register, handleSubmit } = useForm<RegisterType>();
  const onSubmit: SubmitHandler<RegisterType> = async (data: RegisterType) => {
    const formBody = {
      email: data.email,
      name: data.name,
      password: data.password,
      profile: {
        bio: data.bio,
        image: data.image,
      },
    };
    console.log(JSON.stringify(formBody));
    try {
      const response = await fetch("https://127.0.0.1:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify(formBody),
      });

      if (response.ok) {
        setIsSignUpSuccess(true);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isSignUpSuccess) {
    return (
      <div className="container flex justify-center">
        <div className="flex flex-col gap-4">
          <p>회원가입 되었습니다 로그인 페이지로 이동합니다.</p>
          <Link href={"/signIn"}>
            <Button variant="flat">로그인 페이지로 이동</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container flex flex-col items-center">
      <h1 className="justify-center text-[36px]">회원가입 하기</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-5 w-full items-center"
      >
        <Input
          {...register("email")}
          isRequired
          type="email"
          label="이메일"
          variant="bordered"
          className="max-w-xl bg-none"
        />
        <Input
          {...register("name")}
          isRequired
          type="name"
          label="이름"
          variant="bordered"
          className="max-w-xl"
        />
        <Input
          {...register("password")}
          label="비밀번호"
          variant="bordered"
          isRequired
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xl"
        />
        <Input
          {...register("image")}
          isRequired
          type="url"
          label="프로필 사진 url"
          variant="bordered"
          className="max-w-xl"
        />
        <Input
          {...register("bio")}
          isRequired
          type="bio"
          label="바이오 링크"
          variant="bordered"
          className="max-w-xl"
        />
        <Button className="max-w-xl" variant="faded" size="lg" type="submit">
          회원가입
        </Button>
      </form>
    </div>
  );
}
