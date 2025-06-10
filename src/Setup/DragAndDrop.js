import React, {useEffect, useState} from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {
    restrictToVerticalAxis,
    restrictToParentElement
} from "@dnd-kit/modifiers";
import {CSS} from "@dnd-kit/utilities";
import {CgRemove} from "react-icons/cg";
import {FaShuffle} from "react-icons/fa6";
import {FaBars, FaFileImage, FaImage} from "react-icons/fa";

function SortableTeam({
                          id,
                          name,
                          position,
                          isHovering,
                          setIsHovering,
                          onRemove,
                          updateName,
                          teamImage,
                          setTeamImage
                      }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id});

    const DnDStyle = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    // ~~~ Setting icon ~~~
    const [image, setImage] = useState(teamImage);

    function handleImageChange(selectedFile) {
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImage(imageUrl);
            setTeamImage(id, imageUrl);
        } else {
            setImage(null);
            setTeamImage(id, null);
        }
    }

    return (
        <div ref={setNodeRef} style={DnDStyle}
             className={"add-row team-add-row"} onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}>
            {/*Drag handle: can only drag here (has listeners and attributes)*/}
            <div className={"drag-area"} {...attributes} {...listeners}><FaBars/></div>

            <div className={"seed"}>{position + 1}</div>

            <input value={name} type={"text"} className={"settings-input"}
                   placeholder={"Add Name"} onChange={e => {
                updateName(position, e.target.value)
            }}/>

            <div className={"icon"}>
                {/*Hidden file input*/}
                {/*Input ID and label htmlFor must be unique across TeamRows*/}
                <input className={"img-upload"}
                       type="file" accept={"image/*"} id={`image-upload-${id}`}
                       onChange={e => {
                           handleImageChange(e.target.files[0]);
                       }} style={{display: "none"}}/>
                <label htmlFor={`image-upload-${id}`} className={"image-display"}>
                    {image ? (
                        <img src={image} alt="Preview" className={"team-icon-preview"}/>
                    ) : (
                         <div className={"upload-img-placeholder"}><FaFileImage className={"upload-img-icon"}/></div>
                     )}
                </label>
            </div>

            {isHovering && <div className={`remove`}><CgRemove
                className={"remove-btn"}
                onClick={() => onRemove()}/></div>}
        </div>
    );
}

export default function DragAndDropList({
                                            teams,
                                            handleDragEnd,
                                            removeTeam,
                                            shuffleTeams,
                                            createTeam,
                                            resetTeams, updateTeamName, setTeamImage
                                        }) {

    // ~~~ Draggable ~~~
    const sensors = useSensors(useSensor(PointerSensor));

    // ~~~ Hovering ~~~
    const [isHovering, setIsHovering] = useState(false);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <div className={"add-cont"}>
                <div className={"add-row team-add-row"}>
                    <div className={"ta-header"}></div>
                    <div className={"ta-header seed"}>Seed</div>
                    <div className={"ta-header name"}>Name</div>
                    <div className={"ta-header icon"}>Icon</div>
                    <div className={"ta-header remove"}></div>
                </div>
                <SortableContext items={teams} strategy={verticalListSortingStrategy}>
                    {teams.map((team) => (
                        <SortableTeam key={team.id} id={team.id} name={team.name} position={team.position}
                                      isHovering={isHovering} setIsHovering={setIsHovering}
                                      onRemove={() => removeTeam(team.position)}
                                      updateName={updateTeamName} teamImage={team.image}
                                      setTeamImage={setTeamImage}/>
                    ))}
                </SortableContext>
                <div className={"buttons-cont"}>
                    {teams.length > 0 && (<button className={"blue-button shuffle-btn"}
                                                  onClick={() => shuffleTeams()}>
                        <FaShuffle className={"shuffle-icon"}/>
                    </button>)}
                    <button className={"blue-button add-team-btn"}
                            onClick={() => createTeam()}>Add
                        Contender
                    </button>
                    {teams.length > 0 && <button className={"blue-button reset-teams-btn"}
                                                 onClick={() => resetTeams()}>Reset</button>}

                </div>
            </div>
        </DndContext>
    );
}
