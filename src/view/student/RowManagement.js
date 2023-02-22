import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { forwardRef, useState } from "react";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteStudent } from "../../redux/student/student";
import UpdateStudent from "./UpdateStudent";
import { updateClass } from "../../redux/class/class";

export default function RowManagement(props) {
  const { item, index } = props;
  //redux
  const dispatch = useDispatch();
  const classList = useSelector((state) => state.class.list);
  // axois get data
  const deleteStu = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/Student/${id}`);
      dispatch(deleteStudent(id));
      setOpenDelete(false);
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

  //   //update
  const [openUpdate, setOpenUpdate] = useState(false);

  // delete
  const [openDelete, setOpenDelete] = useState(false);
  const onDeleteStudent = (id) => {
    const { totalStudent } = classList.find((v) => v.id === item.classRoomId);
    deleteStu(id);
    updateTotalStudent(
      item.classRoomId,
      totalStudent === 0 ? totalStudent : totalStudent - 1
    );
  };
  // menu item
  const [openMenu, setOpenMenu] = useState(null);
  const open = Boolean(openMenu);
  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleClose = () => {
    setOpenMenu(null);
  };
  const onUpdate = () => {
    setOpenMenu(null);
    setOpenUpdate(true);
  };
  const onDelete = () => {
    setOpenMenu(null);
    setOpenDelete(true);
  };

  return (
    <TableRow key={index}>
      <TableCell size="" sx={{ whiteSpace: "nowrap" }} align="left">
        {index + 1}
      </TableCell>
      <TableCell size="" sx={{ whiteSpace: "nowrap" }} align="left">
        {item.name}
      </TableCell>
      <TableCell size="" align="center" sx={{ textTransform: "capitalize" }}>
        {item.gender}
      </TableCell>
      <TableCell size="" align="center">
        {Moment(item.dateOfBirth).format("MMM-DD-YYYY")}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }} align="left">
        {item.phone}
      </TableCell>
      <TableCell size="" align="left">
        {item.email}
      </TableCell>
      <TableCell size="" align="left">
        {item.classRoom}
      </TableCell>
      <TableCell size="" align="left">
        {item.shiftSession === 1
          ? "Morning"
          : item.shiftSession === 2
          ? "Afternoon"
          : "Evening"}
      </TableCell>
      <TableCell size="" align="center">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="contained"
          size="small"
          startIcon={<MoreVertIcon />}
        >
          Action
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={openMenu}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => onUpdate()}
            dense={false}
            sx={{ color: "green" }}
          >
            <EditIcon
              fontSize="small"
              color="success"
              sx={{ marginRight: 1 }}
            />
            Update
          </MenuItem>
          <MenuItem onClick={() => onDelete()} sx={{ color: "red" }}>
            <DeleteIcon
              fontSize="small"
              color="error"
              sx={{ marginRight: 1 }}
            />
            Delete
          </MenuItem>
        </Menu>
      </TableCell>
      {/* dialog delete */}
      <Dialog
        open={openDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography color="error" variant="h6" component="div">
            Delete Student
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete student name {item.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "0px 16px 16px 16px" }}>
          <Button
            onClick={() => setOpenDelete(false)}
            variant="contained"
            size="small"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => onDeleteStudent(item.id)}
            autoFocus
            variant="contained"
            size="small"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialog update */}
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={openUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <UpdateStudent item={item} setOpenUpdate={setOpenUpdate} />
      </Dialog>
    </TableRow>
  );
}
// const RowManagement = forwardRef((props, parentRef) => {
//   const { item, index, handleChange } = props;
//   //redux
//   const dispatch = useDispatch();
//   const classList = useSelector((state) => state.class.list);
//   // axois get data
//   const deleteStu = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/Student/${id}`);
//       dispatch(deleteStudent(id));
//       setOpenDelete(false);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   const updateTotalStudent = async (id, data) => {
//     try {
//       const res = await axios.patch(`http://localhost:8000/ClassRoom/${id}`, {
//         totalStudent: data,
//       });
//       const result = await res.data;
//       dispatch(updateClass(result));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   //update
//   const [openUpdate, setOpenUpdate] = useState(false);

//   // delete
//   const [openDelete, setOpenDelete] = useState(false);
//   const onDeleteStudent = (id) => {
//     const { totalStudent } = classList.find((v) => v.id === item.classRoomId);
//     deleteStu(id);
//     updateTotalStudent(
//       item.classRoomId,
//       totalStudent === 0 ? totalStudent : totalStudent - 1
//     );
//   };
//   // menu item
//   const [openMenu, setOpenMenu] = useState(null);
//   const open = Boolean(openMenu);
//   const handleClick = (event) => {
//     setOpenMenu(event.currentTarget);
//   };
//   const handleClose = () => {
//     setOpenMenu(null);
//   };
//   const onUpdate = () => {
//     setOpenMenu(null);
//     setOpenUpdate(true);
//   };
//   const onDelete = () => {
//     setOpenMenu(null);
//     setOpenDelete(true);
//   };

//   return (
//     <TableRow key={index}>
//       <TableCell size="" sx={{ whiteSpace: "nowrap" }} align="left">
//         <FormControlLabel
//           label="Child 1"
//           control={<Checkbox onChange={(e) => handleChange(e, item.id)} />}
//         />
//       </TableCell>
//       <TableCell size="" sx={{ whiteSpace: "nowrap" }} align="left">
//         {item.name}
//       </TableCell>
//       <TableCell size="" align="center" sx={{ textTransform: "capitalize" }}>
//         {item.gender}
//       </TableCell>
//       <TableCell size="" align="center">
//         {Moment(item.dateOfBirth).format("MMM-DD-YYYY")}
//       </TableCell>
//       <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
//         {item.phone}
//       </TableCell>
//       <TableCell size="" align="center">
//         {item.email}
//       </TableCell>
//       <TableCell size="" align="center">
//         {item.classRoom}
//       </TableCell>
//       <TableCell size="" align="center">
//         {item.shiftSession === 1
//           ? "Morning"
//           : item.shiftSession === 2
//           ? "Afternoon"
//           : "Evening"}
//       </TableCell>
//       <TableCell size="" align="right">
//         <Button
//           id="basic-button"
//           aria-controls={open ? "basic-menu" : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? "true" : undefined}
//           onClick={handleClick}
//           variant="contained"
//           size="small"
//           startIcon={<MoreVertIcon />}
//         >
//           Action
//         </Button>
//         <Menu
//           id="basic-menu"
//           anchorEl={openMenu}
//           open={open}
//           onClose={handleClose}
//           MenuListProps={{
//             "aria-labelledby": "basic-button",
//           }}
//           anchorOrigin={{
//             vertical: "top",
//             horizontal: "left",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//         >
//           <MenuItem
//             onClick={() => onUpdate()}
//             dense={false}
//             sx={{ color: "green" }}
//           >
//             <EditIcon
//               fontSize="small"
//               color="success"
//               sx={{ marginRight: 1 }}
//             />
//             Update
//           </MenuItem>
//           <MenuItem onClick={() => onDelete()} sx={{ color: "red" }}>
//             <DeleteIcon
//               fontSize="small"
//               color="error"
//               sx={{ marginRight: 1 }}
//             />
//             Delete
//           </MenuItem>
//         </Menu>
//       </TableCell>
//       {/* dialog delete */}
//       <Dialog
//         open={openDelete}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           <Typography color="error" variant="h6" component="div">
//             Delete Student
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure want to delete student name {item.name} ?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ padding: "0px 16px 16px 16px" }}>
//           <Button
//             onClick={() => setOpenDelete(false)}
//             variant="contained"
//             size="small"
//             color="inherit"
//           >
//             Cancel
//           </Button>
//           <Button
//             color="error"
//             onClick={() => onDeleteStudent(item.id)}
//             autoFocus
//             variant="contained"
//             size="small"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//       {/* dialog update */}
//       <Dialog
//         fullWidth={true}
//         maxWidth="sm"
//         open={openUpdate}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <UpdateStudent item={item} setOpenUpdate={setOpenUpdate} />
//       </Dialog>
//     </TableRow>
//   );
// });
// export default RowManagement;
