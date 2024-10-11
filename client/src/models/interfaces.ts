export enum SupportedLanguages {
	ENGLISH = "English",
	MANDARIN = "Mandarin",
	MALAY = "Malay",
	INDONESIAN = "Indonesian",
	TAMIL = "Tamil",
	HOKKIEN = "Hokkien",
	HINDI = "Hindi",
	CANTONESE = "Cantonese",
	TEOCHEW = "Teo Chew",
}


export enum VisitStatus {
	UPCOMING = "Upcoming",
	ONGOING = "Ongoing",
	COMPLETED = "Completed",
	CANCELLED = "Cancelled", 
	EXPIRED = "Expired",
	MISSED = "Missed"
}

type VisitColorMap = {[key in VisitStatus]: string}

export const visitToColorMapping: VisitColorMap = {
	[VisitStatus.UPCOMING]: "geekblue",
	[VisitStatus.COMPLETED]: "green",
	[VisitStatus.ONGOING]: "gold",
	[VisitStatus.CANCELLED]: "volcano",
	[VisitStatus.EXPIRED]: 'red',
	[VisitStatus.MISSED]: 'red'
}

export interface SeniorInterface {
    senior_id: number,
	name: string,
	gender: string,
    age: number,
	languages: string[],
	postal_code: number,
	address: string,
	daysLastVisited?: any,
	story: string,
	medical: string[],
	dislikes: string,
	social: string,
	lat: number,
	lon: number
}

export interface UserInterface {
	user_id?: number
	nric: string
	name: string
	email: string
	mobile: string
	gender: string
	age: number
	languages: string[]
	postal_code: number
	address: string
	area?: string
	lat?: number
	lon?: number
	totalVisits?: number
}

export interface VisitInterface {
	visit_id?: number
	senior_id: number
	visitor_ids: number[]
	date: string
	time?: string
	status: string
}