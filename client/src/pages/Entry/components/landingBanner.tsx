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

                <div className={'subtitle'}>rebuild the farm spirit with</div>
                <h1>let's farm!</h1>
                <div className='accentText'>
                    Redefining local produce with community farming.
                </div>
                <p className='bannerText'>
                A crowd-sourced farmng platform to monitor local farm inventory and to encourage Singaporeans to start local produce.
                </p>

                <Button className={'joinButton'} onClick={onClickRegister}>
                    Join us as a farmer!
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
