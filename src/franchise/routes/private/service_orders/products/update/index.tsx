import { CreateProductType } from "@franchise/services/service_orders/products/_interfaces/create_product.interface";
import { useGetProductById } from "@franchise/services/service_orders/products/getProductById";
import { useUpdateProduct } from "@franchise/services/service_orders/products/updateProduct";
import { parseImageDataFromFile } from "@utils/buffer_blob_utils";
import { useLocation } from "react-router-dom";
import { MutateProduct } from "../components/mutate";

export const UpdateProduct = () => {
  const { state } = useLocation();
  const { mutate } = useUpdateProduct(state.id);
  const { data, isLoading } = useGetProductById(state?.id);

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

  console.log("data", data);

  return (
    <div>
      <MutateProduct
        title={`Edição de produto: ${data?.name}`}
        subtitle="Altere os campos desejados para editar o produto"
        mutate={async (body: CreateProductType) => {
          let image: any;

          if (body?.image.includes("product_images")) {
            image = undefined;
          }
          if (typeof body?.image === "string") {
            image = await parseImageDataFromFile(
              await blobUrlToFile(body?.image, "image.png")
            );
          } else {
            image = body?.image?.file
              ? await parseImageDataFromFile(body?.image?.file?.originFileObj)
              : null;
          }
          console.log(image);

          mutate({
            ...body,
            image: body?.image.includes("product_images")
              ? undefined
              : image?.image,
            image_extension: body?.image.includes("product_images")
              ? undefined
              : image?.image_extension,
            code: +body.code,
          });
        }}
        initialValues={data}
        loading={isLoading}
        update
      />
    </div>
  );
};
