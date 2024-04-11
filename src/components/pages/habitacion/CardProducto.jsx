import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const CardHabitacion = ({ habitacion }) => {
  return (
    <Col md={4} lg={3} className="my-2">
      <Card className="h-100 ">
        <Card.Img
          className="card-img-top-nueva"
          variant="top"
          src={habitacion.imagen}
          alt={habitacion.nombreHabitacion}
        />
        <Card.Body>
          <Card.Title className="txt-verdecito">
            {habitacion.nombreHabitacion}
          </Card.Title>
          <Card.Text>
            {habitacion.descripcion_breve}
            <br />
            <b>Precio: ${habitacion.precio}</b>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link className="btn btn-success" to={'/detalleHabitacion/'+ habitacion._id}>Ver mas</Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardHabitacion;
