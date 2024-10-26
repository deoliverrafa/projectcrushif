import { At, HeartWaves } from '@mynaui/icons-react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx";

// DESCARTADO A USABILIDADE
interface PostUser {
    _id: string
    nickname: string
    userName: string
    email: string
    campus: string
    avatar: string
    birthdaydata: string
    Nfollowing: number
    Nfollowers: number
    following: string[]
    followers: string[]
    curso: string
}

interface User {
    nickname: string
    avatar: string
}


interface CommentProps {
    postUser: PostUser
    userData: User
    comment?: string
    errorComment?: string
    statusComment: boolean
}

export const Comment = (props: CommentProps) => {

    return (
        <div>
            <Avatar className="shadow-lg border-2 border-secondary">
                <AvatarFallback>{props.postUser.nickname}</AvatarFallback>

                <AvatarImage src={props.postUser.avatar} />
            </Avatar>

            <div className="rounded-lg bg-card border border-border p-4 w-auto max-w-[75%] shadow-sm">
                <div className="flex flex-row justify-center items-center space-x-1">
                    <div className="flex flex-row items-center">
                        <At className="w-3 h-3" />
                        <p className="text-muted-foreground font-poppins font-semibold md:font-medium text-xs tracking-tight">
                            {props.userData.nickname}
                        </p>
                    </div>

                    <HeartWaves className="text-background fill-success h-4 w-4" />
                </div>
                <div className="flex flex-row items-center">
                    <p className="font-poppins font-medium md:font-normal text-xs">
                        {props.comment ? props.comment : (props.errorComment ? props.errorComment : "Mensagem de teste que nao vale nada, apenas para testar a responsabilidade do site")}
                    </p>
                </div>
                <p className="font-poppins text-muted-foreground font-normal md:font-light tracking-tight text-xs">
                    há 4 dias atrás
                </p>
                </div>
            </div>
            )
}