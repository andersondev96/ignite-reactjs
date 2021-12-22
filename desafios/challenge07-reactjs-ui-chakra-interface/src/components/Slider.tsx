import SwiperCore, { Autoplay, Navigation,  Scrollbar, Pagination, Mousewheel, Keyboard, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SlideItem } from './SlideItem';

import { api } from '../services/api';
import { useEffect, useState } from 'react';

interface Continents {
  slug: string,
  name: string,
  subtitle: string,
  image_url: string;
}

SwiperCore.use([Autoplay, Navigation, Scrollbar, Pagination, Mousewheel, Keyboard,A11y ]);

export function Slider() {
  const [continents, setContinents] = useState<Continents[]>([]);

  useEffect(() => {
    async function loadContinents(): Promise<void> {
      const response = await api.get('/continents');

      setContinents(response.data);
    };
    loadContinents();
  }, [])
  
  return (
    <>
      <Swiper
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        mousewheel={true}
        keyboard={true}
        pagination={{
          clickable: true,
          type: "bullets",
          renderBullet: function () {
            return `<span class="swiper-pagination-bullet"
                      style=background-color:#FFBA08></span>`
          }
        }}
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": false
        }}
        className="mySwiper"
        style={{ width: '100%', height: '100%', flex: '1' }}
      >
        <div 
          className="swiper-button-next" 
          style={{ color: '#FFBA08'}}/>
        <div 
          className="swiper-button-prev"
          style={{ color: '#FFBA08'}}
        />
        { continents && continents.map(continent => (
          <SwiperSlide key={continent.name}>
          <SlideItem
            title={continent.name}
            description={continent.subtitle}
            imageUrl={continent.image_url}
            imageLink={continent.slug}
          />

        </SwiperSlide>
        ))}


      </Swiper>
    </>
  )
}