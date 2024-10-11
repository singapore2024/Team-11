import { CalendarOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './styles.css'
import { navigateToRoute, useScrollDirection } from './utils'
import { Avatar } from 'antd'
import { getUserByIdData } from '../api'
import { UserInterface } from '../models/interfaces'

interface navItem {
    key: React.Key
    title: string
    icon: JSX.Element
    path: string
}

interface Props {
    isLoggedIn: boolean
}

export const NavBar: React.FC<Props> = ({isLoggedIn}) => {
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    if (!token) {
        navigateToRoute('/', navigate)
    }

	const [user, setUser] = useState<UserInterface>();

    useEffect(() => {
        const fetchData = async () => {
            try {
				const userData = await getUserByIdData(localStorage.getItem('user_id')!)
				setUser(userData);
            } catch (error) {
                console.error("Error fetching visits data:", error);
            }
        };

        fetchData();
    }, [])

    const scrollDirection = useScrollDirection();

    
    const navItems: navItem[] = [
        {
            key: 1,
            title: 'Explore',
            icon: <SearchOutlined style={{ cursor: 'pointer' }} onClick={() => navigateToRoute('/home', navigate)}/>,
            path: '/home'
        },
        {
            key: 2,
            title: 'Visits',
            icon: <CalendarOutlined onClick={() => navigateToRoute('/visits', navigate)}/>,
            path: '/visits'
        },
        {
            key: 3,
            title: 'Profile',
            icon: <UserOutlined onClick={() => navigateToRoute(isLoggedIn ? 'profile' : '/register', navigate)}/>,
            path: '/profile'
        }
    ]

    const bottomMenu = navItems.map((navItem) => {
        if (isLoggedIn && navItem.title === 'Profile') {
            return (
                <div key={navItem.key} className={'nav-btn'}>
                    <div onClick={() => navigateToRoute(navItem.path, navigate)}>
                        <Avatar className={'avatar'} src={"https://avatar.iran.liara.run/public"}/>
                    </div>
                    {navItem.title}
                </div>
            )
        }

        return (
            <div key={navItem.key} className={'nav-btn'}>
                {navItem.icon}
                {navItem.title}
            </div>
        )
    })

    const topMenu = navItems.map((navItem) => {
        if (isLoggedIn && navItem.title === 'Profile') {
            return (
                <div key={navItem.key} className={'nav-btn'} onClick={() => navigateToRoute(navItem.path, navigate)}>
                    <Avatar className={'avatar'} src={"https://avatar.iran.liara.run/public"}/>
                </div>
            )
        }

        return (
            <a key={navItem.key} style={{ cursor: 'pointer' }} onClick={() => navigateToRoute(navItem.path, navigate)}>
                {navItem.title}
            </a>
        )
    })

    const nameLoggedIn = user ? `, ${user.name.split(' ')[0]}!`: '!'

    return (
        <>
            <div className={'bottom-nav'}>
                {bottomMenu}
            </div>
            <div className={`topAppNav ${scrollDirection === "down" ? "hide" : "show"}`}>
                <h1>let's kaypoh{nameLoggedIn}</h1>
                <div className={'appNavRow'}>
                    {topMenu}
                </div>
            </div>
        </>
    )
}

export const NavBarWrapper: React.FC<Props> = ({isLoggedIn}) => {
    return (
      <div>
        <NavBar isLoggedIn={isLoggedIn}/>
        <Outlet/>
      </div>
    )
}
