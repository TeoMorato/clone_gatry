import './CommentsTree.css';

const PromotionModalCommentsTree = ({ comments }) => {
    if (!comments) {
        return <div>Carregando...</div>;
    }

    return(
        <ul className="promotion-modal_comments_tree">
            {comments.map((item) => (
                <li className="promotion-modal_comments_tree_item">
                    <img src={item.user.avatarUrl} alt={`foto de ${item.user.name}`} className="promotion-modal_comments_tree_item_avatar" />
                    <div className="promotion-modal_comments_tree_item_info">
                    <span className="promotion-modal_comments_tree_item_name">
                        {item.user.name}
                    </span>
                    <p>{item.comment}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default PromotionModalCommentsTree;