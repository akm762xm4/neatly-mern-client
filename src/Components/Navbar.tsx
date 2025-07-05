import { CgNotes } from "react-icons/cg";
import { Modal } from "./Modal";
import { Signin } from "../features/user/Signin";
import { Signup } from "../features/user/Signup";
import { removeItemFromLocalStorage } from "../utils/localStorageUtils";
import { useLoginModal, useSignUpModal } from "../features/user/modalState";
import { useGetMeQuery } from "../features/user/usersApi";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const { data: user } = useGetMeQuery();

  const loginModal = useLoginModal();
  const signUpModal = useSignUpModal();

  const handleSignInClick = () => {
    if (signUpModal.isOpen) {
      signUpModal.setIsOpen(false);
    }
    loginModal.setIsOpen(true);
  };

  const handleSignUpClick = () => {
    if (loginModal.isOpen) {
      loginModal.setIsOpen(false);
    }
    signUpModal.setIsOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between fixed w-full bg-[#6B9080] px-3 py-3 z-20">
        <div className="flex items-center gap-4">
          <CgNotes size={36} color="#ffffff" />
          <span className="font-bold text-xl">Notes-App</span>
        </div>
        {!token ? (
          <div className="flex items-center gap-2 pr-3">
            <button
              onClick={() => handleSignInClick()}
              className="hover:text-white transition"
            >
              Sign-in
            </button>
            <span className="border border-black h-6"></span>
            <button
              onClick={() => handleSignUpClick()}
              className="hover:text-white transition"
            >
              Sign-up
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => removeItemFromLocalStorage("token")}
              className="hover:text-white transition"
            >
              Logout
            </button>
            <div className="h-6 border border-black" />
            <div>{user?.username}</div>
          </div>
        )}
      </div>
      {loginModal.isOpen && (
        <Modal
          title="Login"
          isOpen={loginModal.isOpen}
          setIsOpen={loginModal.setIsOpen}
          child={<Signin setIsOpen={loginModal.setIsOpen} />}
        />
      )}
      {signUpModal.isOpen && (
        <Modal
          title="Register"
          isOpen={signUpModal.isOpen}
          setIsOpen={signUpModal.setIsOpen}
          child={<Signup setIsOpen={signUpModal.setIsOpen} />}
        />
      )}
    </>
  );
};
