import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
  onPlacesListHover: (placeCardId: number) => void;
  pageClass: string;
};

function PlacesList({ offers, onPlacesListHover, pageClass }: PlacesListProps): JSX.Element {
  return (
    <div className={pageClass} data-testid='places-list'>
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} onPlacesListHover={onPlacesListHover} />)}
    </div>
  );
}

export default PlacesList;
