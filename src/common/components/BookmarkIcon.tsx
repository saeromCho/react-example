import { IBookmarkIconProps } from "@common/interface/interface";
import { useGlobalContext } from "@contexts/GlobalContext";



const BookmarkIcon: React.FC<IBookmarkIconProps> = ({ isBookmarked, coin }) => {
  const { addBookmark, removeBookmark } = useGlobalContext();

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark(coin.id);
    } else {
      addBookmark(coin);
    }
  };



  return (
<div onClick={handleBookmarkClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill={isBookmarked ? 'orange': 'lightgrey'} d="M12 .587l3.668 7.431 8.332 1.209-6.008 5.852 1.416 8.254-7.408-3.897-7.408 3.897 1.416-8.254L.001 9.227l8.332-1.209L12 .587z"/>
    </svg>
</div>
  );
}
  

export default BookmarkIcon;