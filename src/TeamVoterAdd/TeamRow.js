import {CgRemove} from "react-icons/cg";
import "./TeamOrVoterAddGrid.css";
import {useState} from "react";

// Displays a team in the setup screen
export default function TeamRow({index, name, updateName, onRemove, teamImage, setTeamImage}) {

    const [isHovering, setIsHovering] = useState(false);

    // const [file, setFile] = useState(null);
    const [image, setImage] = useState(teamImage);

    function handleImageChange(selectedFile) {
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImage(imageUrl);
            setTeamImage(index, imageUrl);
        } else {
            setImage(null);
            setTeamImage(null, index);
        }
    }

    return (
        <div className={"add-row team-add-row"} onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}>
            <div className={"seed"}>{index + 1}</div>
            <input value={name} type={"text"} className={"settings-input"}
                   onChange={e => {
                       updateName(index, e.target.value);
                   }}
                   placeholder={"Add Name"}/>
            <div className={"icon"}>
                {/*Hidden file input*/}
                {/*Input ID and label htmlFor must be unique across TeamRows*/}
                <input className={"img-upload"}
                       type="file" accept={"image/*"} id={`image-upload-${index}`}
                       onChange={e => {
                           handleImageChange(e.target.files[0]);
                       }} style={{display:"none"}}/>
                <label htmlFor={`image-upload-${index}`} className={"image-display"}>
                    {image ? (
                        <img src={image} alt="Preview" className={"team-icon-preview"}/>
                    ) : (
                         <div className={"upload-img-placeholder"}>Upload Image</div>
                     )}
                </label>
            </div>
            {isHovering && <div className={`remove`}><CgRemove
                className={"remove-btn"}
                onClick={() => onRemove()}/></div>}

        </div>
    )
}