import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
const Container = styled.div`
    border: 1px solid black;
    height: 20px;
    width: 300px;
    margin: 10px auto;
`
const RestTime = styled.div`
    height: 100%;
    width: ${(props)=> props.time ? `${props.time/30*100}%` : `0%`};
    background-color: ${(props) => (props.time > 5) ? `#ef5f17` : `#df3740`};
`

const TimeBar = ({ time }) => {

  return (
    <Container>
        <RestTime time={time}/>
    </Container>
  )
}

export default TimeBar
