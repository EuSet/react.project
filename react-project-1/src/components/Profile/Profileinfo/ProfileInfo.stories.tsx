import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ProfileInfo, {PropsType} from "./ProfileInfo";


export default {
    title: 'ProfileInfo',
    component: ProfileInfo,
}

export const Template = (props:PropsType) => <MemoryRouter>
    <ProfileInfo profile={props.profile}
                 status={props.status}
                 updateProfileStatus={props.updateProfileStatus}
                 savePhoto={props.savePhoto}
                 isOwner={props.isOwner}
                 saveProfileData={props.saveProfileData}
    /></MemoryRouter>;
