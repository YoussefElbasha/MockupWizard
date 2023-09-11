import React from 'react'
import Input from './Input'
import Button from './Button'
import OauthComponent from './OauthComponent'

import Switch from 'react-switch'
import Link from 'next/link'

interface formProps {
  label: string
  signup?: boolean
  onSubmit: any
  register: any
  errors: any
  toggleHidePassword: any
  passwordType: string
  isMutating: boolean
  withOTP: boolean
  setWithOTP: any
}

const Form = (props: formProps) => {
  return (
    <div className="flex flex-col items-center gap-4 pt-12">
      <form onSubmit={props.onSubmit}>
        <div className="flex flex-col gap-3 px-24 font-bold text-white">
          <div className="px-8 py-2">
            <h1 className="mx-8 text-lg text-center">{props.label}</h1>
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

              <div className="flex gap-2 text-xs items-center">
                <Switch
                  onChange={() => {
                    props.setWithOTP(!props.withOTP)
                  }}
                  checked={props.withOTP}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor="#4461F2"
                />
                <Button label="Sign up" isMutating={props.isMutating} />
              </div>
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
              {!props.withOTP && (
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
              )}
              <div className="flex gap-2 text-xs items-center">
                <Switch
                  onChange={() => {
                    props.setWithOTP(!props.withOTP)
                  }}
                  checked={props.withOTP}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor="#4461F2"
                />
                <p>Sign in with OTP</p>
              </div>

              <Button label="Sign in" isMutating={props.isMutating} />
            </>
          )}
          <OauthComponent />
        </div>
      </form>
      <Link
        href="/forgot-password"
        className="text-xs font-medium transition-colors duration-200 text-white/40 hover:text-white/100"
      >
        Forgot password?
      </Link>
    </div>
  )
}

export default Form
