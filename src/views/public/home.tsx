import { NavBar } from "../../components/navbar";
import { Bottombar } from "../../components/bottombar";
import { useState, useEffect } from "react";
import Card from "../../components/card";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { debounce } from "lodash";
const localAvatarPath = localStorage.getItem('avatar') ?? "";

export default function HomePage() {
    const cardData = {
        _id: "123981391",
        nickname: "deoliverrafa",
        email: "deoliverrafa@gmail.com",
        campus: "IFTO",
        references: "#IFTO #ÉOCRUSH",
        content: "Alguem sabe onde compro meio kilo de JavaScript? ",
        isAnonymous: false
    }

    const [userData, setUserData] = useState(null);
    const [bottomIsVisible, setBottomVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    useEffect(() => {
        async function getUserData() {
            const userId = localStorage.getItem("userId");

            if (!userId || userId === "null") {
                window.location.href = "/auth/login";
                return;
            }

            try {
                const response = await axios.get(`https://crushapi-4ped.onrender.com/user/${userId}`);

                if (!response) {
                    setTimeout(async () => { await axios.get(`https://crushapi-4ped.onrender.com/user/${userId}`) })
                }
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

    return (
        <>
            {userData ?
                (
                    <div className="">
                        < NavBar user={userData} avatarPath={localAvatarPath} />
                        <main className="bg-gray-200 dark:bg-zinc-700 w-full h-full flex flex-col justify-center items-center">
                            <Card CardData={cardData} />
                            <Card CardData={cardData} />
                            <Card CardData={cardData} />
                            <Card CardData={cardData} />
                            <Card CardData={cardData} />
                        </main>
                        <Bottombar className={`${bottomIsVisible ? 'animate-appearance-in' : 'animate-appearance-out'}`} />
                    </div>
                )
                :
                (
                    <div className="w-dvw h-dvh flex flex-row justify-center items-center">
                        <div className="flex flex-row gap-3 justify-center items-center">
                            <Spinner size="lg" />
                            <h1>Aguarde...</h1>
                        </div>
                    </div>
                )

            }
        </>
    );
}
