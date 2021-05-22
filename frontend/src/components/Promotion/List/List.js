import React from 'react';
import PromotionCard from '../Card/card';
import ReactLoading from 'react-loading';
import './List.css';

const PromotionList = ({ loading, promotions }) => {
    if (loading) {
        return <div className="promotion-list_carregamento">
            Carregando
            <ReactLoading className="promotion-list_efeito-carregamento" type={'bubbles'} color={'#000000'} height={'100px'} width={'50px'} />
        </div>;
    }

    return (
        <div className="promotion-list">
            {promotions.map((promotion) => (
                <PromotionCard promotion={promotion} />
            ))}
        </div>
    )
}

export default PromotionList;