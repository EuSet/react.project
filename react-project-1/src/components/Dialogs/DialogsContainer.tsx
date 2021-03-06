import {addMessage} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import React from "react";


const mapStateToProps = (state: StateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
// const mapDispatchToProps = (dispatch: (action:DialogsActionType) => void) => {
//     return {
//         addNewMessage: () => {
//             dispatch(addNewMessage())
//         },
//         onNewMessageChange: (messageBody:string) => {
//             dispatch(onNewMessageChange(messageBody))
//         }
//     }
// }
// const authRedirectComponent = withAuthRedirect(Dialogs)
// const DialogsContainer = connect(mapStateToProps, {
//     addNewMessage, onNewMessageChange
// })(authRedirectComponent)

// export default DialogsContainer;

export default compose<React.ComponentType>(
    connect(mapStateToProps, {addMessage}),
    withAuthRedirect
)(Dialogs)
