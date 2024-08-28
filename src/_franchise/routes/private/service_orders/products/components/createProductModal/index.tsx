import { CreateProductType } from "../../../../../../services/service_orders/products/_interfaces/create_product.interface";
import { useCreateProduct } from "../../../../../../services/service_orders/products/createProduct";
import { parseImageDataFromFile } from "@utils/buffer_blob_utils";
import { Modal } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MutateProduct } from "../mutate";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface CreateProductModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateProductModal = ({
  open,
  setOpen,
}: CreateProductModalProps) => {
  const { mutate, isSuccess } = useCreateProduct({ modal: true });
  const {isSm} = useBreakpoints()

  const blobUrlToFile = async (
    blobUrl: string,
    fileName: string
  ): Promise<File> => {
    // Fetch the blob data from the URL
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    // Create a File object from the blob
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  return (
    <Modal
      open={open}
      footer={null}
      centered
      width={isSm ? undefined: "70vw"}
      onCancel={() => setOpen(false)}
      styles={{content: {padding: 0, margin: 0}}}
    >
      <MutateProduct
        title="Cadastro de produtos"
        subtitle="Preencha todos os campos para adicionar um novo produto"
        mutate={async (body: CreateProductType) => {
          let image: any;
          if (typeof body?.image === "string") {
            ("aqui");
            image = await parseImageDataFromFile(
              await blobUrlToFile(body?.image, "image.png")
            );
          } else {
            ("2");
            image = body?.image?.file
              ? await parseImageDataFromFile(
                  body?.image?.file?.originFileObj || body?.image?.file
                )
              : null;
          }

          mutate({
            ...body,
            image: image?.image,
            image_extension: image?.image_extension,
            code: +body.code,
            consumption_unit_id: body.consumption_unit_id,
          });
        }}
        modal
        setModalOpen={setOpen}
      />
    </Modal>
  );
};
