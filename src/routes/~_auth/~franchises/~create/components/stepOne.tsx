import { ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-components';
import { Col, Divider, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../../../../hooks/useDebounce';
import { useGetCEP } from '../../../../../services/brasilApi/getCEP';
import { useGetCNPJ } from '../../../../../services/brasilApi/getCNPJ';
import { useGetDDDs } from '../../../../../services/brasilApi/getDDD';
import DDDlist from '../../../../../utils/DDD';

export const StepOne = () => {
    const [ddd, setDDD] = useState<string[]>([]);
  const [cep, setCep] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const { data } = useGetDDDs(ddd);
  const cnpjRequest = useGetCNPJ(cnpj);
  const stepOneRef = useRef<any>(null);
  const cepRequest = useGetCEP(cep);

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  useEffect(() => {
    if (cepRequest.data)
      stepOneRef.current.setFieldsValue({
        state: cepRequest?.data.state,
        city: cepRequest?.data.city,
        address: cepRequest?.data.street,
        neighborhood: cepRequest?.data.neighborhood,
      });
  }, [cepRequest.data]);

  useEffect(() => {
    if (cnpjRequest.data) {
      stepOneRef.current?.setFieldsValue({
        legal_name: cnpjRequest?.data.razao_social,
        name: cnpjRequest?.data.nome_fantasia,
        comercial_name: cnpjRequest?.data.nome_fantasia,
        estadual_subscription: cnpjRequest?.data.cnae_fiscal,
        cep: `${cnpjRequest?.data?.cep}`?.replace(/^(\d{5})(\d{3})$/, "$1-$2"),
        state: cnpjRequest?.data.uf,
        city: cnpjRequest?.data.municipio,
        address: cnpjRequest?.data.logradouro,
        neighborhood: cnpjRequest?.data.bairro,
        number: cnpjRequest?.data.numero,
      });
    }
  }, [cnpjRequest.data]);

  const formatCNPJ = (value: string) => {
    if (!value) return value;
    value = value.replace(/\D/g, "");
    value = value.substring(0, 14); // Garante que só há no máximo 14 dígitos
    if (value.length <= 14) {
      return value
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return value;
  };

  const formatCEP = (value: string) => {
    if (!value) return value;
    value = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    value = value.substring(0, 8); // Garante que só há no máximo 8 dígitos
    if (value.length === 8) {
      return value.replace(/^(\d{5})(\d{3})$/, "$1-$2"); // Formata o CEP no formato #####-###
    }
    return value;
  };

  const handleChangeCnpj = useDebounce((value) => {
    setCnpj(value);
    cnpjRequest.remove();
  }, 500);

  const handleChangeCEP = useDebounce((value) => {
    setCep(value);
  }, 500);

  useEffect(() => {
    if (cnpj && cnpjRequest.error) stepOneRef.current.validateFields(["cnpj"]);
  }, [cnpjRequest]);

  console.log(stepOneRef.current);
  return (
    <StepsForm.StepForm<{
        name: string;
        cnpj: number;
        legal_name: string;
      }>
        name="base"
        title="Informções da empresa"
        onFinish={async () => {
          await waitTime(2000);
          return true;
        }}
        size="large"
        grid
        formRef={stepOneRef}
      >
        <Row style={{ width: "100%" }} gutter={8}>
          {" "}
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <ProFormText
              name="cnpj"
              label="CNPJ"
              placeholder="Digite o CNPJ"
              rules={[
                { required: true, len: 18 },
                {
                  validator: () => {
                    if (cnpjRequest.error && !cnpjRequest.data) {
                      return Promise.reject(
                        (cnpjRequest?.error as any)?.response?.data
                          ?.message
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              fieldProps={{
                onChange: (e) => handleChangeCnpj(e.target.value),
                maxLength: 18,
              }}
              getValueFromEvent={(e) => formatCNPJ(e.target.value)}
            />
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <ProFormText
              name="name"
              label="Nome da franquia"
              placeholder="Digite o nome da franquia"
              rules={[{ required: true }]}
            />
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <ProFormText
              name="legal_name"
              label="Razão social"
              placeholder="Digite a razão social"
              rules={[{ required: true }]}
            />
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <ProFormText
              name="comercial_name"
              label="Nome fantasia"
              placeholder="Digite o nome fantasia"
              rules={[{ required: true }]}
            />
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <ProFormText
              name="estadual_subscription"
              label="Inscrição estadual"
              placeholder="Digite a inscição estadual"
              rules={[{ required: true }]}
            />
          </Col>
          <Col md={{ span: 24 }} xs={{ span: 24 }}>
            <Divider orientation="left">Endereço</Divider>
          </Col>
          <Col md={{ span: 4 }} xs={{ span: 24 }}>
            <ProFormText
              name="cep"
              label="CEP"
              placeholder="Digite o CEP"
              fieldProps={{
                onChange: (e) => {
                  handleChangeCEP(e.target.value);
                },
              }}
              getValueFromEvent={(e) => formatCEP(e.target.value)}
              rules={[{ required: true }]}
            />
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <ProFormText
              name="address"
              label="Endereço"
              placeholder="Digite o Endereço"
              rules={[{ required: true }]}
            />
          </Col>
          <Col md={{ span: 2 }}>
            <ProFormText
              name="number"
              label="Número"
              placeholder="000"
              rules={[{ required: true }]}
            />
          </Col>
          <Col md={{ span: 4 }} xs={{ span: 24 }}>
            <ProFormText
              name="state"
              label="Estado"
              placeholder="Digite o estado"
              rules={[{ required: true }]}
            />
          </Col>
          <Col md={{ span: 4 }} xs={{ span: 24 }}>
            <ProFormText
              name="city"
              label="Cidade"
              placeholder="Digite a cidade"
              rules={[{ required: true }]}
            />
          </Col>
          <Col md={{ span: 4 }} xs={{ span: 24 }}>
            <ProFormText
              name="neighborhood"
              label="Bairro"
              placeholder="Digite o bairro"
              rules={[{ required: true }]}
            />
          </Col>
          <Col md={{ span: 24 }} xs={{ span: 24 }}>
            <ProFormText
              name="complement"
              label="Complemento"
              placeholder="Digite algum complemento"
            />
          </Col>
          <Col md={{ span: 24 }} xs={{ span: 24 }}>
            <Divider orientation="left">Abrangência</Divider>
          </Col>
          <Col md={{ span: 4 }} xs={{ span: 24 }}>
            <ProFormSelect
              name="area_code"
              label="Código(s) de área(s)"
              placeholder="Selecione o DDD"
              mode="multiple"
              options={DDDlist}
              rules={[{ required: true }]}
              onChange={(value: any) => setDDD(value)}
              style={{ height: 50 }}
            />
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <ProFormSelect
              name="munic"
              label="Município(s)"
              placeholder="Selecione o município"
              mode="multiple"
              options={data?.cities}
              disabled={!data}
              rules={[{ required: true }]}
              style={{ height: 50 }}
            />
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <ProFormSelect
              name="modules"
              label="Módulos"
              placeholder="Selecione os módulos utilizados"
              mode="multiple"
              options={[
                { label: "Transação direta", value: "Transação direta" },
                { label: "Ingressos", value: "Ingressos" },
                { label: "Ficha", value: "Ficha" },
              ]}
              rules={[{ required: true }]}
              style={{ height: 50 }}
            />
          </Col>
        </Row>
      </StepsForm.StepForm>
  )
}
