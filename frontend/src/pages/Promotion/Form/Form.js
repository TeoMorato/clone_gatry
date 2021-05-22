import PromotionForm from "components/Promotion/Form/Form";
import React from "react";
import { useParams } from "react-router";


const PagesPromotionForm = () => {

    const { id } = useParams();

    return (
        <div>
             <PromotionForm />
        </div>
    )
};

export default PagesPromotionForm;
