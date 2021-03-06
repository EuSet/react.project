import React from 'react';
import s from './MyPosts.module.css';
import Posts from "./Posts/Posts";
import NewPostContainer from "./NewPost/NewPostContainer";
import {PostDataType} from "../../../redux/profile-reducer";

export type PropsType = {
    postsData: PostDataType
}

const MyPosts = (props:PropsType) => {
    console.log('myPosts')
    let postsElements = props.postsData.map(p => <Posts key={p.id} message={p.message} quantityOfLikes={p.quantityOfLikes}/>);
    return <div className={s.myPosts}>
        myposts
        <NewPostContainer/>
        {postsElements}
    </div>
}
export default MyPosts;
