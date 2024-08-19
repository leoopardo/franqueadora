import {
  ProFormInstance,
  ProFormList,
  StepsForm,
} from "@ant-design/pro-components";
import { Bars3Icon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Col,
  Divider,
  Input,
  Popconfirm,
  Row,
  Typography,
  Upload,
} from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { Reorder } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../../../../../../contexts/themeContext";

export const StepTwo = ({
  draft,
  initialValues,
}: {
  update?: boolean;
  draft?: any;
  initialValues?: any;
}) => {
  const stepTwoRef = useRef<ProFormInstance>(null);
  const { theme } = useTheme();
  const [groups, setGroups] = useState<
    { name: string; logo?: string; order: number }[]
  >([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupLogo, setNewGroupLogo] = useState<string | undefined>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (draft) {
      setGroups(draft.groups || []);
    }
  }, [draft]);

  useEffect(() => {
    if (initialValues) {
      setGroups(initialValues.groups || []);
    }
  }, [initialValues]);

  function reorder(order: { name: string; logo?: string; order: number }[]) {
    setGroups(order);
    stepTwoRef?.current?.setFieldValue("groups", order);
  }

  const handleAddGroup = () => {
    setIsAdding(true);
    setNewGroupName("");
    setNewGroupLogo(undefined);
  };

  const handleSaveGroup = () => {
    if (newGroupName.trim() !== "") {
      const newGroup = {
        name: newGroupName,
        logo: newGroupLogo || "",
        order: groups.length + 1,
      };

      if (editingIndex !== null) {
        const updatedGroups = [...groups];
        updatedGroups[editingIndex] = newGroup;
        setGroups(updatedGroups);
        stepTwoRef.current?.setFieldValue("groups", updatedGroups);
        setEditingIndex(null);
      } else {
        setGroups([...groups, newGroup]);
        stepTwoRef.current?.setFieldValue("groups", [...groups, newGroup]);
      }

      setIsAdding(false);
      setNewGroupName("");
      setNewGroupLogo(undefined);
    }
  };

  const handleEditGroup = (index: number) => {
    const group = groups[index];
    setNewGroupName(group.name);
    setNewGroupLogo(group.logo);
    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleDeleteGroup = (index: number) => {
    const updatedGroups = groups.filter((_, i) => i !== index);
    setGroups(updatedGroups);
  };

  const handleLogoChange = (info: UploadChangeParam) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0];
      const reader = new FileReader();
      reader.onload = () => {
        setNewGroupLogo(reader.result as string);
      };
      reader.readAsDataURL(file.originFileObj as Blob);
    } else {
      setNewGroupLogo(undefined); // Limpa o preview se o upload for cancelado
    }
  };

  return (
    <StepsForm.StepForm
      name="master"
      title="Perfil principal"
      onFinish={async () => true}
      size="large"
      grid
      formRef={stepTwoRef}
    >
      <ProFormList style={{ display: "none" }} name={"groups"} />

      <Row
        style={{ width: "100%", maxWidth: "90vw", justifyContent: "center" }}
        gutter={[8, 8]}
      >
        <Col span={24}>
          <Divider orientation="left">2. Cadastrar grupos</Divider>
        </Col>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Typography.Title level={5}>Grupos</Typography.Title>
          <Button shape="round" onClick={handleAddGroup}>
            Cadastrar grupo
          </Button>
        </Col>
        <ProFormList name="groups" style={{ display: "none" }} />
        <Col span={24}>
          <Reorder.Group
            as="div"
            axis="y"
            values={groups}
            onReorder={reorder}
            style={{ marginTop: 20 }}
            whileHover={{ cursor: "grab" }}
            whileTap={{ cursor: "grabbing" }}
          >
            {groups.map((group, index) => (
              <Reorder.Item
                key={group.name}
                value={group}
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
                  height: 60,
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
                  <Typography.Text>
                    {group.order}. {group.name}
                  </Typography.Text>
                  {group.logo && (
                    <img
                      src={group.logo}
                      alt={group.name}
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                        marginLeft: 8,
                        borderRadius: 8,
                      }}
                    />
                  )}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    icon={<PencilIcon width={16} />}
                    onClick={() => handleEditGroup(index)}
                    type="primary"
                  />
                  <Popconfirm
                    title="Deletar grupo."
                    description="Tem certeza que deseja deletar?"
                    onConfirm={() => handleDeleteGroup(index)}
                  >
                    <Button
                      icon={<TrashIcon width={16} />}
                      type="primary"
                      danger
                    />
                  </Popconfirm>

                  <Bars3Icon width={24} />
                </div>
              </Reorder.Item>
            ))}
            {isAdding && (
              <Row
                style={{
                  background: theme === "dark" ? "#18191B" : "#fdfdfd",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 8,
                  border: "1px solid rgba(200, 200, 200, 0.5)",
                  width: "100%",

                  height: "max-content",
                }}
                gutter={[8, 8]}
              >
                <Col xs={{ span: 24 }} md={{ span: 15 }}>
                  <Input
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Nome do novo grupo"
                    autoFocus
                    style={{ flexGrow: 1, marginRight: 8 }}
                  />
                </Col>
                <Col>
                  <Upload
                    showUploadList={false}
                    customRequest={() => {}}
                    onChange={handleLogoChange}
                  >
                    <Button>Adicionar Logo</Button>
                  </Upload>
                </Col>
                <Col>
                  {newGroupLogo && (
                    <img
                      src={newGroupLogo}
                      alt="Preview"
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                        marginLeft: 8,
                        marginRight: 8,
                        borderRadius: 8,
                      }}
                    />
                  )}
                </Col>
                <Col>
                  <Button type="primary" onClick={handleSaveGroup}>
                    Salvar
                  </Button>
                </Col>
              </Row>
            )}
          </Reorder.Group>
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
};
