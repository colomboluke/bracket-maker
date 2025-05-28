import {useEffect} from "react";
import "./PrintPopup.css";

export default function PrintPopup({fileName, setFileName, orientation, setOrientation, format, setFormat, includeHeader, setIncludeHeader, onClose, onDownload}) {
    
    // Close on 'esc' key press
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        // Clean up listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className={"print-screen-cont"}>
            <div className={"title-cont"}>
                <h3>Download / Print Bracket</h3>
                <button onClick={onClose} className={"new-close-btn"}>&times;</button>
            </div>
            <div className={"file-name-cont"}>
                <h4>Orientation</h4>
                <label>
                    <input type="radio" value={"portrait"} checked={orientation === "portrait"}
                           onChange={e => setOrientation(e.target.value)}/>
                    Portrait
                </label>
                <label>
                    <input type="radio" value={"landscape"} checked={orientation === "landscape"}
                           onChange={e => setOrientation(e.target.value)}/>
                    Landscape
                </label>
            </div>
            <div className={"file-name-cont"}>
                <h4>Format</h4>
                <label>
                    <input type="radio" value={"letter"} checked={format === "letter"}
                           onChange={e => setFormat(e.target.value)}/>
                    Letter (8.5x11)
                </label>
                <label>
                    <input type="radio" value={"legal"} checked={format === "legal"}
                           onChange={e => setFormat(e.target.value)}/>
                    Legal (8.5x14)
                </label>
                <label>
                    <input type="radio" value={"ledger"} checked={format === "ledger"}
                           onChange={e => setFormat(e.target.value)}/>
                    Ledger (11x17)
                </label>
            </div>
            <div className={"file-name-cont"}>
                <h4>Title</h4>
                <input type="text" value={fileName} maxLength={25}
                       onChange={e => setFileName(e.target.value)}/>
            </div>
            <button onClick={() => onDownload()} className={"blue-button"}>DOWNLOAD BRACKET</button>
        </div>
    )
}