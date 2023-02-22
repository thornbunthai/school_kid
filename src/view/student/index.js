import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowManagement from "./RowManagement";
import AddIcon from "@mui/icons-material/Add";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setStudentList } from "../../redux/student/student";
import CreateStudent from "./CreateStudent";
import { setClass } from "../../redux/class/class";

function Student() {
  // redux
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.student.list);
  const classList = useSelector((state) => state.class.list);

  const getClassList = async () => {
    try {
      const res = await axios.get("http://localhost:8000/ClassRoom");
      const result = await res.data;
      dispatch(setClass(result));
    } catch (error) {
      console.log(error.message);
    }
  };
  // axois fetch data
  const getStudentList = async () => {
    try {
      const res = await axios.get("http://localhost:8000/Student");
      const result = await res.data;
      dispatch(setStudentList(result));
    } catch (error) {
      console.log(error.messge);
    }
  };
  const onSearch = async (stuName, className) => {
    const res = await axios.get(
      `http://localhost:8000/Student?classRoomId${
        className !== 0 ? "=" + className : "?"
      }&&name_like=${stuName}`
    );
    const result = res.data;
    dispatch(setStudentList(result));
  };
  // get data
  useEffect(() => {
    getStudentList();
    if (classList.length <= 0) getClassList();
  }, []);
  //create
  const [openCreate, setOpenCreate] = useState(false);

  // search
  const [classRoom, setClassRoom] = useState(0);
  const [name, setName] = useState("");
  const onChangeClassRoom = (e) => {
    const { value } = e.target;
    setClassRoom(value);
    onSearch(name, value);
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
            <Diversity3Icon />
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
            onClick={onSearch}
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
                      #
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="left">
                      Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Gender
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Date Of Birth
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="left">
                      Phone
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="left">
                      Email
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="left">
                      Calss Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="left">
                      shiftSession
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentList.map((data, index) => (
                    <RowManagement key={data.id} item={data} index={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <CreateStudent
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        classList={classList}
      />
    </Container>
  );
}

export default Student;
