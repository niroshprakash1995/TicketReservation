import styles from "../DataTable/DataTable.module.css";
import Table from "react-bootstrap/Table";
import React from "react";

function DataTable({ tableData, getCardDetails }) {
  const column = [
    { id: 1, heading: "Date/Time", value: "DateTime" },
    { id: 2, heading: "Icon", value: "Icon" },
    { id: 3, heading: "Event", value: "Event" },
    { id: 4, heading: "Genre", value: "Genre" },
    { id: 5, heading: "Venue", value: "Venue" },
  ];

  return (
    <div className="table-responsive pt-5">
      <Table
        striped
        className={`${styles["table"]} w-75 mx-auto rounded rounded-3 overflow-hidden`}
        variant="dark"
      >
        <thead>
          <tr>
            {column.map((item) => (
              <TableHeadItem key={item.id} item={item}></TableHeadItem>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <TableRow
              item={item}
              id={item.id}
              getCardDetails={getCardDetails}
              key={item.id}
            ></TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;

const TableRow = ({ item, id, getCardDetails }) => {
  return (
    <tr
      id={id}
      onClick={() =>
        getCardDetails(id, item._embedded.venues[0].name, item.name)
      }
    >
      <td>
        {item.dates.start.localDate} <br />
        {item.dates.start.localTime}
      </td>
      <td>
        <img src={item.images[0].url} alt="Icon not available"></img>
      </td>
      <td>{item.name}</td>
      <td>{item.classifications[0].segment.name}</td>
      <td>{item._embedded.venues[0].name}</td>
    </tr>
  );
};
export default DataTable;
