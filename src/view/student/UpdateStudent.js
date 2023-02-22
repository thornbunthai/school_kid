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
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { updateStudent } from "../../redux/student/student";
import { useDispatch, useSelector } from "react-redux";
import { updateClass } from "../../redux/class/class";
export default function UpdateStudent(props) {
  const { item, setOpenUpdate } = props;
  // redux
  const dispatch = useDispatch();
  const classList = useSelector((state) => state.class.list);
  //axios
  const update = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/Student/${data.id}`,
        data
      );
      const result = await res.data;
      dispatch(updateStudent(result));
      onCloseUpdate();
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
  const [formData, setFormData] = useState(item);

  // handle change form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onUpdateStudent = () => {
    update(formData);
    if (formData.classRoomId !== item.classRoomId) {
      const { totalStudent } = classList.find((v) => v.id === item.classRoomId);
      updateTotalStudent(item.classRoomId, totalStudent - 1);
      const totalNewStudent = classList.find(
        (v) => v.id === formData.classRoomId
      ).totalStudent;
      setTimeout(() => {
        updateTotalStudent(formData.classRoomId, totalNewStudent + 1);
      }, 2000);
    }
  };
  const onCloseUpdate = () => {
    setOpenUpdate(false);
  };
  // shift and classroom
  const [shiftSession, setShiftSession] = useState(
    classList.filter((v) => v.id === item.classRoomId)
  );
  const handleClassRoom = (e) => {
    const { value } = e.target;
    const classRoom = [...classList].filter((v) => v.id === value);
    setFormData({
      ...formData,
      classRoomId: value,
      classRoom: classRoom[0].className,
      shiftSession: "",
    });
    setShiftSession(classRoom);
  };

  return (
    <>
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
        id="alert-dialog-title"
      >
        <PersonIcon />
        <Typography color="black" variant="h6" component="div">
          Edit Student
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
        <Button onClick={onCloseUpdate} variant="contained" color="inherit">
          Cancel
        </Button>
        <Button
          color="success"
          onClick={onUpdateStudent}
          autoFocus
          variant="contained"
        >
          Update
        </Button>
      </DialogActions>
    </>
  );
}
