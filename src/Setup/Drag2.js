import React, { useState } from "react";
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
import { CSS } from "@dnd-kit/utilities";

const SortableItem2 = ({ id, name, seed }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        background: isDragging ? "#ddd" : "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "grab",
        color: "black"
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            ID: {id} Name: {name} Seed: {seed}
        </div>
    );
};

export default function DragAndDrop2({items, handleDragEnd}) {

    const sensors = useSensors(useSensor(PointerSensor));

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map((item) => (
                    <SortableItem2 key={item.id} id={item.id} name={item.name} seed={item.position}/>
                ))}
            </SortableContext>
        </DndContext>
    );
}
