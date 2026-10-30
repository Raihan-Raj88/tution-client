import { Link, useParams } from "react-router-dom";
import { useConfirmEmailQuery } from "../../redux/features/auth/authApi";

const EmailVerification = () => {
  const params = useParams();
  const linkInfo = {
    id: params.id,
    token: params.token,
  };
  console.log(linkInfo);

  const { data } = useConfirmEmailQuery(linkInfo);

  console.log(data);

  return (
    <div className="bg-slate-950 text-white">
      {data ? (
        data.data.isVerified ? (
          <div className="w-full h-screen flex justify-center items-center bg-slate-950 text-white ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-20 mx-auto text-green-600 mb-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>

              <p className="lg:text-5xl text-3xl">Your email has verified</p>
              <div className="mt-5 flex justify-center items-center">
                <Link
                  to={`/`}
                  className="bg-[#00ccb1] hover:bg-[#258376] delay-300 ease-linear transition-all px-5 py-2 rounded-lg text-lg font-bold"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-screen flex justify-center items-center bg-slate-950 text-white ">
            Your email has not verified!
          </div>
        )
      ) : (
        <div className="w-full h-screen flex justify-center items-center bg-slate-950 text-white ">
          Page Not found
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
