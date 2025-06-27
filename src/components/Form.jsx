import logo from "../assets/gong-logo.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthSession";   
import { useState } from "react";
import { encode } from "../utils/encode.js";

export default function LoginForm() {
    const goTo = useNavigate();
    const { setUser } = useAuth();
    const [error, setError] = useState("");

    const submitLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value.trim().toLowerCase();
        const password = event.target.password.value.trim();
        const secret = encode(email, password);// Encode the email and password to create a secret

        try {
          const idRes = await fetch(`https://gongfetest.firebaseio.com/secrets/${secret}.json`); // Fetch user ID based on the encoded secret
          const userId = await idRes.json();

          if (!userId) return setError("Invalid credentials"); // If no user ID is found, show an error

          const userRes = await fetch(`https://gongfetest.firebaseio.com/users.json`); // Fetch all users
          const users = await userRes.json();

          const matchedUser = Object.values(users).find((u) => u.id === userId); // Find the user by ID
          console.log("Matched user:", matchedUser);

          if (!matchedUser) return setError("User data not found");// If no user data is found, show an error

          setUser(matchedUser);
          goTo("/hierarchy"); // Redirect to the hierarchy page after successful login
        } catch (err) { // Handle any errors that occur during the fetch
          console.error("Login failed:", err);
          setError("Something went wrong. Please try again.");
        }
    }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Please, Login
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#9069e7] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#9069e7] sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#8039df] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#9069e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9069e7] cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-300">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
  