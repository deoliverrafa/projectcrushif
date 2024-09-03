import { NavBarReturn } from "../../layout/navbar.layout";
import { TermsLayout } from "../../layout/auth/terms.layout";

const TermsPage = () => {
    return (
        <>
            <NavBarReturn title="Política & Termos"/>

            <div className="select-none flex flex-col space-y-10 h-svh w-full">
                <TermsLayout />
            </div>
        </>
    )
}

export default TermsPage;