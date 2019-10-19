import { render } from 'react-dom'
import React, { useRef } from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './index.css'

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
]

//const props = useSpring({opacity: 1, from: {opacity: 0}})
// return <animated.div style={props}>I will fade in</animated.div>

function TouchScroller() {
  const index = useRef(0)

  const [props, setSprings] = useSprings(pages.length, i => ({
    x: i * window.innerWidth,
    scale: 1,
    display: 'block'
  }))

  console.log('innerWidth' + window.innerWidth);

  const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
    console.log('in useDrag');
    if (down && distance > window.innerWidth / 2)
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
    setSprings(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * window.innerWidth + (down ? mx : 0)
      const scale = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, scale, display: 'block' }
    })
  })
  console.log('here' + props.length);
  return props.map(({ x, display, scale }, i) => (
    <animated.div {...bind()} key={i} style={{ display, x }}>
      <animated.div style={{ scale, backgroundImage: `url(${pages[i]})` }} />
    </animated.div>
  ))
}


export default function Viewpager () {


  return (
    <React.Fragment>javier
      <TouchScroller/>
    </React.Fragment>
  )
}