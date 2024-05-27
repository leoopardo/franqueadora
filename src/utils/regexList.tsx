const regexList = {
    cellphone: /^(\(?\d{2}\)?[-.\s]?)?9?\d{4}[-.\s]?\d{4}$/,
    lowercarse: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /[0-9]/,
    especial: /[!@#$%^&*(),.?":{}|<>]/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
    cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
}

export default regexList