import { useState, useEffect } from "react";
import axios from "axios";

import { NavBar } from "../../components/navbar";
import { BottomBar } from "../../components/bottombar";
import { CardPost } from "../../components/card";
import { Loading } from "./../../components/loading.tsx";
import { ToastCookies } from './../../components/cookies.tsx';
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
    const [showCookies, setShowCookies] = useState(localStorage.getItem('showCookies') !== 'hidden');
    
    const handleHideCookies = () => {
      setShowCookies(false);
      localStorage.setItem('showCookies', 'hidden');
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        async function getUserData() {
            if (!userId || userId === "null") {
                window.location.href = "/auth/login";
                return;
            }

            try {
                const response = await axios.get(`https://crush-api.vercel.app/user/${userId}`);

                if (!response) {
                    setTimeout(async () => { await axios.get(`https://crush-api.vercel.app/user/${userId}`) })
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
                const response = await axios.get(`https://crush-api.vercel.app/post/get/${userId}/${skip}/${limit}`)

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
        <div className="flex flex-col">
          <NavBar user={userData} avatarPath={userData.avatar ? userData.avatar : localAvatarPath} />
                        
          {showCookies && (
          <ToastCookies 
            onClick={handleHideCookies}
          />
          )}
          
          <main className="w-full h-full flex flex-col-reverse justify-center items-center">
                            {

                                posts?.map((post) => {
                                    return <CardPost
                                        key={post._id}
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
                        </main >
                        <div className="mt-10"></div>
                        <BottomBar className="appearance-in" />
                    </div>
                )
                :
                (
                  <Loading />
                )
            }
        </>
    );
}
