import { SubmitHandler, useForm } from "react-hook-form";
import { useResendVerificationEmailMutation } from "../../redux/features/auth/authApi";
// import { isFetchBaseQueryError } from "../../utils/modalDataError";
type TVerify = {
  email: string;
};
const EmailVerificationModal = () => {
  // const {} = useResendVerificationEmailQuery()
  const [verifyEmail, { error, isSuccess }] =
    useResendVerificationEmailMutation();
  const { register, handleSubmit } = useForm<TVerify>();
  const onSubmit: SubmitHandler<TVerify> = async (data) => {
    await verifyEmail(data);
  };

  return (
    <dialog
      id="verifyEmailModal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-white">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg capitalize">Verify your email</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mt-4 block">Email</label>
          <input
            type="email"
            placeholder="Ex: example@gmail.com"
            className="block border-slate-950 border-2 rounded-md w-full pl-3 py-2 mt-2"
            {...register("email")}
          />
          <div className="text-red-600 text-center text-base italic mt-2">
            {error
              ? "Unauthorized email or token error! please check your email and try again"
              : ""}
          </div>
          <div className="text-green-500 text-center text-base italic mt-2">
            {isSuccess &&
              "Successfully send a verification email on your Email. Verity that"}
          </div>
          <div className="flex justify-center items-center mt-4">
            <input
              type="submit"
              value="verify"
              className="bg-slate-950 hover:bg-slate-800 text-white ease-in delay-200 transition-all px-5 py-2 rounded-md text-base font-bold uppercase"
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EmailVerificationModal;
