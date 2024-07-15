import { EyeIcon } from "@heroicons/react/24/outline";
import { Button, Card, List, Statistic } from "antd";
import { Dispatch, SetStateAction } from "react";
import defaultTheme from "../../../../../styles/default";
import { terminalParams } from "../../../../services/terminals/__interfaces/terminals.interface";
import { TotalizerContent } from "../../../../services/terminals/__interfaces/totalizers.interface";

interface Totalizer {
  content?: TotalizerContent;
  setParams: Dispatch<SetStateAction<terminalParams>>;
  params: terminalParams;
  loading: boolean;
}

export const Totalizer = ({
  content,
  params,
  setParams,
  loading,
}: Totalizer) => {
  const labels: any = {
    client: "Cliente",
    development: "Desenvolvimento",
    franchise: "Franquia",
    lending: "Comodato",
    sale: "Venda",
    stock: "Estoque",
    total: "Total de terminais",
    loose: "Perdidos",
  };
  const hideTotals = ["free", "monthly"];

  return (
    <Card style={{ width: "100%" }} bodyStyle={{ padding: 8 }}>
      <List
        loading={loading}
        grid={{
          gutter: 16,
          column:
            content &&
            Object.keys(content)
              .map((i) => ({
                value: (content as any)[i],
                label: i,
              }))
              .filter((i) => i.value && !hideTotals.includes(i.label)).length,
          lg:
            content &&
            Object.keys(content)
              .map((i) => ({
                value: (content as any)[i],
                label: i,
              }))
              .filter((i) => i.value && !hideTotals.includes(i.label)).length /
              1.5,
          md:
            content &&
            Object.keys(content)
              .map((i) => ({
                value: (content as any)[i],
                label: i,
              }))
              .filter((i) => i.value && !hideTotals.includes(i.label)).length /
              2,
          sm: 1,
          xs: 1,
        }}
        dataSource={
          content &&
          Object.keys(content)
            .map((i) => ({
              value: (content as any)[i],
              label: i,
            }))
            .filter((i) => i.value && !hideTotals.includes(i.label))
            .sort(() => -1)
        }
        renderItem={(item) =>
          item.value ? (
            <List.Item
              key={item.label}
              style={{
                height: "100%",
                backgroundColor:
                  params.w === `situation=[${item.label.toUpperCase()}]`
                    ? defaultTheme["primary-200"]
                    : !params.w && item.label == "total"
                      ? defaultTheme["primary-200"]
                      : undefined,
                padding: 8,
                borderRadius: 8,
                transition: "background-color 0.5s",
                margin: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Statistic title={labels[item.label]} value={item?.value} />
                <Button
                  type="link"
                  style={{
                    textAlign: "left",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                  icon={<EyeIcon style={{ width: 16 }} />}
                  iconPosition="end"
                  onClick={() =>
                    setParams((state) => ({
                      ...state,
                      w:
                        item.label === "total" ||
                        params.w === `situation=[${item.label.toUpperCase()}]`
                          ? undefined
                          : `situation=[${item.label.toUpperCase()}]`,
                    }))
                  }
                >
                  Ver detalhes
                </Button>
              </div>
            </List.Item>
          ) : undefined
        }
      />
    </Card>
  );
};
