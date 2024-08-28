import { Services } from "../../../../services";
import { formatCellPhoneBR, formatCPF, formatRG } from "@utils/regexFormat";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import { MutateClient } from "../components/mutate";

export const UpdateClient = () => {
  const { id } = useParams();
  const {update, byId} = Services.client
  const client = byId(id || "");
  const { mutate, isLoading, isSuccess, error } = update(id || "");

  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        <MutateClient
          mutate={(data) => {
            mutate({
              ...data,
              client: {
                physical: {
                  ...data.physical,
                  birthdate: `${new Date(data?.physical?.birthdate || "").toISOString()}`,
                  phone: data?.physical?.phone?.replace(/\D/g, ""),
                  cpf: data?.physical?.cpf?.replace(/\D/g, ""),
                  rg: data?.physical?.rg?.replace(/\D/g, ""),
                },
              },
              contacts: {
                master: {
                  ...data.master,
                  phone: data?.master?.phone?.replace(/\D/g, ""),
                  cpf: data?.master?.cpf?.replace(/\D/g, ""),
                },
                contacts: [],
              },
              physical: undefined,
              master: undefined,
            } as any);
          }}
          error={error}
          loading={isLoading || client.isLoading}
          success={isSuccess}
          title={`Editar cliente: ${client?.data?.ClientPerson?.name && client?.data?.ClientPerson?.name?.length > 21 ? `${client?.data?.ClientPerson?.name.substring(0, 21)}...` : client?.data?.ClientPerson?.name}`}
          subtitle="Preencha todos os campos para editar o cliente"
          initialValues={
            {
              physical: {
                ...client.data?.ClientPerson,
                ...client.data?.ClientAddress,
                address_number: client.data?.ClientAddress?.number || "",
                cpf: formatCPF(client.data?.ClientPerson?.cpf || ""),
                rg: formatRG(client.data?.ClientPerson?.rg || ""),
                module:
                  client.data?.ClientPOSModule?.map(
                    (module) => module.POSModule.id
                  ) || [],
                franchise_id: client?.data?.Franchise?.id || undefined,
                promoter_id: client?.data?.promoter_id|| undefined,
                phone: formatCellPhoneBR(client.data?.Master?.phone || ""),
              },
              master: {
                ...client.data?.Master,
                cpf: formatCPF(client.data?.Master?.document || ""),
                phone: formatCellPhoneBR(client.data?.Master?.phone || ""),
              },
            } as any
          }
          update
        />
      </Col>
    </Row>
  );
};
