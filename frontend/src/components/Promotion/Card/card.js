import React from 'react';
import card from './card';

const PromotionCard = ({ promotion }) => (
    <div className="promotion-card">
        <img src={promotion.imageUrl} className="promotion-card_img" />
        <div className="promotion-card_info">
            <h1 className="promotion-card_title">{promotion.title}</h1>
            <span className="promotion-card_price"> R$ {promotion.price}</span>
            <footer className="promotion-card_footer">
                <div>"{promotion.comments[0].comment}"</div>
                <div className="promotion-card_comments"> {promotion.comments.lenght} Comentários </div>
                <a href={promotion.url} target="_blank" className="promotion-card_link"> Ir Para o Site </a>
            </footer>
        </div>
    </div>
)

export default PromotionCard;