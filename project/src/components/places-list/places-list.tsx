import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
  pagePath: string;
};

function PlacesList({ offers, pagePath }: PlacesListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} pagePath={pagePath} />)}
    </>
  );
}

export default PlacesList;
