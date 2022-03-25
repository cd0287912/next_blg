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
