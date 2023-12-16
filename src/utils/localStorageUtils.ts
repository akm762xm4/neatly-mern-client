export const addItemToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
  window.location.reload()
}

export const removeItemFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key)
  window.location.reload()
}
