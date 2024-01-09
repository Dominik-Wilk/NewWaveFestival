import { Row, Col } from 'reactstrap';
import './Concert.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSeatsByDay, loadSeatsRequest } from '../../../redux/seatsRedux';

const Concert = ({ performer, price, genre, day, image }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSeatsRequest());
  }, [dispatch]);

  const seatsByDay = useSelector(state => getSeatsByDay(state, day));

  return (
    <article className='concert'>
      <Row noGutters>
        <Col xs='6'>
          <div className='concert__image-container'>
            <img
              className='concert__image-container__img'
              src={image}
              alt={performer}
            />
          </div>
        </Col>
        <Col xs='6'>
          <div className='concert__info'>
            <img className='concert__info__back' src={image} alt={performer} />
            <h2 className='concert__info__performer'>{performer}</h2>
            <h3 className='concert__info__genre'>{genre}</h3>
            <p className='concert__info__day-n-price'>
              Day: {day}, Price: {price}$
            </p>
            {seatsByDay.length === 0 ? (
              ''
            ) : (
              <p className='concert__info__tickets'>
                Only {50 - seatsByDay.length} tickets left
              </p>
            )}
          </div>
        </Col>
      </Row>
    </article>
  );
};

export default Concert;
