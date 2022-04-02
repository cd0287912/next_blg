export interface Post {
  id: string
  title: string
  cover: string
  description: string
  content: string
  create_time: string
  view_times: string
  tag: Tag
}
export interface Tag {
  id: string
  name: string
  cover: string
  description: string
  create_time: string
  post?: Post[]
}

export interface User {
  id: string
  username: string
}
export interface Comment {
  content: string
  create_time: string
  id: string
  agent: string
  address: string
  user: User
}

export interface Pagination {
  pageNo: number
  pageSize: number
}

export interface Sys {
  id?: string
  sysTitle: string
  sysLogo: string
  sysAbout: string
  sysDesc: string
  sysGithubLink: string
  sysSubDesc: string
}

export interface Visitor {
  address: string
  browser: string
  create_time: string
  id: string
  ip: string
  os: string
}
