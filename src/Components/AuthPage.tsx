import { useEffect, useState } from "react";
import { Input } from "../Components/ui/Input";
import { Eye, EyeOff, Mail, Lock, User, Sun, Moon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../features/user/usersApi";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { showToast } from "./ui/Toast";
import Logo from "../assets/Neatly_Logo.png";

type FormData = {
  username: string;
  password: string;
  email?: string;
};

const AuthPage = () => {
  const [signIn, { isLoading: isLoginLoading }] = useSignInMutation();
  const [signUp, { isLoading: isRegisterLoading }] = useSignUpMutation();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">(() =>
    localStorage.getItem("theme") === "dark" ||
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  const isLogin = mode === "login";
  const isLoading = isLogin ? isLoginLoading : isRegisterLoading;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.username.length || !data.password.length) {
      showToast.success("Fill all the fields!");
      return;
    }
    try {
      const res = await (isLogin ? signIn(data) : signUp(data)).unwrap();
      localStorage.setItem("token", res.token);

      showToast.success(
        `${isLogin ? "Logged in" : "Account created"} successfully!`
      );

      navigate("/", { replace: true });
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
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
        </div>

        {/* Title */}
        <h2 className="md:text-xl text-md font-bold  text-light-text dark:text-dark-text mb-1">
          {isLogin ? "Sign in with username" : "Create an account"}
        </h2>
        <p className="md:text-md text-sm  text-light-muted dark:text-dark-muted mb-8">
          {isLogin
            ? "Access your notes and tasks in one place."
            : "Join Neatly and take charge of your productivity."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-20" />
              <Input
                id="username"
                placeholder="Enter email"
                className="pl-10"
                {...register("email")}
              />
            </div>
          )}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-20" />
            <Input
              id="username"
              placeholder="Enter username"
              className="pl-10"
              {...register("username")}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-20" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="pl-10 pr-10"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
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
