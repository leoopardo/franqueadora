import { AgreementType } from "@franchisor/services/franchises/__interfaces/agremeents.interface";
import { createFranchiseI } from "@franchisor/services/franchises/__interfaces/create_franchise.interface";
import { Franchise } from "@franchisor/services/franchises/__interfaces/franchises.interface";
import { useGetFranchiseById } from "@franchisor/services/franchises/getFranchiseById";
import { useUpdateFranchise } from "@franchisor/services/franchises/updateFranchise";
import { formatCNPJ, formatCPF } from "@utils/regexFormat";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MutateFranchise } from "../components/mutate";
import { useUpdateAgreements } from "@franchisor/services/franchises/agreements/updateAgreements";

export const UpdateFranchise = () => {
  const { state } = useLocation();
  const { mutate, isLoading, isSuccess, error } = useUpdateFranchise(state.id);
  const mutateAgreements = useUpdateAgreements(state.id);
  const franchise = useGetFranchiseById(state.id);
  const [parsed, setParsed] = useState<createFranchiseI | null>(null);
  const [agreements, setAgreements] = useState<AgreementType[]>([]);

  useEffect(() => {
    function parseData(data: Franchise) {
      const address = data.FranchiseAddress;
      const module: string[] =
        data?.FranchisePOSModule?.map(
          (module) => module?.POSModule?.id || ""
        ) || [];

      if (data.FranchiseAgreement) {
        setAgreements(
          data.FranchiseAgreement?.map((a) => ({
            id: a?.AgreementTemplate?.id,
            name: a?.AgreementTemplate?.name,
            key: a?.AgreementTemplate?.key,
            active: true,
            type: a?.AgreementTemplate.type,
            value: a?.value,
            value_type: a?.AgreementTemplate.value_type,
          }))
        );
      }

      setParsed({
        address,
        module,
        cnpj: formatCNPJ(data.cnpj),
        franchise_name: data.franchise_name,
        commercial_name: data.commercial_name,
        company_name: data.company_name,
        state_registration: data.state_registration,
        master: {
          cpf: formatCPF(data?.Tenant?.UserTenant[0].User.document || ""),
          name: data?.Tenant?.UserTenant[0].User.name,
          email: data?.Tenant?.UserTenant[0].User.email,
          cellphone: data?.Tenant?.UserTenant[0].User.phone || "",
          username: data.username,
        },
        area_codes: data?.FranchiseOccuppationCounties?.map(
          (c) => c.County.AreaCode?.id || ""
        ),
        counties: data?.FranchiseOccuppationCounties?.map(
          (c) => c.County.id || ""
        ),
        licenses: {
          keys: data.FranchiseLicenses?.map((l) => l?.type ?? ""),
          LIVRE: data.FranchiseLicenses?.find((l) => l?.type === "LIVRE")
            ?.value,
          MENSAL: data.FranchiseLicenses?.find((l) => l?.type === "MENSAL")
            ?.value,
          AVULSO: data.FranchiseLicenses?.find((l) => l?.type === "AVULSO")
            ?.value,
        },
      });
    }
    if (franchise.data) parseData(franchise.data);
  }, [franchise.data]);

  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        {parsed && (
          <MutateFranchise
            mutate={mutate}
            mutateAgreements={mutateAgreements.mutate}
            update
            error={error}
            loading={isLoading || mutateAgreements.isLoading}
            success={isSuccess}
            initialValues={parsed}
            title={`Editar franquia: ${(parsed as any)?.franchise_name?.length > 21 ? `${(parsed as any)?.franchise_name.substring(0, 21)}...` : (parsed as any)?.franchise_name}`}
            subtitle="Altere as informações desejadas no cadastro da franquia"
            agreements={agreements}
          />
        )}
      </Col>
    </Row>
  );
};
