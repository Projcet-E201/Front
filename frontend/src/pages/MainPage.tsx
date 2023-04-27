import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./MainPage.module.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { fontWeight } from "@mui/system";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [sensers, setSensers] = useState<string[]>([
    "motor",
    "vacuum",
    "air-in",
    "air-out-kpa",
    "air-out-mpa",
    "water",
    "abrasion",
    "load",
    "rpm",
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const senserCards = sensers.map((senser, index) => (
    <Draggable
      key={`senser-${senser}`}
      draggableId={`senser-${senser}`}
      index={index}
    >
      {(provided) => (
        <Card
          className={styles.sensercard}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{ ...provided.draggableProps.style }}
        >
          <CardContent>
            {senser}
            <hr />
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 1</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 2</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 3</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 4</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 5</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 6</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 7</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 8</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 9</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 10</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 11</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "0.8vh",
                  paddingRight: "0.8vh",
                }}
              >
                <div>Machine 12</div>
                <div
                  style={{
                    color: "#5cc2f2",
                    fontWeight: "1000px",
                  }}
                >
                  56
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  ));

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sensers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSensers(items.map((item, index) => `${item}`));
  };
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "54%",
            minHeight: "200px",
          }}
        >
          {machines.map((machine) => (
            <Card className={styles.maincard}>
              <div>
                <h3
                  className={styles.maincardtitle}
                  onClick={() => navigate(`/machine/${machine}`)}
                >
                  Machine {machine}
                </h3>
              </div>
              <CardContent>
                <div className={styles.maincardcontent}>
                  <div className={styles.maincardcontentname}>압력</div>
                  <div className={styles.maincardcontentscore}>100</div>
                </div>
                <div className={styles.maincardcontent}>
                  <div className={styles.maincardcontentname}>유량</div>
                  <div className={styles.maincardcontentscore}>200</div>
                </div>
                <div
                  className={styles.maincardcontent}
                  onClick={() => navigate(`/machine/${machine}/motor`)}
                >
                  <div className={styles.maincardcontentname}>모터 가동</div>
                  <div className={styles.maincardcontentscore}>300</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sensers">
            {(provided) => (
              <h3
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "45%",
                  minHeight: "200px",
                  marginTop: "0px",
                  marginBottom: "0px",
                  maxHeight: "780px",
                  overflowY: "scroll",
                }}
              >
                {senserCards}
                {provided.placeholder}
              </h3>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </MainLayout>
  );
};

export default MainPage;
