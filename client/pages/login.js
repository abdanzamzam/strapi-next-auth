import Link from "next/link";
import { useState } from "react";
import nookies from "nookies";
import Router from "next/router";

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

export default function Login() {
  const [field, setField] = useState({});
  const [progress, setProgress] = useState(false);

  function setValue(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setField({
      ...field,
      [name]: value
    });
  }

  async function doLogin(e) {
    e.preventDefault();
    setProgress(true);

    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(field)
    });

    const res = await req.json();

    if (res.jwt) {
      nookies.set(null, "token", res.jwt);
      nookies.set(null, "status_login", "success");

      Router.replace("/dashboard");
    }

    setProgress(false);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={doLogin} className="px-5 py-7 relative">
              {progress && (
                <div className="absolute inset-0 z-10 bg-white/50" />
              )}
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                name="identifier"
                onChange={setValue}
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
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
            <div className="p-5">
              <a
                type="submit"
                className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
              >
                Login with Github
              </a>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <Link href="/register">
                  <p className="cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:text-blue-600 mx-5 px-5 py-4">
                    Register
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
