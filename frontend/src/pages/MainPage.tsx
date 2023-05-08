// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import styles from "./MainPage.module.css";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "react-beautiful-dnd";
// import { fontWeight } from "@mui/system";
// import { useRecoilState } from "recoil";
// import { indexAtom } from "../store/atoms";
// import { faker } from "@faker-js/faker";
// import MainError from "../components/MainError/MainError";
// import MainMachineItem from "../components/MainMachineItem/MainMachineItem";

// const MainPage = () => {
//   const [selectedIndex, setSelectedIndex] = useRecoilState(indexAtom);
//   const indexClick = (value: string) => {
//     setSelectedIndex(value);
//   };
//   const navigate = useNavigate();
//   const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

//   const [clientData, setClientData] = useState<any>([
//     {
//       name: "CLIENT1",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT2",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT3",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT4",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT5",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT6",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT7",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT8",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT9",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT10",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT11",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//     {
//       name: "CLIENT12",
//       value: {
//         MOTOR: 100,
//         VACUUM: 50,
//         AIR_IN_KPA: 400,
//         AIR_OUT_KPA: 0.8,
//         AIR_OUT_MPA: 500,
//         WATER: 3,
//         ABRASION: 16,
//         LOAD: 8,
//         VELOCITY: 30000,
//         SCORE: 80,
//       },
//     },
//   ]);
//   const [sensors, setsensors] = useState<string[]>([
//     "MOTOR",
//     "VACUUM",
//     "AIR_IN_KPA",
//     "AIR_OUT_KPA",
//     "AIR_OUT_MPA",
//     "WATER",
//     "ABRASION",
//     "LOAD",
//     "VELOCITY",
//   ]);

//   interface SensorAddressMap {
//     [key: string]: string;
//   }

//   const sensorAddressMap: SensorAddressMap = {
//     MOTOR: "motor",
//     VACUUM: "vacuum",
//     AIR_IN_KPA: "air-in",
//     AIR_OUT_KPA: "air-out-kpa",
//     AIR_OUT_MPA: "air-out-mpa",
//     WATER: "water",
//     ABRASION: "abrasion",
//     LOAD: "load",
//     VELOCITY: "velocity",
//   };

//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [data, setData] = useState<{ [key: string]: number }>({});

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setData({
//         MOTOR: Math.floor(Math.random() * 301),
//         VACUUM: Math.floor(Math.random() * 101),
//         AIR_IN_KPA: Math.floor(Math.random() * 901),
//         AIR_OUT_KPA: -0.1 + Math.random() * 1.1,
//         AIR_OUT_MPA: Math.floor(Math.random() * 901),
//         WATER: Math.floor(Math.random() * 5),
//         ABRASION: Math.floor(Math.random() * 41),
//         LOAD: Math.floor(Math.random() * 17),
//         VELOCITY: Math.floor(Math.random() * 50001),
//         SCORE: Math.floor(Math.random() * 101),
//       });
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newValues: { [key: string]: number } = {};
//       newValues["motor"] = data.MOTOR;
//       newValues["압력"] = data.VACUUM;
//       newValues["유량"] = data.WATER;
//       setData({ ...data, ...newValues });
//     }, 100);
//     return () => clearInterval(interval);
//   }, [data]);

//   const machineData = clientData.map((client: any, index: number) => (
//     <div className={styles.sensordatacontent} key={index}>
//       <div>{client.name}</div>
//       <div className={styles.sensordatascore}>56</div>
//     </div>
//   ));

//   const sensorCards = sensors.map((sensor, index) => (
//     <Draggable
//       key={`sensor-${sensor}`}
//       draggableId={`sensor-${sensor}`}
//       index={index}
//     >
//       {(provided) => (
//         <Card
//           className={styles.sensorcard}
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//         >
//           <h3
//             className={styles.sensorheader}
//             {...provided.dragHandleProps}
//             {...(index === 0 ? {} : { isdragdisabled: "true" })}
//           >
//             {sensor}
//           </h3>
//           <CardContent>
//             {clientData.map((data: any, dataIndex: any) => (
//               <div
//                 className={styles.sensordatacontent}
//                 key={`sensordata-${dataIndex}`}
//                 onClick={() =>
//                   navigate(
//                     `/machine/${machines[dataIndex]}/${sensorAddressMap[sensor]}`
//                   )
//                 }
//               >
//                 <div>{data.name}</div>
//                 <div className={styles.sensordatascore}>
//                   {data.value[sensor]}
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       )}
//     </Draggable>
//   ));

//   const handleDragEnd = (result: DropResult) => {
//     if (!result.destination) return;
//     const items = Array.from(sensors);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setsensors(items.map((item, index) => `${item}`));
//   };
//   return (
//     <MainLayout>
//       <div
//         style={{
//           display: "flex",
//           maxHeight: "80vh",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             width: "54%",
//             // height: "100%",
//           }}
//         >
//           {clientData.map((client: any, index: number) => (
//             <div className={styles.maincard} key={index}>
//               <MainMachineItem client={client} index={index} />
//             </div>
//           ))}
//           <Card className={styles.errorcard}>
//             <CardContent
//               style={{
//                 lineHeight: "2.8em",
//               }}
//             >
//               <MainError />
//             </CardContent>
//           </Card>
//         </div>

//         <DragDropContext onDragEnd={handleDragEnd}>
//           <Droppable droppableId="sensors">
//             {(provided) => (
//               <div
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 className={styles.sensordatastyle}
//               >
//                 {sensorCards}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>
//     </MainLayout>
//   );
// };

// export default MainPage;

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
import MainError from "../components/MainError/MainError";
import MainMachineItem from "../components/MainMachineItem/MainMachineItem";

const MainPage = () => {
  const navigate = useNavigate();
  const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [clientData, setClientData] = useState({
    CLIENT1: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT2: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT3: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT4: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT5: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT6: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT7: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT8: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT9: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT10: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT11: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT12: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
  });

  const [sensors, setsensors] = useState<string[]>([
    "MOTOR",
    "VACUUM",
    "AIR_IN_KPA",
    "AIR_OUT_KPA",
    "AIR_OUT_MPA",
    "WATER",
    "ABRASION",
    "LOAD",
    "VELOCITY",
  ]);

  interface SensorAddressMap {
    [key: string]: string;
  }

  const sensorAddressMap: SensorAddressMap = {
    MOTOR: "motor",
    VACUUM: "vacuum",
    AIR_IN_KPA: "air-in",
    AIR_OUT_KPA: "air-out-kpa",
    AIR_OUT_MPA: "air-out-mpa",
    WATER: "water",
    ABRASION: "abrasion",
    LOAD: "load",
    VELOCITY: "velocity",
  };

  const sensorCards = sensors.map((sensor, index) => (
    <Draggable
      key={`sensor-${sensor}`}
      draggableId={`sensor-${sensor}`}
      index={index}
    >
      {(provided) => (
        <Card
          className={styles.sensorcard}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <h3
            className={styles.sensorheader}
            {...provided.dragHandleProps}
            {...(index === 0 ? {} : { isdragdisabled: "true" })}
          >
            {sensor}
          </h3>
          <CardContent>
            {Object.entries(clientData).map(([key, data], dataIndex) => (
              <div
                className={styles.sensordatacontent}
                key={`sensordata-${dataIndex}`}
                onClick={() =>
                  navigate(
                    `/machine/${machines[dataIndex]}/${sensorAddressMap[sensor]}`
                  )
                }
              >
                <div>{key}</div>
                <div className={styles.sensordatascore}>{data.MOTOR}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </Draggable>
  ));

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sensors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setsensors(items.map((item, index) => `${item}`));
  };
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          maxHeight: "80vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "54%",
            // height: "100%",
          }}
        >
          {Object.entries(clientData).map(([key, client], index) => (
            <div className={styles.maincard} key={key}>
              <MainMachineItem client={client} id={key} index={index} />
            </div>
          ))}
          <Card className={styles.errorcard}>
            <CardContent
              style={{
                lineHeight: "2.8em",
              }}
            >
              <MainError />
            </CardContent>
          </Card>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sensors">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.sensordatastyle}
              >
                {sensorCards}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </MainLayout>
  );
};

export default MainPage;
