import { Star } from 'lucide-react';

/**
 * Star Rating Component
 * Interactive star rating input
 */
const StarRating = ({ category, value, hoverValue, onRatingClick, onHoverEnter, onHoverLeave }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => onHoverEnter(category, star)}
          onMouseLeave={() => onHoverLeave(category)}
          onClick={() => onRatingClick(category, star)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            size={32}
            className={
              star <= (hoverValue || value)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
