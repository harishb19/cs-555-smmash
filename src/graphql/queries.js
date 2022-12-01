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
                id
                doseNumber
                vaccine {
                    vaccineName
                }
            }
        }
    }

`
export const GET_PATIENT_RECORDS_SUB = gql`
    subscription getRecords($patientId: bigint!) {
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
                id
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
export const GET_VACCINE_LIST = gql`
    query getVaccineList{
      vaccines{
        id
        vaccineName
        sideEffect
        dosages{
          doseNumber
          startTimeMos
          endTimeMos
        }
      }
    }
`

export const GET_PATIENTS = gql`
    query getPatients($doctorId: bigint!) {
        patient(where: {doctorId: {_eq: $doctorId}}) {
            id
            firstName
            lastName
            dateOfBirth
            gender
            parentId
            user{
                id
                firstName
                lastName
                phoneNumber
                email
            }
        }
    }

`
export const GET_APPOINTMENTS = gql`
    query getAppointments($patientId: bigint!) {
      appointment(where: {patientId: {_eq: $patientId}}) {
        dateTime
        notes
      }
    }
`
export const GET_NOTIFICATIONS = gql`
    query getAllNotification($where: notifications_bool_exp) {
        notifications(where: $where){
            id
            title
            message
            recivers
            user{
                firstName
                lastName
            }
            sentBy
        }
    }
`

export const GET_NOTIFICATION_LOGS = gql`
    query getNotificationLogs($userId: bigint!) {
        allLog:notification_log(where: {user_id: {_is_null:true}}) {
            id
            message
            title
            topic
            createdAt
        }
        notification_log(where: {user_id: {_eq: $userId}}) {
            id
            message
            title
            topic
            createdAt
        }
    }

`
