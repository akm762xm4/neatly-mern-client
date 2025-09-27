import { useEffect, useState } from "react";
import { Input } from "../Components/ui/Input";
import { Mail, Lock, User, Sun, Moon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation, useRegisterMutation } from "../app/serverApi";

import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { showToast } from "./ui/Toast";
import Logo from "../assets/Neatly_Logo.png";
import { useAuthStore } from "../app/authStore";

type FormData = {
  email: string;
  name?: string;
  password: string;
};

const AuthPage = () => {
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signUp, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();
  const { setCredentials } = useAuthStore();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [theme, setTheme] = useState<"light" | "dark">(() =>
    localStorage.getItem("theme") === "dark" ||
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  const isLogin = mode === "login";
  const isLoading = isLogin ? isLoginLoading : isRegisterLoading;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    if (!data.email.length || !data.password.length) {
      showToast.success("Fill all the fields!");
      return;
    }

    try {
      if (isLogin) {
        // For login, backend expects { email, password }
        const res = await login({
          email: data.email,
          password: data.password,
        }).unwrap();

        setCredentials({ accessToken: res.accessToken, user: res.user });
      } else {
        // For register, backend expects { name, email, password }
        const res = await signUp({
          name: data.name!,
          email: data.email!,
          password: data.password,
        }).unwrap();
        setCredentials({ accessToken: res.accessToken, user: res.user });
      }

      showToast.success(
        `${isLogin ? "Logged in" : "Account created"} successfully!`
      );
      navigate("/", { replace: true });
      reset();
    } catch (error) {
      showToast.error(
        isLogin
          ? "Invalid username or password."
          : "User already exists or registration failed."
      );
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex bg-light dark:bg-dark-bg items-center justify-center">
      <div className=" card md:p-6 p-4">
        {/* Logo Icon */}
        <div className="flex pb-4 mb-4 items-center gap-2">
          <img
            src={Logo}
            alt="./src/assets/Neatly_Logo.png"
            className="md:w-12 md:h-12 w-10 h-10"
          />
          <span className="md:text-2xl text-xl">Neatly</span>
          <button
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
            onClick={handleThemeToggle}
            className="card ml-auto bg-light dark:bg-dark-bg p-3 rounded-full"
          >
            {theme === "light" ? (
              <Moon className="md:w-6 md:h-6 w-5 h-5" />
            ) : (
              <Sun className="md:w-6 md:h-6 w-5 h-5" />
            )}
          </button>
        </div>

        {/* Title */}
        <h2 className="md:text-xl text-md font-bold  text-light-text dark:text-dark-text mb-1">
          {isLogin ? "Sign in with Name" : "Create an account"}
        </h2>
        <p className="md:text-md text-sm  text-light-muted dark:text-dark-muted mb-8">
          {isLogin
            ? "Access your notes and tasks in one place."
            : "Join Neatly and take charge of your productivity."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <Mail className="md:w-6 md:h-6 w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-20" />
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              className="pl-10"
              {...register("email")}
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <User className="md:w-6 md:h-6 w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-20" />
              <Input
                id="name"
                placeholder="Enter name"
                className="pl-10"
                {...register("name")}
              />
            </div>
          )}

          <div className="relative">
            <Lock className="md:w-6 md:h-6 w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-20" />
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              className="pl-10 pr-10"
              {...register("password")}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </div>
        </form>

        {/* Toggle Auth Mode */}
        <div className="text-center text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
          <button
            className="text-accent dark:text-dark-accent font-medium hover:underline"
            onClick={() => {
              setMode(isLogin ? "register" : "login");
              reset();
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
