import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
  onPlacesListHover: (placeCardId: number) => void;
};

function PlacesList({ offers, onPlacesListHover }: PlacesListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} onPlacesListHover={onPlacesListHover} />)}
    </>
  );
}

export default PlacesList;
