import { IBookmarkIconProps } from '@common/interface/interface';
import { useGlobalContext } from '@contexts/GlobalContext';
import BookmarkIconSvg from '@lib/BookmarkIconSvg';
import ToastPop from './ToastPop';

const BookmarkIcon: React.FC<IBookmarkIconProps> = ({ isBookmarked, coin }) => {
  const { addBookmark, removeBookmark } = useGlobalContext();

  const notify = (isBookmarked: boolean) => {
    if (isBookmarked) {
      ToastPop('북마크가 해제되었습니다.', 4000, 'bottom-center', null, false);
    } else {
      ToastPop('북마크가 해제되었습니다.', 4000, 'bottom-center', null, false);
    }
  };

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark(coin.id);
    } else {
      addBookmark(coin);
    }

    notify(isBookmarked);
  };

  return (
    <div onClick={handleBookmarkClick} style={{ marginRight: '8px', cursor: 'pointer' }}>
      <BookmarkIconSvg isBookmarked={isBookmarked} />
    </div>
  );
};

export default BookmarkIcon;
