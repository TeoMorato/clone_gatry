import React, { useState } from 'react';
import PromotionCard from '../Card/card';
import ReactLoading from 'react-loading';
import './List.css';
import PromotionModal from '../Modal/Modal';
import useApi from 'components/Utils/useApi';

const PromotionList = ({ loading, error, promotions, refetch }) => {

    const [promotionId, setPromotionId] = useState(null);

    const [deletePromotion, deletePromotionInfo] = useApi({
        method: 'DELETE'
    });

    if (error) {
        return <div>Algo de errado não está certo</div>
    }

    if (promotions === null || deletePromotionInfo.loading) {
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
                <PromotionCard
                    promotion={promotion}
                    onClickComments={() => setPromotionId(promotion.id)}
                    onClickDelete={async () => {
                        await deletePromotion({
                            url: `/promotions/${promotion.id}`,
                        });
                        refetch();
                    }}
                />
            ))}
            {loading && <div>Carregando mais promoções...</div>}
            {promotionId && (
                <PromotionModal promotionId={promotionId} onClickClose={() => setPromotionId(null)} />
            )}
        </div>
    );
}

export default PromotionList;