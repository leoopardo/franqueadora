import { HeartOutlined } from "@ant-design/icons";
import {
  ProFormInstance,
  ProFormList,
  StepsForm,
} from "@ant-design/pro-components";
import { PaymentType } from "@franchise/services/events/__interfaces/selects.interface";
import { getSelectsData } from "@franchise/services/events/getSelectsData";
import {
  BanknotesIcon,
  Bars3Icon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  FaceSmileIcon,
  InformationCircleIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { Button, Col, Input, Row, Typography } from "antd";
import { Reorder } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../../../../../../../../contexts/themeContext";

export const SectorPaymentsStep = () => {
  const stepOneRef = useRef<ProFormInstance>();
  const selects = getSelectsData();
  const waitTime = (_values: any) => {
    return new Promise<boolean>((resolve) => {
      return resolve(true);
    });
  };
  const { theme } = useTheme();

  const [paymentMethods, setPaymentMethods] = useState<PaymentType[]>(
    selects?.data?.payment_method_templates || []
  );
  const [isAdding, setIsAdding] = useState(false);
  const [newMethodName, setNewMethodName] = useState("");

  function reorder(order: PaymentType[]) {
    setPaymentMethods(
      order.map((method, index) => ({ ...method, order: index + 1 }))
    );
    stepOneRef?.current?.setFieldValue(
      "payment_methods",
      order.map((method, index) => ({ ...method, order: index + 1 }))
    );
  }

  const handleAddMethod = () => {
    setIsAdding(true);
    setNewMethodName("");
  };

  const handleSaveNewMethod = () => {
    if (newMethodName.trim() !== "") {
      const newMethod: PaymentType = {
        id: `${Date.now()}`, // Temporarily using timestamp as id
        name: newMethodName as any,
        order: paymentMethods?.length + 1,
      };
      setPaymentMethods([...paymentMethods, newMethod]);
      setIsAdding(false);
      setNewMethodName("");
    }
  };

  const icon = {
    Pix: <DevicePhoneMobileIcon width={20} />,
    Dinheiro: <BanknotesIcon width={20} />,
    "Cartão de Débito": <CreditCardIcon width={20} />,
    "Cartão de Crédito": <CreditCardIcon width={20} />,
    Cortesia: <HeartOutlined style={{ fontSize: 20 }} />,
    Desconto: <TicketIcon width={20} />,
    Comanda: <TicketIcon width={20} />,
    Cashless: <CreditCardIcon width={20} />,
  };

  useEffect(() => {
    stepOneRef?.current?.setFieldValue("payment_methods", paymentMethods);
  }, [stepOneRef?.current?.getFieldsValue()]);

  return (
    <StepsForm.StepForm<{
      payment_methods: any[];
    }>
      name="base"
      title="Detalhes do setor"
      onFinish={async () => {
        await waitTime(500);
        return true;
      }}
      size="large"
      grid
      formRef={stepOneRef}
      onFinishFailed={() => {
        const fields = stepOneRef?.current?.getFieldsError();

        const firstErrorField = fields?.find(
          (field: any) => field?.errors?.length > 0
        );

        if (firstErrorField) {
          stepOneRef?.current?.scrollToField(firstErrorField.name[0], {
            behavior: "smooth",
            block: "center",
          });
        }
      }}
    >
      <ProFormList
        style={{ display: "none" }}
        name={"payment_methods"}
      ></ProFormList>
      <Row style={{ width: "100%", marginTop: -30 }} gutter={8}>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Typography.Title level={5}>Métodos de pagamento</Typography.Title>
          <Button shape="round" onClick={handleAddMethod}>
            Cadastrar método de pagamento
          </Button>
        </Col>
        <Col span={24}>
          <Typography.Text
            type="secondary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 16,
            }}
          >
            <InformationCircleIcon width={16} /> Os primeiros 6 métodos
            aparecerão no pagamento rápido do terminal POS.
          </Typography.Text>
        </Col>

        <Col span={23}>
          <Reorder.Group
            as="div"
            axis="y"
            values={paymentMethods}
            onReorder={reorder}
            style={{ marginTop: 20 }}
            whileHover={{ cursor: "grab" }}
            whileTap={{ cursor: "grabbing" }}
          >
            {paymentMethods.map((method) => (
              <Reorder.Item
                key={method.id}
                value={method}
                exit={{ opacity: 0 }}
                whileDrag={{ scale: 1.03 }}
                style={{
                  background: theme === "dark" ? "#18191B" : "#fdfdfd",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 8,
                  border: "1px solid rgba(200, 200, 200, 0.5)",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  height: 30,
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {(icon as any)[method.name] || <FaceSmileIcon width={20} />}
                  <Typography.Text>
                    {method.order}. {method.name}
                  </Typography.Text>
                </div>
                <Bars3Icon width={24} />
              </Reorder.Item>
            ))}
            {isAdding && (
              <div
                style={{
                  background: theme === "dark" ? "#18191B" : "#fdfdfd",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 8,
                  border: "1px solid rgba(200, 200, 200, 0.5)",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  height: 30,
                  justifyContent: "space-between",
                }}
              >
                <Input
                  value={newMethodName}
                  onChange={(e) => setNewMethodName(e.target.value)}
                  onBlur={handleSaveNewMethod}
                  onPressEnter={handleSaveNewMethod}
                  placeholder="Nome do novo método"
                  autoFocus
                  style={{ flexGrow: 1, marginRight: 8 }}
                />
              </div>
            )}
          </Reorder.Group>
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
};
