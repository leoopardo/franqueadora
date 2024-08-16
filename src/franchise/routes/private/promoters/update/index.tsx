import { Services } from "@franchise/services";
import { formatCellPhoneBR, formatCPF, formatRG } from "@utils/regexFormat";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import { MutatePromoter } from "../components/mutate";

export const UpdatePromoter = () => {
  const { id } = useParams();
  const { update, byId } = Services.promoter;
  const promoter = byId(id || "");
  const { mutate, isLoading, isSuccess, error } = update(id || "");

  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        <MutatePromoter
          mutate={(data) => {
            mutate({
              ...data,
              promoter: {
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
          loading={isLoading || promoter.isLoading}
          success={isSuccess}
          title={`Editar promotor: ${promoter?.data?.data?.PromoterPerson?.name && promoter?.data?.data?.PromoterPerson?.name?.length > 21 ? `${promoter?.data?.data?.PromoterPerson?.name.substring(0, 21)}...` : promoter?.data?.data?.PromoterPerson?.name}`}
          subtitle="Preencha todos os campos para editar o promotor"
          initialValues={
            {
              physical: {
                ...promoter.data?.data?.PromoterPerson,
                ...promoter.data?.data?.PromoterAddress,
                address_number:
                  promoter.data?.data?.PromoterAddress?.number || "",
                cpf: formatCPF(promoter.data?.data?.PromoterPerson?.cpf || ""),
                rg: formatRG(promoter.data?.data?.PromoterPerson?.rg || ""),
                module:
                  promoter.data?.data?.PromoterPOSModule?.map(
                    (module) => module?.POSModule?.id
                  ) || [],
                franchise_id: promoter?.data?.data?.Franchise?.id || undefined,
                phone: formatCellPhoneBR(
                  promoter.data?.data?.Master?.phone || ""
                ),
                client_manager: promoter?.data?.data?.client_manager || false,
              },
              master: {
                ...promoter.data?.data?.Master,
                cpf: formatCPF(promoter.data?.data?.Master?.document || ""),
                phone: formatCellPhoneBR(
                  promoter.data?.data?.Master?.phone || ""
                ),
              },
            } as any
          }
          update
        />
      </Col>
    </Row>
  );
};
