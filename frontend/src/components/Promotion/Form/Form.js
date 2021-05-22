import axios from "axios";
import UIContainer from "components/UI/Container/Container";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReactLoading from 'react-loading';
import './Form.css';

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0,
}

const PromotionForm = ({ id }) => {
    const [values, setValues] = useState(id ? null: initialValue);
    const history = useHistory();
  
    useEffect(() => {
      if (id) {
        axios.get(`http://localhost:5000/promotions/${id}`)
          .then((response) => {
            setValues(response.data);
          })
      }
    }, []);
  
    function onChange(ev) {
      const { name, value } = ev.target;
  
      setValues({ ...values, [name]: value });
    }
  
    function onSubmit(ev) {
      ev.preventDefault();
  
      const method = id ? 'put' : 'post';
      const url = id
        ? `http://localhost:5000/promotions/${id}`
        : 'http://localhost:5000/promotions'
  
      axios[method](url, values)
        .then((response) => {
          history.push('/');
        });
    }

    return (
        <UIContainer>
        <div>
          <h1>Promo Show</h1>
          <h2>Nova Promoção</h2>
          {!values
            ? (
              <div className="promotion-list_carregamento">Carregando
                  <ReactLoading className="promotion-list_efeito-carregamento" type={'bubbles'}
                    color={'#000000'} height={'100px'} width={'50px'} />
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="promotion-form_group">
                  <label htmlFor="title">Título</label>
                  <input id="title" name="title" type="text" onChange={onChange} value={values.title} />
                </div>
                <div className="promotion-form_group">
                  <label htmlFor="url">Link</label>
                  <input id="url" name="url" type="text" onChange={onChange} value={values.url} />
                </div>
                <div className="promotion-form_group">
                  <label htmlFor="imageUrl">Imagem (URL)</label>
                  <input id="imageUrl" name="imageUrl" type="text" onChange={onChange} value={values.imageUrl} />
                </div>
                <div className="promotion-form_group">
                  <label htmlFor="price">Preço</label>
                  <input id="price" name="price" type="number" onChange={onChange} value={values.price} />
                </div>
                <div>
                  <button type="submit" className="promotion-form_botao">Salvar</button>
                </div>
                <a href={"/"} rel="noreferrer">
                <button type="button" className="promotion-form_botao">Cancelar</button>
            </a>
              </form>
            )}
        </div>
        </UIContainer>
      )
    };

export default PromotionForm;