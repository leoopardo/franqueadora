import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-components";
import { ProFormSelectProducts } from "@franchise/components/proFormSelects/SelectProducts";
import { ProductParams } from "@franchise/services/service_orders/products/_interfaces/products.interface";
import {
  ArrowUpOnSquareIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import { getRelativeImagePath } from "@utils/gerRelativeImagePath";
import {
  Button,
  Card,
  Col,
  Input,
  notification,
  Row,
  Space,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { UploadType } from "antd/es/upload/interface";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

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
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } else {
    // Se for JSON, processar como JSON
    const data = await response.json();
    return data.generated_image_url; // Ajuste conforme necessário
  }
};

export const AddProduct = () => {
  const formRef = useRef<ProFormInstance>();
  const uploadRef = useRef<UploadType>(null);
  const [productQuery, setProductQuery] = useState<ProductParams>({
    type: "FOOD",
    page: 1,
    size: 200,
  });
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [generatingImage, setGeneratingImage] = useState<boolean>(false);
  const [, setFileLarge] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleGenerateImage = async () => {
    setGeneratingImage(true);
    try {
      const imageUrl = await generateImage(imagePrompt);

      formRef.current?.setFieldValue("image", imageUrl);
      setFiles([{ url: imageUrl }]);
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
    }
    setGeneratingImage(false);
  };

  const handleBeforeUpload = (file: any) => {
    const maxSizeMB = 0.5; // Tamanho máximo permitido em MB
    const maxSizeBytes = maxSizeMB * 1024 * 1024; // Converter MB para Bytes

    if (file.size > maxSizeBytes) {
      notification.error({
        message: `O tamanho da imagem deve ser menor que ${maxSizeMB}MB.`,
        duration: 5000,
      });
      setFileLarge(true);
    } else {
      setFileLarge(false);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      file.thumbUrl = e?.target?.result;
      setFiles([file]);
    };
    reader.readAsDataURL(file);
    return false; // Impede o upload automático
  };

  const { isSm } = useBreakpoints();
  return (
    <Row justify="center" style={{ width: "100%" }}>
      <Col
        style={{
          width: "100%",
          height: isSm ? "15vh" : "20vh",
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
              Gerencie os produtos do cardápio
            </Typography.Title>
            <Typography.Text style={{ lineHeight: 0 }}>
              Adicione, remova ou edite os produtos do cardápio criado.
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
              width: `${100}%`,
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
      <Card
        style={{
          maxHeight: isSm ? "65vh" : "70vh",
          minHeight: isSm ? "65vh" : "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
        }}
      >
        <Row justify="center" style={{ width: "100%" }} gutter={[16, 8]}>
          <Col xs={{ span: 24 }} md={{ span: 14 }}>
            <Card style={{ minHeight: "400px" }}>
              <ProForm
                formRef={formRef}
                submitter={false}
                initialValues={{ product_type: "FOOD", type: "UNIQUE" }}
              >
                <Row gutter={[8, 8]}>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <ProFormRadio.Group
                      name="product_type"
                      label="Tipo do produto"
                      rules={[{ required: true }]}
                      options={[
                        { label: "Alimento", value: "FOOD" },
                        { label: "Bebida", value: "DRINK" },
                        { label: "Outros", value: "OTHER" },
                      ]}
                      fieldProps={{
                        onChange: (e) => {
                          setProductQuery({
                            ...productQuery,
                            type: e.target.value,
                          });
                        },
                      }}
                    />
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <ProFormRadio.Group
                      name="type"
                      label="Tipo de cadastro"
                      rules={[{ required: true }]}
                      options={[
                        { label: "Produto único", value: "UNIQUE" },
                        { label: "Combo", value: "COMBO" },
                      ]}
                    />
                  </Col>
                  <ProFormDependency name={["type"]}>
                    {({ type }) => {
                      if (type === "COMBO") {
                        return (
                          <>
                            <Col xs={{ span: 24 }}>
                              <ProFormText
                                name="name"
                                label="Nome do combo"
                                rules={[{ required: true }]}
                                placeholder="Por favor, insira o nome do combo"
                                fieldProps={{ size: "large" }}
                              />
                            </Col>
                            <Col xs={{ span: 24 }}>
                              <ProForm.Item
                                name="image"
                                label="Imagem do combo"
                              >
                                {`${formRef?.current?.getFieldValue("image")}`?.split(
                                  "/"
                                )[0] !== "product_images" ? (
                                  <Upload.Dragger
                                    ref={uploadRef as any}
                                    style={{
                                      height: 150,
                                      width: "100%",
                                      display: formRef?.current?.getFieldValue(
                                        "image"
                                      )
                                        ? "none"
                                        : undefined,
                                    }}
                                    accept="image/*"
                                    height={150}
                                    maxCount={1}
                                    onChange={(file) => {
                                      setFiles(file.fileList);
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
                                            backgroundColor:
                                              defaultTheme.primary,
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
                                                setFileLarge(false);
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
                                      Suporta imagens de até 500KB (0.5MB).
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
                                          formRef.current?.setFieldValue(
                                            "image",
                                            null
                                          );
                                        }}
                                        icon={<TrashIcon height={24} />}
                                      ></Button>
                                    </Tooltip>
                                  </div>
                                )}
                              </ProForm.Item>
                            </Col>
                            <Col xs={{ span: 24 }}>
                              <ProForm.Item
                                help="Gere a imagem do produto com inteligência artificial, ou faça upload acima."
                                style={{ marginBottom: 32 }}
                              >
                                <Space.Compact
                                  style={{ width: "100%" }}
                                  size="large"
                                >
                                  <Input
                                    value={imagePrompt}
                                    onChange={(e) =>
                                      setImagePrompt(e.target.value)
                                    }
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
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <ProFormText
                                name="combo_description"
                                label="Descrição do combo"
                                placeholder="Por favor, insira a descrição do combo"
                                fieldProps={{ size: "large" }}
                              />
                            </Col>
                          </>
                        );
                      }
                      return (
                        <>
                          <Col xs={{ span: 24 }}>
                            <ProFormSelectProducts
                              name="products"
                              label="Nome(es) do(s) produto(s)"
                              rules={[{ required: true }]}
                              placeholder="Nome do produto"
                              query={productQuery}
                              mode="multiple"
                            />
                          </Col>
                          <Col xs={{ span: 24 }} md={{ span: 12 }}>
                            <ProFormText
                              name="description"
                              label="Descrição do produto"
                              placeholder="Nome do produto"
                              fieldProps={{ size: "large" }}
                            />
                          </Col>
                        </>
                      );
                    }}
                  </ProFormDependency>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <Space>
                      <ProFormDigit
                        name="price"
                        label="Preço de venda"
                        placeholder="0,00"
                        fieldProps={{
                          size: "large",
                          decimalSeparator: ",",
                          step: 0.01,
                          stringMode: true,
                          prefix: "R$",
                        }}
                      />
                      <ProForm.Item name="multiply" label="Multiplicar">
                        <Space>
                          <Button
                            shape="circle"
                            type="primary"
                            danger
                            icon={<MinusIcon height={18} />}
                            onClick={() => setMultiplier((prev) => prev - 1)}
                          />
                          <Typography.Title level={3} style={{ margin: 0 }}>
                            {multiplier}
                          </Typography.Title>
                          <Button
                            shape="circle"
                            type="primary"
                            icon={<PlusIcon height={18} />}
                            onClick={() => setMultiplier((prev) => prev + 1)}
                          />
                        </Space>
                      </ProForm.Item>
                    </Space>
                  </Col>
                </Row>
              </ProForm>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Card style={{ minHeight: "400px" }}></Card>
          </Col>
        </Row>
      </Card>
    </Row>
  );
};
