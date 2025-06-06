import {useEffect, useState} from "react";
import "./Charts.css"
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

export default function Dropdown({options, setActiveChart, activeChart}) {
    const [open, setOpen] = useState(false);

    function handleOptionClick(index) {
        setActiveChart(index);
        setOpen(false);
    }

    const dropdownText = open ? "Choose Statistic": options[activeChart];

    const dropdownSymbol = open ? <FaChevronUp className={"dropdown-symbol"}/> : <FaChevronDown
        className={"dropdown-symbol"}/>

    // Close on 'esc' key press
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setOpen]);

    return (
        <div className={"dropdown-cont"}>
            <button onClick={() => setOpen(!open)} className={"dropdown-btn dropdown-main"}>{dropdownText} {dropdownSymbol}</button>

            {open && (
                <ul className={"dropdown-options-cont"}>
                    {options.map((option, index) => (
                        <li onClick={() => handleOptionClick(index)}
                            className={"dropdown-el"}>{option}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}