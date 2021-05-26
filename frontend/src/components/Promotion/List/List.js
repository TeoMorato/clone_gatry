import React, { useState } from 'react';
import PromotionCard from '../Card/card';
import ReactLoading from 'react-loading';
import './List.css';
import UIModal from 'components/UI/Modal/Modal';

const PromotionList = ({ loading, error, promotions }) => {

    const [promotionId, setPromotionId] = useState(null);

    if (error) {
        return <div>Algo de errado não está certo</div>
    }

    if (loading || promotions === null) {
        return <div className="promotion-list_carregamento">
            Carregando
            <ReactLoading className="promotion-list_efeito-carregamento" type={'bubbles'} color={'#000000'} height={'100px'} width={'50px'} />
        </div>;
    }

    if (promotions.length === 0) {
        return <div className="promotion-list_carregamento">
            Nenhum Resultado encontrado :/
        </div>;
    }

    return (
        <div className="promotion-list">
            {promotions.map((promotion) => (
                <PromotionCard promotion={promotion} onClickComments={() => setPromotionId(promotion.id)} />
            ))}
            <UIModal isOpen={Boolean(promotionId)} onClickClose={() => setPromotionId(null)}>
                <h1>Comentários</h1>
            </UIModal>
        </div>
    );
}

export default PromotionList;