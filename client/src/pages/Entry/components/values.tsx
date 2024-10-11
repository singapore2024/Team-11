import React from 'react'
import cn from 'classnames'
import { ArrowDownOutlined, EnvironmentOutlined, HeartOutlined, HistoryOutlined, UsergroupAddOutlined, ZhihuOutlined} from '@ant-design/icons'
import VolunteerF from '../../../assets/volunteerF.jpg'
import VolunteerM from '../../../assets/volunteerM.jpg'
import { EntryBannerProps, featuresItem } from './features'
import classNames from 'classnames'

const Features: React.FC<EntryBannerProps> = (props) => {

    const volunteerItem: featuresItem[] = [
        {
            key: 1,
            title: 'High flexibility and convenience',
            icon: <EnvironmentOutlined />,
            children: (
                <div>Volunteer with nearby seniors at a <b>time of your choice.</b> </div> 
            )
        },
        {
            key: 2,
            title: 'Reduced language barriers',
            icon: <ZhihuOutlined />,
            children: (
                <div>
                    Find seniors who speak the <b>same languages</b> as you.
                </div>
            )
        },
        {
            key: 3,
            title: 'Low-touch, low commitments',
            icon: <HeartOutlined />,
            children: (
                <div>
                    <b>As quick as 15 minutes</b> a visit to say hi with no minimum commitment period.
                </div>
            )
        },
    ]

    const orgItem: featuresItem[] = [
        {
            key: 4,
            title: 'Greater volunteer pool',
            icon: <UsergroupAddOutlined />,
            children: (
                    <div><b>Alleviates manpower crunch</b> and <b>reduce dependencies</b> on befriender organisations to allocate and schedule volunteer visitations </div>
            )
        },
        {
            key: 5,
            title: 'More frequent visits',
            icon: <HistoryOutlined />,
            children: (
                <div>
                    <b>Easier detections</b> of critical cases
                </div>
            )
        }
    ]

    const volunteerItems = volunteerItem.map((item) => {
        return (<div key={item.key} className='descRow'>
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

    const orgItems = orgItem.map((item) => {
        return (<div key={item.key} className='descRow'>
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
            <div className={cn('smallTitle', 'fullHeight')}>
                <div className={'sectionHeading'}>Our Value Propositions</div>
                <h1>let's kaypoh!</h1>

                <h3 style={{marginBottom: 0}}>
                    As a volunteer...
                </h3>

                {volunteerItems}


                <h3 style={{marginBottom: 0, marginTop: '2rem'}}>
                    As a befriender organisation...
                </h3>

                {orgItems}

                <a style={{ cursor: 'pointer', marginTop: '1rem' }} onClick={props.onClickNextSection}> <ArrowDownOutlined /> Meet the Team </a>
            </div>
            <div className={cn('illustration', 'fullHeight')}>
                <img
                    className={'imgLeft'}
                    src={VolunteerF}/>
                <img
                    className={'imgRight'}
                    src={VolunteerM} />
            </div>
        </div>
    )
}

export default Features