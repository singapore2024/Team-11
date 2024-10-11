import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Check from '../../assets/check.webp'
import { Alert, Button, Checkbox, Divider, Form, FormProps, Rate } from 'antd';
import { SeniorInterface, VisitInterface } from '../../models/interfaces';
import { getVisitByIdData, getAllSeniorsData } from '../../api';
import { VisitCard } from '../../components/Card/VisitCard';
import { navigateToRoute } from '../../components/utils';
import TextArea from 'antd/es/input/TextArea';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import cn from 'classnames';

type FieldType = {
  visitNotes: string;
};

//check in not in use 
const CompleteVisit = () => {
  const visitId = Number(useLocation().pathname.split("/")[2]);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  if (!token) {
    navigateToRoute('/', navigate)
  }

  const userName = localStorage.getItem('name')

  const [visit, setVisit] = useState<VisitInterface | null>(null)
  const [senior, setSenior] = useState<SeniorInterface | null>(null);

  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined color={'red'} />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitData = await getVisitByIdData(visitId);
        const seniorData = await getAllSeniorsData();
        setVisit(visitData);
        setSenior(seniorData);
      } catch (error) {
        console.error("Error fetching senior data:", error);
      }
    };

    fetchData();
  }, [visitId])

  // add api to store form values
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Received values of form: ', values, senior);
  }

  const health = [
    {
      key: 'mood',
      label: 'Mood'
    },
    {
      key: 'physical',
      label: 'Physical Health'
    },
    {
      key: 'mental',
      label: 'Mental Health'
    },
    {
      key: 'emotional',
      label: 'Emotional Health'
    },
    {
      key: 'social',
      label: 'Social Situation'
    },
  ]

  const healthForm = health.map((h) =>
    <div key={h.key} className={'customForm'}>
      <span className={'formLabel'}>{h.label}</span>
      <Rate defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} style={{color: '#8187f3' }}/>
    </div>
  )

  const living = [
    {
      key: 'cleanliness',
      label: 'Cleanliness'
    },
    {
      key: 'lighting',
      label: 'Lighting'
    },
  ]

  const livingForm = living.map((living) =>
    <div key={living.key} className={'customForm'}>
      <span className={'formLabel'}>{living.label}</span>
      <Rate defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} style={{color: '#8187f3' }} />
    </div>
  )

  const services = [
    {
      key: 'meal',
      label: 'Meal delivery'
    },
    {
      key: 'errand',
      label: 'Errand running'
    },
    {
      key: 'finance',
      label: 'Financial support'
    },
    {
      key: 'medical',
      label: 'Medical attention'
    },
    {
      key: 'escort',
      label: 'Medical escort'
    }
  ]

  const serviceForm = services.map((serv) =>
    <div key={serv.key} className={'customForm'}>
      <span className={'formLabel'}>{serv.label}</span>
      <Checkbox />
    </div>
  )

  return (
    <div className={'container'}>
      <div className={cn('header', 'hide')}>
        <h1>let's farm!</h1>
      </div>

      <div className={'confirmVisit'}>
        <div className={'thankYou'}>
          <h2 style={{marginTop: 0}}>Visit Completed</h2>
          <h3>
            Thank you for visiting, {userName?.split(" ")[0]}!
          </h3>
        </div>
        <img className={'checkImg'} src={Check} />
        <Alert
          className='alert'
          description={"Please give some feedback on the visit to help us monitor the senior's wellbeing"}
          type="success"
        />

        {visit &&
          <VisitCard visit={visit} />}

        <h3 className={'visitDetails'}>Visit Details</h3>
        
        <div className={'completeForm'} style={{ width: '100%' }}>
          <Form
            scrollToFirstError
            onFinish={onFinish}
            name="completeVisit"
            layout="vertical"
            className='completeFormInput'
            colon={false}
          >

            <div className={'customForm'}>
              <span className={'formLabel'}>Rate your visit</span>
              <Rate defaultValue={3} />
            </div>

            <Divider />

            <h3 className={'formSection'}>General wellbeing</h3>

            {healthForm}

            <Form.Item
              style={{ marginTop: '2rem' }}
              label="Anything that requires special attention?" name="health" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <TextArea />
            </Form.Item>

            <Divider />

            <h3 className={'formSection'}>General living conditions</h3>

            {livingForm}

            <Form.Item style={{ marginTop: '2rem' }} label="Anything that requires special attention?" name="living" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <TextArea />
            </Form.Item>

            <Divider />

            <h3 className={'formSection'}>Any services the senior requested for?</h3>

            {serviceForm}

            <Form.Item style={{ marginTop: '2rem' }} label="Other services not listed above" name="others" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <TextArea />
            </Form.Item>

            <Form.Item style={{ marginTop: '2rem' }} label="Please elaborate on the services required" name="svcs" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <TextArea />
            </Form.Item>

            <Divider />

            <h3 className={'formSection'}>Other remarks</h3>

            <Form.Item label="Visit Notes (eg what did you do, etc)" name="visitNotes" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <TextArea />
            </Form.Item>

            <Form.Item label="Any follow up actions required?" name="followUp" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <TextArea />
            </Form.Item>

          </Form>
        </div>

        <Button
          className={'joinButton'}
          onClick={() => navigateToRoute('/home', navigate)}>
          Submit
        </Button>
      </div>

    </div>
  )
}

export default CompleteVisit