import React from "react";
import Input from "./Input";
import Button from "./Button";
import OauthComponent from "./OauthComponent";

interface formProps {
  label: string;
  signup?: boolean;
  onSubmit: any;
  register: any;
  errors: any;
  toggleHidePassword: any;
  passwordType: string;
  isMutating: boolean;
}

const Form = (props: formProps) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="flex flex-col gap-3 text-white py-10 px-24 font-bold">
        <div className="py-2 px-8">
          <h1 className="text-center text-lg mx-8">{props.label}</h1>
        </div>
        {props.signup ? (
          <>
            <Input
              label="Username"
              placeholder="Enter a username"
              register={props.register}
              registerName="username"
              errors={props.errors}
              onClick={() => {}}
            />
            <Input
              label="Email"
              placeholder="Enter email"
              register={props.register}
              registerName="email"
              errors={props.errors}
              onClick={() => {}}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              register={props.register}
              registerName="password"
              errors={props.errors}
              onClick={props.toggleHidePassword}
              passwordType={props.passwordType}
              eyeIcon={true}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm password"
              register={props.register}
              registerName="confirmPassword"
              errors={props.errors}
              onClick={props.toggleHidePassword}
              passwordType={props.passwordType}
              eyeIcon={true}
            />
            <Button label="Sign up" isMutating={props.isMutating} />
          </>
        ) : (
          <>
            <Input
              label="Email"
              placeholder="Enter email"
              register={props.register}
              registerName="email"
              errors={props.errors}
              onClick={() => {}}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              register={props.register}
              registerName="password"
              errors={props.errors}
              onClick={props.toggleHidePassword}
              passwordType={props.passwordType}
              eyeIcon={true}
            />
            <Button label="Sign in" isMutating={props.isMutating} />
          </>
        )}

        <OauthComponent />
      </div>
    </form>
  );
};

export default Form;
