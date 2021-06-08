import { useMemo, useState } from 'react';
import './CommentsTree.css';

function getTree(list) {

    if (!list) {
        return [];
    }

    const roots = [];
    const childrenByParentId = {};

    list.forEach((item) => {
        if (!item.parentId) {
            roots.push(item);
            return;
        }

        if (!childrenByParentId[item.parentId]) {
            childrenByParentId[item.parentId] = [];
        }
        childrenByParentId[item.parentId].push(item);
    });

    function buildNodes(nodes) {
        if (!nodes) {
            return null;
        }
        return nodes.map((node) => ({
            ...node,
            children: childrenByParentId[node.id]
        }))
    }

    return buildNodes(roots);
}

const PromotionModalCommentsTree = ({ comments, sendComment }) => {
    const tree = useMemo(() => getTree(comments), [comments]);
    const [comment, setComment] = useState('');
    const [activeCommentBox, setActiveCommentBox] = useState(null);
    if (!comments) {
        return <div>Carregando...</div>;
    }

    function renderItem(item) {
        return (
            <li className="promotion-modal_comments_tree_item">
                <img src={item.user.avatarUrl} alt={`foto de ${item.user.name}`} className="promotion-modal_comments_tree_item_avatar" />
                <div className="promotion-modal_comments_tree_item_info">
                    <span className="promotion-modal_comments_tree_item_name">
                        {item.user.name}
                    </span>
                    <p>{item.comment}</p>
                    <button
                        type="button"
                        className="promotion-modal_commentstree_answer_button"
                        onClick={() => {
                            setComment('');
                            setActiveCommentBox(activeCommentBox === item.id ? null : item.id);
                        }}
                    >
                        Responder
                        </button>
                    {activeCommentBox === item.id && (
                        <div className="promotion-modal_commentstree_comment_box">
                            <textarea
                                value={comment}
                                onChange={(ev) => setComment(ev.target.value)}
                            />
                            <button
                                type="button"
                                className="promotion-modal_commentstree_send_button"
                                onClick={() => {
                                    sendComment(comment, item.id);
                                    setComment('');
                                    setActiveCommentBox(null);
                                }}
                            >
                                Enviar
                                </button>
                        </div>
                    )}
                    {item.children && renderList(item.children)}
                </div>
            </li>
        );
    }

    function renderList(list) {
        return (
            <ul className="promotion-modal_comments_tree">
                {list.map(renderItem)}
            </ul>
        )
    }

    return renderList(tree);
}

PromotionModalCommentsTree.defaultProps = {
    sendComment: () => { },
}

export default PromotionModalCommentsTree;