import { instance, getInstance } from "./instance"
/* 后台管理 */
export const authApis = {
  login(data) {
    return instance({
      url: "/auth/sign_in",
      method: "post",
      data,
    })
  },
  regist(data) {
    return instance({
      url: "/auth/sign_up",
      method: "post",
      data,
    })
  },
  getSts() {
    return instance({ url: "/auth/sts" })
  },
}
export const articleApis = {
  /* 文章管理 */
  getArticles<T>(params) {
    return instance<T>({
      url: "/post",
      params,
    })
  },
  delArticle<T>(id) {
    return instance<T>({
      url: `/post/${id}`,
      method: "delete",
    })
  },
  getArticle<T>(id) {
    return instance<T>({
      url: `/post/getById/${id}`,
    })
  },
  createArticle<T>(data) {
    return instance<T>({
      url: "/post",
      method: "post",
      data,
    })
  },
  updateArticle<T>(id, data) {
    return instance<T>({
      url: `/post/${id}`,
      method: "patch",
      data,
    })
  },
  toggleArticleRecommd<T>(id) {
    return instance<T>({
      url: `/post/${id}`,
      method: "put",
    })
  },
}
export const labelApis = {
  getAllLabels<T>() {
    return instance<T>({
      url: "/tag",
    })
  },
  createLabel<T>(data) {
    return instance<T>({
      url: "tag",
      data,
      method: "post",
    })
  },
  deLabel<T>(id) {
    return instance<T>({
      url: `tag/${id}`,
      method: "delete",
    })
  },
  updateLabel<T>(id, data) {
    return instance<T>({
      url: `tag/${id}`,
      method: "put",
      data,
    })
  },
}
export const userApis = {
  getUsers<T>(params) {
    return instance<T>({
      url: "/user",
      params,
    })
  },
  delUser(id) {
    return instance({
      url: `/user/${id}`,
      method: "delete",
    })
  },
}

/* 前台接口 */
export const homeApi = {
  getPagesList<T>(params) {
    return getInstance<T>({
      url: "/post/list",
      params,
    })
  },
  getRecommdPages<T>() {
    return getInstance<T>({
      url: "/post/recommd/list",
    })
  },
  getAllTags<T>() {
    return getInstance<T>({
      url: "tag",
    })
  },
  getPageById<T>(id) {
    return getInstance<T>({
      url: `/post/getPageById/${id}`,
    })
  },
  getTagById<T>(id) {
    return getInstance<T>({
      url: `/tag/${id}`,
    })
  },
}
