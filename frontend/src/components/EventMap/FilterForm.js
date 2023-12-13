import Input from "./Input";

const FilterForm = ({language, setLanguage, state, setState}) => {

    const languageOptions = ['English', 'Spanish', 'German', 'French'];
    const stateOptions = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"]

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value)
    }

    const handleStateChange = (e) => {
        setState(e.target.value)
    }

    return (
        <>
            <Input 
                label="Language: "
                options={languageOptions}
                value={language}
                onChange={handleLanguageChange}
                />
            <Input 
                label="State:"
                options={stateOptions}
                value={state}
                onChange={handleStateChange}/>
        </>
    )
}

export default FilterForm;