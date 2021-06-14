import { useField } from "formik"
import "./Field.css";

const FormField = ({ name, id, label, ...restProps }) => {
    // eslint-disable-next-line
    const [field, meta, helpers] = useField({ name, id, ...restProps });

    return (
        <>
            {label && (
                <label htmlFor={id ?? name} className="form-field-label">{label}</label>
            )}
            <input {...field} name={name} id={id ?? name} className={`form-field-input ${meta.error && 'form-field-input--has-error'}`} />
            {meta.error && (
                <span className="form-field-error-msg">{meta.error}</span>
            )}
        </>
    );
};

export default FormField