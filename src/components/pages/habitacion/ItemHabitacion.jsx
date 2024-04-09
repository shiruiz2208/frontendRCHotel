import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarHabitacionAPI, leerHabitacionesAPI } from "../../../helpers/queries";
import { Link } from "react-router-dom";
const ItemHabitacion = ({ habitacion, setHabitaciones }) => {
  const borrarHabitacion = () => {
    Swal.fire({
      title: "¿Esta seguro de eliminar la habitacion?",
      text: "No se puede revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //agregar la logica correspondiente para borrar el producto en la api
        const respuesta = await borrarHabitacionAPI(habitacion._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Habitacion eliminada",
            text: `La habitacion "${habitacion.nombreHabitacion}" fue eliminada correctamente`,
            icon: "success",
          });
          //actualizar la tabla del admin
          const respuestaHabitaciones = await leerHabitacionesAPI();
          if (respuestaHabitaciones.status === 200) {
            const habitacionesRestantes = await respuestaHabitaciones.json();
            setHabitaciones(habitacionesRestantes);
          } else {
            Swal.fire({
              title: "Ocurrio un error",
              text: `No se pudo listar las habitacion`,
              icon: "error",
            });
          }
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `La habitacion "${habitacion.nombreHabitacion}" no fue eliminada. Intente esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      {/* <td className="text-center">{producto._id}</td> */}
      <td>{habitacion.nombreHabitacion}</td>
      <td className="text-end">${habitacion.precio}</td>
      <td className="text-center">
        <img
          src={habitacion.imagen}
          className="img-thumbnail"
          alt={habitacion.nombreHabitacion}
        ></img>
      </td>
      <td>{habitacion.categoria}</td>
      <td className="text-center">
        <Link className="btn btn-warning me-lg-2" to={'/administrador/editar/'+ habitacion._id}>
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" onClick={borrarHabitacion}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemHabitacion;