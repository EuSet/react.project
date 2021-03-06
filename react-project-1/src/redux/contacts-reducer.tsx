import {ResponseType, usersAPI} from "../api/api";
import {changeObjMethod} from "../components/Common/utills/changeObjMethod";

export type ContactsPageType = {
    contactsData: ContactsDataType
    pageSize: number
    totalCount: number
    currentPage: number
    togglePreloader: boolean
    progressBtnDisabled: Array<number>
}
export type ContactsDataType = Array<ContactsDataFriendType>
export type ContactsDataFriendType = {
    id: number
    location: { country: string, city: string }
    name: string
    followed: boolean
    status: string
    photos: {
        small: string
        large: string
    }
    uniqueUrlName: string
}
export type ContactsActionType =
    ReturnType<typeof followNewContact>
    | ReturnType<typeof setContacts>
    | ReturnType<typeof setCurrentCount>
    | ReturnType<typeof setTotalCountContacts>
    | ReturnType<typeof setTogglePreloader>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setToggleBtnDisabled>


const initialState: ContactsPageType = {

    contactsData: [],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    togglePreloader: false,
    progressBtnDisabled: []
}
const FOLLOW = 'FOLLOW'
const UN_FOLLOW = 'UN_FOLLOW'
const SET_CONTACTS = 'SET_CONTACTS'
const SET_CURRENT_COUNT = 'SET_CURRENT_COUNT'
const SET_TOTAL_COUNT_CONTACTS = 'SET_TOTAL_COUNT_CONTACTS'
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER'
const TOGGLE_BTN_DISABLED = 'TOGGLE_BTN_DISABLED'

const contactsReducer = (state: ContactsPageType = initialState, action: ContactsActionType):ContactsPageType => {
    switch (action.type) {
        case FOLLOW:
            const newFollowData = changeObjMethod(state.contactsData, 'id', action.idUser,  {followed:true} )
            return {
                ...state,
                contactsData:newFollowData
            }
        case UN_FOLLOW:
           const newUnfollowData = changeObjMethod(state.contactsData, 'id', action.idUser,  {followed:false} )
            return {
                ...state,
               contactsData: newUnfollowData
            }
        case SET_CONTACTS:
            return {...state, contactsData: action.contacts}
        case SET_CURRENT_COUNT:
            return {...state, currentPage: action.newCurrentPage}
        case SET_TOTAL_COUNT_CONTACTS:
            return {...state, totalCount: action.totalCount}
        case TOGGLE_PRELOADER:
            return {...state, togglePreloader: action.toggle}
        case "TOGGLE_BTN_DISABLED":
            return {
                ...state,
                progressBtnDisabled: action.toggle ? [...state.progressBtnDisabled, action.id] :
                    state.progressBtnDisabled.filter(id => id !== action.id)
            }
        default:
            return state
    }
}
export const followNewContact = (id: number) => {
    return {type: FOLLOW, idUser: id} as const
}
export const unFollow = (id: number) => {
    return {type: UN_FOLLOW, idUser: id} as const
}
export const setContacts = (contacts: ContactsDataType) => {
    return {type: SET_CONTACTS, contacts: contacts} as const
}
export const setCurrentCount = (count: number) => {
    return {type: SET_CURRENT_COUNT, newCurrentPage: count} as const
}
export const setTotalCountContacts = (totalCount: number) => {
    return {type: SET_TOTAL_COUNT_CONTACTS, totalCount} as const
}
export const setTogglePreloader = (toggle: boolean) => {
    return {type: TOGGLE_PRELOADER, toggle} as const
}
export const setToggleBtnDisabled = (toggle: boolean, id: number) => {
    return {type: TOGGLE_BTN_DISABLED, toggle, id} as const
}
export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: (action: ContactsActionType) => void) => {
    try {
        dispatch(setTogglePreloader(true))
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setTogglePreloader(false))
        dispatch(setContacts(data.items))
        dispatch(setTotalCountContacts(data.totalCount))
    } catch (e) {
        throw new Error(e)
    }

}

export const followUnfollowFlow = (id: number, dispatch: (action: ContactsActionType) => void,
                                   apiMethod: Promise<ResponseType>,
                                   actionCreator: ContactsActionType) => {
    dispatch(setToggleBtnDisabled(true, id))
    apiMethod
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(actionCreator)
            }
            dispatch(setToggleBtnDisabled(false, id))
        })
        .catch(() => {
            throw new Error('some error')
        })
}
export const unFollowUserThunk = (id: number) => (dispatch: (action: ContactsActionType) => void) => {
    followUnfollowFlow(id, dispatch, usersAPI.unFollowUser(id), unFollow(id))
}
export const followUserThunk = (id: number) => async (dispatch: (action: ContactsActionType) => void) => {
    followUnfollowFlow(id, dispatch, usersAPI.followUser(id), followNewContact(id))
}
export default contactsReducer;
