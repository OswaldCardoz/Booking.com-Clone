import React from "react";
// import Modal from "react-modal";
import Skeleton from "react-loading-skeleton";

function HotelCardSkeleton(){
  return (
    <div className='hotel-list-cards skeleton'>
      <div className='hotels-list-img-div'>
        <Skeleton height={180} />
      </div>

      <div className='details-price-div'>
        <div className='hotel-list-details-div'>
          <Skeleton height={20} width={150} />
          <Skeleton height={15} width={120} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={100} />
          <Skeleton height={15} width={80} />
        </div>

        <div className='ratings-price-div'>
          <div className='hotels-rating'>
            <Skeleton height={20} width={40} />
            <Skeleton height={15} width={30} />
          </div>
          <div className='hotels-price'>
            <Skeleton height={20} width={70} />
            <Skeleton height={15} width={100} />
            <Skeleton height={32} width={150} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HotelCardSkeleton;