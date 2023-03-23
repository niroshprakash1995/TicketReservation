import React from "react";
import Message from "../components/Message/Message";
import Table from "react-bootstrap/Table";
import { Trash } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import "../pages/Favorites.css";

function Favorites() {
  const [localStorageItem, setLocalStorageItem] = useState([]);
  const [localStorageEmpty, setLocalStorageEmpty] = useState(false);

  const tableColumn = [
    { id: 1, heading: "#", value: "#" },
    { id: 2, heading: "Date", value: "Date" },
    { id: 3, heading: "Event", value: "Event" },
    { id: 4, heading: "Category", value: "Category" },
    { id: 5, heading: "Venue", value: "Venue" },
    { id: 6, heading: "Favorite", value: "Favorite" },
  ];

  useEffect(() => {
    var localStorageItem = JSON.parse(localStorage.getItem("items") || "[]");
    if (localStorageItem.length === 0) {
      setLocalStorageEmpty(true);
    }
    setLocalStorageItem(localStorageItem);
  }, []);

  return (
    <div>
      {localStorageEmpty ? (
        <Message message={"No favorite events to show"}></Message>
      ) : (
        <>
          <h5 className="favorites-title">List of your favorite events</h5>

          <div className="table-responsive">
            <Table
              striped
              variant="light"
              className="tbl w-75 mx-auto rounded rounded-3 overflow-hidden"
            >
              <thead>
                <tr>
                  {tableColumn.map((item) => (
                    <TableHeadItem key={item.id} item={item}></TableHeadItem>
                  ))}
                </tr>
              </thead>
              <tbody>
                {localStorageItem.map((item) => (
                  <TableRowItem
                    item={item}
                    id={item.id}
                    setLocalStorageEmpty={setLocalStorageEmpty}
                    key={item.id}
                  ></TableRowItem>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;

const TableRowItem = ({ item, id, setLocalStorageEmpty }) => {
  const deleteRow = (id) => {
    //Remove data from local storage
    var localStorageItems = JSON.parse(localStorage.getItem("items") || "[]");
    var requiredIndex = -1;
    for (var i = 0; i < localStorageItems.length; i++) {
      if (localStorageItems[i].id === id) {
        requiredIndex = i;
        break;
      }
    }
    if (requiredIndex !== -1) {
      localStorageItems.splice(requiredIndex, 1);
      localStorage.setItem("items", JSON.stringify(localStorageItems));
    }

    //Delete table row
    const row = document.getElementById(id);
    row.remove();
    alert("Removed from favorites!");

    const tableRows = document.getElementsByTagName("tr");
    if (tableRows.length === 1) {
      setLocalStorageEmpty(true);
    }
  };
  return (
    <tr id={id}>
      <td></td>
      <td>{item.date}</td>
      <td>{item.name}</td>
      <td>{item.genres}</td>
      <td>{item.venue}</td>
      <td>
        <Trash className="trashicon" onClick={() => deleteRow(item.id)}></Trash>
      </td>
    </tr>
  );
};

export default Favorites;
