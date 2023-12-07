import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { ErrorType } from "./LoginPage"


export type SignUpType = {
    userName: string,
    email: string,
    password: string,
    confirmPass: string
}

const SignUpPage = ()=>{
    const navigate = useNavigate()

    const [signUpInfo, setSignUp] = useState<SignUpType>({
        userName: '',
        email: '',
        password: '',
        confirmPass: ''
    })

    const handleChangfrom = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setSignUp({...signUpInfo, [e.target.name]: e.target.value})
    }
    const onSubMitEvent = async(e: React.SyntheticEvent)=>{
        e.preventDefault()
        try {
            await axios.post('/api/auth/signup', signUpInfo)
            const token = localStorage.getItem('token')
            if(token){
                   toast.success('SignUp complete',{
                  position: toast.POSITION.BOTTOM_CENTER
            })
                 navigate('/admin/products')
            }else{
                   toast.success('SignUp complete',{
                  position: toast.POSITION.BOTTOM_CENTER
            })
                navigate('/')
            }
        } catch (error) {
            const err = error as ErrorType
            console.log(err.response.data.message);
            toast.error(`${err.response.data.message}`, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

    }


    return(
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a
      href="#"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        className="w-8 h-8 mr-2"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
        alt="logo"
      />
      Flowbite
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create and account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={onSubMitEvent}>
            <div>
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              UserName
            </label>
            <input
            value={signUpInfo.userName}
            onChange={handleChangfrom}
              type="text"
              name="userName"
              id="userName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
            />
          </div>
          <div></div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              value={signUpInfo.email}
            onChange={handleChangfrom}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              value={signUpInfo.password}
            onChange={handleChangfrom}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              value={signUpInfo.confirmPass}
            onChange={handleChangfrom}
              type="confirmPass"
              name="confirmPass"
              id="confirmPass"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to={'/'}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
  <ToastContainer/>
</section>

    )
}

export default SignUpPage