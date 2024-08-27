import { Services } from "../../../../services";
import { Col, Row } from "antd";
import { MutateMenu } from "./components/mutate";
import { parseImageDataFromFile } from "@utils/buffer_blob_utils";

export const CreateMenu = () => {
  const { mutate, isLoading, isSuccess, error } = Services.menu.create();
  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
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
        />
      </Col>
    </Row>
  );
};
