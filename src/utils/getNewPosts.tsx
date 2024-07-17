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

export function getNewPosts(skip: number, limit: number, userId: string) {

    const [posts, setNewPosts] = useState<Posts[]>([]);

    useEffect(() => {
        async function getPosts() {

            if (!userId || userId == "") {
                return;
            }

            try {
                const response = await axios.get(`https://crushapi-4ped.onrender.com/posts/get/${userId}/${skip}/${limit}`);
                setNewPosts(response.data.posts);
            } catch (error) {
                console.log("Erro ao buscar postagens", error);
            }
        }
        getPosts();
    }, []);
    return posts;
}