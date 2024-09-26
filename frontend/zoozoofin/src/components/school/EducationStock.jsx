import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const StockContainer = styled.div`
  background-color: #f9f9f9;
  margin: 2px auto;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: 20px;
    
    li button:before {
      color: white;
    }
    
    li.slick-active button:before {
      color: white;
    }
  }

  .slick-prev, .slick-next {
    z-index: 1;
    
    &:before {
      font-size: 30px;
    }
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 Aspect Ratio
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoImageText = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 20px;
`;

const EducationStock = ({ event }) => {
  const [images] = useState(imageRanges[event] || []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <StockContainer>
      {images.length > 1 ? (
        <StyledSlider {...settings}>
          {images.map((num) => (
            <ImageContainer key={num}>
              <StyledImage 
                src={`/assets/images/Education/stock/${num.toString().padStart(3, '0')}.jpg`} 
                alt={`Education stock ${num}`}
              />
            </ImageContainer>
          ))}
        </StyledSlider>
      ) : images.length === 1 ? (
        <ImageContainer>
          <StyledImage 
            src={`/assets/images/Education/stock/${images[0].toString().padStart(3, '0')}.jpg`} 
            alt={`Education stock ${images[0]}`}
          />
        </ImageContainer>
      ) : (
        <NoImageText>No images available for this event.</NoImageText>
      )}
    </StockContainer>
  );
};

export default EducationStock;