import { useForm, SubmitHandler } from "react-hook-form"
import { LoginCredentials } from "../types"
import { useSignInMutation } from "../api/usersApi"
import { addItemToLocalStorage } from "../../../utils/localStorageUtils"

interface SigninProps {
  setIsOpen: (value: boolean) => void
}
export const Signin: React.FC<SigninProps> = ({ setIsOpen }) => {
  const [signIn] = useSignInMutation()
  const { register, handleSubmit } = useForm<LoginCredentials>()

  const onSubmit: SubmitHandler<LoginCredentials> = (data) => {
    signIn(data)
      .unwrap()
      .then((res) => {
        addItemToLocalStorage("token", res.token)
      })
    setIsOpen(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="py-4 px-[65px] flex flex-col gap-4">
        <div>
          <label htmlFor="username" className="font-medium text-xl">
            Username
          </label>
          <br />
          <input
            id="username"
            className="w-48 md:w-80 px-1 outline-none rounded"
            {...register("username", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="password" className="font-medium text-xl">
            Password:
          </label>
          <br />
          <input
            id="password"
            type="password"
            className="w-48 md:w-80 px-1 outline-none rounded"
            {...register("password", { required: true })}
          />
        </div>
        <button
          title="Submit"
          className="rounded px-2 select-none bg-[#EAF4F4] ml-auto"
          onClick={() => handleSubmit(onSubmit)}
        >
          Login
        </button>
      </div>
    </form>
  )
}
