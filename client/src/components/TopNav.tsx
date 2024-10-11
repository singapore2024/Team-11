import React from 'react'
import './styles.css'
import { Button } from 'antd'
import { useScrollDirection } from './utils'

interface Props {
    onClickFeatures: () => void
    onClickAbout: () => void
    onClickTeam: () => void
    onClickJoin: () => void
}

const TopNav: React.FC<Props> = (props) => {
    const scrollDirection = useScrollDirection();

    return (
        <div className={`topNav ${scrollDirection === "down" ? "hide" : "show"}`}>
            <h1>let's kaypoh!</h1>
            <div className={'navRow'}>
                <a style={{ cursor: 'pointer' }} onClick={props.onClickFeatures}>Features</a>
                <a style={{ cursor: 'pointer' }} onClick={props.onClickAbout}>About Us</a>
                <a style={{ cursor: 'pointer' }} onClick={props.onClickTeam}>Our Team</a>
                <Button className={'joinButton'} onClick={props.onClickJoin}>Join Us</Button>
            </div>
        </div>
    )
}

export default TopNav