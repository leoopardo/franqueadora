import { SearchOutlined } from "@ant-design/icons";
import { Services } from "@franchise/services";
import { MenuById } from "@franchise/services/menus/__interfaces/menu.byId.interface";
import {
  Bars2Icon,
  EllipsisVerticalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import useDebounce from "@hooks/useDebounce";
import defaultTheme from "@styles/default";
import { getRelativeImagePath } from "@utils/gerRelativeImagePath";
import { formatCurrency } from "@utils/regexFormat";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Input,
  Row,
  Typography,
} from "antd";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ItemsListProps {
  data?: MenuById | null;
  menu_id?: string;
}

export const ItemsList = ({ data, menu_id }: ItemsListProps) => {
  const { updateMenuItens, deleteMenuItem } = Services.menu;
  const { id } = useParams();
  const { mutate } = updateMenuItens(`${menu_id || id}`);
  const Delete = deleteMenuItem();
  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (data?.Itens) {
      setItems(
        data.Itens.sort((a: any, b: any) => a?.order - b?.order).filter((i) =>
          i.Product[0].Product.name.includes(search)
        )
      );
    }
  }, [data, search]);

  const handleReorder = (newOrder: any[]) => {
    setItems(newOrder);
  };

  const debounceReorder = useDebounce((newOrder: any[]) => {
    mutate(
      newOrder.map((i, index) => ({
        id: i.id,
        group_id: i.group_id,
        order: index + 1,
      }))
    );
  }, 500);

  return (
    <Card style={{ minHeight: "400px" }}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Typography.Title level={5}>
            Itens do cardápio
            <Badge
              color={defaultTheme.primary}
              count={items.length}
              style={{ marginLeft: 8 }}
            />
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Input
            size="large"
            placeholder="Pesquisar produto"
            style={{ borderRadius: 36 }}
            suffix={<SearchOutlined style={{ width: 16 }} />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col span={24}>
          <Reorder.Group
            as="div"
            axis="y"
            values={items}
            onReorder={(order) => {
              handleReorder(order);
              debounceReorder(order);
            }}
            style={{ marginTop: 20 }}
          >
            {items.map((item, index) => (
              <Reorder.Item
                key={item.id || index} // Use um identificador único ou índice como key
                value={item}
                exit={{ opacity: 0 }}
                whileDrag={{ scale: 1.06, cursor: "grabbing" }}
                style={{ marginBottom: 8 }}
                whileHover={{ cursor: "grab" }}
                whileTap={{ cursor: "grabbing", scale: 1.06 }}
              >
                <Card
                  styles={{ body: { padding: 0 } }}
                  style={{ marginTop: 8 }}
                >
                  <Row gutter={[8, 8]} align="middle">
                    {(item.combo_image || item?.Product[0]?.Product?.image) && (
                      <Col span={4}>
                        <Image
                          src={getRelativeImagePath(
                            item.combo_image || item.Product[0].Product.image
                          )}
                          style={{
                            height: 70,
                            width: 70,
                            borderTopLeftRadius: 12,
                            borderBottomLeftRadius: 12,
                          }}
                        />
                      </Col>
                    )}
                    <Col
                      span={10}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography.Text style={{ color: "#9c9c9c" }}>
                        Produto:
                      </Typography.Text>
                      <Typography.Title
                        level={5}
                        style={{ margin: 0, fontSize: 15 }}
                      >
                        {item.combo_name || item.Product[0].Product.name}
                      </Typography.Title>
                    </Col>
                    <Col
                      span={5}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography.Text style={{ color: "#9c9c9c" }}>
                        Valor:
                      </Typography.Text>
                      <Typography.Title
                        level={5}
                        style={{ margin: 0, fontSize: 15 }}
                      >
                        {formatCurrency(+item.sale_price || 0)}
                      </Typography.Title>
                    </Col>
                    <Col
                      span={1}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Bars2Icon
                        style={{
                          width: 20,
                          height: 20,
                          color: "#9c9c9c",
                        }}
                      />
                    </Col>
                    <Col
                      span={1}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: "delete",
                              label: "Deletar",
                              icon: <TrashIcon width={16} />,
                              onClick: () => {
                                Delete.mutate({ id: item.id });
                              },
                            },
                          ],
                        }}
                        placement="bottomRight"
                        arrow
                      >
                        <Button
                          icon={<EllipsisVerticalIcon height={18} />}
                          type="link"
                        />
                      </Dropdown>
                    </Col>
                  </Row>
                </Card>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </Col>
      </Row>
    </Card>
  );
};
