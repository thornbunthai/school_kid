import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Teacher() {
  const [checked, setChecked] = React.useState([]);
  const handleChange = (e, id) => {
    const { checked } = e.target;
    setChecked((prevChecked) =>
      checked ? [...prevChecked, id] : [...prevChecked.filter((v) => v !== id)]
    );
  };
  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox onChange={(e) => handleChange(e, 1)} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox onChange={(e) => handleChange(e, 2)} />}
      />
    </Box>
  );
  console.log(checked);
  const isChecked = (id) => {};
  return (
    <div>
      <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            // checked={checked[0] && checked[1]}
            // indeterminate={checked[0] !== checked[1]}
            onChange={(e) => handleChange(e, 2)}
          />
        }
      />
      {children}
    </div>
  );
}
