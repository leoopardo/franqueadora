import { MailOutlined, MessageOutlined } from "@ant-design/icons";
import { CheckCard } from "@ant-design/pro-components";
import { getMeI } from "@franchisor/services/auth/useGetMe";
import { QueryKeys } from "@franchisor/services/queryKeys";
import { useSendToken } from "@franchisor/services/token/sendToken";
import { useValidateToken } from "@franchisor/services/token/validateToken";
import { Avatar, Button, Input, Modal, Typography } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTheme } from "../../contexts/themeContext";
import { queryClient } from "../../services/queryClient";
import defaultTheme from "../../styles/default";

interface TokenModalI {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  loading?: boolean;
}

export const TokenModal = ({
  open,
  setOpen,
  onSuccess,
  loading,
}: TokenModalI) => {
  const [token, setToken] = useState<string>("");
  const channel = localStorage.getItem("tokenChannel");
  const [changeChannel, setChangeChannel] = useState<string>(channel || "");
  const [selectedChannel, setSelectedChannel] = useState<string>(channel || "");
  const { mutate } = useSendToken();
  const validate = useValidateToken({ onSuccess });

  const { theme } = useTheme();

  useEffect(() => {
    if (changeChannel) mutate();
  }, [changeChannel]);

  return (
    <Modal
      title={
        <div
          style={{
            width: "95%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Typography.Title style={{ marginTop: -5 }} level={5}>
            Autenticação
          </Typography.Title>
          {selectedChannel && (
            <Button
              type="link"
              style={{ marginTop: -10 }}
              onClick={() => {
                setSelectedChannel("");
                setChangeChannel("");
                localStorage.setItem("tokenChannel", "");
              }}
            >
              Alterar Canal ({selectedChannel.toUpperCase()})
            </Button>
          )}
        </div>
      }
      open={open}
      okText={selectedChannel ? "Enviar" : "Selecionar canal"}
      onOk={
        channel
          ? () => {
              validate.mutate(token);
            }
          : () => {
              setSelectedChannel(changeChannel);
              localStorage.setItem("tokenChannel", changeChannel);
            }
      }
      onCancel={() => setOpen(false)}
      confirmLoading={validate.isLoading || loading}
    >
      {!selectedChannel ? (
        <>
          <CheckCard.Group
            onChange={(value: any) => {
              setChangeChannel(value);
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
            }}
            defaultValue={changeChannel}
          >
            <CheckCard
              title={
                <Typography
                  style={{
                    color:
                      theme === "light"
                        ? "#000"
                        : changeChannel === "email"
                          ? "#000"
                          : "#fff",
                  }}
                >
                  Enviar token por e-mail
                </Typography>
              }
              description={
                <Typography
                  style={{
                    color:
                      theme === "light"
                        ? "#000"
                        : changeChannel === "email"
                          ? "#000"
                          : "#fff",
                  }}
                >
                  Receba um token de autênticação de acesso por e-mail.
                </Typography>
              }
              value="email"
              style={{
                width: "100%",
              }}
              avatar={
                <Avatar
                  size="large"
                  style={{
                    backgroundColor:
                      changeChannel === "email"
                        ? defaultTheme.primary
                        : undefined,
                  }}
                >
                  <MailOutlined
                    style={{
                      fontSize: "24px",
                    }}
                  />
                </Avatar>
              }
            />
            <CheckCard
              title={
                <Typography
                  style={{
                    color:
                      theme === "light"
                        ? "#000"
                        : changeChannel === "sms"
                          ? "#000"
                          : "#fff",
                  }}
                >
                  Enviar token por SMS
                </Typography>
              }
              description={
                <Typography
                  style={{
                    color:
                      theme === "light"
                        ? "#000"
                        : changeChannel === "sms"
                          ? "#000"
                          : "#fff",
                  }}
                >
                  Receba um token de autênticação de acesso por SMS.
                </Typography>
              }
              value="sms"
              style={{
                width: "100%",
              }}
              avatar={
                <Avatar
                  size="large"
                  style={{
                    backgroundColor:
                      changeChannel === "sms"
                        ? defaultTheme.primary
                        : undefined,
                  }}
                >
                  <MessageOutlined
                    style={{
                      fontSize: "24px",
                    }}
                  />
                </Avatar>
              }
            />
          </CheckCard.Group>
        </>
      ) : (
        <>
          <Typography.Text>
            Token enviado para (
            <span style={{ textTransform: "capitalize" }}>
              {selectedChannel}
            </span>
            :{" "}
            {`${(queryClient.getQueryData(QueryKeys.GET_ME) as getMeI)?.email
              ?.split("@")[0]
              ?.substring(
                0,
                (
                  queryClient.getQueryData(QueryKeys.GET_ME) as getMeI
                )?.email.split("@")[0].length - 3
              )}***@${
              (
                queryClient.getQueryData(QueryKeys.GET_ME) as getMeI
              )?.email?.split("@")[1]
            }`}
            )
          </Typography.Text>
          <Input.OTP
            length={6}
            size="large"
            style={{ width: "100%", height: 60 }}
            onChange={(value) => setToken(value)}
          />
        </>
      )}
    </Modal>
  );
};
