import { Container, Table, Button } from "react-bootstrap";
import ItemHabitacion from "./habitacion/ItemHabitacion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { leerhabitacionesAPI } from "../../helpers/queries";
import Swal from "sweetalert2";

const Administrador = () => {
  const [habitaciones, sethabitaciones] = useState([]);

  useEffect(() => {
    obtenerhabitaciones();
  }, []);

  const obtenerhabitaciones = async () => {
    const respuesta = await leerhabitacionesAPI();
    if (respuesta.status === 200) {
      //guardar el array en el state
      const datos = await respuesta.json();
      sethabitaciones(datos);
    }else{
      Swal.fire({
        title: "Ocurrio un error",
        text: `Intenta esta operación en unos minutos.`,
        icon: "error"
      });
    }
  };

  return (
    <Container className="mainContainer">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">habitaciones disponibles</h1>
        <Link className="btn btn-primary" to="/administrador/crear">
          <i className="bi bi-file-earmark-plus"></i>
        </Link>
      </div>
      <div className="table-responsive">
        <Table responsive striped bordered hover>
          <thead>
            <tr className="text-center">
              {/* <th>Cod</th> */}
              <th>Habitacion</th>
              <th>Precio</th>
              <th>URL de Imagen</th>
              <th>Categoria</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {
              habitaciones.map((habitacion)=> <ItemHabitacion key={habitacion._id} habitacion={habitacion} sethabitaciones={sethabitaciones}></ItemHabitacion>)
            }
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Administrador;
