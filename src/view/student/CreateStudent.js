import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import { createStudent } from "../../redux/student/student";
import axios from "axios";
import { updateClass } from "../../redux/class/class";

function CreateStudent(props) {
  const { openCreate, setOpenCreate, classList } = props;

  // redux
  const dispatch = useDispatch();
  // axios
  const create = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/Student", data);
      const result = await res.data;
      dispatch(createStudent(result));
      onCloseFormCreate();
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateTotalStudent = async (id, data) => {
    try {
      const res = await axios.patch(`http://localhost:8000/ClassRoom/${id}`, {
        totalStudent: data,
      });
      const result = await res.data;
      dispatch(updateClass(result));
    } catch (error) {
      console.log(error.message);
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: null,
    phone: "",
    email: "",
    classRoom: "",
    shiftSession: "",
    classRoomId: "",
  });
  //handle change form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onCreateStudent = () => {
    const { totalStudent, id } = classList.find(
      (v) => formData.classRoomId === v.id
    );
    create(formData);
    updateTotalStudent(id, totalStudent + 1);
  };
  const onCloseFormCreate = () => {
    setOpenCreate(false);
    setFormData({
      name: "",
      gender: "",
      dateOfBirth: null,
      phone: "",
      email: "",
      classRoom: "",
      classRoomId: "",
      shiftSession: "",
    });
  };

  // shift and classroom
  const [shiftSession, setShiftSession] = useState([]);
  const handleClassRoom = (e) => {
    const { value } = e.target;
    const classRoom = [...classList].filter((v) => v.id === value);
    setFormData({
      ...formData,
      classRoomId: value,
      classRoom: classRoom[0].className,
    });
    setShiftSession(classRoom);
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      // fullScreen
      open={openCreate}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
        id="alert-dialog-title"
      >
        <PersonIcon />
        <Typography color="black" variant="h6" component="div">
          Create Student
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container sx={{ my: 0 }} spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={handleChange}
              name="name"
              value={formData.name}
              fullWidth
              size="small"
              label="Name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              sx={{
                display: "flex",
                border: "1px solid #c4c4c4",
                borderRadius: 1,
                padding: "0px 5px",
              }}
            >
              <FormLabel
                sx={{
                  marginTop: "-10px",
                  fontSize: "12px",
                  background: "#fff",
                  width: 48,
                  textAlign: "center",
                }}
                id="demo-row-radio-buttons-group-label"
              >
                Gender
              </FormLabel>
              <RadioGroup
                value={formData.gender}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 12,
                        },
                      }}
                    />
                  }
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 12,
                        },
                      }}
                    />
                  }
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={handleChange}
              name="phone"
              value={formData.phone}
              fullWidth
              size="small"
              label="Phone"
              type="tel"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date of birth"
                value={formData.dateOfBirth}
                // minDate={dayjs("2017-01-01")}
                onChange={(newValue) => {
                  setFormData({ ...formData, dateOfBirth: newValue });
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={handleChange}
              name="email"
              value={formData.email}
              fullWidth
              size="small"
              label="Email"
              type="email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small">Classroom</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={formData.classRoomId}
                label="Classroom"
                onChange={handleClassRoom}
                name="classRoom"
              >
                {classList.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small">Shift sesstion</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={formData.shiftSession}
                label="Shift sesstion"
                onChange={handleChange}
                name="shiftSession"
              >
                {shiftSession.map((v) => (
                  <MenuItem key={v.id} value={v.shiftSession}>
                    {v.shiftSession === 1
                      ? "Morning"
                      : v.shiftSession === 2
                      ? "Afternoon"
                      : "Evening"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: "0px 16px 16px 16px" }}>
        <Button onClick={onCloseFormCreate} variant="contained" color="inherit">
          Cancel
        </Button>
        <Button
          color="success"
          onClick={onCreateStudent}
          autoFocus
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateStudent;
