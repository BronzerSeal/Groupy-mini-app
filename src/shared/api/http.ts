import axios from "axios"

export const httpClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

let isRefreshing = false
let queue: Array<() => void> = []

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // если нет ответа или это не 401 — просто кидаем дальше
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error)
    }

    //сам refresh endpoint
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error)
    }

    // если уже refresh — очередь
    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push(() => {
          resolve(httpClient(originalRequest))
        })
      })
    }

    isRefreshing = true

    try {
      // вызываем refresh endpoint
      await httpClient.get("/auth/refresh")

      //все отложенные запросы
      queue.forEach((cb) => cb())
      queue = []

      // повторяем оригинальный запрос
      return httpClient(originalRequest)
    } catch (err) {
      // если refresh не удался → разлогин
      queue = []
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }
)
