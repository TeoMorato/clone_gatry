import * as yup from 'yup';


export default yup.object().shape({
    title: yup.string().required('Campo Obrigatório'),
    url: yup.string().url("URL deve ser válida").required('Campo Obrigatório'),
    imageUrl: yup.string().url("URL da imagem deve ser valida").required('Campo Obrigatório'),
    price: yup.number("O preço deve ser válido").required('Campo Obrigatório'),
});