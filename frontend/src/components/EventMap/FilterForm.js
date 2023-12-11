import Input from "./Input";

const FilterForm = ({language, setLanguage}) => {

    const languageOptions = ['English', 'Spanish', 'German', 'French'];

    const handleChange = (e) => {
        setLanguage(e.target.value)
    }


    return (
            <Input 
                label="Language"
                options={languageOptions}
                value={language}
                onChange={handleChange}
            />
    )
    
    
    }
    
    export default FilterForm;