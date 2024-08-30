import { Avatar, Card } from "@nextui-org/react";
import { Button } from "./ui/button.js";
import { BadgeCheck } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SearchUserCard {
    avatar: string,
    nickname: string,
    type: string,
    _id: string,
    following: boolean
}

export default function SearchUserCard(props: SearchUserCard) {

    const [formData] = useState({
        userFollowId: props._id,
        token: localStorage.getItem('token')
    });

    const [followedUser, setFollowedUser] = useState(false)

    const FollowUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.put(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_FOLLOW_USER}`,
            formData
        ).then((response) => {
            setFollowedUser(response.data.followed)
        }).catch((error: any) => {
            console.log(error);
        })
    }

    return (
        <>
            <Card
                className="flex flex-row justify-around items-center my-2 py-3 px-1.5 w-11/12 max-w-[768px]"
                radius="lg"
            >
                <Link to={`/profile/${props._id}`}>
                    <div className="flex space-x-2 ">
                        <div className="flex relative ">
                            <div className="flex absolute  right-0 bottom-0 h-2 w-2 z-10">
                                <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                                <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
                            </div>
                            <Avatar
                                as="button"
                                className="font-poppins uppercase"
                                size="sm"
                                name={props.nickname}
                                src={props.avatar}
                            />
                        </div>
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <div className="flex flex-row items-center space-x-1">
                                <h4 className="font-inter text-xs font-bold leading-none">
                                    {props.nickname}
                                </h4>
                                <BadgeCheck className="text-success size-3" color={`${props.type == 'Admin' ? ('red') : ('green')}`} />
                            </div>

                            <h5 className="font-inter text-tiny tracking-tight text-default">@{props.nickname}</h5>
                        </div>
                    </div>
                </Link>
                <form action="" method="put" onSubmit={FollowUser}>
                    <Button
                    >
                        {props.following ? "Seguindo" : (followedUser ? "Seguindo" : "Seguir")}
                    </Button>
                </form>
            </Card>
        </>
    )
}