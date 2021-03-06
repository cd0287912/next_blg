import { message } from "antd";
import axios from "axios";
import { TOKEN } from "./../tools";
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://cd028.tech/nestApi"
      : "/nestApi",
});

const getInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://cd028.tech/nestApi"
      : "/nestApi",
});
// const instance = axios.create({
//   baseURL:
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:8080"
//       : "/nestApi",
// })

// const getInstance = axios.create({
//   baseURL:
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:8080"
//       : "/nestApi",
// })

getInstance.interceptors.request.use((config) => {
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    config.headers.Authorization =
      "Bearer " + window.localStorage.getItem(TOKEN);
  }
  return config;
});

getInstance.interceptors.response.use((response) => {
  const { data, status } = response;
  if (status === 200) {
    return data;
  }
});

instance.interceptors.request.use(
  (config) => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      config.headers.Authorization =
        "Bearer " + window.localStorage.getItem(TOKEN);
    }
    return config;
  },
  (error) => {
    console.log(error.response);
  }
);
instance.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    if (status === 200) {
      return data;
    } else {
      return Promise.reject();
    }
  },
  (error) => {
    const { status, data } = error.response;
    if (status === 401) {
      location.href = "/admin/login?back=" + encodeURIComponent(location.href);
    } else if (status === 403) {
      message.error("暂无权限");
    } else {
      message.error(data.message);
    }
  }
);
export { instance, getInstance };
