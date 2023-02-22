import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setClass } from "../../redux/class/class";
import { Button, Grid, TextField, Typography } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
import ClassIcon from "@mui/icons-material/Class";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/system";
import Create from "./Create";
import ClassRow from "./ClassRow";

export default function Class() {
  // redux
  const dispatch = useDispatch();
  const classList = useSelector((state) => state.class.list);

  // axios get data
  const getClassList = async () => {
    try {
      const res = await axios.get("http://localhost:8000/ClassRoom");
      const result = await res.data;
      dispatch(setClass(result));
    } catch (error) {
      console.log(error.message);
    }
  };
  const onSearch = async (className) => {
    const res = await axios.get(
      `http://localhost:8000/ClassRoom?className_like=${className}`
    );
    const result = res.data;
    dispatch(setClass(result));
  };
  // useEffect
  useEffect(() => {
    getClassList();
  }, []);
  // create form
  const [openCreate, setOpenCreate] = useState(false);

  //onSearch
  const [name, setName] = useState("");
  const searchClass = () => {
    onSearch(name);
  };
  return (
    <Container maxWidth="fullWidth">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="div"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <ClassIcon />
            <Typography variant="h6">Class List</Typography>
          </Typography>
          <Button
            variant="contained"
            // size="small"
            // startIcon={<AddIcon />}
            onClick={() => setOpenCreate(true)}
          >
            Create
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ display: "flex", justifyContent: "end", gap: 1 }}
        >
          <TextField
            variant="outlined"
            size="small"
            label="Class Name"
            name="className"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={searchClass}
          >
            <SearchIcon fontSize="small" />
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#808080" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }} align="left">
                      Class Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="right">
                      Shift Session
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="right">
                      Total Student
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="right">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classList.map((data) => (
                    <ClassRow key={data.id} item={data} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Create openCreate={openCreate} setOpenCreate={setOpenCreate} />
    </Container>
  );
}
