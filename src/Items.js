import React, { useState, useEffect } from "react";
import "./Items.css";
import { db, auth } from "./firebase";
import { Image, Table } from "react-bootstrap";
import NoData from "./nodata-found.png";

const Items = React.memo(({ open }) => {
  const [items, setItems] = useState([]);

  useEffect(
    (items) => {
      if (open) {
        const uid = auth.currentUser.uid;
        const itemsRef = db().ref("users").child(uid);
        itemsRef.on("value", (snapshot) => {
          let itemsList = snapshot.val();
          let newState = [];
          for (let project in itemsList) {
            for (let item in itemsList[project]) {
              newState.push({
                id: item,
                proyecto: project,
                horas: itemsList[project][item].horas,
                tareas: itemsList[project][item].tareas,
                fecha: itemsList[project][item].fecha,
              });
            }
          }
          setItems(newState);
        });
      }
    },
    [open]
  );

  const renderRecords = (item) => {
    return (
      <tr>
        <td>{item.proyecto}</td>
        <td>{item.fecha}</td>
        <td>{item.horas}</td>
        <td>{item.tareas}</td>
      </tr>
    );
  };

  return (
    <div className="items">
      {items ? (
        <Table responsive="sm" size="sm" bordered striped hover>
          <thead>
            <tr class="table-secondary">
              <th>Proyecto</th>
              <th>Fecha</th>
              <th>Horas</th>
              <th>Tareas</th>
            </tr>
          </thead>
          <tbody>{items.map(renderRecords)}</tbody>
        </Table>
      ) : (
        <Image fluid src={NoData} alt="" />
      )}
    </div>
  );
});

export default Items;
