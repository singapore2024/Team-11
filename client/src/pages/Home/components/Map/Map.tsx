import React, { useEffect, useState } from 'react'
import { AdvancedMarker, Map} from '@vis.gl/react-google-maps';
import './styles.css'
import { SeniorInterface } from '../../../../models/interfaces';
import { SeniorCard } from '../../../../components/Card/SeniorCard';
import { Directions } from '../mapDirections';
import { seniorData } from '../../../../models/dummyData';

export interface Coordinates {
	lat: number,
	lng: number
}

type Props = {
	locations: SeniorInterface[]
	defaultCenter: Coordinates
	showDirections?: boolean
	defaultZoom?: number
	hideDetails?: boolean
	currentLocation: Coordinates
}

export type MarkerProps = {
	info: SeniorInterface;
	position: Coordinates
	hideDetails?: boolean
	zIndex: number
}

const CustomMap: React.FC<Props> = ({ locations, defaultCenter, defaultZoom, showDirections, hideDetails, currentLocation }) => {
	const [closeAllInfoWindows, setCloseAllInfoWindows] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);

	// const data = locations
	// 	.sort((a, b) => b.lat - a.lat)
	// 	.map((snr, index) => ({snr, zIndex: index}))
	// console.log(data)

	// // for (const d of data) {
	// // 	console.log(d.)
	// // }
	const data = seniorData 
		.sort((a, b) => b.lat - a.lat)
		.map((snr, index) => ({snr, zIndex: index}))
	const Z_INDEX_SELECTED = data.length;


	const CustomMarker: React.FC<MarkerProps> = ({ info, position, hideDetails, zIndex }) => {
		const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);

		useEffect(() => {
			if (selectedId === info.senior_id && !closeAllInfoWindows && !hideDetails) {
			  setShowInfoWindow(true);
			} else {
			  setShowInfoWindow(false);
			}
		  }, [hideDetails, info.senior_id]);
		
		return (
			<AdvancedMarker
				zIndex={zIndex}
				position={position}
				onClick={() => {
					setCloseAllInfoWindows(false);
					setSelectedId(info.senior_id);
					setShowInfoWindow(true);
					
				}}
			>
				<div>
					{(showInfoWindow) ?
					<div className='column'>
						<SeniorCard 
							senior={info} 
							onClose={() => setCloseAllInfoWindows(true)} 
							showVisitBtn={true}
							style={{zIndex: selectedId === info.senior_id ? 120398 : -500, marginBottom: '0.5rem'}}
						/>
						<div  className={`seniorMarker selected`}>
							{info.name}
						</div>
					</div>
						:
						<div 
							className={`seniorMarker ${
								info.daysLastVisited === 0 ? 'grey' : info.daysLastVisited <=10 ? 'grey' : 'green'
							}`} 
						>
							{info.name}
						</div>
					}
				</div>
			</AdvancedMarker>
		);
	}

	return (
		<Map
			clickableIcons={false}
			disableDefaultUI
			gestureHandling={'greedy'}
			mapId={'7c0e62f0200dd8aa'}
			defaultZoom={defaultZoom ?? 16}
			defaultCenter={defaultCenter}
			onClick={() => setCloseAllInfoWindows(true)}
		>
			{data?.map(marker => {
				const sr = marker.snr
				let zIdx = marker.zIndex

				if (selectedId === sr.senior_id) {
					zIdx = Z_INDEX_SELECTED
				}

				return <CustomMarker
					zIndex={zIdx}
					key={sr.senior_id}
					info={sr}
					position={{ lat: currentLocation.lat + sr.lat, lng: currentLocation.lng + sr.lon }}
					hideDetails={hideDetails}
				/>
			})}

			<AdvancedMarker
				position={currentLocation}
			>
				<div className={'userMarker'} ></div>
			</AdvancedMarker>

			{showDirections && 
				<Directions 
					origin={currentLocation}
					destination={{lat: locations[0].lat, lng: locations[0].lon}}
				/>
			}
		</Map>
	)
}

export default CustomMap

