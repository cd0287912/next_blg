import { message } from "antd"
import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:8080",
})

const getInstance = axios.create({
  baseURL: "http://localhost:8080",
  // headers: { "Content-Type": "application/json" },
})

getInstance.interceptors.response.use((response) => {
  const { data, status } = response
  if (status === 200) {
    return data
  }
})

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("_token")
    return config
  },
  (error) => {
    console.log(error.response)
  }
)
instance.interceptors.response.use(
  (response) => {
    const { data, status } = response
    if (status === 200) {
      return data
    }
    return null
  },
  (error) => {
    const { status, data } = error.response
    if (status === 401) {
      location.href = "/admin/login?back=" + encodeURIComponent(location.href)
    } else {
      message.error(data.message)
    }
  }
)
export { instance, getInstance }
