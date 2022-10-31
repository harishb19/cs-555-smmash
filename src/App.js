import './App.css';
import {Route, Routes} from "react-router-dom";
import React, {Fragment, useEffect} from 'react'
import {StoreProvider} from "easy-peasy";
import store from "./store/storeProvider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {setContext} from "@apollo/client/link/context";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import ErrorBoundary from "./Components/Error/ErrorBoundary";
import AuthProvider from "./Components/Auth/AuthProvider";
import NavWrapper from "./Components/Nav/NavWrapper";
import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import PageNotFound from "./Components/Error/PageNotFound";
import ProtectedRoutes from "./Components/Auth/ProtectedRoutes";
import LoginCheck from "./Components/Auth/LoginCheck";
import {ToastProvider} from "react-toast-notifications";
import UsersList from "./Components/Users/UsersList";
import AccountWrapper from "./Components/Auth/AccountWrapper";
import PreviousRecords from "./Components/Patient/PreviousRecords";

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
    // PROD URLS
    const GRAPH_URL = "https://smmash.herokuapp.com/v1/graphql"
    const WSS_URL = "wss://smmash.herokuapp.com/v1/graphql"

    const httpLink = new HttpLink({
        uri: GRAPH_URL,
    });
    const wsLink = new GraphQLWsLink(createClient({
        url: WSS_URL,
    }))

    const splitLink = split(({query}) => {
        const definition = getMainDefinition(query);
        return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
    }, wsLink, httpLink,)


    const authLink = setContext((_, {headers}) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('smmash69');
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers, authorization: token ? `${token}` : "",
            }
        }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const client = new ApolloClient({
        cache: new InMemoryCache(), link: authLink.concat(splitLink)
    });


    useEffect(() => {

        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }


    }, []);

    return (<div className="App">
        <StoreProvider store={store}>
            <ErrorBoundary>
                <ApolloProvider client={client}>
                    <Fragment>
                        <ThemeProvider theme={theme}>
                            <ToastProvider
                                autoDismiss
                                autoDismissTimeout={10000}
                                placement={"top-center"}>
                                <CssBaseline/>
                                <AuthProvider>
                                    <NavWrapper>
                                        <Routes>

                                            <Route path="/" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>

                                            <Route path="/auth/login" element={<LoginCheck><Login/></LoginCheck>}/>
                                            <Route path="/auth/login/doctor"
                                                   element={<LoginCheck><Login type={'doctor'}/></LoginCheck>}/>
                                            <Route path="/auth/signup" element={<LoginCheck><Signup/></LoginCheck>}/>
                                            <Route path="/auth/signup/doctor"
                                                   element={<LoginCheck><Signup type={'doctor'}/></LoginCheck>}/>
                                            <Route path='/patients/new'
                                                   element={<ProtectedRoutes><UsersList/></ProtectedRoutes>}/>
                                            <Route path='/patients/list' element={<ProtectedRoutes
                                                role={'doctor'}><UsersList/></ProtectedRoutes>}/>
                                            <Route path='/records/list' element={<ProtectedRoutes
                                                role={'patient'}><PreviousRecords/></ProtectedRoutes>}/>
                                            <Route path='/profile'
                                                   element={<ProtectedRoutes><AccountWrapper/></ProtectedRoutes>}/>
                                            <Route path="*" element={<PageNotFound/>}/>
                                        </Routes>
                                    </NavWrapper>
                                </AuthProvider>
                                <ToastContainer
                                    position="bottom-right"
                                    autoClose={5000}
                                    hideProgressBar
                                    newestOnTop
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                />
                            </ToastProvider>
                        </ThemeProvider>
                    </Fragment>
                </ApolloProvider>
            </ErrorBoundary>
        </StoreProvider>

    </div>);
}

export default App;
