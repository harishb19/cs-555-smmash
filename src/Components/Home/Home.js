import {useEffect} from "react";
import {useStoreState} from "easy-peasy";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const userDetails = useStoreState(state => state.user.userDetails)

    useEffect(() => {
        if (userDetails && userDetails.roleId) {
            switch (userDetails.roleId) {
                case 1:
                    navigate('/patients/list')
                    break;
                case 2:
                    navigate('/vaccine')
                    break;
                case 3:
                    navigate('/patients/new')
                    break;
            }
        }

    }, [userDetails])
    return (<div>
        <h1>Home</h1>
    </div>)
}

export default Home;
