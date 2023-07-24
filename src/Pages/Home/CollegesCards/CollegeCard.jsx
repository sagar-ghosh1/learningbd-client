import { Link } from "react-router-dom";

const CollegeCard = ({ college }) => {
  return (
    <div className="">
      <div className="card md:card-side bg-base-100 shadow-xl">
        <figure>
          <img className="w-80" src={college?.image} alt="College image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{college?.name}</h2>

          <div className="md:flex justify-between items-center">
            <div>
              <div>
                <p className="font-semibold">Admission date</p>
                <span>{college?.admissionDates}</span>
              </div>
              <p className="font-semibold mt-3">Events</p>
              {college?.events.map((ev, index) => (
                <span className="mr-2" key={index}>
                  {ev.name},
                </span>
              ))}
            </div>
            <div>
              <p className="font-semibold">Research history</p>
              <span>{college?.researchHistory}</span>
              <p className="font-semibold mt-3">Sports</p>
              {college?.sports.map((sp, index) => (
                <span className="mr-2" key={index}>
                  {sp.name},
                </span>
              ))}
            </div>
            <div className="">
              <Link
                to={`/singleCollege/${college?._id}`}
                className="btn bg-blue-500 text-white"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
