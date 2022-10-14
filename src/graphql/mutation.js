import {gql} from "@apollo/client";

export const SIGNUP_USER = gql`
    mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $firebaseUid: String!, $phoneNumber: String!, $dateOfBirth: String!, $gender: String!) {
        signUpPatient(userDetails: {firstName: $firstName, lastName: $lastName, email: $email, firebaseId: $firebaseUid, phoneNumber: $phoneNumber, dateOfBirth: $dateOfBirth, gender: $gender}) {
            status
            message
            userId
            user {
                firstName
                lastName
                dateOfBirth
                email
            }
        }
    }
`

export const SIGNUP_DOCTOR = gql`
    mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $firebaseUid: String!, $phoneNumber: String!, $dateOfBirth: String!, $gender: String!) {
        signUpDoctor(userDetails: {firstName: $firstName, lastName: $lastName, email: $email, firebaseId: $firebaseUid, phoneNumber: $phoneNumber, dateOfBirth: $dateOfBirth, gender: $gender}) {
            status
            message
            userId
            user {
                firstName
                lastName
                dateOfBirth
                email
            }
        }
    }

`
