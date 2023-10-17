import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import data from "./data";
import QuoteApp from "./QuoteList";
import React, { useState } from "react";
const newData = {
  entries: {
    1: {
      id: 1,
      title: "item1",
    },
    2: {
      id: 2,
      title: "item2",
    },
    3: {
      id: 3,
      title: "item3",
    },
  },
  order: [1, 2, 3],
};
function swapInList(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom = {
    id: `resume-section-${k}`,
    content: `Resume Section ${k}`,
  };

  return custom;
});
console.log("initial", initial);
export default function App() {
  const [data, setData] = useState(initial);
  const [isDragging, setIsDragging] = useState(false);
  const onDragEnd = (result) => {
    // TODO: Update to reflect
    console.log("Result", result);
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newData = swapInList(
      data,
      result.source.index,
      result.destination.index
    );

    setData(newData);
  };
  return (
    <>
      <div
        className={`w-3/4 mx-auto ${
          isDragging
            ? "bg-zinc-500 border-8 border-purple-500"
            : "border-8 border-transparent bg-zinc-50"
        } transition-colors duration-150 ease-linear rounded-sm py-2 px-4`}
      >
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result);
            setIsDragging(false);
          }}
          onDragStart={() => {
            setIsDragging(true);
          }}
        >
          <Droppable droppableId="list-time">
            {(provided) => (
              <>
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {data.map((dataPoint, index) => {
                    return (
                      <Draggable
                        draggableId={dataPoint.id}
                        index={index}
                        key={dataPoint.id}
                      >
                        {(provided) => (
                          <div
                            className="drop-shadow-md my-2 shadow-black"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div className="text-2xl bg-amber-300 py-2 px-2 rounded-t-lg w-full flex items-start gap-2 align-middle">
                              <div {...provided.dragHandleProps}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4 inline text-center text-sm"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                                  />
                                </svg>
                              </div>
                              <div>{dataPoint.content}</div>
                            </div>
                            <div className="bg-zinc-50 p-4">
                              This is where the sections will live, you can drag
                              these around with the handle in the header
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </div>
                {provided.placeholder}
              </>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
