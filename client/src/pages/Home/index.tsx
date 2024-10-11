import { useEffect, useState } from 'react'
import './styles.css'
import '../commonStyles.css'
import '../../App.css'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import MapHandler from './components/map-handler'
import { PlaceAutocompleteClassic } from './components/classicAutocomplete'
import CustomMap, { Coordinates } from './components/Map/Map'
import { SeniorInterface, SupportedLanguages } from '../../models/interfaces'
import { getAllSeniorsData, getDaysLastVisted, updateSenior } from '../../api'
// import { useNavigate } from 'react-router-dom'
// import { navigateToRoute } from '../../components/utils'
import { FilterOutlined, QuestionCircleTwoTone } from '@ant-design/icons'
import { Button, Popover } from 'antd'
import FilterModal from '../../components/FilterModal'

const Home = () => {
    // const token = localStorage.getItem('access_token');
    // const navigate = useNavigate();
    // if (!token) {
    //     navigateToRoute('/', navigate)
    // }
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);

    const [seniors, setSeniors] = useState<SeniorInterface[]>([])
    const [filteredSeniors, setFilteredSeniors] = useState<SeniorInterface[]>([])
    const [currentLocation, setCurrentLocation] = useState<Coordinates>()
    const [loadingCurLoc, setLoadingCurLoc] = useState<boolean>(false)

    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(Object.values(SupportedLanguages))

    const onClickFilter = () => {
        setIsFilterModalOpen(true)
    }

    const onCloseModal = () => {
        setIsFilterModalOpen(false)
    }

    const handleApplyFilter = (languages: string[]) => {
        setSelectedLanguages(languages)
        onCloseModal()
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seniorsData = await getAllSeniorsData().then((response: SeniorInterface[]) => {
                    return Promise.all(
                        response.map(async (senior) => {
                            const { days } = await getDaysLastVisted(String(senior.senior_id));
                            
                            return ({
                                ...senior,
                                daysLastVisited: days
                            })
                        })
                    )
                });
                
                setSeniors(seniorsData);
            } catch (error) {
                console.error("Error fetching senior data:", error);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        setFilteredSeniors(seniors.filter(
            (senior) => senior.languages.some((lang) => selectedLanguages.includes(lang))
        ))

    }, [selectedLanguages, seniors])

    useEffect(() => {
        setLoadingCurLoc(true)
        console.log('maps loading: ', loadingCurLoc)

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }

                setCurrentLocation(pos);
                localStorage.setItem('lat', String(position.coords.latitude))
                localStorage.setItem('lon', String(position.coords.longitude))

            },
            () => {
                const defaultLocation = { lat: 1.3198, lng: 103.8923 };
                setCurrentLocation(defaultLocation);
                localStorage.setItem('lat', String(defaultLocation.lat))
                localStorage.setItem('lon', String(defaultLocation.lng))
              });
            setLoadingCurLoc(false)
            console.log('maps loading: ', loadingCurLoc)

        } else {
            setLoadingCurLoc(false)
            console.error("Geolocation is not available in your browser.");
        }
    }, []);

    useEffect(() => {
        seniors.map(async (senior) => { updateSenior({ "senior_id": senior.senior_id, "daysLastVisited": senior.daysLastVisited }) });
    }, [seniors]);

    return (
        <div className={'container-home'}>
            <div className={'header-container'}>
                <div className='row' style={{ margin: 0 }}>
                    <div className={'header'} style={{ width: '100%', marginBottom: '0.5rem' }}>
                        <h1  style={{ marginTop: '1rem', fontSize: '32px' }}>let's farm!</h1>
                        <p>Show some love to our farmer nearby! 
                            <Popover title="Need help?"
                            placement="bottomRight"
                            content={
                                <div style={{maxWidth: '230px'}}>
                                    Click on a farm's bubble to view more details. 
                                    <p>
                                        The bubble colors indicate the urgency of visit required.
                                    </p>
                                    <span className='legendRow'>
                                        <div className='legend green'/>
                                        Last visited {'<'} 3 days ago
                                    </span>

                                    <span className='legendRow'>
                                        <div className='legend yellow'/>
                                        Last visited 3-7 days ago
                                    </span>

                                    <span className='legendRow'>
                                        <div className='legend red'/>
                                        Last visited {'>'} 7 days ago
                                    </span>
                                </div>
                            }
                            >
                                <QuestionCircleTwoTone twoToneColor={'#8187f3'} style={{marginLeft: '0.25rem'}}/> 
                            </Popover>
                        </p>
                        {/* <p>Click on a senior to find out more</p> */}
                    </div>
                    <Button className={'filterBtn'} onClick={onClickFilter}>
                        <FilterOutlined />
                    </Button>
                </div>
            </div>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <div className={'explore'}>
                    <PlaceAutocompleteClassic onPlaceSelect={setSelectedPlace} />
                </div>

                { !currentLocation ? 
                    <Map
                        clickableIcons={false}
                        disableDefaultUI
                        gestureHandling={'greedy'}
                        mapId={'7c0e62f0200dd8aa'}
                        defaultZoom={15}
                        defaultCenter={{lat: 1.3198, lng: 103.8924}}
                    />
                : <CustomMap
                    locations={filteredSeniors}
                    defaultCenter={currentLocation}
                    currentLocation={currentLocation}
                />}

                <MapHandler place={selectedPlace} />
            </APIProvider>
            <FilterModal
                open={isFilterModalOpen}
                handleClose={onCloseModal}
                onClickApply={handleApplyFilter}
            />
        </div>
    )
}

export default Home
