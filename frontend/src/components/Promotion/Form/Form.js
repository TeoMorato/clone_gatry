import UIContainer from "components/UI/Container/Container";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReactLoading from 'react-loading';
import './Form.css';
import useApi from "components/Utils/useApi";

const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0,
}

const PromotionForm = ({ id }) => {
  const [values, setValues] = useState(id ? null : initialValue);
  const history = useHistory();
  const [load, loadInfo] = useApi({
    url: `/promotions/${id}`,
    method: 'get',
    onCompleted: (response) => {
      setValues(response.data);
    }
  });

  const [save, saveInfo] = useApi({
    url: id ? `/promotions/${id}` : '/promotions',
    method: id ? 'put' : 'post',
    onCompleted: (response) => {
      if (!response.error) {
        history.push('/');
      }
    }
  })

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    save({
      data: values,
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
              {saveInfo.loading && <span>Salvando dados...</span>}
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
                <label htmlFor="price">Preço (Sem o R$)</label>
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