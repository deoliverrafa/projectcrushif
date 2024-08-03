// IMPORT - LIBRARYS //
import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from 'lodash';

// IMPORT - COMPONENTS //
import { NavBar, MenuBar } from "../../components/navbar";
import { BottomBar } from "../../components/bottombar";
import { Loading } from "./../../components/loading.tsx";
import { ToastCookies } from './../../components/cookies.tsx';
import { PublishButton } from './../../components/floatingButton.tsx';
import {
    CardPost,
    ModalPost
} from "../../components/card";
import {
    Button
} from '@nextui-org/react';

// IMPORT - ICONS //
import {
    CircleChevronDown
} from 'lucide-react';

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
                const response = await axios.get(`http://localhost:4040/user/token/${token}`);
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
                const response = await axios.get(`http://localhost:4040/post/get/${token}/${skip}/${limit}`);

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

    {/* FUNCTION - MODAL POST */ }
    const [openModalPost, setOpenModalPost] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [selectedReference, setSelectedReference] = useState('');
    const [saveNickname, setSaveNickName] = useState('');
    const [saveIsAnonymous, setSaveIsAnonymous] = useState(false);
    const [saveAvatar, setSaveAvatar] = useState('');

    const handleModalPost = (image: string, text: string, reference: string, nickname: string, anonymous: boolean, avatar: string) => {
        setSelectedImage(image);
        setSelectedText(text);
        setSelectedReference(reference);
        setSaveNickName(nickname);
        setSaveIsAnonymous(anonymous);
        setSaveAvatar(avatar);
        setOpenModalPost(true);
    };

    const handleModalPostClose = () => {
        setSelectedImage('');
        setSelectedText('');
        setSelectedReference('');
        setSaveNickName('');
        setSaveIsAnonymous(false);
        setSaveAvatar('');
        setOpenModalPost(false);
    };

    return (
        <>
            {userData ? (
                <div className="flex flex-col">
                    <NavBar user={userData} avatarPath={userData.avatar || localAvatarPath} />
                    <MenuBar />
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
                                handlePost={() => handleModalPost(post.photoURL, post.content, post.references, post.nickname, post.isAnonymous, post.userAvatar)}
                            />
                        ))}

                        {openModalPost && (
                            <ModalPost
                                photoURL={selectedImage}
                                content={selectedText}
                                references={selectedReference}
                                nickname={saveNickname}
                                isAnonymous={saveIsAnonymous}
                                userAvatar={saveAvatar}
                                email={userData.email}
                                campus={userData.campus}
                                handlePostClose={() => handleModalPostClose()}
                            />
                        )}
                        {loading && <Loading />}
                    </main>
                    <div className="mt-10"></div>
                    <div className="flex flex-col justify-center items-center">
                        <Button
                            className="animate-bounce"
                            color="primary"
                            variant="flat"
                            isIconOnly={true}
                        >
                            <CircleChevronDown />
                        </Button>
                    </div>
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
