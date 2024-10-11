import React from 'react'
import cn from 'classnames'
import { ArrowDownOutlined } from '@ant-design/icons'
import Granny from '../../../assets/logo.png'
import Grandpa from '../../../assets/grandpa.jpg'
import { EntryBannerProps } from './features'

const About: React.FC<EntryBannerProps> = (props) => {
    return (
        <div className={'entryContainer'} ref={props.sectionRef}>
            <div className={cn('about', 'fullHeight')}>
                <div className={'sectionHeading'}>About Us</div>
                <h1>let's farm!</h1>

                <div className={cn('accentText')}>
                    <a href='https://dictionary.cambridge.org/dictionary/english/farm'>
                        <b><i>farm</i></b>/ noun & adjective
                    </a>
                </div>

                <p>
                In Singapore, the urban landscape is changing, and so is our relationship with nature. As the demand for sustainable living grows, more people are turning to community farming to create greener spaces and grow their own food. But farming isn’t just about plants; it’s about people too.
                </p>
                <p>
                Many residents, especially seniors, may want to participate in these community farming initiatives but face challenges like physical limitations or lack of experience. Meanwhile, others may simply feel isolated from their neighbors. What if we could change that?
                </p>
                <p>
                    But.. how can we farm?
                </p>

                <h2>
                    We can help.
                </h2>
                <p>
                <b>Let’s Farm</b> is a user-driven platform that encourages the community to come together, support local farming efforts, and check in on neighbors who need a little help with their garden. Whether it's helping an elderly neighbor water their plants, offering advice on growing vegetables, or just lending a hand with soiling and harvesting, this platform seeks to foster a collaborative and caring community.
                </p>

                <h4>
                Let’s build stronger, greener neighborhoods by connecting through community farming. Be a kind farmer today and help nurture both plants and relationships!
                </h4>

                <a style={{ cursor: 'pointer', marginTop: '1rem' }} onClick={props.onClickNextSection}> <ArrowDownOutlined /> See how it works </a>
            </div>
            <div className={cn('illustration', 'fullHeight')}>
                <img
                    className={'imgLeft'}
                    src={Granny} />
                <img
                    className={'imgRight'}
                    src={Grandpa} />
            </div>
        </div>
    )
}

export default About
