import { MutateProduct } from "../components/mutate";

export const CreateProduct = () => {
  return (
    <div>
      <MutateProduct
        title="Cadastro de produtos"
        subtitle="Preencha todos os campos para adicionar um novo produto"
        mutate={(_body: any) => {}}
      />
    </div>
  );
};
