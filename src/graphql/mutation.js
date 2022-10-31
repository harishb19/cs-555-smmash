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

export const CHANGE_PATIENT_STATUS = gql`
    mutation Mutation($userId: bigint!, $status: String!) {
        update_users_by_pk(pk_columns: {id: $userId}, _set: {status: $status}) {
            id
        }
    }

`
export const CHANGE_DOCTOR_STATUS = gql`
    mutation Mutation($userId: bigint!, $status: String!) {
        update_users_by_pk(pk_columns: {id: $userId}, _set: {status: $status,roleId:1}) {
            id
        }
    }

`

export const INSERT_RECORDS = gql`
    mutation insertRecords($objects: [records_insert_input!]!) {
        insert_records(objects: $objects) {
            affected_rows
        }
    }

`

export const DELETE_RECORD = gql`
    mutation deleteRecord($id: bigint!) {
        delete_records_by_pk(id: $id) {
            id
        }
    }
`

export const UPDATE_RECORD = gql`
    mutation updateRecord($id: bigint!, $dosageId: bigint!, $dosageInformation: timestamptz!) {
        update_records_by_pk(pk_columns: {id: $id}, _set: {dosageId: $dosageId, dosageInformation: $dosageInformation}) {
            id
        }
    }
`
