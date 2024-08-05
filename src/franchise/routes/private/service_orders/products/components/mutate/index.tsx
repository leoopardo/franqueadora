import {
  ProCard,
  ProForm,
  ProFormField,
  ProFormInstance,
  ProFormRadio,
} from "@ant-design/pro-components";
import { TokenModal } from "@franchise/components/token";
import { AgreementType } from "@franchisor/services/franchises/__interfaces/agremeents.interface";
import {
  ArrowUpOnSquareIcon,
  CheckIcon,
  ChevronLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import { Button, Col, Row, Tooltip, Typography, Upload } from "antd";
import { UploadType } from "antd/es/upload/interface";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface mutateI {
  mutate: (body: any) => void;
  mutateAgreements?: (body: any) => void;
  loading?: boolean;
  getDataLoading?: boolean;
  success?: boolean;
  error?: any;
  title?: string;
  subtitle?: string;
  initialValues?: any;
  update?: boolean;
  agreements?: AgreementType[];
}

export const MutateProduct = ({
  loading,
  title,
  subtitle,
  initialValues,
  update,
  mutate,
}: mutateI) => {
  const uploadRef = useRef<UploadType>(null);
  const formRef = useRef<ProFormInstance>();
  const [width, setWidth] = useState<number>((100 / 2) * 1);
  const [step, setStep] = useState<number>(1);
  const [loadingStep, setLoadingStep] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isSm } = useBreakpoints();
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);

  const waitTime = (values: any) => {
    mutate(values);
    return new Promise<boolean>((resolve) => {
      return resolve(true);
    });
  };

  const initialFormValues: any = initialValues ?? {};

  useEffect(() => {
    console.log("initialFormValues", initialFormValues);

    if (initialFormValues) {
      formRef.current?.setFieldsValue(initialFormValues);
    }
  }, [initialFormValues]);

  console.log(formRef?.current?.getFieldValue("product_image"));

  return (
    <Row justify="center" style={{ width: "100%" }}>
      <Col
        style={{
          width: "100%",
          height: "20vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        span={24}
      >
        <Row
          style={{ width: "100%", height: "100%" }}
          justify="center"
          align="middle"
        >
          <Col xs={{ span: 20 }} md={{ span: 10 }}>
            <Typography.Title level={isSm ? 5 : 3} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            <Typography.Text style={{ lineHeight: 0 }}>
              {subtitle}
            </Typography.Text>
          </Col>
        </Row>
        <div
          style={{
            backgroundColor: "rgb(207, 207, 207, 0.2)",
            height: 5,
            width: "100%",
          }}
        >
          <motion.div
            style={{
              width: 0,
              minHeight: 5,
              borderRadius: 25,
              backgroundColor: defaultTheme.primary,
            }}
            animate={{
              width: `${width}%`,
              transition: {
                bounce: 0.8,
                bounceDamping: 1,
                stiffness: 30,
                type: "spring",
              },
            }}
          />
        </div>
      </Col>
      <ProCard
        style={{
          maxHeight: isSm ? undefined : "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            minHeight: "70vh",
          }}
        >
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <ProForm
              formRef={formRef}
              onFinish={waitTime}
              submitter={{
                render: () => [],
              }}
              style={{ width: "100%" }}
            >
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
                gutter={[8, 8]}
              >
                <Col span={24}>
                  <ProFormRadio.Group
                    name="type"
                    label="Tipo do produto"
                    options={[
                      { label: "Alimentação", value: "food" },
                      { label: "Bebida", value: "drink" },
                      { label: "Diversos", value: "other" },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <ProForm.Item name="product_image" label="Imagem do produto">
                    <Upload.Dragger
                      ref={uploadRef as any}
                      style={{
                        height: 150,
                        width: "100%",
                        display: formRef?.current?.getFieldValue(
                          "product_image"
                        )
                          ? "none"
                          : undefined,
                      }}
                      accept="image/*"
                      listType="picture-card"
                      height={150}
                      maxCount={1}
                      onChange={(file) => setFiles(file.fileList)}
                      showUploadList={{
                        showDownloadIcon: true,
                        downloadIcon: "Download",
                        showRemoveIcon: true,
                        removeIcon: (
                          <TrashIcon
                            height={20}
                            style={{
                              color: "#fff",
                              backgroundColor: defaultTheme.primary,
                            }}
                          />
                        ),
                      }}
                      fileList={files}
                      itemRender={(_, file) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              gap: 8,
                            }}
                          >
                            {" "}
                            <img
                              src={file.thumbUrl}
                              alt={file.name}
                              style={{
                                height: "250px",
                                width: "250px",
                                objectFit: "cover",
                                borderRadius: 12,
                              }}
                            />
                            <Tooltip title="Remover">
                              <Button
                                size="large"
                                type="text"
                                danger
                                onClick={() => {
                                  setFiles([]);
                                  formRef.current?.setFieldValue(
                                    "product_image",
                                    null
                                  );
                                }}
                                icon={<TrashIcon height={24} />}
                              ></Button>
                            </Tooltip>
                          </div>
                        );
                      }}
                    >
                      <ArrowUpOnSquareIcon
                        width={40}
                        style={{ color: defaultTheme.primary }}
                      />
                      <Typography.Title
                        level={4}
                        style={{ color: defaultTheme.primary }}
                      >
                        Clique ou arraste uma imagem.
                      </Typography.Title>
                      <Typography.Text>
                        Suporte imagens de até 5MB.
                      </Typography.Text>
                    </Upload.Dragger>
                  </ProForm.Item>
                </Col>{" "}
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  style={{
                    marginTop: formRef?.current?.getFieldValue("product_image")
                      ? "180px"
                      : undefined,
                  }}
                >
                  <ProFormField
                    name="name"
                    label="Nome do produto"
                    rules={[{ required: true }]}
                    fieldProps={{ size: "large" }}
                    placeholder={"Por favor, insira o nome do produto."}
                  />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  style={{
                    marginTop: formRef?.current?.getFieldValue("product_image")
                      ? "180px"
                      : undefined,
                  }}
                >
                  <ProFormField
                    name="description"
                    label="Descrição"
                    fieldProps={{ size: "large" }}
                    placeholder={"Por favor, insira a descrição."}
                  />
                </Col>
              </Row>
            </ProForm>
          </Col>
        </Row>
      </ProCard>

      <Col
        style={{
          width: "100%",
          height: "10vh",
          borderTop: "2px solid rgb(207, 207, 207, 0.4)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 34,
        }}
        span={24}
      >
        <Button
          shape="round"
          size="large"
          danger
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          icon={<ChevronLeftIcon style={{ height: 20 }} />}
          onClick={() => {
            if (step === 1) {
              navigate(-1);
              return;
            }
            setWidth((100 / 3) * (step - 1));
            setStep((curr) => curr - 1);
          }}
        >
          Voltar
        </Button>
        <Button
          shape="round"
          size="large"
          type="primary"
          onClick={() => {
            if (step !== 3) {
              formRef.current?.submit();
              setLoadingStep(true);
              setTimeout(() => setLoadingStep(false), 2000);
            } else {
              setIsTokenModalOpen(true);
            }
          }}
          loading={loadingStep || loading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          icon={<CheckIcon width={20} />}
        >
          {update ? "Salvar dados" : "Concluir cadastro"}
        </Button>
      </Col>

      {isTokenModalOpen && (
        <TokenModal
          setOpen={setIsTokenModalOpen}
          open={isTokenModalOpen}
          loading={loading}
          onSuccess={() => {
            formRef.current?.submit();
            setLoadingStep(true);
            setTimeout(() => setLoadingStep(false), 2000);
          }}
        />
      )}
    </Row>
  );
};
