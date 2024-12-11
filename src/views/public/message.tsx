import * as React from "react";
import { io } from "socket.io-client";
import { Link, useParams } from "react-router-dom";

import { NavBarReturn } from "../../components/navbar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  ChevronRight,
  FatCornerUpRightSolid,
  UserSolid,
} from "@mynaui/icons-react";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { MessageReceived } from "../../components/message";

import axios from "axios"; // Importando o Axios

import { getUserDataById } from "../../utils/getUserDataById";
import { User } from "../../interfaces/userInterface";
import { getStatusUser } from "../../utils/getStatusUser.tsx";

const socket = io(`${import.meta.env.VITE_API_BASE_URL}`, {
  transports: ["websocket"],
  withCredentials: true,
});

interface Message {
  _id?: string;
  content: string;
  timestamp: string;
  senderId: string;
  receiverId: string;
  type: "sent" | "received";
  status: "sent" | "received" | "read";
}

const MessageLayout = () => {
  const { id } = useParams<string>();
  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );
  
  const [chatUser, setChatUser] = React.useState<User>();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [currentUserId] = React.useState(localStorage.getItem("userId"));
  const [activeChatUserId] = React.useState(id);
  const [newMessage, setNewMessage] = React.useState("");

  // Ref para o auto-scroll
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        const userData = await getUserDataById(id);
        setChatUser(userData);
      }
    };
    // Setando dados do usuário da conversa
    fetchUserData();
  }, [id]);

  React.useEffect(() => {
    if (messages.length > 0) {
      markMessagesAsRead();
    }
  }, [messages]);

  React.useEffect(() => {
    socket.emit("joinRoom", {
      senderId: currentUserId,
      receiverId: activeChatUserId,
    });

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/messages/${currentUserId}/${activeChatUserId}`,
          { withCredentials: true }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Erro ao buscar mensagens", error);
      }
    };

    fetchMessages();
  }, [currentUserId, activeChatUserId]);

  React.useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.emit("messageReceived", message._id);
    });

    socket.on("messageRead", (messageId) => {
      markMessagesAsRead();

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, status: "read" } : msg
        )
      );
    });

    socket.emit("register", currentUserId);

    socket.emit("joinChatRoom", currentUserId, chatUser?._id);

    return () => {
      socket.off("newMessage");
      socket.off("messageRead");
    };
  }, [chatUser]);

  React.useEffect(() => {
    socket.on("messageStatusUpdated", ({ messageId, status }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, status } : msg
        )
      );
    });

    socket.on("messagesUpdated", ({ receiverId, status }) => {
      if (receiverId === activeChatUserId) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.status !== "read" ? { ...msg, status } : msg
          )
        );
      }
    });

    return () => {
      socket.off("messageStatusUpdated");
      socket.off("messagesUpdated");
    };
  }, [activeChatUserId]);

  // Auto-scroll ao final do contêiner
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const message: Message = {
      senderId: currentUserId ?? "",
      receiverId: activeChatUserId ?? "",
      content: newMessage,
      status: "sent",
      type: "sent",
      timestamp: new Date().toISOString(),
    };

    try {
      socket.emit("sendMessage", message);
      setNewMessage("");
    } catch (error) {
      console.error("Erro ao enviar mensagem", error);
    }
  };

  const markMessagesAsRead = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/messages/markAsRead`,
        {
          senderId: currentUserId,
          receiverId: activeChatUserId,
        },
        { withCredentials: true }
      );

      socket.emit("messageRead", {
        senderId: currentUserId,
        receiverId: activeChatUserId,
      });
    } catch (error) {
      console.error("Erro ao marcar mensagens como lidas", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };
  
  getStatusUser(userId)

  return (
    <React.Fragment>
      <Card className="select-none mt-2 w-full md:w-6/12">
        <CardContent>
          <CardHeader className="flex flex-row justify-between items-center px-0 md:px-6">
            <Link
              to={`/profile/${activeChatUserId}`}
              className="flex flex-row items-center gap-2"
            >
              <div className="relative">
                <Avatar className="shadow-lg border-2 border-border">
                  <AvatarFallback>{chatUser?.nickname}</AvatarFallback>
                  <AvatarImage src={chatUser?.avatar} />
                </Avatar>
                <span
                  className={`border border-border h-2.5 w-2.5 bottom-0 right-1 rounded-full text-xs ${
                    chatUser?.status === "online"
                      ? "bg-success"
                      : "bg-secondary"
                  } absolute`}
                ></span>
              </div>
              <div className="flex flex-col">
                <CardTitle className="font-semibold md:font-medium text-md tracking-tight truncate max-w-[120px]">
                  {chatUser?.nickname}
                </CardTitle>
                <CardDescription className="text-xs truncate max-w-[120px]">
                  {chatUser?.userName}
                </CardDescription>
              </div>
              <ChevronRight />
            </Link>
            <Link to={`/profile/${activeChatUserId}`}>
              <Button size={"icon"} variant={"outline"}>
                <UserSolid />
              </Button>
            </Link>
          </CardHeader>

          <ScrollArea className="h-96 w-full rounded-md">
            {messages.map((message) => (
              <MessageReceived
                _id={message._id ?? ""}
                key={message._id || message.timestamp}
                content={message.content}
                insertAt={message.timestamp}
                type={message.type}
                status={message.status}
                isSender={message.senderId === currentUserId}
              />
            ))}
            {/* Div invisível para forçar o scroll */}
            <div ref={messagesEndRef} />
          </ScrollArea>

          <CardFooter className="flex flex-row justify-between gap-1 px-0 md:px-6 w-full">
            <Input
              type="text"
              placeholder="Adicione uma mensagem"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={sendMessage} variant={"outline"} size={"icon"}>
              <FatCornerUpRightSolid className="h-5 w-5" />
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const MessagePage = () => {
  return (
    <React.Fragment>
      <NavBarReturn title={"Mensagem"} />
      <main className="flex flex-col justify-center items-center h-full w-full">
        <MessageLayout />
      </main>
    </React.Fragment>
  );
};

export default MessagePage;
