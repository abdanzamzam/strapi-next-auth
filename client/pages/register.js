import { useState } from "react";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  if (cookies.token) {
    return {
      redirect: {
        destination: "/dashboard"
      }
    };
  }

  return {
    props: {}
  };
}

export default function Register() {
  const [field, setField] = useState({});
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messages, setMessages] = useState("");

  function setValue(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setField({
      ...field,
      [name]: value
    });
  }

  async function doRegister(e) {
    e.preventDefault();
    setProgress(true);

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(field)
      }
    );

    const res = await req.json();

    if (res.jwt) {
      setSuccess(true);
      e.target.reset();
      setField({});

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } else {
      setMessages(res.error.message);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setMessages("");
      }, 3000);
    }

    setProgress(false);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Register</h1>
          {success && (
            <>
              {messages ? (
                <div className="bg-red-500 shadow text-white rounded mb-4 px-4 py-3">
                  {messages}
                </div>
              ) : (
                <div className="bg-green-500 shadow text-white rounded mb-4 px-4 py-3">
                  Congratulations! Your account has been registered.
                </div>
              )}
            </>
          )}
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={doRegister} className="px-5 py-7 relative">
              {progress && (
                <div className="absolute inset-0 z-10 bg-white/50" />
              )}
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Username
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                // value={field.username}
                name="username"
                onChange={setValue}
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                // value={field.email}
                name="email"
                onChange={setValue}
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                // value={field.password}
                name="password"
                onChange={setValue}
              />
              <button
                disabled={progress}
                type="submit"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
