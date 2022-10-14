import {useEffect, useState} from 'react'
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {LOGIN_USER} from "../../graphql/queries";
import {useMutation} from "@apollo/client";
import {useStoreActions} from "easy-peasy";
import Loading from "../Loading/Loading";
import {firebaseConfig} from "../../config/firebase";
import {getMessaging, isSupported} from 'firebase/messaging'

const AuthUserProvider = ({children}) => {

    const [processing, setProcessing] = useState(true)
    const [fetchUser] = useMutation(LOGIN_USER)
    const [messaging, setMessaging] = useState(null)
    const setUserDetails = useStoreActions(actions => actions.user.setUserDetails)
    const setIsPasswordProvider = useStoreActions(actions => actions.user.setIsPasswordProvider)
    const setUserImage = useStoreActions(actions => actions.user.setUserImage)


    useEffect(() => {
        const firebaseInit = initializeApp(firebaseConfig)

        if (firebaseInit) {
            isSupported().then(() => {
                let localMessaging = getMessaging(firebaseInit)
                setMessaging(localMessaging)
            }).catch((e) => {
                console.log(e)
                setMessaging(null)
            })


            const auth = getAuth(firebaseInit)
            let unsubscribe = auth.onAuthStateChanged((user) => {
                console.log("-> user", user);
                if (user) {
                    if (user && user.photoURL) {
                        setUserImage(user.photoURL)
                    }
                    if (user && user.providerData) {
                        const isPassword = user.providerData.find(provider => provider.providerId === "password")
                        console.log(!!isPassword)
                        setIsPasswordProvider(!!isPassword)
                    }
                    user.getIdTokenResult(true) // 1
                        .then((idTokenResult) => {
                            console.log(idTokenResult.token)
                            if ("https://hasura.io/jwt/claims" in idTokenResult.claims && idTokenResult.claims['https://hasura.io/jwt/claims'] !== null) {
                                localStorage.setItem("smmash69", idTokenResult.token)
                                fetchUser({
                                    variables: {
                                        token: user.accessToken
                                    }
                                }).then(r => {
                                    console.log("-> r", r);
                                    if (r && r.data && r.data.loginPatient) {
                                        setUserDetails({...r.data.loginPatient.user})
                                        setProcessing(false)
                                    }

                                })
                            } else {
                                auth.signOut().then(() => {
                                    setProcessing(false)
                                    localStorage.setItem("smmash69", "")
                                    sessionStorage.clear()
                                })

                            }
                        })

                } else {
                    setProcessing(false)
                    setUserDetails({})
                    localStorage.setItem("smmash69", "")

                }
            })
            return (() => {
                unsubscribe()
            })
        }

    }, [fetchUser, setUserDetails, setIsPasswordProvider, setUserImage]);

    if (processing) return <div style={{height: "100vh"}}><Loading/></div>;
    return (<>{children}</>)
}

export default AuthUserProvider
