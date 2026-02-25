import { Delete, Edit } from "@mui/icons-material";
import { ListItemIcon, MenuItem } from "@mui/material";
import { useMemo } from "react";
import { UseSuppliesContext } from "../../../../context/safety/kit/supplies/SuppliesContext";
import Form from '../../../../views/safety/kit/supplies/Form'

const Actions = ({ closeMenu, row }) => {
 const { setModalSupplies } = UseSuppliesContext();
 const handleEdit = () => {
  closeMenu();
  setModalSupplies ({show: true, children: <Form item={row.original}/>})
  };

  const handleDelete = () => {
    closeMenu();
    console.log("eliminar", row.original);
  };

  const menuItems = useMemo(
    () => [
      {
        title: "Editar",
        icon: <Edit />,
        action: handleEdit,
      },
      {
        title: <span className="text-red-400">Eliminar</span>,
        icon: <Delete sx={{ color: "#f87171" }} />,
        action: handleDelete,
      },
    ],
    [],
  );

  return (
    <>
      {menuItems.map((item, index) => {
        if (item) {
          return (
            <MenuItem key={index} onClick={item.action}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {item.title}
            </MenuItem>
          );
        }
      })}
    </>
  );
};

export default Actions;
