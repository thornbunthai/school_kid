import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createClass } from "../../redux/class/class";

function Create(props) {
  // redux
  const dispatch = useDispatch();

  // axios
  const create = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/ClassRoom", data);
      const result = await res.data;
      dispatch(createClass(result));
      closeCreate();
    } catch (error) {
      console.log(error.message);
    }
  };
  const { openCreate, setOpenCreate } = props;
  // create class
  const [dataCreate, setDataCreate] = useState({
    className: "",
    shiftSession: "",
    totalStudent: 0,
  });
  const saveCreate = () => {
    create(dataCreate);
  };
  const closeCreate = () => {
    setOpenCreate(false);
    setDataCreate({
      className: "",
      shiftSession: "",
      totalStudent: 0,
    });
  };
  const handleCreate = (e) => {
    const { name, value } = e.target;
    setDataCreate({ ...dataCreate, [name]: value });
  };
  return (
    <Dialog fullWidth={true} maxWidth="sm" open={openCreate}>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Create Class
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
              value={dataCreate.className}
              onChange={handleCreate}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small">Shift Session</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={dataCreate.shiftSession}
                label="Shift Session"
                onChange={(e) =>
                  setDataCreate({
                    ...dataCreate,
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
              value={dataCreate.totalStudent}
              onChange={handleCreate}
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
          color="error"
          onClick={closeCreate}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={saveCreate}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Create;
