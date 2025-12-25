import TextInput from './TextInput';
import DateSortSelect from './DateSortSelect';
import PriceSortSelect from './PriceSortSelect';

interface Props {
  search: string;
  dateSort: string;
  priceSort: string;
  notFound: boolean;
  onSearchChange: (value: string) => void;
  onDateSortChange: (value: string) => void;
  onPriceSortChange: (value: string) => void;
}

export default function FilterControls({
  search,
  dateSort,
  priceSort,
  notFound,
  onSearchChange,
  onDateSortChange,
  onPriceSortChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row gap-4">
        <TextInput
          value={search}
          placeholder="Search wishes..."
          onChange={onSearchChange}
        />

        <DateSortSelect value={dateSort} onChange={onDateSortChange} />

        <PriceSortSelect value={priceSort} onChange={onPriceSortChange} />
      </div>

      {notFound && <p className="text-red-500 font-medium">No wishes found</p>}
    </div>
  );
}
