import * as React from "react";
import { io } from "socket.io-client";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  ChevronLeft,
  FatCornerUpRightSolid,
  Home,
} from "@mynaui/icons-react";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { MessageReceived } from "../../components/message";

import axios from "axios"; // Importando o Axios

import { getUserDataById } from "../../utils/getUserDataById";
import { User } from "../../interfaces/userInterface";
import { UserFollowing } from "../../components/userSuggestions";
import LoadingPage from "./loading";
import { Fab } from "../../components/ui/fab";
// import { id } from "date-fns/locale";

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
  // const navigate = useNavigate();

  const { id: activeChatUserId } = useParams<string>();
  const prevId = React.useRef<string>();
  const [chatUser, setChatUser] = React.useState<User>();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [currentUserId] = React.useState(localStorage.getItem("userId"));
  const [newMessage, setNewMessage] = React.useState("");
  const [userJoined, setUserJoined] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const handleDisconnect = () => {
    if (currentUserId && activeChatUserId) {
      socket.emit("leaveRoom", {
        senderId: currentUserId,
        receiverId: activeChatUserId,
      });
      socket.disconnect();
      console.log(
        `Usuário ${currentUserId} saiu da sala com ${activeChatUserId}`
      );
    }
  };

  // Ref para o auto-scroll
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (activeChatUserId) {
        const userData = await getUserDataById(activeChatUserId);
        setChatUser(userData);
        setLoading(false);
      }
    };
    // Setando dados do usuário da conversa
    fetchUserData();
  }, [activeChatUserId]);

  React.useEffect(() => {
    if (messages.length > 0 && activeChatUserId) {
      markMessagesAsRead();
    }
  }, [messages]);

  React.useEffect(() => {
    if (currentUserId && activeChatUserId) {
      socket.emit("joinRoom", {
        senderId: currentUserId,
        receiverId: activeChatUserId,
      });

      const handleUserEntered = (userId: string, roomId: string) => {
        if (userId !== currentUserId) {
          console.log(`Usuário ${userId} entrou na sala ${roomId}`);
          setUserJoined(true);
        }
      };
      interface UserDisconnectedPayload {
        userId: string;
      }
      const handleUserDisconnected = ({ userId }: UserDisconnectedPayload) => {
        if (userId === activeChatUserId) {
          console.log("Usuário desconectado do chat ativo");
          setUserJoined(false);
        }
      };

      socket.on("userEntered", handleUserEntered);
      socket.on("userDisconnected", handleUserDisconnected);

      return () => {
        socket.off("userEntered", handleUserEntered);
        socket.off("userDisconnected", handleUserDisconnected);
      };
    }
  }, [currentUserId, activeChatUserId]);

  React.useEffect(() => {
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
    if (messages.length == 0 || activeChatUserId != prevId.current) {
      fetchMessages();
      prevId.current = activeChatUserId;
    }
  }, [activeChatUserId]);

  React.useEffect(() => {
    socket.on("newMessage", (message) => {
      setCheckMessage(true);
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.emit("messageReceived", message._id);
    });

    socket.emit("register", currentUserId);

    socket.emit("joinChatRoom", currentUserId, chatUser?._id);

    return () => {
      socket.off("newMessage");
      // socket.off("messageRead");
    };
  }, [chatUser]);

  // Variável para fazer o controle da renderização e update do status da mensagem
  const [checkMessage, setCheckMessage] = React.useState(false);

  React.useEffect(() => {
    socket.on("messageStatusUpdated", ({ messageId, status }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, status } : msg
        )
      );
    });

    socket.on("messageReadStatus", ({ messageId, status }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, status } : msg
        )
      );
    });

    socket.on("messagesUpdated", ({ receiverId, status }) => {
      if (receiverId === activeChatUserId) {
        setCheckMessage((prevCheckMessage) => {
          if (prevCheckMessage || checkMessage) {
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.status !== "read" ? { ...msg, status } : msg
              )
            );
            return false;
          }
          return prevCheckMessage;
        });
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

      if (activeChatUserId && currentUserId) {
        socket.emit("markMessagesAsRead", {
          senderId: currentUserId,
          receiverId: activeChatUserId,
        });
      }
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
  const navigate = useNavigate();

  if (loading || !chatUser) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <Card className="select-none mt-1 w-full md:w-6/12">
        <CardContent>
          <CardHeader className=" transition-transform duration-300 select-none bg-card shadow sticky top-0 inset-x-0 translate-y-0 md:translate-y-0/2 flex flex-row justify-between items-center px-0 md:px-6 w-full z-20">
            <div className="flex flex-row items-center gap-2">
              <Button
                variant={"outline"}
                size={"icon"}
                className="text-muted-foreground hover:text-primary/70 hover:border-primary/70"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft />
              </Button>

              <Link
                to={`/profile/${activeChatUserId}`}
                className="flex flex-row items-center gap-2"
              >
                <div
                  className="relative"
                  onClick={() => {
                    handleDisconnect;
                  }}
                >
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
                  <CardDescription className="text-warning text-xs truncate max-w-[120px]">
                    {userJoined ? "Está no chat" : null}
                  </CardDescription>
                </div>
                <ChevronRight />
              </Link>
            </div>
          </CardHeader>

          <ScrollArea className="h-screen md:h-96 w-full rounded-md">
            {messages.map((message) => {
              return (
                <MessageReceived
                  _id={message._id ?? ""}
                  key={message._id || message.timestamp}
                  content={message.content}
                  insertAt={message.timestamp}
                  type={message.type}
                  status={message.status}
                  isSender={message.senderId === currentUserId}
                />
              );
            })}

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
            <Link to={"/"} className="max-md:hidden">
              <Fab>
                <Home></Home>
              </Fab>
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const MessagePage = () => {
  return (
    <React.Fragment>
      <main className="flex flex-col justify-center items-center h-fit w-full">
        <UserFollowing redirectPage="message" />
        <MessageLayout />
      </main>
    </React.Fragment>
  );
};

export default MessagePage;
