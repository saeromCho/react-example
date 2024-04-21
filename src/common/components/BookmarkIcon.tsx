import { IBookmarkIconProps } from "@common/interface/interface";
import { useGlobalContext } from "@contexts/GlobalContext";
import toast from "react-hot-toast";



const BookmarkIcon: React.FC<IBookmarkIconProps> = ({ isBookmarked, coin }) => {
  const { addBookmark, removeBookmark } = useGlobalContext();

  const notify = (isBookmarked: boolean) => {
    if(isBookmarked) {
        toast("북마크가 해제되었습니다.", {
          duration: 3000,
          position: "bottom-center",
          style: {
            cursor: 'pointer',
            borderRadius: '0.8rem',
            padding: '1.6rem',
            background: 'rgba(0,0,0,0.75)',
            color: '#fff',
            textAlign: 'center',
            userSelect: 'none',
          },
        });
    } else {
      toast("북마크가 설정되었습니다.", {
        duration: 3000,
        position: "bottom-center",
        style: {
          cursor: 'pointer',
          borderRadius: '0.8rem',
          padding: '1.6rem',
          background: 'rgba(0,0,0,0.75)',
          color: '#fff',
          textAlign: 'center',
          userSelect: 'none',
        },
      });
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
<div onClick={handleBookmarkClick} style={{marginRight: '8px'}}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill={isBookmarked ? 'orange': 'lightgrey'} d="M12 .587l3.668 7.431 8.332 1.209-6.008 5.852 1.416 8.254-7.408-3.897-7.408 3.897 1.416-8.254L.001 9.227l8.332-1.209L12 .587z"/>
    </svg>
</div>
  );
}
  

export default BookmarkIcon;