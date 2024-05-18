import axios from "axios";
import { useEffect, useState } from "react";

interface Posts {
    _id: string
    nickname: string
    email: string
    campus: string
    references: string
    content: string
    isAnonymous: string
    photoURL: string
}

export function getNewPosts(skip: number, limit: number) {

    const [posts, setNewPosts] = useState<Posts[]>([]);

    useEffect(() => {
        async function getPosts() {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                return;
            }

            try {
                const response = await axios.get(`https://crushapi-4ped.onrender.com/posts/get/${userId}/${userId}/${skip}/${limit}`);
                console.log(response);
                setNewPosts(response.data.posts);
                return response.data.posts
            } catch (error) {
                console.log("Erro ao buscar postagens", error);
            }
        }
        getPosts();

    }, []);

    return posts;
}