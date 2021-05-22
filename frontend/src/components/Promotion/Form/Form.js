import axios from "axios";
import UIContainer from "components/UI/Container/Container";
import { useState } from "react";
import { useHistory } from "react-router";
import './Form.css'; 

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0,
  }

const PromotionForm = () => {

    const [values, setValues] = useState(initialValue);
    const history = useHistory();

    function onChange(ev) {
        const {name, value} = ev.target;
        setValues({ ...values, [name]: value});
    }

    function onSubmit(ev) {
        ev.preventDefault();

        axios.post('http://localhost:5000/promotions', values)
        .then((response) => {
            history.push('/')
        });
    }

    return(
        <UIContainer>
            <h1>Promo Show</h1>
            <h2>Nova Promoção</h2>

            <form onSubmit={onSubmit}>
                <div className="promotion-form_group">
                    <label htmlFor="title">Título</label>
                    <input type="text" id="title" name="title" onChange={onChange} />
                </div>
                <div className="promotion-form_group">
                    <label htmlFor="url">Link</label>
                    <input type="url" id="url" name="url" onChange={onChange} />
                </div>
                <div className="promotion-form_group">
                    <label htmlFor="imageUrl">Imagem URL</label>
                    <input type="text" id="imageUrl" name="imageUrl" onChange={onChange} />
                </div>
                <div className="promotion-form_group">
                    <label htmlFor="price">Preço (Não utilize o R$)</label>
                    <input type="number" step="any" id="price" name="price" onChange={onChange} />
                </div>
                <div>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </UIContainer>
    )
};

export default PromotionForm;