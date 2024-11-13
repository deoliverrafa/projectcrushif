import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { HeartCheckSolid } from "@mynaui/icons-react";

interface Message {
  _id: string;
  content: string;
  insertAt: string;
  type: "sent" | "received";
  status: "sent" | "received" | "read";
  isSender: boolean
}

const getStatusIcon = (status: Message["status"]) => {
  switch (status) {
    case "sent":
      return <HeartCheckSolid className="h-3 w-3 text-info-foreground/50" />;
    case "received":
      return <HeartCheckSolid className="h-3 w-3 text-info-foreground" />;
    case "read":
      return <HeartCheckSolid className="h-3 w-3 text-primary" />;
  }
};

export const MessageReceived = (props: Message) => {
  return (
    <React.Fragment>
      <div
        className={`flex ${
          props.isSender ? "justify-end" : "justify-start"
        } mb-4`}
      >
        <div
          className={`max-w-[70%] p-3 rounded-lg ${
            props.isSender ? "bg-info text-info-foreground" : "bg-card border border-border"
          }`}
        >
          <p>{props.content}</p>
          <div className="flex justify-end items-center mt-1 space-x-1">
            <span className="text-xs opacity-70">
              {formatDistanceToNow(new Date(props.insertAt), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
            {props.isSender && getStatusIcon(props.status)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export const MessageSent = () => {
  return <React.Fragment></React.Fragment>;
};
