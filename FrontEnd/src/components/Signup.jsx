import { useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isErrorEmail, setIsErrorEmail] = useState('')
    const [isErrorPassword, setIsErrorPassword] = useState('')

    const handleSignup = async (e)=> {
        e.preventDefault();
        try {
            let user = await fetch('http://localhost:5000/signup', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            })
            let data = await user.json();
            if(!data.user) {
              setIsErrorEmail(data.error.email)
              setIsErrorPassword(data.error.password)
            }
            setEmail('');
            setPassword('');
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen dark">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign up</h2>
          <form className="flex flex-col" >
            <input
              placeholder="Email address"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            {
              isErrorEmail &&
              <p className="w-full h-6 text-white flex items-center justify-center mb-2 rounded border border-red-300 bg-red-500" >{isErrorEmail}</p>
            }
            <input
              placeholder="Password"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            {
              isErrorPassword &&
              <p className="w-full h-6 text-white flex items-center justify-center mb-2 rounded border border-red-300 bg-red-500" >{isErrorPassword}</p>

            }
            <div className="flex items-center justify-between flex-wrap">
              <label
                className="text-sm text-gray-200 cursor-pointer"
                htmlFor="remember-me"
              >
                <input className="mr-2" id="remember-me" type="checkbox" />
                Remember me
              </label>
              <a className="text-sm text-blue-500 hover:underline mb-0.5" href="#">
                Forgot password?
              </a>
              <p className="text-white mt-4">
                {" "}
                Don't have an account?{" "}
                <a
                  className="text-sm text-blue-500 -200 hover:underline mt-4"
                  href="#"
                >
                  Login
                </a>
              </p>
            </div>
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
              onClick={ handleSignup }
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
