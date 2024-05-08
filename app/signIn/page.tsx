"use client";
import { Input } from "@nextui-org/input";
import React, { FormEvent, useState } from "react";
import { EyeSlashFilledIcon } from "./../../components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./../../components/EyeFilledIcon";
import { Button } from "@nextui-org/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import Link from "next/link";
interface SignInType {
  email: string;
  password: string;
}

export default function signIn() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignInSuccess, setIsSignInSuccess] = useState(false);
  const [isSignInfaild, setIsSignInfaild] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { register, handleSubmit } = useForm<SignInType>();
  const saveAccessToken = () => {};

  const onSubmit: SubmitHandler<SignInType> = async (data: SignInType) => {
    const formBody = {
      email: data.email,
      password: data.password,
    };
   
    try {
      const response = await fetch("https://127.0.0.1:8080/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify(formBody),
      });

      if (response.ok) {
        response.json().then((res) => {
        });

        setIsSignInSuccess(true);
        setIsSignInfaild(false);
      } else {
        setIsSignInfaild(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isSignInSuccess) {
    return (
      <div className="container flex justify-center">
        <div className="flex flex-col gap-4">
          <p>로그인 되었습니다 메인페이지로 이동합니다.</p>
          <Link href={"/"}>
            <Button variant="flat">메인페이지로 이동</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container flex flex-col items-center">
      <h1 className="justify-center text-[36px]">로그인 하기</h1>

      {isSignInfaild ? (
        <Button color="danger" variant="bordered">
          이메일이나 비밀번호가 일치하지 않습니다 다시 시도해주세요!
        </Button>
      ) : (
        ""
      )}
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

        <Button className="max-w-xl" variant="faded" size="lg" type="submit">
          로그인
        </Button>
      </form>
    </div>
  );
}
