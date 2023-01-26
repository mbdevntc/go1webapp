import { useRef } from 'react'
import './CustomSelect.css'

export const CustomSelect = ({ id, value, onChange, options, className, label, align }) => {
    const optionRef = useRef()

    const toggleOptions = () => {
        optionRef.current.classList.toggle('show')
    }

    const hideOptions = () => {
        optionRef.current.classList.remove('show')
    }

    const toggleSelected = ({ target }) => {
        onChange(target.dataset.optionValue)
    }

    const getCurrentSelectedOptionIndex = () => {
        return options.findIndex( option => option.value === value)
    }

    const getOptionByName = str => {
        return options.find( option => {
            return option.value.toString().toLowerCase().startsWith(str)
        })
    }
    let writingValueTimeout
    let writtenValue = ''

    const handleKeyDown = e => {
        const currentSelectedOption = getCurrentSelectedOptionIndex()
        
        switch(e.key) {
            case 'Tab': {
                e.target.focus()
                break;
            }
            case 'Enter': {
                toggleOptions()
                break;
            }
            case 'Escape':
                hideOptions()
                break;
            case 'ArrowDown':  {
                let nextOption = options.length - 1
                if(currentSelectedOption < nextOption){
                    nextOption = currentSelectedOption + 1
                }
                onChange(options[nextOption].value)
                break;
            }
            case 'ArrowUp': { 
                let prevOption = 0
                if(currentSelectedOption > prevOption){
                    prevOption = currentSelectedOption - 1
                }
                onChange(options[prevOption].value)
                break;
            }
            default: {
                clearTimeout(writingValueTimeout)
                writtenValue += e.key
                writingValueTimeout = setTimeout(() => {
                    const newSelected = getOptionByName(writtenValue)
                    if(newSelected) {
                        onChange(newSelected.value)
                    }
                    writtenValue = ''
                }, 200)
            }
        }
    }

    const labelIndex = getCurrentSelectedOptionIndex()

    return (
        <div className={`labeled-input ${align}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className="custom-select" id={id} onClick={toggleOptions} onBlur={hideOptions} onKeyDownCapture={handleKeyDown} tabIndex="0">
                <span className={`custom-select-value ${className}`} data-value={value}>{labelIndex !== -1 ? options[labelIndex].label : ''}</span>
                <ul className='custom-select-options'  ref={optionRef}>
                {options.map((option, i) => { return (
                    <li
                    className={`custom-select-item ${option.value === value ? 'selected' : ''}`}
                    data-option-value={option.value}
                    key={option.value + i}
                    onClick={toggleSelected}
                    >
                            {option.label}
                        </li>)
                    })}
                </ul>
                <i className="bi bi-chevron-down"></i>
            </div>
        </div>
    )
}
// Manca lo scroll verso l'elemento selezionato e la possibilità di scrivere per cercare
// Aggiungere se si vuole la rotazione della freccetta