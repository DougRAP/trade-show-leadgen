import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { Offer } from '../types'
import OfferTile from './OfferTile'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface OffersCarouselProps {
  offers: Offer[];
  onOfferClick: (offer: Offer) => void;
  mini?: boolean;
}

const OffersCarousel: React.FC<OffersCarouselProps> = ({ 
  offers, 
  onOfferClick, 
  mini = false 
}) => {
  return (
    <div className={`w-full ${mini ? 'h-32' : 'h-48'}`}>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="h-full"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id} className="flex justify-center">
            <div className={mini ? "scale-75" : ""}>
              <OfferTile offer={offer} onClick={onOfferClick} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default OffersCarousel