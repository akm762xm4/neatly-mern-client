import { useForm, SubmitHandler } from "react-hook-form"
import { SignupCredentials } from "../types"
import { useSignUpMutation } from "../api/usersApi"
import { addItemToLocalStorage } from "../../../utils/localStorageUtils"

interface SignupProps {
  setIsOpen: (value: boolean) => void
}
export const Signup: React.FC<SignupProps> = ({ setIsOpen }) => {
  const [signUp] = useSignUpMutation()
  const { register, handleSubmit } = useForm<SignupCredentials>()

  const onSubmit: SubmitHandler<SignupCredentials> = (data) => {
    signUp(data)
      .unwrap()
      .then((res) => {
        console.log("Response::", res)
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
          <label htmlFor="email" className="font-medium text-xl">
            Email
          </label>
          <br />
          <input
            id="email"
            className="w-48 md:w-80 px-1 outline-none rounded"
            {...register("email", { required: true })}
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
          Signup
        </button>
      </div>
    </form>
  )
}
