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
  regist<T>(data) {
    return instance<T>({
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
  getUserInfo<T>() {
    return instance<T>({
      url: "/user/userInfo",
    })
  },
  getUsers<T>(params) {
    return instance<T>({
      url: "/user",
      params,
    })
  },
  delUser<T>(id) {
    return instance<T>({
      url: `/user/${id}`,
      method: "delete",
    })
  },
}

export const commentApis = {
  getCommentList<T>(params) {
    return instance<T>({
      url: "comment",
      params,
    })
  },
  delCommentById<T>(id) {
    return instance<T>({
      url: `/comment/${id}`,
      method: "delete",
    })
  },
}
export const visitorApis = {
  getVisitor<T>(params) {
    return instance<T>({
      url: "/visit/list",
      params,
    })
  },
  deleteVisitor<T>(id) {
    return instance<T>({
      url: `/visit/${id}`,
      method: "delete",
    })
  },
}
export const readmeApis = {
  createReadme<T>(data) {
    return instance<T>({
      url: "/readme",
      method: "post",
      data,
    })
  },
  getReadme<T>() {
    return instance<T>({
      url: "/readme",
    })
  },
}
export const sysApis = {
  getSys<T>() {
    return instance<T>({
      url: "/sys",
    })
  },
  createSys<T>(data) {
    return instance<T>({
      url: "/sys",
      method: "post",
      data,
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
  saveComment<T>(data) {
    return getInstance<T>({
      url: "comment",
      method: "post",
      data,
    })
  },
  getCommentList<T>(params) {
    return getInstance<T>({
      url: "comment",
      params,
    })
  },
  getSysDetail<T>() {
    return getInstance<T>({
      url: "/sys/detail",
    })
  },
  saveVisitor<T>() {
    return getInstance<T>({
      url: "/visit",
      method: "get",
    })
  },
  getReadme<T>() {
    return getInstance<T>({
      url: "/readme",
    })
  },
}
