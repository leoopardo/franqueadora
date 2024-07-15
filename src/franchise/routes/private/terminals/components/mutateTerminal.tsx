import { ProCard } from "@ant-design/pro-components";
import { SelectFranchises } from "@components/selects/SelectFranchises";
import { SelectPromoters } from "@components/selects/SelectPromoters";
import { useTerminalsSelects } from "@franchisor/services/terminals/create/getSelectsData";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import { Col, Form, Row, Select, Typography } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";

interface MutateTerminalI {
  title: string;
  subtitle: string;
}

export const MutateTerminal = ({ subtitle, title }: MutateTerminalI) => {
  const { isSm } = useBreakpoints();
  const [width] = useState<number>((100 / 1) * 1);
  const { data, isLoading } = useTerminalsSelects();
  const [body, setBody]  = useState<any>({});

  const filterOption = (inputValue: string, option: any) =>
    option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
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
      </Col>
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
      <ProCard
        style={{
          height: isSm ? undefined : "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
          display: "flex",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            minWidth: "100%",
            height: "100%",
          }}
        >
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Form layout="vertical" onFinish={(values) => console.log(values)}>
              <Row style={{ width: "100%" }} gutter={[8, 8]}>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <Form.Item label="Modelo" name="model">
                    <Select
                      size="large"
                      showSearch
                      allowClear
                      placeholder="Selecione um modelo."
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      filterOption={filterOption}
                      options={data?.models.map((m) => ({
                        label: m.model,
                        value: m.id,
                      }))}
                      loading={isLoading}
                    />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <Form.Item label="Franquia" name="franchise">
                    <SelectFranchises
                      onChange={(value) =>
                        setBody((state: any) => ({
                          ...state,
                          franchise_id: value,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <Form.Item label="Promotor" name="promoter">
                    <SelectPromoters
                      query={body}
                      onChange={(value) => console.log(value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </ProCard>
    </Row>
  );
};
