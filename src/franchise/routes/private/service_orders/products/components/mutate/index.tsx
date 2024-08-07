import {
  ProCard,
  ProForm,
  ProFormField,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
} from "@ant-design/pro-components";
import { TokenModal } from "@franchise/components/token";
import { useGetAvaliableProductCode } from "@franchise/services/service_orders/products/getAvaliableProductCode";
import { useGetUnits } from "@franchise/services/service_orders/products/getProductUnits";
import { AgreementType } from "@franchisor/services/franchises/__interfaces/agremeents.interface";
import {
  ArrowUpOnSquareIcon,
  CheckIcon,
  ChevronLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import { getRelativeImagePath } from "@utils/gerRelativeImagePath";
import {
  Button,
  Col,
  Input,
  Row,
  Space,
  Tooltip,
  Typography,
  Upload,
} from "antd";
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

const generateImage = async (prompt: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_AI_KEY; // Substitua pela sua chave de API do DeepAI
  const response = await fetch(
    "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro: ${response.statusText}`);
  }

  // Verifique o tipo de resposta para ver se é uma imagem
  const contentType = response.headers.get("Content-Type");
  if (contentType?.startsWith("image/")) {
    // Converter a resposta binária em URL de imagem
    const blob = await response.blob();
    console.log(blob);

    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } else {
    // Se for JSON, processar como JSON
    const data = await response.json();
    return data.generated_image_url; // Ajuste conforme necessário
  }
};

// const generateImageSecondary = async (prompt: string): Promise<string> => {
//   const response = await fetch("https://api.openai.com/v1/images/generations", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "model": "dall-e-2",
//       prompt: prompt, // A propriedade 'prompt' deve ser usada conforme a documentação da API
//       n: 1, // Número de imagens a serem geradas
//       size: "256x256", // Tamanho da imagem (opcional)
//       quality: "standard"
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`Erro: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data.data[0].url; // Ajuste conforme a estrutura de resposta da API
// };

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
  const { data } = useGetAvaliableProductCode();
  const units = useGetUnits();
  const [currType, setCurrType] = useState<string>("food");
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [generatingImage, setGeneratingImage] = useState<boolean>(false);

  const waitTime = (values: any) => {
    mutate(values);
    return new Promise<boolean>((resolve) => {
      return resolve(true);
    });
  };

  const initialFormValues: any = initialValues ?? {};

  useEffect(() => {
    if (initialFormValues) {
      formRef.current?.setFieldsValue(initialFormValues);
    }
  }, [initialFormValues]);

  useEffect(() => {
    if (initialValues) {
      formRef.current?.setFieldsValue({ ...initialValues });
      return;
    }
    formRef.current?.setFieldsValue({
      type: "FOOD",
      code: data?.available_code,
      is_additional: false,
    });
  }, [data, initialValues]);

  console.log(initialValues);

  const unitByType = {
    drink: ["Litros (l)", "Mililitros (ml)", "Unidade (un)"],
  };

  const handleGenerateImage = async () => {
    setGeneratingImage(true);
    try {
      const imageUrl = await generateImage(imagePrompt);
      console.log(imageUrl);

      formRef.current?.setFieldValue("image", imageUrl);
      setFiles([{ url: imageUrl }]);
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
    }
    setGeneratingImage(false);
  };

  const handleBeforeUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      file.thumbUrl = e?.target?.result;
      setFiles([file]);
    };
    reader.readAsDataURL(file);
    return false; // Impede o upload automático
  };

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
          <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
            <ProForm
              formRef={formRef}
              onFinish={waitTime}
              submitter={{
                render: () => [],
              }}
              style={{ width: "100%" }}
              initialValues={initialFormValues}
            >
              <Row
                style={{
                  display: "flex",
                  width: "100%",
                }}
                gutter={[8, 8]}
              >
                <Col span={15}>
                  <ProFormRadio.Group
                    name="type"
                    label="Tipo do produto"
                    options={[
                      { label: "Alimentação", value: "FOOD" },
                      { label: "Bebida", value: "DRINK" },
                      { label: "Diversos", value: "OTHER" },
                    ]}
                    fieldProps={{
                      size: "large",
                      onChange: (e) => {
                        setCurrType(e.target.value);
                      },
                    }}
                  />
                </Col>
                <Col span={9}>
                  <ProFormRadio.Group
                    name="is_additional"
                    label="Incluir produto como adicional?"
                    options={[
                      { label: "Não", value: false },
                      { label: "Sim", value: true },
                    ]}
                    fieldProps={{
                      size: "large",
                      onChange: (e) => {
                        setCurrType(e.target.value);
                      },
                    }}
                  />
                </Col>
                <Col span={24}>
                  <ProForm.Item name="image" label="Imagem do produto">
                    {`${formRef?.current?.getFieldValue("image")}`?.split(
                      "/"
                    )[0] !== "product_images" ? (
                      <Upload.Dragger
                        ref={uploadRef as any}
                        style={{
                          height: 150,
                          width: "100%",
                          display: formRef?.current?.getFieldValue("image")
                            ? "none"
                            : undefined,
                        }}
                        accept="image/*"
                        height={150}
                        maxCount={1}
                        onChange={(file) => {
                          setFiles(file.fileList);
                          console.log(file);
                        }}
                        beforeUpload={handleBeforeUpload}
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
                              <img
                                src={file?.thumbUrl || file?.url}
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
                                      "image",
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
                          Selecione ou arraste uma imagem.
                        </Typography.Title>
                        <Typography.Text>
                          Suporta imagens de até 5MB.
                        </Typography.Text>
                      </Upload.Dragger>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: 8,
                        }}
                      >
                        <img
                          src={getRelativeImagePath(
                            formRef?.current?.getFieldValue("image")
                          )}
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
                              formRef.current?.setFieldValue("image", null);
                            }}
                            icon={<TrashIcon height={24} />}
                          ></Button>
                        </Tooltip>
                      </div>
                    )}
                  </ProForm.Item>
                  <ProForm.Item
                    help="Gere a imagem do produto com inteligência artificial, ou faça upload acima."
                    style={{ marginBottom: 32 }}
                  >
                    <Space.Compact style={{ width: "100%" }} size="large">
                      <Input
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="Digite um prompt para gerar a imagem"
                        style={{ flex: 1 }}
                        size="large"
                      />
                      <Button
                        type="primary"
                        onClick={handleGenerateImage}
                        loading={generatingImage}
                        size="large"
                      >
                        Gerar Imagem
                      </Button>
                    </Space.Compact>
                  </ProForm.Item>
                </Col>{" "}
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <ProFormField
                    name="name"
                    label="Nome do produto"
                    rules={[{ required: true }]}
                    fieldProps={{ size: "large" }}
                    placeholder={"Por favor, insira o nome do produto."}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <ProFormField
                    name="description"
                    label="Descrição"
                    fieldProps={{ size: "large" }}
                    placeholder={"Por favor, insira a descrição."}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <ProFormField
                    name="code"
                    label="Código do produto"
                    fieldProps={{ size: "large" }}
                    placeholder={"000000"}
                    disabled
                    help="O código do produto é gerado automaticamente."
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <ProFormSelect
                    name="consumption_unit_id"
                    label="Consumo em"
                    fieldProps={{ size: "large" }}
                    help="Unidade de medida do produto."
                    options={units?.data?.items
                      ?.filter((un) => {
                        if (currType === "DRINK") {
                          return unitByType.drink.includes(un.name);
                        } else return true;
                      })
                      ?.map((unit) => ({
                        label: unit.name,
                        value: unit.id,
                      }))}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <ProFormField
                    name="brand"
                    label="Marca"
                    rules={[{ required: true }]}
                    fieldProps={{ size: "large" }}
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
