import { IBookmarkIconProps } from "@common/interface/interface";
import { useGlobalContext } from "@contexts/GlobalContext";
import BookmarkIconSvg from "@lib/BookmarkIconSvg";
import toast from "react-hot-toast";
import ToastPop from "./ToastPop";

const BookmarkIcon: React.FC<IBookmarkIconProps> = ({ isBookmarked, coin }) => {
  const { addBookmark, removeBookmark } = useGlobalContext();

  const notify = (isBookmarked: boolean) => {
    if(isBookmarked) {
     ToastPop("북마크가 해제되었습니다.");
    } else {
      ToastPop("북마크가 설정되었습니다.");
    }
  }

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark(coin.id);
      
    } else {
      addBookmark(coin);
    }
    
    notify(isBookmarked)
  };



  return (
<div onClick={handleBookmarkClick} style={{marginRight: '8px', cursor: 'pointer'}}>
   <BookmarkIconSvg isBookmarked={isBookmarked}/>
</div>
  );
}
  

export default BookmarkIcon;