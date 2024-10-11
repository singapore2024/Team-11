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
                    <a href='https://www.urbandictionary.com/define.php?term=kaypoh'>
                        <b><i>farm</i></b>/ noun & adjective
                    </a>
                </div>

                <p>
                    <b><i>Kaypoh</i></b> is a Singaporean slang usually used to described a person who is nosy or prying. But <b><i>kaypoh</i></b> does not necessarily need to be negative.
                </p>
                <p>
                    As the Singapore population ages, the demand for senior care has become more pressing.
                    Most seniors worry about being alone at home and having no one to help them when they are in need. 
                    In 2022 alone, <a href='https://www.moh.gov.sg/news-highlights/details/seniors-staying-alone'>79,000</a> seniors live alone, and <a href='https://youtu.be/d499mlwXWfk?si=sJtKF5I3Mdr_jJ2O'>more than 37</a> died alone unnoticed in 2023.
                </p>
                <p>
                    But.. how can we show some care and concern to our next door seniors?
                </p>

                <h2>
                    We can help.
                </h2>

                <p>
                    Let’s Kaypoh is a user driven platform which aims to rally the help from the community to <b><i>"kaypoh"</i></b> and check-in on seniors who are living alone around their neighbourhood.

                    We hope to build a closer knit community by encouraging the younger generations to cultivate an organic relationship with the elderly.
                </p>

                <h4>
                    Let’s be a kind Kaypoh today!
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
