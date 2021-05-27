import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

function Order() {
  const { id } = useParams();
  const [carData, setCarData] = useState();
  const [filterCarData, setFilterCarData] = useState();
  console.log(filterCarData?.features?.map((i) => console.log(i)));

  useEffect(() => {
    fetch("/carInfo.json")
      .then((res) => res.json())
      .then((data) => setCarData(data));
  }, [id]);

  useEffect(() => {
    carData?.filter((item) => {
      return item.id == id && setFilterCarData(item);
    });
  }, [carData]);

  return (
    <>
      {filterCarData && (
        <Wrap bgImage={filterCarData.image}>
          <Fade bottom>
            <ItemText>
              <h1>{filterCarData.title}</h1>
              <p>{filterCarData.description}</p>
            </ItemText>
          </Fade>
          <Zoom left>
            <LeftItem>
              <p>Range (Est.) - {filterCarData.range}mi</p>
            </LeftItem>
            <LeftItem>
              <p>Top Speed - {filterCarData.topSpeed}mph</p>
            </LeftItem>
            <LeftItem>
              <p>0-60 mph - {filterCarData.time}sec</p>
            </LeftItem>
          </Zoom>
          <Zoom right>
            <RightItem>
              {filterCarData?.features?.map((feature) => {
                return (
                  <ul>
                    <li>{feature}</li>
                  </ul>
                );
              })}
            </RightItem>
          </Zoom>
          <Buttons>
            <Fade bottom>
              <ButtonGroup>
                <LeftButton>Left Button</LeftButton>
                <RightButton>Right Button</RightButton>
              </ButtonGroup>
            </Fade>
          </Buttons>
        </Wrap>
      )}
    </>
  );
}

export default Order;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: ${(props) => `url("/images/${props.bgImage}")`};
`;
const ItemText = styled.div`
  padding-top: 15vh;
  text-align: center;
`;
const LeftItem = styled.div`
  background-color: rgba(23, 26, 32, 0.8);
  height: 40px;
  width: 156px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  opacity: 0.85;
  font-size: 12px;
  margin: 8px;
  flex-direction: column;
  margin-left: -45vw;
  p {
    color: white;
  }
`;
const RightItem = styled.div`
  background-color: rgba(23, 26, 32, 0.8);
  height: 210px;
  width: 256px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  opacity: 0.65;
  font-size: 12px;
  flex-direction: column;
  margin-left: 75vw;
  margin-top: -45vh;
  ul {
    li {
      text-align: left;
      color: white;
      padding: 10px;
    }
  }
  @media (max-width:768px){
    margin-right:140px;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const LeftButton = styled.div`
  background-color: rgba(23, 26, 32, 0.8);
  height: 40px;
  width: 256px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  opacity: 0.85;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  margin: 8px;
`;
const RightButton = styled(LeftButton)`
  background: white;
  opacity: 0.65;
  color: black;
`;
const DownArrow = styled.img`
  height: 40px;
  overflow-x: hidden;
  animation: animateDown infinite 1.5s;
`;
const Buttons = styled.div``;
