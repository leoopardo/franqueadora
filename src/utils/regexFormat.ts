export const formatCellPhoneBR = (value: string) => {
  if (!value) return value;
  value = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  value = value.substring(0, 11); // Garante que só há no máximo 11 dígitos

  if (value.length <= 10) {
    // Formato (XX) XXXX-XXXX
    return value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else if (value.length === 11) {
    // Formato (XX) XXXXX-XXXX
    return value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  return value;
};

export const formatRG = (value: string | number) => {
  if (!value) return "-";
  value = `${value}`.replace(/\D/g, ""); // Remove qualquer caractere que não seja dígito
  value = `${value}`.substring(0, 9); // Garante que só há no máximo 9 dígitos
  if (value.length <= 9) {
    return value
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  return value;
};

export const formatCPF = (value: string | number) => {
  if (!value) return "-";
  value = `${value}`.replace(/\D/g, ""); // Remove qualquer caractere que não seja dígito
  value = `${value}`.substring(0, 11); // Garante que só há no máximo 11 dígitos
  if (value.length <= 11) {
    return value
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  return value;
};

export function formatCNPJ(CNPJ?: string | number) {
  if(!CNPJ) return "-"
  const cleanedCNPJ = `${CNPJ}`?.replace(/\D/g, '');
  if (!cleanedCNPJ || cleanedCNPJ.length !== 14) {
    return '-';
  }

  return cleanedCNPJ?.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
}

export function formatCpfCnpj(value: string | number) {
  let cleanValue: string | number = `${value}`.replace(/\D/g, '')

  if (cleanValue.length < 12) {
    cleanValue = formatCPF(value);
  } else {
    cleanValue = formatCNPJ(value);
  }

  return cleanValue;
}
