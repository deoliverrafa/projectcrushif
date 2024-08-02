import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from 'lodash';

import { NavBar } from "../../components/navbar";
import { BottomBar } from "../../components/bottombar";
import { CardPost } from "../../components/card";
import { Loading } from "./../../components/loading.tsx";
import { ToastCookies } from './../../components/cookies.tsx';
import { PublishButton } from './../../components/floatingButton.tsx';

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
    userId: string;
}

interface userData {
    _id: string;
    nickname: string;
    email: string;
    campus: string;
    avatar: string;
}

export default function HomePage() {

    const [userData, setUserData] = useState<userData | null>(null);
    const [finishedPosts, setFinishedPosts] = useState(false);
    const [posts, setPosts] = useState<CardProps[]>([]);
    const [skip, setSkip] = useState(0);
    const [limit] = useState(5);
    const [loading, setLoading] = useState(false);
    const [showCookies, setShowCookies] = useState(localStorage.getItem('showCookies') !== 'hidden');

    const handleHideCookies = () => {
        setShowCookies(false);
        localStorage.setItem('showCookies', 'hidden');
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = '/auth/login';
        }

        async function getUserData() {
            try {
                const response = await axios.get(`https://crush-api.vercel.app/user/token/${token}`);
                setUserData(response.data.userFinded);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.data.validToken === false) {
                    window.location.href = '/auth/login';
                }
            }
        }

        getUserData();
    }, []);

    useEffect(() => {
        async function getPosts() {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://crush-api.vercel.app/post/get/${token}/${skip}/${limit}`);

                if (response.data.validToken === false) {
                    window.location.href = '/auth/login';
                }
                if (response.data.posts.length === 0) {
                    setFinishedPosts(true);
                } else {
                    setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
                }
            } catch (error) {
                console.log("Erro ao buscar posts", error);
            } finally {
                setLoading(false);
            }
        }

        if (!finishedPosts) {
            getPosts();
        }
    }, [skip, finishedPosts]);

    useEffect(() => {
        const handleScroll = debounce(() => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading && !finishedPosts) {
                setSkip((prevSkip) => prevSkip + limit);
            }
        }, 200);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, limit, finishedPosts]);

    return (
        <>
            {userData ? (
                <div className="flex flex-col">
                    <NavBar user={userData} avatarPath={userData.avatar || localAvatarPath} />
                    {showCookies && <ToastCookies onClick={handleHideCookies} />}
                    <main className="w-full h-full flex flex-col justify-center items-center">
                        {posts.map((post) => (
                            <CardPost
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
                                userId={post.userId}
                                insertAt={post.insertAt}
                            />
                        ))}
                        {loading && <Loading />}
                    </main>
                    <div className="mt-10"></div>
                    <PublishButton />
                    <BottomBar className="appearance-in" />
                </div>
            ) : (
                <Loading />
            )}

            {
                loading ? (<Loading />) : (null)
            }
        </>
    );
}
