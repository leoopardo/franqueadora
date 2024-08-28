import { MailOutlined, MessageOutlined } from "@ant-design/icons";
import { CheckCard } from "@ant-design/pro-components";
import { getMeI } from "../../_franchisor/services/auth/useGetMe";
import { QueryKeys } from "../../_franchisor/services/queryKeys";
import { useSendToken } from "../../_franchisor/services/token/sendToken";
import { useValidateToken } from "../../_franchisor/services/token/validateToken";
import { Button, Input, Modal, Typography } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
              title={<Typography>Enviar token por e-mail</Typography>}
              description={
                <Typography>
                  Receba um token de autênticação de acesso por e-mail.
                </Typography>
              }
              value="email"
              style={{
                backgroundColor:
                  changeChannel === "email"
                    ? defaultTheme["primary-300"]
                    : undefined,
                width: "100%",
              }}
              avatar={
                <MailOutlined
                  style={{
                    fontSize: "24px",
                  }}
                />
              }
            />
            <CheckCard
              title={<Typography>Enviar token por SMS</Typography>}
              description={
                <Typography>
                  Receba um token de autênticação de acesso por SMS.
                </Typography>
              }
              value="sms"
              style={{
                width: "100%",
                backgroundColor:
                  changeChannel === "sms"
                    ? defaultTheme["primary-300"]
                    : undefined,
              }}
              avatar={
                <MessageOutlined
                  style={{
                    fontSize: "24px",
                  }}
                />
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
