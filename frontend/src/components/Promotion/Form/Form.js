import UIContainer from "components/UI/Container/Container";
import { useEffect } from "react";
import { useHistory } from "react-router";
import ReactLoading from 'react-loading';
import './Form.css';
import useApi from "components/Utils/useApi";
import Field from 'components/Form/Field/Field';
import { Formik, Form } from "formik";
import schema from "./schema";

const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0,
}

const PromotionForm = ({ id }) => {
  const history = useHistory();
  const [load, loadInfo] = useApi({
    url: `/promotions/${id}`,
    method: 'get',
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

  function onSubmit(formValues) {
    save({
      data: formValues,
    });
  }

  const values = id ? loadInfo.data : initialValue;

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
            <Formik
              initialValues={values}
              onSubmit={onSubmit}
              validationSchema={schema}
              render={() => (
                <Form>
                  {saveInfo.loading && <span>Salvando dados...</span>}
                  <div className="promotion-form_group">
                    <Field name="title" type="text" label="Título" />
                  </div>
                  <div className="promotion-form_group">
                    <Field name="url" type="text" label="Link" />

                  </div>
                  <div className="promotion-form_group">
                    <Field name="imageUrl" type="text" label="Image (URL)" />

                  </div>
                  <div className="promotion-form_group">
                    <Field name="price" type="number" label="Preço (Sem o R$)" />

                  </div>
                  <div>
                    <button type="submit" className="promotion-form_botao">Salvar</button>
                  </div>
                  <a href={"/"} rel="noreferrer">
                    <button type="button" className="promotion-form_botao">Cancelar</button>
                  </a>
                </Form>
              )}
            />
          )}
      </div>
    </UIContainer>
  )
};

export default PromotionForm;