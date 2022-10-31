import {useStoreState} from "easy-peasy";
import DoctorAccount from "../Doctor/DoctorAccount";
import PatientAccount from "../Patient/PatientAccount";
import AdminAccount from "../Admin/AdminAccount";

const AccountWrapper = () => {
    const userDetails = useStoreState(state => state.user.userDetails)

    switch (userDetails.roleId) {
        case 3:
            return <AdminAccount/>
        case 1:
            return <DoctorAccount/>
        case 1:
            return <PatientAccount/>
    }
}

export default AccountWrapper;
