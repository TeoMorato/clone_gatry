import React from 'react';
import {Link} from 'react-router-dom';
import './card.css';

const PromotionCard = ({ promotion }) => (
    <div className="promotion-card">
        <img src={promotion.imageUrl} className="promotion-card_img" alt="promotion-card-img" />
        <div className="promotion-card_info">
            <h1 className="promotion-card_title">{promotion.title}</h1>
            <span className="promotion-card_price"> R$ {promotion.price}</span>
            <footer className="promotion-card_footer">
                {promotion.comments.length > 0 && (
                    <div className="promotion-card_comments">
                        "{promotion.comments[0].comment}"
                    </div>
                )}
                
                    <div className="promotion-card_comments-count">
                        {promotion.comments.length} Comentário{promotion.comments.length > 1 && 's'}
                    </div>
                <a href={promotion.url} target="_blank" className="promotion-card_link" rel="noreferrer"> Ir Para o Site </a>
                <Link to={`/edit/${promotion.id}`}>Editar</Link>
            </footer>
        </div>
    </div>
)

export default PromotionCard;