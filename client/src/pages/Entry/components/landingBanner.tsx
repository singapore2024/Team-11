import React from 'react'
import HomeScreenshot from '../../../assets/SShome.png'
import { ArrowDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import cn from 'classnames'
import '../styles.css'
import '../../../App.css'
import BannerImg from '../../../assets/banner.png'

interface Props {
    onClickRegister: () => void
    onClickAbout: () => void
}

const LandingBanner: React.FC<Props> = ({ onClickRegister, onClickAbout }) => {
    return (
        <div className={'entryContainer'}>
            <div className={cn('fullHeight', 'banner')}>
                <img className={'bannerImg'} src={BannerImg} />

                <div className={'subtitle'}>rebuild the kampung spirit with</div>
                <h1>let's kaypoh!</h1>
                <div className='accentText'>
                    Redefining volunteering with the elderly.
                </div>
                <p className='bannerText'>
                A crowd-sourced volunteering platform to monitor the wellbeing of the seniors around us through simple check ins
                </p>

                <Button className={'joinButton'} onClick={onClickRegister}>
                    Join us as a Kaypoh!
                </Button>
                <a style={{ cursor: 'pointer' }} onClick={onClickAbout}><ArrowDownOutlined /> Read About Us</a>
            </div>
            <div>
                <img src={HomeScreenshot} className={'screenshot'} />
            </div>
        </div>
    )
}

export default LandingBanner