import { Services } from "../../../../../../../services";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { parseImageDataFromFile } from "@utils/buffer_blob_utils";
import { Col, Modal } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MutateMenu } from "..";
import { AddProduct } from "../../../product/addProduct";

interface CreateMenuModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateMenuModal = ({ open, setOpen }: CreateMenuModalProps) => {
  const { mutate, isLoading, isSuccess, error, data, reset } =
    Services.menu.create(true);
  const [createdMenuId, setCreatedMenuId] = useState<string | null>(null);
  const { isSm } = useBreakpoints();

  useEffect(() => {
    if (isSuccess) {
      setCreatedMenuId(data?.id);
      reset();
    }
  }, [isSuccess]);

  return (
    <Modal
      open={open}
      footer={null}
      centered
      width={isSm ? undefined : "85vw"}
      onCancel={() => setOpen(false)}
      styles={{ content: { padding: 0, margin: 0 } }}
    >
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        {createdMenuId && <AddProduct menu_id={createdMenuId} />}
        {!createdMenuId && (
          <MutateMenu
            mutate={(data) => {
              mutate({
                ...data,
                promoter_name: "",
                promoter_document: "",
                client_name: "",
                client_document: "",
                groups: data.groups.map((group: any) => {
                  return {
                    ...group,
                    logo_image: parseImageDataFromFile(group.logo),
                  };
                }),
              });
            }}
            error={error}
            loading={isLoading}
            success={isSuccess}
            title="Cadastro de cardápio"
            subtitle="Preencha todos os campos para adicionar um novo cardápio"
            modal
          />
        )}
      </Col>
    </Modal>
  );
};
