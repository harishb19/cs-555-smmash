import {useEffect} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import {toast} from "react-toastify";
import {useMutation} from "@apollo/client";
import {GET_TOPICS} from "../../graphql/mutation";
import {getToken, onMessage} from 'firebase/messaging'
import {useToasts} from "react-toast-notifications";

const NotificationProvider = ({messaging}) => {
    const {addToast} = useToasts()

    const [getNotification] = useMutation(GET_TOPICS)

    const userDetails = useStoreState(state => state.user.userDetails)
    const setNotifications = useStoreActions(actions => actions.notifications.setNotifications)

    useEffect(() => {

        if (userDetails && userDetails.id && messaging) {


            getToken(messaging, {vapidKey: "BGFCnXyyZ3lLx1ABX1H92XR6KfJH2KlpVsVwJ15iPNFJ99orjzvTfF36WkRRd2J-uiL9MHzTKxxNaHD9-ULBEA4"}).then((currentToken) => {
                if (currentToken) {
                    console.log(currentToken)
                    let topics = [`${userDetails.id}-doctor-alert`, `${userDetails.id}-alert`, `alert`]
                    getNotification({
                        variables: {
                            token: currentToken, topics, userId: userDetails.id
                        }
                    }).then((e) => {
                        console.log("sub", e.data)
                        console.log("ok", messaging)
                        onMessage(messaging, (payload) => {
                            console.log('Message received. ', payload);
                            addToast({
                                title: payload.notification.title, body: payload.notification.body, ...payload.data
                            }, {
                                autoDismiss: true,
                            })
                            setNotifications(payload)
                        })
                    }).catch((e) => {
                        console.log(JSON.stringify(e))
                    })

                } else {
                    console.log('No Instance ID token available. Request permission to generate one.');
                }
            }).catch((err) => {
                toast.error(`Notification will not work as permissions are not given.`, {
                    position: "bottom-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                console.log('An error occurred while retrieving token. ', err);
            });

        }
    }, [messaging, userDetails, setNotifications])

    return null
}

export default NotificationProvider