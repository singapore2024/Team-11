import { RefObject, useRef, useState } from 'react'
import '../../App.css'
import './styles.css'
import { useNavigate } from "react-router-dom";
import LandingBanner from './components/landingBanner';
import Team from './components/team';
import TopNav from '../../components/TopNav';
import LoginModal from '../../components/LoginModal';
import { navigateToRoute } from '../../components/utils';
import About from './components/about';
import Features from './components/features';
import ValueProposition from './components/values';

const Entry = () => {
	const navigate = useNavigate();

	const aboutRef = useRef<HTMLDivElement>(null);
	const featuresRef = useRef<HTMLDivElement>(null);
	const valueRef = useRef<HTMLDivElement>(null);
	const teamRef = useRef<HTMLDivElement>(null);

	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false)

	const onClickJoin = () => {
		setIsRegisterModalOpen(true)
	}

	const onCloseModal = () => {
		setIsRegisterModalOpen(false)
	}

	const onClickSection = (ref: RefObject<HTMLDivElement>) => {
		const node: HTMLDivElement | null = ref.current;
		window.scrollTo({ top: node!.offsetTop, left: 0, behavior: "smooth" });
	}

	const onClickRegister = () => {
		navigateToRoute('/register', navigate)
	}

	const onClickLogin = () => {
		navigateToRoute('/login', navigate)
	}

	return (
		<>
			<TopNav  
				onClickFeatures={() => onClickSection(featuresRef)} 
				onClickAbout={() => onClickSection(aboutRef)} 
				onClickTeam={() => onClickSection(teamRef)} 
				onClickJoin={onClickJoin} 
			/>
			<LandingBanner 
				onClickRegister={onClickJoin} 
				onClickAbout={() => onClickSection(aboutRef)} 
			/>
			<About sectionRef={aboutRef} onClickNextSection={() => onClickSection(featuresRef)} />
			<Features sectionRef={featuresRef} onClickNextSection={() => onClickSection(valueRef)}/>
			<ValueProposition sectionRef={valueRef} onClickNextSection={() => onClickSection(teamRef)}/>
			<Team teamRef={teamRef} onClickRegister={onClickJoin} />
			<LoginModal 
				open={isRegisterModalOpen} 
				handleClose={onCloseModal} 
				onClickRegister={onClickRegister}
				onClickLogin={onClickLogin} 
			/>
		</>
	)
}

export default Entry