import { useCreateProduct } from "@franchise/services/service_orders/products/createProduct";
import { MutateProduct } from "../components/mutate";
import { CreateProductType } from "@franchise/services/service_orders/products/_interfaces/create_product.interface";
import { parseImageDataFromFile } from "@utils/buffer_blob_utils";

export const CreateProduct = () => {
  const { mutate } = useCreateProduct();

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

  return (
    <div>
      <MutateProduct
        title="Cadastro de produtos"
        subtitle="Preencha todos os campos para adicionar um novo produto"
        mutate={async (body: CreateProductType) => {
          let image: any;
          if (typeof body?.image === "string") {
            image = await parseImageDataFromFile(
              await blobUrlToFile(body?.image, "image.png")
            );
          } else {
            image = body?.image?.file
              ? await parseImageDataFromFile(body?.image?.file?.originFileObj)
              : null;
          }
          console.log(body);

          mutate({
            ...body,
            image: image?.image,
            image_extension: image?.image_extension,
            code: +body.code,
            consumption_unit_id: body.consumption_unit_id,
          });
        }}
      />
    </div>
  );
};
