import { Avatar, Button, Divider, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css'
import { displayDaysLastVisited, getSeniorByIdData, getVisitByIdData } from '../../api';
import { SeniorInterface, VisitInterface, VisitStatus } from '../../models/interfaces';
import { VisitCard } from '../../components/Card/VisitCard';
import { HeartOutlined, DislikeOutlined, MessageOutlined, CalendarOutlined, EnvironmentTwoTone, FrownTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { handleCancelVisit, handleCompleteVisit, navigateToRoute } from '../../components/utils';
import { APIProvider } from '@vis.gl/react-google-maps';
import CustomMap from '../Home/components/Map/Map';
import CancelModal from '../../components/CancelModal';

export interface profileItem {
  key: React.Key
  label: string
  icon: JSX.Element
  children: JSX.Element
}

const VisitDetails = () => {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  if (!token) {
    navigateToRoute('/', navigate)
  }
  const visitId = Number(useLocation().pathname.split("/")[2]);

	// const [currentLocation, setCurrentLocation] = useState<Coordinates>({lat: 1.287953, lng: 103.851784 })

  // useEffect(() => {
	// 	if ("geolocation" in navigator) {
	// 		navigator.geolocation.getCurrentPosition(function (position) {
	// 			const pos = {
	// 				lat: position.coords.latitude,
	// 				lng: position.coords.longitude,
	// 			}

	// 			setCurrentLocation(pos);
  //       console.log(pos)
	// 			localStorage.setItem('lat', String(position.coords.latitude))
	// 			localStorage.setItem('lon', String(position.coords.longitude))

	// 		});
	// 	} else {
	// 		console.error("Geolocation is not available in your browser.");
	// 	}
	// }, []);

  const currentLocation: google.maps.LatLngLiteral = {
    lat: Number(localStorage.getItem('lat')), 
    lng: Number(localStorage.getItem('lon'))
  }

  // add api endpoint - get visit
  const [visit, setVisit] = useState<VisitInterface>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const visitData = await getVisitByIdData(visitId);
        setVisit(visitData);
      } catch (error) {
        console.error("Error fetching visit data:", error);
      }
    };
    fetchData();
    setLoading(false)
  }, [visitId])

  const [senior, setSenior] = useState<SeniorInterface | null>(null);

  useEffect(() => {
    if (visit) {
      const fetchData = async () => {
        try {
          const seniorData = await getSeniorByIdData(visit.senior_id);
          setSenior(seniorData);
        } catch (error) {
          console.error("Error fetching senior data:", error);
        }
      };

      fetchData();
    }
  }, [visit])

  const seniorProfileItems: profileItem[] = senior ? [
    {
      key: 'likes',
      label: 'Story',
      icon: <HeartOutlined />,
      children: <span>{senior.story}</span>
    },
    {
      key: 'dislikes',
      label: 'Dislikes',
      icon: <DislikeOutlined />,
      children: <span>{senior.dislikes}</span>
    },
    {
      key: 'social',
      label: 'Social',
      icon: <MessageOutlined />,
      children: <span>{senior.social}</span>
    },
    {
      key: 'lastVisited',
      label: 'Days since last visit',
      icon: <CalendarOutlined />,
      children: <span>{displayDaysLastVisited(senior.daysLastVisited)}</span>
    }
  ] : []

  const seniorProfileAttributes = seniorProfileItems.map((attr) => {
    return (
      <React.Fragment key={attr.key}>
        <div key={attr.key} className={'seniorProfileDetail'}>
          <span>{attr.icon} <h4>{attr.label}</h4></span>
          {attr.children}
        </div>
        <Divider style={{ margin: '0.5rem' }} />
      </React.Fragment>
    )
  })

  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false)

  const onClickCancelButton = () => {
      setIsCancelModalOpen(true)
  }

  const onCloseModal = () => {
      setIsCancelModalOpen(false)
  }

  const onConfirmCancel = () => {
      if (visit) {
        handleCancelVisit(visit)
      }
      onCloseModal()
  }

  const googleDirectionsLink = (origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral) => `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`

  const visitorItems = visit && visit.visitor_ids.map((id) => {
    let visitorLabel = `Kaypoh #${id}`

    if (localStorage.getItem('user_id') && id.toString() === localStorage.getItem('user_id')) {
      visitorLabel = 'You'
    }

    return <Tooltip key={id} title={visitorLabel} placement="top">
      <Avatar src={"https://avatar.iran.liara.run/public"} />
    </Tooltip>
  })

  const handleCheckInClick = () => {
    if (visit) navigateToRoute(`/check-in/${visit.visit_id}`, navigate)
}

  const visitors = <Avatar.Group
    max={{
      count: 2,
      style: { color: '#f56a00', backgroundColor: '#fde3cf' },
    }}
  >
    {visitorItems}
    
  </Avatar.Group>
  return (
    <div className={'container'}>
      <div className={'header'} style={{ marginBottom: 0 }}>
        <h1>let's kaypoh!</h1>
        <h3>Visit Details</h3>
      </div>
      {
        loading ? <div>Loading...</div> :

          (senior && visit) ?

            <div className={'visits'}>
              <div className='visitInfo'>
                <VisitCard
                  visit={visit}
                  cancellable={false}
                />
                {(visit.status === VisitStatus.UPCOMING || visit.status === VisitStatus.ONGOING) && <>
                  <div className='map'>
                    <APIProvider
                      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                      // onLoad={() => console.log('maps api 2 has loaded')}
                    >
                      <CustomMap
                        locations={[senior]}
                        defaultCenter={{ lat: currentLocation.lat + senior.lat, lng: currentLocation.lng + senior.lon }}
                        showDirections={true}
                        defaultZoom={15}
                        hideDetails={true}
                        currentLocation={currentLocation}
                      />

                    </APIProvider>
                  </div>
                </>}

                <div>
                  {(visit.status === VisitStatus.UPCOMING || visit.status === VisitStatus.ONGOING) &&
                    <Button>
                      <a
                        style={{ fontWeight: 400 }}
                        target="_blank" rel="noopener noreferrer"
                        href={googleDirectionsLink(currentLocation, { lat: currentLocation.lat + senior.lat, lng: currentLocation.lng + senior.lon })} >
                        Get Directions  <EnvironmentTwoTone />
                      </a>
                    </Button>
                  }
                  {visit.status === VisitStatus.UPCOMING &&
                    <>
                      <Button className={'cancelBtn'} onClick={handleCheckInClick}>
                        Check In <CheckCircleTwoTone twoToneColor={'#faad14'} />
                      </Button>
                      
                      <Button className={'cancelBtn'} onClick={onClickCancelButton}>
                        Cancel Visit <FrownTwoTone twoToneColor="#eb2f96"/>
                      </Button>
                    </>}
                  {visit.status === VisitStatus.ONGOING && <Button className={'cancelBtn'} onClick={() => handleCompleteVisit(visit, navigate)}>
                    Mark as Completed <CheckCircleTwoTone twoToneColor="#52c41a" />
                  </Button>}
                </div>

                <Divider style={{ margin: '0.5rem' }} />

                <div className={'sectionHeader'}>
                  <h3>About the senior</h3>
                </div>

                {seniorProfileAttributes}

                <div className={'sectionHeader'}>
                  <h3>Who's coming in this visit</h3>
                  {visitors}
                </div>

                <Divider />

                <div className={'sectionHeader'}>
                  <h3>Need help? </h3>
                  Contact our support team at 91234567.
                </div>

                <Button style={{ marginTop: '1.5rem'}} onClick={() => navigateToRoute('/visits', navigate)}>
                  Back to Visits
                </Button>
                <CancelModal
                    open={isCancelModalOpen}
                    handleClose={onCloseModal}
                    onClickConfirm={onConfirmCancel}
                />
              </div>
            </div>
            : <div>Loading...</div>
      }
    </div>
  )
}

export default VisitDetails