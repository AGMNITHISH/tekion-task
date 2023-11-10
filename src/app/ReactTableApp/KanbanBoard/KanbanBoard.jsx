import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateTableDataBasedOnModel } from "../../../redux/slice/reactTable/reactTableSlice";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tblData } = useSelector((state) => state.reactTableSlice);

  const [taskStatus, setTaskStatus] = useState([]);
  const [task, setTask] = useState([]);

  useEffect(() => {
    if (tblData.length > 0) {
      const filterIdWithImg = tblData.map((data, ind) => {
        let obj = {
          id: ind,
          image: data.image,
          status: data.status,
          brand: data.brand,
          model: data.model,
        };
        return obj;
      });

      let taskStatusArr = {
        // images: {
        //   name: "Images",
        //   items: filterIdWithImg,
        // },
        InStock: {
          name: "In stock",
          items: filterIdWithImg.filter((item) => item.status === "In stock"),
        },
        OutOfStock: {
          name: "Out of stock",
          items: filterIdWithImg.filter(
            (item) => item.status === "Out of stock"
          ),
        },
        Booked: {
          name: "Booked",
          items: filterIdWithImg.filter((item) => item.status === "Booked"),
        },
      };
      setTaskStatus(taskStatusArr);
      setColumns(taskStatusArr);
      setTask(filterIdWithImg);
    }
  }, [tblData]);

  const changeStringBasedOnInput = (value) => {
    if (value === "InStock") {
      return "In stock";
    } else if (value === "OutOfStock") {
      return "Out of stock";
    } else if (value === "Booked") {
      return "Booked";
    }
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      // eslint-disable-next-line eqeqeq
      const filterRow = task.filter((item) => item.id == result.draggableId);
      const desDropStatus = changeStringBasedOnInput(
        result.destination.droppableId
      );

      dispatch(
        updateTableDataBasedOnModel({
          status: desDropStatus,
          row: filterRow[0],
        })
      );

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  const [columns, setColumns] = useState([]);
  return (
    <>
      {taskStatus.length !== 0 ? (
        <>
          <div className="flex items-center justify-center text-2xl font-semibold text-neutral-800 pb-3 ">
            Kanban Board
          </div>
          <div className="flex justify-center relative overflow-x-auto shadow-md m-4  h-full">
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <div key={columnId} className="flex flex-col items-center">
                    <h2>{column.name}</h2>
                    <div className="m-4">
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "lightgrey",
                                padding: 4,
                                width: 250,
                                minHeight: 500,
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={`${item.id}`}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            padding: 16,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          <img
                                            className="rounded-md"
                                            src={require(`../assets/img/car/${item.image}`)}
                                            alt={item.image}
                                            style={{
                                              width: `100%`,
                                              margin: ".5em auto .3em",
                                            }}
                                          />
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  </div>
                );
              })}
            </DragDropContext>
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default KanbanBoard;
