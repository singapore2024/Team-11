import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { navigateToRoute } from '../../components/utils';
import { VisitCard } from '../../components/Card/VisitCard';
import { getUserVisitData } from '../../api';
import { VisitInterface, VisitStatus } from '../../models/interfaces';

const Visits = () => {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  if (!token) {
      navigateToRoute('/', navigate)
  }
  const user_id = localStorage.getItem('user_id')

  // add api endpoint - get upcoming visits
  const [loading, setLoading] = useState<boolean>(false);


  // api endpoint - get upcoming  - filter by upcoming
  const [upcomingVisits, setUpcomingVisits] = useState<VisitInterface[] | []>([])
  const [curVisits, setCurVisits] = useState<VisitInterface[] | []>([])

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const visitsData = await getUserVisitData(Number(user_id));

        setUpcomingVisits(visitsData
          .filter((visit: VisitInterface) => visit.status === VisitStatus.UPCOMING)
          .sort((a: VisitInterface, b: VisitInterface) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        
        setCurVisits(visitsData
          .filter((visit: VisitInterface) => visit.status === VisitStatus.ONGOING)
          .sort((a: VisitInterface, b: VisitInterface) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      } catch (error) {
        console.error("Error fetching visit data; Multiple visits:", error);
      }
    };

    fetchData();
    setLoading(false)
  }, [user_id])

  const visitCards = upcomingVisits.map((visit) => {
    return <VisitCard
      key={visit.visit_id}
      visit={visit}
      cancellable={visit.status == VisitStatus.UPCOMING}
    />
  })

  const curVisitCards = curVisits.map((visit) => {
    return <VisitCard
      key={visit.visit_id}
      visit={visit}
      cancellable={true}
    />
  })

  return (
    <div className={'container'}>
      <div className={'header'}>
        <h1>let's farm!</h1>
        <div className='accent'>Where to farm next...</div>
        {curVisits.length > 0 &&
          <>
            <h3>Current Visit</h3>
            {curVisitCards}
          </>
        }
      </div>

      <div className={'visits'}>
        <h3>Upcoming Visits</h3>
        {
          loading ? 'Loading...' :
            upcomingVisits.length === 0 ? <>
              <p>
                You have no upcoming visits.
              </p>
              <div className={'buttons'}>
                <Button onClick={() => navigateToRoute('/home', navigate)}>
                  Explore
                </Button>
              </div>
            </> : visitCards.reverse()
        }

      </div>
    </div>
  )
}

export default Visits