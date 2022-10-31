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
                roleId
                role {
                    name
                }
                doctor {
                    doctorId
                }
                patients {
                    id
                    doctorId
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
export const GET_PENDING_PATIENTS = gql`
    query getPendingUsers{
        users(where:{status:{_eq:"pending"},roleId:{_eq:2}}){
            id
            firstName
            lastName
            email
            createdAt
        }
    }
`

export const GET_PATIENT_RECORDS = gql`
    query getRecords($patientId: bigint!) {
        records(where: {patient: {parentId: {_eq: $patientId}}}) {
            id
            doctor {
                user {
                    firstName
                    lastName
                }
            }
            dosageInformation
            dosage {
                doseNumber
                vaccine {
                    vaccineName
                }
            }
        }
    }

`

export const GET_VACINES = gql`
    query vaccine {
        vaccines {
            dosages {
                id
                doseNumber
            }
            vaccineName
        }
    }


`
