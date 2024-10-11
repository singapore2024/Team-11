import React from 'react'
import cn from 'classnames'
import { ArrowDownOutlined, CalendarOutlined, EnvironmentOutlined, FileDoneOutlined, HomeOutlined} from '@ant-design/icons'
import HomeSS from '../../../assets/SShome.png'
import VisitsSS from '../../../assets/SSvisits.png'
import VisitDetailsSS from '../../../assets/SSvisitDetails.png'
import RegisterVisitSS from '../../../assets/SSregisterVisits.png'
import VisitCompletedSS from '../../../assets/SSvisitCompleted.png'
import { Carousel } from 'antd'
import classNames from 'classnames'


export interface EntryBannerProps {
    sectionRef: React.RefObject<HTMLDivElement>
    onClickNextSection: () => void
}

export interface featuresItem {
	key: React.Key
    title: string
	icon: JSX.Element
	children: JSX.Element
}


const Features: React.FC<EntryBannerProps> = (props) => {

    const items: featuresItem[] = [
        {
            key: 1,
            title: 'Step 1: Locate a senior around you',
            icon: <EnvironmentOutlined />,
            children: (
                <div>Find a senior near you that speaks the same language as you. </div>
            )
        },
        {
            key: 2,
            title: 'Step 2: Set up a visit ',
            icon: <CalendarOutlined />,
            children: (
                <div>Select a convenient time for your visit. Once confirmed, a social worker will accompany you on your first visit.</div>
            )
        },
        {
            key: 3,
            title: 'Step 3: Show up and chat! ',
            icon: <HomeOutlined />,
            children: (
                <div>Go for your visit and have a chat with the senior to check in how they're doing. It can be for as short as 10 minutes.</div>
            )
        },
        {
            key: 4,
            title: 'Step 4: Record Visit Notes ',
            icon: <FileDoneOutlined />,
            children: (
                <div>Once your visit is completed, record your observations in our post-visit form to highlight if the senior requires any extra attention or resources.</div>
            )
        }
    ]

    const featureItems = items.map((item) => {
        return (<div className='descRow' key={item.key}>
            <div className='descIcon'>
                {item.icon}
            </div>
            <div className='desc'>
                <div className={classNames('descTitle', 'accent')}>
                    {item.title}
                </div>
                {item.children}
            </div>
        </div>)
    })
    
    return (
        <div className={'entryContainer'} ref={props.sectionRef}>
            <div className={cn('featurebanner', 'fullHeight')}>
                <div className={'sectionHeading'}>How it works</div>
                <h1>let's kaypoh!</h1>

                {featureItems}

                <a style={{ cursor: 'pointer', marginTop: '3rem' }} onClick={props.onClickNextSection}> <ArrowDownOutlined /> So what differentiates us? </a>
            </div >
            <div className={cn( 'fullHeight')}>

                <Carousel autoplay arrows style={{width: '350px', height: '400px'}}>
                    <div className={'carousel'}>
                        <img src={HomeSS} className={'screenshotCarousel'} />
                    </div>
                    <div className={'carousel'}>
                        <img src={RegisterVisitSS} className={'screenshotCarousel'} />
                    </div>
                    <div className={'carousel'}>
                        <img src={VisitsSS} className={'screenshotCarousel'} />
                    </div>
                    <div className={'carousel'}>
                        <img src={VisitDetailsSS} className={'screenshotCarousel'} />
                    </div>
                    <div className={'carousel'}>
                        <img src={VisitCompletedSS} className={'screenshotCarousel'} />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Features