export const parseImageDataFromFile: any = async (file: File) => {
  console.log(file);
  
  const logo_image_extension = `.${file?.name?.split(".")[1]}`;
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const logo_image = Array.from(new Uint8Array(arrayBuffer as any));

  return {
    image: logo_image,
    image_extension: logo_image_extension,
  };
};

export function readFileAsArrayBuffer(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo como ArrayBuffer."));
    };

    reader.readAsArrayBuffer(file);
  });
}

export function readFileAsBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = btoa(reader.result as string);
      resolve(base64String);
    };

    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo como Base64."));
    };

    reader.readAsBinaryString(file);
  });
}
