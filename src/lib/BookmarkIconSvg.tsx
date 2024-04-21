import { IBookmarkIconSvgProps } from "@common/interface/interface";

const BookmarkIconSvg: React.FC<IBookmarkIconSvgProps> = ({isBookmarked}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill={isBookmarked ? 'orange': 'lightgrey'} d="M12 .587l3.668 7.431 8.332 1.209-6.008 5.852 1.416 8.254-7.408-3.897-7.408 3.897 1.416-8.254L.001 9.227l8.332-1.209L12 .587z"/>
      </svg>
  );
}

export default BookmarkIconSvg;