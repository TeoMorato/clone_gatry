import React from "react";
import { useParams } from "react-router";


const PagesPromotionForm = () => {

    const { id } = useParams();

    return (
        <div>
            Form
            {id && <div> id: {id} </div>}
        </div>
    )
};

export default PagesPromotionForm;
