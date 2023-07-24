import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewCard = ({ college }) => {
  return (
    <div className="my-[20px]">
      <h3 className="text-2xl font-semibold">{college.name}</h3>
      <div className="">
        {college &&
          college.reviews.map((review) => (
            <div
              className="border border-blue-500 py-2 px-2 my-4 mr-6"
              key={review.username}
            >
              <p>{review.username}</p>
              <Rating
                style={{ maxWidth: 100 }}
                value={review.rating}
                readOnly
              />
              <p>{review.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewCard;
