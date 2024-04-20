import BookmarkIcon from "@common/components/BookmarkIcon";
import { useGlobalContext } from "@contexts/GlobalContext";

export const columnsData = [
  {
    accessorKey: 'name',
    header: '자산',
    cell: (info: any) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BookmarkIcon
          isBookmarked={useGlobalContext().bookmarks.some(coin => coin.id === info.row.original.id)}
          coin={info.row.original} />
        {info.getValue()}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: 'symbol',
    cell: (info: any) => info.getValue(),
    size: 100,
  },
  {
    accessorKey: 'current_price',
    header: 'Price',
    cell: (info: any) => `$@₩${info.getValue()}`,
    size: 150,
  },
  {
    accessorKey: 'price_change_percentage_1h_in_currency',
    header: '1H',
    cell: (info: any) => `₩$${info.getValue()}%`,
    size: 150,
  },
  {
    accessorKey: 'price_change_percentage_24h_in_currency',
    header: '24H',
    cell: (info: any) => `${info.getValue()}%`,
    size: 200,
  },
  {
    accessorKey: 'price_change_percentage_7d_in_currency',
    header: '7D',
    cell: (info: any) => `${info.getValue()}%`,
    size: 200,
  },
  {
    accessorKey: 'total_volume',
    header: '24H Volume',
    cell: (info: any) => `₩${info.getValue()}`,
    size: 200,
  }
];