import { NavBar } from "../../components/navbar";
import { Bottombar } from "../../components/bottombar";
import { getUserData } from "../../utils/getUserData";
import Card from "../../components/card";
import { Spinner } from "@nextui-org/react";


export default function HomePage() {

    const cardData = {
        _id: "123981391",
        nickname: "deoliverrafa",
        email: "deoliverrafa@gmail.com",
        campus: "IFTO",
        references: ["#IFTO", "#ÉOCRUSH"],
        content: "Alguem sabe onde compro meio kilo de JavaScript? "
    }

    const userData = getUserData();

    if (!userData) {
        return (
            <>
                <main className="bg-gray-200 dark:bg-zinc-700 my-14 p-5 h-auto w-full flex flex-col justify-center items-center">
                    <Spinner />
                </main>
            </>
        )
    }

    return (
        <>
            <NavBar user={cardData} />

            <main className="bg-gray-200 dark:bg-zinc-700 my-14 p-5 min-h-full w-full flex flex-col justify-center items-center">

                <Card CardData={cardData} />
                <Card CardData={cardData} />
                <Card CardData={cardData} />
                <Card CardData={cardData} />
                <Card CardData={cardData} />
                
            </main>

            <Bottombar />
        </>
    );
}