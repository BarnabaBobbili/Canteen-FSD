import StarRating from './StarRating';

/**
 * Rating Section Component
 * Displays a labeled rating input
 */
const RatingSection = ({
  label,
  category,
  ratings,
  hoverRating,
  isRequired = false,
  onRatingClick,
  onHoverEnter,
  onHoverLeave
}) => {
  const value = ratings[category] || 0;
  const hoverValue = hoverRating[category] || 0;

  return (
    <div>
      <label className={`block ${isRequired ? 'text-lg' : 'text-sm'} font-${isRequired ? 'black' : 'bold'} text-gray-${isRequired ? '900' : '700'} mb-${isRequired ? '3' : '2'}`}>
        {label} {isRequired && <span className="text-red-600">*</span>}
      </label>
      <div className="flex items-center gap-3">
        <StarRating
          category={category}
          value={value}
          hoverValue={hoverValue}
          onRatingClick={onRatingClick}
          onHoverEnter={onHoverEnter}
          onHoverLeave={onHoverLeave}
        />
        {value > 0 && (
          <span className={`${isRequired ? 'text-xl' : 'text-sm'} font-bold text-gray-${isRequired ? '900' : '600'}`}>
            {value} / 5
          </span>
        )}
      </div>
    </div>
  );
};

export default RatingSection;
