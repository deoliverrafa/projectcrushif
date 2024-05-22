import { NavBar } from "../../components/navbar";
import { Bottombar } from "../../components/bottombar";
import { useState, useEffect } from "react";
import Card from "../../components/card";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
// import { debounce } from "lodash";


const localAvatarPath = localStorage.getItem('avatar') ?? "";

interface CardProps {
    _id: string;
    nickname: string;
    email: string;
    campus: string;
    references: string;
    content: string;
    isAnonymous: boolean;
    photoURL: string;
    userAvatar: string;
    insertAt: string;
}

interface userData {
    _id: string
    nickname: string,
    email: string,
    campus: string,
    avatar: string,
}
export default function HomePage() {
    
    const [userData, setUserData] = useState<userData | null>();
    const [posts, setPosts] = useState<CardProps[] | null>([]);
    // const [bottomIsVisible, setBottomVisible] = useState(true);
    // const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(0);

    console.log(posts);
    

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        async function getUserData() {
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

        async function getPosts() {
            try {
                setSkip(0)
                setLimit(10)
                const response = await axios.get(`https://crushapi-4ped.onrender.com/post/get/${userId}/${skip}/${limit}`)

                setPosts(response.data.posts)
            } catch (error) {
                console.log("Erro ao buscar posts", error);
            }

        }

        getPosts()
        getUserData();
    }, []);

    // useEffect(() => {
    //     const handleScroll = debounce(() => {
    //         const currentScrollPos = window.pageYOffset;
    //         const isVisible = prevScrollPos > currentScrollPos;
    //         setBottomVisible(isVisible);
    //         setPrevScrollPos(currentScrollPos);
    //     }, 20);

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <>
            {userData ?
                (
                    <div className="bg-gray-200 dark:bg-zinc-900">
                        < NavBar user={userData} avatarPath={userData.avatar ? userData.avatar : localAvatarPath} />
                        <main className="bg-gray-200 dark:bg-zinc-900 w-full h-full flex flex-col-reverse justify-center items-center">
                            {
                                posts?.map((post) => {

                                    return <Card key={post._id} 
                                    _id={post._id}
                                    campus={post.campus}
                                    content={post.content}
                                    email={post.email}
                                    isAnonymous={post.isAnonymous}
                                    nickname={post.nickname}
                                    references={post.references}
                                    userAvatar={post.userAvatar}
                                    photoURL={post.photoURL}
                                    insertAt={post.insertAt}
                                     />
                                })
                            }
                        </main>
                        <Bottombar className="appearance-in" />
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
