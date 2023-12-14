const { check, isPostalCode } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

function isValidFutureDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    
    // Check if the format is valid
    if (!dateString.match(regEx)) return false;
  
    var inputDate = new Date(dateString);
  
    // Check if the Date object is valid
    var inputDateNum = inputDate.getTime();
    if (!inputDateNum && inputDateNum !== 0) return false;
  
    // Check if the date is in the future from today
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
  
    if (inputDate <= currentDate) return false;
  
    return true;
  }

const isValidLanguages = (array) => {
    if (array.length === 0) return false;
    langs = ['English', 'French', 'Spanish', 'German']
    return array.every(value => langs.includes(value))
}

const validateEventCreation = [
    check('title')
        .exists({checkFalsy: true})
        .isLength({min: 6, max: 30 })
        .withMessage('Event title must be between 2 and 30 characters'),
    check('description')
        .exists({checkFalsy: true})
        .isLength({min: 10, max: 200})
        .withMessage('Event description must be between 10 and 200 characters'),
    check('languages')
        .exists({checkFalsy: true})
        .custom(value => isValidLanguages(value))
        .withMessage('Languages must be one of the supported languages, must not be empty'),
    check('state')
        .exists({checkFalsy: true})
        .isIn(['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'])
        .withMessage('State is invalid'),
    check('city')
        .exists({checkFalsy: true})
        .withMessage('City is required'),
    check('address')
        .exists({checkFalsy: true})
        .withMessage('Address is required'),
    check('zipcode')
        .exists({checkFalsy: true})
        .isPostalCode('US')
        .withMessage('Zipcode is invalid'),
    check('date') 
        .exists({checkFalsy: true})
        .custom(value => isValidFutureDate(value))
        .withMessage('Date is invalid'),
    check('time')
        .exists({checkFalsy: true})
        .custom(value => timeRegex.test(value))
        .withMessage('Time is invalid'),
    check('host') 
        .exists({checkFalsy: true})
        .withMessage('Host is required'),
    handleValidationErrors
]

module.exports = validateEventCreation;