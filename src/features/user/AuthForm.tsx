import { useForm, SubmitHandler } from "react-hook-form";
import { useSignInMutation, useSignUpMutation } from "./usersApi";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  setIsOpen: (value: boolean) => void;
  mode: "login" | "register";
}

type FormData = {
  username: string;
  password: string;
  email?: string;
};

export const AuthForm: React.FC<AuthFormProps> = ({ setIsOpen, mode }) => {
  const [signIn, { isLoading: isLoginLoading }] = useSignInMutation();
  const [signUp, { isLoading: IsRegisterLoading }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setError(null);
    const action = mode === "login" ? signIn(data) : signUp(data);

    action
      .unwrap()
      .then((res) => {
        localStorage.setItem("token", res.token);
        setIsOpen(false);
        navigate("/", { replace: true });
      })
      .catch(() => {
        setError("Invalid credentials or user already exists.");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="flex flex-col gap-5 px-6 py-4">
        <Input
          label="Username"
          id="username"
          placeholder="Enter username"
          {...register("username", { required: "Username is required" })}
          error={errors.username?.message}
        />

        {mode === "register" && (
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />
        )}

        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />

        {error && (
          <div className="text-sm text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-300 p-2 rounded-md border border-red-300 dark:border-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            className=""
            type="submit"
            disabled={isLoginLoading || IsRegisterLoading}
          >
            {isLoginLoading || IsRegisterLoading
              ? mode === "login"
                ? "Logging in..."
                : "Registering..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </Button>
        </div>
      </div>
    </form>
  );
};
