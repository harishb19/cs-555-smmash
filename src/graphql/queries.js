import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
    mutation Login($token: String!) {
        loginPatient(token: $token) {
            userId
            status
            message
            user {
                id
                email
                firstName
                lastName
                phoneNumber
                createdAt
                updatedAt
                role{
                    name
                }
            }
        }
    }

`
export const LOGIN_DOCTOR = gql`
    mutation Login($token: String!) {
        loginDoctor(token: $token) {
            userId
            status
            message
            user {
                id
                email
                firstName
                lastName
                phoneNumber
                createdAt
                updatedAt
                role{
                    name
                }
            }
        }
    }

`
