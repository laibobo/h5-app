const tokenKey = 'token'

export const getToken = () => localStorage.getItem(tokenKey)
export const saveToken = (data) => localStorage.setItem(tokenKey, data)
export const removeToken = () => localStorage.removeItem(tokenKey)
