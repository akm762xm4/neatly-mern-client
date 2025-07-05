import { useLoginModal, useSignUpModal } from "../features/user/modalState";
export const Unauthorized = () => {
  const loginModal = useLoginModal();
  const signUpModal = useSignUpModal();

  const handleLoginClick = () => {
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
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-center md:text-3xl">
      You must have to{" "}
      <button
        onClick={() => handleLoginClick()}
        title="login"
        className="text-[#3b956e]"
      >
        login
      </button>{" "}
      or{" "}
      <button
        onClick={() => handleSignUpClick()}
        title="register"
        className="text-[#3b956e]"
      >
        create
      </button>{" "}
      an account!
    </div>
  );
};
