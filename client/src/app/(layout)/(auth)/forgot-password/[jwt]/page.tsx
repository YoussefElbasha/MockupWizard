import { redirect } from "next/navigation";
import api from "../../../../../../util/Axios";
import Password from "./password";

const verifyJwt = async (jwt: string) => {
  try {
    const { data } = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password/verify`,
      {
        jwt,
      }
    );

    return data;
  } catch (error: any) {
    return redirect("/forgot-password");
  }
};

const ForgotPassword = async ({ params }: { params: { jwt: string } }) => {
  const { jwt } = params;

  const user = await verifyJwt(jwt);

  return (
    <div className="flex flex-col w-full max-w-lg gap-10 py-10 mx-auto">
      <h1 className="text-xl font-semibold">
        Reset Password for <span className="text-secondary">{user?.email}</span>
      </h1>
      <Password jwt={jwt} />
    </div>
  );
};

export default ForgotPassword;
