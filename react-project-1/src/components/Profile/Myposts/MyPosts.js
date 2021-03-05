import React from 'react';
import s from './MyPosts.module.css';
import NewPost from "./NewPost/NewPost";
import Posts from "./Posts/Posts";
import {addPost} from "../../../redux/State";

const MyPosts = (props) => {
    let postsElements = props.profilePage.postsData.map(p => <Posts message={p.message} quantityOfLikes={p.quantityOfLikes}/>);
    return <div className={s.myPosts}>
        myposts
        <NewPost newPostText={props.profilePage.newPostText}
                 addPost={props.addPost}
                 updateNewPostChange={props.updateNewPostChange}
        />
        {postsElements}
    </div>
}
export default MyPosts;