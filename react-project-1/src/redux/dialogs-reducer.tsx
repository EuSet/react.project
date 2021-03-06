import {FormAction, reset} from "redux-form";

export type DialogsPageType = {
    dialogsData: DialogsDataType
    messagesData: MessageDataType
}
type MessageDataType = Array<MessageDialogsType>
type MessageDialogsType = {
    message: string
    id: number
}
type DialogsDataType = Array<DialogsNameType>
type DialogsNameType = {
    name: string
    id: number
}
export type DialogsActionType = ReturnType<typeof addNewMessage>

const ADD_DIALOGS_MESSAGE = 'ADD-DIALOGS-MESSAGE'

const initialState = {
    dialogsData: [
        {name: 'Andrey', id: 1},
        {name: 'Eugene', id: 2},
        {name: 'Dimych', id: 3},
        {name: 'Diana', id: 4}
    ],
    messagesData: [
        {message: 'Hi', id: 0},
        {message: 'How are you', id: 1},
        {message: 'im here', id: 2}
    ],
}

const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionType) => {
    switch (action.type) {
        case 'ADD-DIALOGS-MESSAGE':
            let newDialogMessage = {
                message: action.newMessage,
                id: state.messagesData.length + 1
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newDialogMessage],
            }
        default:
            return state
    }
}

export const addNewMessage = (newMessage:string) => {
    return {type: ADD_DIALOGS_MESSAGE, newMessage} as const
}

export const addMessage = (newMessage:string) => {
    return (dispatch:(action:DialogsActionType | FormAction) => void) => {
        dispatch(addNewMessage(newMessage))
        dispatch(reset('message'))
    }
}

export default dialogsReducer;


