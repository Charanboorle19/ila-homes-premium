import PropertyCard from "./PropertyCard";

/** Featured lead card uses the shared tile layout for consistent alignment. */
export default function FeaturedCard(props) {
  return <PropertyCard {...props} featured />;
}
