import { NavBar } from "../../components/navbar";
import { Bottombar } from "../../components/bottombar";
import { useState, useEffect } from "react";
import Card from "../../components/card";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { debounce } from "lodash";

export default function HomePage() {
    const cardData = {
        _id: "123981391",
        nickname: "deoliverrafa",
        email: "deoliverrafa@gmail.com",
        campus: "IFTO",
        references: ["#IFTO", "#ÉOCRUSH"],
        content: "Alguem sabe onde compro meio kilo de JavaScript? "
    }

    const [userData, setUserData] = useState(null);
    const [bottomIsVisible, setBottomVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    console.log(bottomIsVisible);

    useEffect(() => {
        async function getUserData() {
            const userId = localStorage.getItem("userId");

            if (!userId || userId === "null") {
                window.location.href = "/auth/login";
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4040/user/${userId}`);
                setUserData(response.data.userFinded);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        getUserData();
    }, []);

    useEffect(() => {
        const handleScroll = debounce(() => {
            const currentScrollPos = window.pageYOffset;
            const isVisible = prevScrollPos > currentScrollPos;
            setBottomVisible(isVisible);
            setPrevScrollPos(currentScrollPos);
        }, 20);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    if (!userData) {
        return (
            <>
                <main className="bg-gray-200 dark:bg-zinc-700 p-5 h-auto w-full flex flex-col justify-center items-center">
                    <Spinner />
                </main>
            </>
        )
    }

    return (
        <>
            <NavBar user={cardData} />
            <main className="bg-gray-200 dark:bg-zinc-700 w-full h-full flex flex-col justify-center items-center">
                <Card CardData={cardData} />
                <Card CardData={cardData} />
                <Card CardData={cardData} />
                <Card CardData={cardData} />
                <Card CardData={cardData} />
                <Card CardData={cardData} />
                <Card CardData={cardData} />
                <Card CardData={cardData} />
            </main>
            <Bottombar className={`${bottomIsVisible ? 'animate-appearance-in' : 'animate-appearance-out'}`} />
        </>
    );
}