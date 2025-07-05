import { create } from "zustand"

interface ModalStore {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}
const useLoginModal = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}))

const useSignUpModal = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}))

const useLogoutModal = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}))

export { useLoginModal, useSignUpModal, useLogoutModal }
