import React, { useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateClass } from "../../redux/class/class";
import { updateStudent } from "../../redux/student/student";

function Update(props) {
  const { setOpenUpdate, item } = props;
  // redux
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.student.list);

  // axios
  const update = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/ClassRoom/${data.id}`,
        data
      );
      const result = await res.data;
      dispatch(updateClass(result));
      checkStudentClass(result);
      setOpenUpdate(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateStudentClass = async (id, shiftSession, className) => {
    const res = await axios.patch(`http://localhost:8000/Student/${id}`, {
      shiftSession,
      classRoom: className,
    });
    const result = await res.data;
    dispatch(updateStudent(result));
  };
  const checkStudentClass = (classUpdate) => {
    const stuClassUpdate = studentList.filter(
      (v) => v.classRoomId === classUpdate.id
    );
    if (stuClassUpdate.length > 0) {
      const { shiftSession, className } = classUpdate;
      stuClassUpdate.forEach((v) =>
        updateStudentClass(v.id, shiftSession, className)
      );
    }
  };
  // create class
  const [dataUpdate, setDataUpdate] = useState(item);
  const saveUpdate = () => {
    update(dataUpdate);
  };
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setDataUpdate({ ...dataUpdate, [name]: value });
  };
  return (
    <>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Edit Class
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid sx={{ my: 0 }} container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Class Name"
              name="className"
              value={dataUpdate.className}
              onChange={handleUpdate}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small">Shift Session</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={dataUpdate.shiftSession}
                label="Shift Session"
                onChange={(e) =>
                  setDataUpdate({
                    ...dataUpdate,
                    shiftSession: e.target.value,
                  })
                }
              >
                <MenuItem value={1}>Moring</MenuItem>
                <MenuItem value={2}>Afternoon</MenuItem>
                <MenuItem value={3}>Evening</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="totalStudent"
              fullWidth
              size="small"
              label="Total Student"
              type="number"
              value={dataUpdate.totalStudent}
              onChange={handleUpdate}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField
              name="teacher"
              fullWidth
              size="small"
              label="Teacher"
            />
          </Grid> */}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: "0px 20px 16px 16px" }}>
        <Button
          variant="contained"
          size="small"
          color="inherit"
          onClick={() => setOpenUpdate(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={saveUpdate}
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
}

export default Update;
