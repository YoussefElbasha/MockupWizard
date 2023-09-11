import { redirect } from 'next/navigation'

const ForgotPasswordSuccess = ({
  searchParams,
}: {
  searchParams: { email: string }
}) => {
  if (!searchParams.email) return redirect('/forgot-password')

  return (
    <div className="flex flex-col w-full max-w-lg gap-10 py-10 mx-auto">
      <h1 className="text-xl font-semibold">Forgot Password</h1>
      <p className="text-white/80">
        An email has been sent to{' '}
        <span className="font-medium text-white">{searchParams.email}</span>{' '}
        with a link to reset your password.
      </p>
    </div>
  )
}

export default ForgotPasswordSuccess
