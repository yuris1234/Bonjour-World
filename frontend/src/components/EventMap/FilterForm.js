import Input from "./Input";

const FilterForm = ({language, setLanguage}) => {


    return (
            <Input 
                label="Language"
                value={language}
                onChange={() => setLanguage(e.currentTarget.value)}
            />
    )
    
    
    }
    
    export default FilterForm;