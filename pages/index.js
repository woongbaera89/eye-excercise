import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState, useRef } from 'react'


export default function Home() {

  const [zoom, setZoom] = useState(6);
  const [speed, setSpeed] = useState(6);
  const [delay, setDelay] = useState(15);
  const [count, setCount] = useState(0);
  const [loop, setLoop] = useState(3)
  const [animate, setAnimate] = useState(false)
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [guide, setGuide] = useState('가운데 네모 안을 클릭하면 시작합니다.')
  const [contents, setContents] = useState([]);

  const setWord = () => {
    const words = data.split('\n');
    const arr =[]
    for(let i = 0; i<8; i++){
      arr.push(words[parseInt(Math.random()*words.length)])
    }
    setContents(arr);
  }
  useEffect(() => {
    setWord();
  }, []);
  
  useEffect(() => {
    if(!animate) return;
    if(count >= loop*2*4) {
      setTimeout(() => {
        console.log("PAUSE")
        setAnimate(false)
        setCount(0);
        setGuide(`이제 ${delay}초간 눈을 감고 이완하세요.`)
      }, 10/speed*1000+50)
      setTimeout(()=>{
        const audio = new Audio('/bell.wav');
        audio.play();
        setGuide('글자가 더욱 선명하게 보이는지 확인하세요. 곧 새로운 단어로 시작됩니다.')
      }, delay*1000)
      setTimeout(()=>{
        console.log("RESUME")
        setWord();
        setGuide('움직이는 점을 따라 눈동자를 이동하세요.')
        setCount(0);
        setAnimate(true);
      }, delay*1000+10000)
      return;
    }
    setCount(count+1)

    console.log(top, left, count, speed);
    const dist = window.screen.width < 720 ? 157 : 314;
    let _top = top;
    let _left = left;
    if(count < loop*4){
      if(top === 0 && left === 0) _left=dist;
      else if(top === 0 && left === dist) _top=dist;
      else if(top === dist && left === dist) _left=0;
      else _top=0;
    }else {
      if(top === 0 && left === 0) _top=dist;
      else if(top === dist && left === 0) _left=dist;
      else if(top === dist && left === dist) _top=0;
      else _left=0;
    }

    setTimeout(() => {
      setTop(_top);
      setLeft(_left);
    }, 10/speed*1000+50)
  }, [animate, top, left]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Eye-Exercise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className={styles.header}>
        <h1 style={{lineHeight:1.5}}>{guide}</h1>
      </header>

      <div className={styles.rect} style={{transform:`scale(${zoom/3})`}} onClick={() => {
        if(animate) {
          console.log("STOP")
          setAnimate(false);
          setCount(0);
          setGuide('가운데 네모 안을 클릭하면 시작합니다.')
          setTimeout(() => {
            setTop(0);
            setLeft(0);
          }, 10/speed*1000+50)
        }else{
          setWord();
          console.log("START")
          setGuide('움직이는 점을 따라 눈동자를 이동하세요.')
          setCount(0);
          setAnimate(true);
        }
      }}>
        
        <div className={styles.pointer} style={{opacity:animate ? 0.5:0, top, left, transition:`all ${10/speed}s linear`}}></div>
        {contents.length >= 8 && (
          <>
            <h1>{contents[0]+' '+contents[1]}</h1>
            <h2>{contents[2]+' '+contents[3]}</h2>
            <h3>{contents[4]+' '+contents[5]}</h3>
            <h4>{contents[6]+' '+contents[7]}</h4>
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerItem}>
          <h1>Size</h1>
          <select value={zoom} onChange={(event) => {
            setZoom(event.currentTarget.value);
          }}>
            {[1,2,3,4,5,6,7,8,9,10].map((each,idx)=> (
              <option key={idx}>{each}</option>
            ))}
          </select>
        </div>
        <div className={styles.footerItem}>
          <h1>Speed</h1>
          <select value={speed} onChange={(event) => {
            setSpeed(parseInt(event.currentTarget.value));
          }}>
            {[1,2,3,4,5,6,7,8,9,10].map((each,idx)=> (
              <option key={idx}>{each}</option>
            ))}
          </select>
        </div>
        <div className={styles.footerItem}>
          <h1>Loop</h1>
          <select value={loop} onChange={(event) => {
            setLoop(parseInt(event.currentTarget.value));
          }}>
            {[1,2,3,4,5,6,7,8,9,10].map((each,idx)=> (
              <option key={idx}>{each}</option>
            ))}
          </select>
        </div>
        <div className={styles.footerItem}>
          <h1>Delay</h1>
          <select value={delay} onChange={(event) => {
            setDelay(parseInt(event.currentTarget.value));
          }}>
            {[10,11,12,13,14,15,16,17,18,19,20].map((each,idx)=> (
              <option key={idx}>{each}</option>
            ))}
          </select>
        </div>
      </footer>
    </div>
  )
}


const data = `over
new
sound
take
only
little
work
know
place
year
live
me
back
give
most
very
after
thing
our
just
name
good
sentence
man
think
say
great
where
help
through
much
before
line
right
too
mean
old
any
same
tell
boy
follow
came
want
show
also
around
form
three
small
set
put
end
does
another
well
large
must
big
even
such
because
turn
here
why
ask
went
men
read
need
land
different
home
us
move
try
kind
hand
picture
again
change
off
play
spell
air
away
animal
house
point
page
letter
mother
answer
found
study
still
learn
should
America
world`;