import axios from "axios"

export const signIn = async (initData: string) => {
  return axios.post("/api/auth/signin", {
    initData,
  })
}
