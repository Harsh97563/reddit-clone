export interface Author {
    id: number,
    username: string,
    profileImgSrc: string,
    following: []
}
export interface PostData {
    id: number,
    authorId: number,
    author: Author,
    title: string,
    description: string,
    imageSrc: string,
    votes: number,
    voteRecords: [],
    createdAt: Date,

}
export interface Comment {
    id: number,
    comment: string,
    createdAt: Date,
    authorId: number,
    postId: number,
    author: Author,
    post: any

}