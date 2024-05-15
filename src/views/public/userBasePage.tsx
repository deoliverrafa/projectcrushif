import { NavBar } from "../../components/navbar";
import BaseUserShow from "../../components/baseUserShow";
import { getUserData } from "../../utils/getUserData";

export default function UserBasePage() {
    const userData = getUserData()

    return (
        <>
            <NavBar user={userData} />
            <BaseUserShow />
        </>
    )
}