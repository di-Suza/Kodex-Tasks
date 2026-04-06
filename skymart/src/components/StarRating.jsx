const StarRating = ({ rating }) => {
  const totalStars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1 text-[#ffb700]">
      {totalStars.map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? "opacity-100" : "opacity-20"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
