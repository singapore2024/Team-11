import { ApiOutlined, DesktopOutlined, FormatPainterOutlined, ProjectOutlined } from '@ant-design/icons'
import React from 'react'
import '../../../App.css'
import './../styles.css'
import cn from 'classnames'
import { Avatar, Button } from 'antd';
import Keryang from '../../../assets/keryang.jpg'
import Nic from '../../../assets/nic.jpg'
import Eileen from '../../../assets/eileen.jpg'
import Jo from '../../../assets/jo.jpg'

interface memberItem {
  key: number
  name: string
  role: string
  icon: JSX.Element
  imgPath: string
}

interface Props {
  teamRef: React.RefObject<HTMLDivElement>
  onClickRegister: () => void
}

const Team: React.FC<Props> = (props) => {
  const members: memberItem[] = [
    {
      key: 1,
      name: 'Ker Yang Low',
      role: 'Product Manager',
      icon: <ProjectOutlined />,
      imgPath: Keryang,
    },
    {
      key: 2,
      name: 'Nicholas Halim',
      role: 'Backend Engineer',
      icon: <ApiOutlined />,
      imgPath: Nic,
    },
    {
      key: 3,
      name: 'Eileen Chua',
      role: 'UI/UX Designer',
      icon: <FormatPainterOutlined />,
      imgPath: Eileen,
    },
    {
      key: 4,
      name: 'Josephine Hemingway',
      role: 'Frontend Engineer',
      icon: <DesktopOutlined />,
      imgPath: Jo,
    },
  ]

  const teamMembers = members.map((member) => {
    return (
      <div 
        key={member.key} 
        className={'column'} 
      >
        <div>
          <Avatar
              className={'teamImg'}
              src={member.imgPath} />
        </div>
        <div className={'column'} style={{marginBottom: '1rem'}}>
          {member.name}
          <div className='accent'>{member.role}</div>
        </div>
      </div>
    )
  })

  return (
    <div className={cn('teamContainer', 'fullHeight')} ref={props.teamRef}>
        <div className={cn('teamSection')}>
            <div className={'sectionHeading'} style={{textAlign: 'center'}}>Meet the team</div>
            <h1>let's kaypoh!</h1>

            <div className={cn('accentText')}>
              Team Bob (The Builders)
            </div>

            <p>
              We are a team passionate about helping the elderly around us! It's time to give back.
            </p>
        </div>
        <div className={cn('team')}>
          {teamMembers}
        </div>
        <Button className={'joinButton'} onClick={props.onClickRegister} style={{marginBottom: '4rem'}}>
              Start Volunteering!
        </Button>
			</div>
  )
}

export default Team