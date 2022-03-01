import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
  pagePath: string;
  onPlacesListHover: (placeCardId: number) => void;
};

function PlacesList({ offers, pagePath, onPlacesListHover }: PlacesListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} pagePath={pagePath} onPlacesListHover={onPlacesListHover} />)}
    </>
  );
}

export default PlacesList;
