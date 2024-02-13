import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns"

const initialState = [
    {
        id: '1', title: 'Learning Redux Toolkit', content: "I've heard good things", date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
            tea: 0,
        }
    },
    {
        id: '2', title: 'Slices...', content: "The more I say slice, the more I want pizza.", date: sub(new Date(), { minutes: 5 }).toISOString(), reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
            tea: 0
        }
    }, {
        id: '3', title: 'Mühendislik', content: "Mühendislik hosdur fakat diferansiyel denklemler zordur", date: sub(new Date(), { minutes: 12 }).toISOString(), reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 2,
            rocket: 5,
            coffee: 0,
            tea: 0
        }
    }, {
        id: '4', title: 'Çay', content: "Canım çay çekti gidip de demliyim bari..", date: sub(new Date(), { minutes: 9 }).toISOString(), reactions: {
            thumbsUp: 6,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 3,
            tea: 12
        }
    }


]

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                            tea: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer