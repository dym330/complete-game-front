import { useRouter } from 'next/router'
import { useState } from "react";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/login`, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          throw "authentication failed";
        })
        .then((data) => {
          cookie.set("access_token", data.token, { path: "/" });
          console.log(data.token);
        });
      router.push('/main-page');
    } catch (e) {
      alert(e);
    }
  };

  const check = () => {
    console.log(cookie.get("access_token"));
  }
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <div className="bg-white text-center shadow-xl p-8 w-80 rounded">
        <h2 className="text-xl font-bold ">ログインページ</h2>
        <form className="mt-8 space-y-6" onSubmit={login}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              ログイン
            </button>
          </div>
        </form>
      </div>
      <button className="bg-gray-400 text-white rounded p-2 shadow hover:bg-red-400" onClick={check}>中身確認</button>
    </div>
  );
}
