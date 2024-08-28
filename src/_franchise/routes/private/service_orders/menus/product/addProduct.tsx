import { PlusOutlined } from "@ant-design/icons";
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { ProFormSelectProducts } from "../../../../../components/proFormSelects/SelectProducts";
import { Services } from "../../../../../services";
import { ProductParams } from "../../../../../services/service_orders/products/_interfaces/products.interface";
import {
  ArrowUpOnSquareIcon,
  ChevronLeftIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import {
  blobUrlToFile,
  parseImageDataFromFile,
} from "@utils/buffer_blob_utils";
import { getRelativeImagePath } from "@utils/gerRelativeImagePath";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Input,
  InputRef,
  notification,
  Row,
  Space,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { UploadType } from "antd/es/upload/interface";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateProductModal } from "../../products/components/createProductModal";
import { ItemsList } from "./itemsList";

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

interface AddProductI {
  menu_id?: string;
}

export const AddProduct = ({ menu_id }: AddProductI) => {
  const { id } = useParams();
  const formRef = useRef<ProFormInstance>();
  const uploadRef = useRef<UploadType>(null);
  const [productQuery, setProductQuery] = useState<ProductParams>({
    type: "FOOD",
    page: 1,
    size: 200,
  });
  const { menuItem, createMenuItem } = Services.menu;
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [generatingImage, setGeneratingImage] = useState<boolean>(false);
  const [, setFileLarge] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);
  const [comboFiles, setComboFiles] = useState<any[]>([]);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [value, setValue] = useState<number>(0);
  const { data } = menuItem(id || menu_id);
  const { mutate, isSuccess, reset, isLoading } = createMenuItem(
    `${id || menu_id}`
  );
  const { isSm } = useBreakpoints();
  const navigate = useNavigate();
  const [serials, setSerials] = useState<string[]>([]);
  const [serial, setSerial] = useState<string>("");
  const inputRef = useRef<InputRef>(null);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState<boolean>(false);

  const handleGenerateImage = async () => {
    setGeneratingImage(true);
    try {
      const imageUrl = await generateImage(imagePrompt);

      formRef.current?.setFieldValue("image", imageUrl);
      setComboFiles([{ url: imageUrl }]);
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
    }
    setGeneratingImage(false);
  };

  const handleBeforeUpload = (
    file: any,
    setFile: Dispatch<SetStateAction<any>>
  ) => {
    const maxSizeMB = 0.5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

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
      setFile([file]);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSerial(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setSerials((state) => [...state, serial]);
    setSerial("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (isSuccess) {
      formRef.current?.resetFields();
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSuccess]);

  return (
    <Row justify="center" style={{ width: "100%" }}>
      <Col
        style={{
          width: "100%",
          height: menu_id ? "13vh" : isSm ? "15vh" : "20vh",
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
          <Col
            xs={{ span: 20 }}
            md={{ span: 24 }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
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
          maxHeight: menu_id ? "60vh" : isSm ? "65vh" : "70vh",
          minHeight: menu_id ? "60vh" : isSm ? "65vh" : "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
        }}
      >
        <Row
          justify="center"
          style={{
            width: "100%",
            flexDirection: isSm ? "column-reverse" : undefined,
          }}
          gutter={[16, 8]}
        >
          <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 14 }}>
            <Card style={{ minHeight: "400px" }}>
              <ProForm
                formRef={formRef}
                submitter={false}
                initialValues={{ product_type: "FOOD", type: "UNIQUE" }}
                onFinish={async (values) => {
                  let combo_image: any;
                  if (values.combo_image) {
                    if (typeof values?.combo_image === "string") {
                      combo_image = await parseImageDataFromFile(
                        await blobUrlToFile(values?.combo_image, "image.png")
                      );
                    } else {
                      combo_image = values?.combo_image?.file
                        ? await parseImageDataFromFile(
                            values?.combo_image?.file?.originFileObj ||
                              values?.combo_image?.file
                          )
                        : null;
                    }
                  }

                  mutate([
                    {
                      ...values,
                      products: values.products.map((id: string) => ({
                        product_id: id,
                      })),
                      order: (data?.Itens?.length || 0) + 1,
                      multiplier,
                      link_stock: false,
                      print_production_form:
                        values.print_production_form || false,
                      sale_limit: values.sale_limit || false,
                      available_quantity: values.available_quantity || null,
                      combo_image: combo_image?.image || undefined,
                      combo_image_extension:
                        combo_image?.image_extension || undefined,
                    },
                  ]);
                }}
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
                        { label: "Outros", value: "OTHERS" },
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
                                name="combo_name"
                                label="Nome do combo"
                                rules={[{ required: true }]}
                                placeholder="Por favor, insira o nome do combo"
                                fieldProps={{ size: "large" }}
                              />
                            </Col>
                            <Col xs={{ span: 22 }}>
                              <ProFormSelectProducts
                                name="products"
                                label="Produtos do combo"
                                rules={[{ required: true }]}
                                placeholder="Nome do produto"
                                query={productQuery}
                                mode="multiple"
                              />
                            </Col>
                            <Col
                              xs={{ span: 24 }}
                              md={{ span: 2 }}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Tooltip title="Cadastrar produto">
                                <Button
                                  type="primary"
                                  onClick={() =>
                                    setIsCreateProductModalOpen(true)
                                  }
                                  shape="circle"
                                >
                                  <PlusIcon height={24} />
                                </Button>
                              </Tooltip>
                            </Col>
                            <Col xs={{ span: 24 }}>
                              <ProForm.Item
                                name="combo_image"
                                label="Imagem do combo"
                              >
                                {`${formRef?.current?.getFieldValue("combo_image")}`?.split(
                                  "/"
                                )[0] !== "product_images" ? (
                                  <Upload.Dragger
                                    ref={uploadRef as any}
                                    style={{
                                      height: 150,
                                      width: "100%",
                                      display: formRef?.current?.getFieldValue(
                                        "combo_image"
                                      )
                                        ? "none"
                                        : undefined,
                                    }}
                                    accept="image/*"
                                    height={150}
                                    maxCount={1}
                                    onChange={(file) => {
                                      setComboFiles(file.fileList);
                                    }}
                                    beforeUpload={(file) =>
                                      handleBeforeUpload(file, setComboFiles)
                                    }
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
                                    fileList={comboFiles}
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
                                                setComboFiles([]);
                                                formRef.current?.setFieldValue(
                                                  "combo_image",
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
                                        formRef?.current?.getFieldValue(
                                          "combo_image"
                                        )
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
                            <Col xs={{ span: 24 }} md={{ span: 11 }}>
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
                          <Col xs={{ span: 22 }}>
                            <ProFormSelectProducts
                              name="products"
                              label="Nome(s) do(s) produto(s)"
                              rules={[{ required: true }]}
                              placeholder="Nome do produto"
                              query={productQuery}
                              mode="multiple"
                              fieldProps={{
                                maxCount: 1,
                              }}
                            />
                          </Col>
                          <Col
                            xs={{ span: 24 }}
                            md={{ span: 2 }}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Tooltip title="Cadastrar produto">
                              <Button
                                type="primary"
                                onClick={() =>
                                  setIsCreateProductModalOpen(true)
                                }
                                shape="circle"
                              >
                                <PlusIcon height={24} />
                              </Button>
                            </Tooltip>
                          </Col>
                          <Col xs={{ span: 24 }} md={{ span: 11 }}>
                            <ProFormText
                              name="description"
                              label="Descrição do produto"
                              placeholder="Por favor, insira a descrição do produto"
                              fieldProps={{ size: "large" }}
                            />
                          </Col>
                        </>
                      );
                    }}
                  </ProFormDependency>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <ProFormDigit
                      name="sale_price"
                      label="Preço de venda"
                      placeholder="0,00"
                      rules={[{ required: true }]}
                      fieldProps={{
                        size: "large",
                        decimalSeparator: ",",
                        step: 0.01,
                        stringMode: true,
                        prefix: "R$",
                        onChange(value) {
                          setValue(value || 0);
                        },
                      }}
                      help={
                        value && multiplier >= 2
                          ? `O valor multiplicado é: R$ ${value * multiplier}`
                          : ""
                      }
                    />
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 5 }}>
                    <ProForm.Item name="multiplier" label="Multiplicar">
                      <Space>
                        <Button
                          shape="circle"
                          type="primary"
                          danger
                          icon={<MinusIcon height={18} />}
                          onClick={() => setMultiplier((prev) => prev - 1)}
                          disabled={multiplier <= 1}
                        />
                        <Typography.Title level={4} style={{ margin: 0 }}>
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
                  </Col>
                  <Col span={24}>
                    <ProForm.Item
                      name={"product_logo"}
                      label="Vincular logo ao produto"
                    >
                      <Upload.Dragger
                        ref={uploadRef as any}
                        style={{
                          height: 150,
                          width: "100%",
                          display: formRef?.current?.getFieldValue(
                            "product_logo"
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
                        beforeUpload={(file) =>
                          handleBeforeUpload(file, setFiles)
                        }
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
                                      "product_logo",
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
                    </ProForm.Item>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 24 }}>
                    <ProFormSelect
                      name={"group_id"}
                      label={"Grupo do produto"}
                      rules={[{ required: true }]}
                      options={data?.Group?.map((group) => ({
                        label: group?.name,
                        value: group?.id,
                      }))}
                      fieldProps={{ size: "large" }}
                    />
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 6 }}>
                    <ProForm.Item name="sale_limit" valuePropName="checked">
                      <Checkbox>Limitar venda</Checkbox>
                    </ProForm.Item>
                  </Col>
                  <ProFormDependency name={["sale_limit"]}>
                    {({ sale_limit }) => {
                      if (!sale_limit) return null;
                      return (
                        <Col xs={{ span: 24 }} md={{ span: 18 }}>
                          <ProFormDigit
                            name="available_quantity"
                            label="Quantidade disponível"
                            fieldProps={{ size: "large" }}
                          />
                        </Col>
                      );
                    }}
                  </ProFormDependency>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <ProForm.Item
                      name="print_production_form"
                      valuePropName="checked"
                    >
                      <Checkbox>Imprimir ficha de produção</Checkbox>
                    </ProForm.Item>
                  </Col>

                  <Col xs={{ span: 24 }} md={{ span: 24 }}>
                    <ProFormSelect
                      label="Ingredientes base"
                      mode="multiple"
                      fieldProps={{
                        size: "large",
                        maxTagCount: 2,
                        dropdownRender: (menu) => (
                          <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                            <Space
                              style={{ padding: "0 8px 4px", width: "100%" }}
                            >
                              <Input
                                placeholder="Digíte o número de série"
                                ref={inputRef}
                                value={serial}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                                style={{ width: "100%" }}
                              />
                              <Button
                                type="text"
                                icon={<PlusOutlined />}
                                onClick={addItem}
                                disabled={!serial}
                              >
                                Add ingrediente
                              </Button>
                            </Space>
                          </>
                        ),
                      }}
                      name="ingredients"
                      showSearch
                      allowClear
                      placeholder="Selecione os ingredientes base."
                      options={serials}
                    />
                  </Col>
                </Row>
              </ProForm>
            </Card>
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 10 }}
            xxl={{ span: 8 }}
          >
            <ItemsList data={data} menu_id={menu_id} />
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 14 }}
            xxl={{ span: 14 }}
          >
            <Card></Card>
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 10 }}
            xxl={{ span: 8 }}
          ></Col>
        </Row>
      </Card>
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
            navigate("/fichas/cardapio");
          }}
        >
          Voltar
        </Button>
        <Button
          shape="round"
          size="large"
          type="primary"
          onClick={() => {
            formRef.current?.submit();
          }}
          loading={isLoading}
        >
          {"Adicionar produto"}
        </Button>
      </Col>

      {isCreateProductModalOpen && (
        <CreateProductModal
          open={isCreateProductModalOpen}
          setOpen={setIsCreateProductModalOpen}
        />
      )}
    </Row>
  );
};
