import {gql} from "@apollo/client";

export const CHANGE_PATIENT_STATUS = gql`
    mutation Mutation($userId: bigint!, $status: String!) {
        update_users_by_pk(pk_columns: {id: $userId}, _set: {status: $status}) {
            id
        }
    }

`
