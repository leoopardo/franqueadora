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

export const formatCPF = (value: string) => {
  if (!value) return value;
  value = value.replace(/\D/g, ""); // Remove qualquer caractere que não seja dígito
  value = value.substring(0, 11); // Garante que só há no máximo 11 dígitos
  if (value.length <= 11) {
    return value
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  return value;
};

export function formatCNPJ(CNPJ: string | '') {
  const cleanedCNPJ = CNPJ?.replace(/\D/g, '');
  if (!cleanedCNPJ || cleanedCNPJ.length !== 14) {
    return '-';
  }

  return cleanedCNPJ?.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
}
