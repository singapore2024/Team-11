import React, { useState } from 'react'
import '../commonStyles.css'
import '../../App.css'
import './styles.css'
import { Button, Checkbox, DatePicker, DatePickerProps, Form, FormProps, message } from 'antd'
import { SeniorCard } from '../../components/Card/SeniorCard'
import { InfoCircleTwoTone } from '@ant-design/icons'
import { VisitInterface, VisitStatus } from '../../models/interfaces'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigateToRoute } from '../../components/utils'
import { createVisit, getLatestVisitId } from '../../api'
import dayjs from 'dayjs'

interface TimeslotButtonProps {
    time: string
    setSelectedTime: (time: string) => void
    isSelected: boolean
}

export const TimeSlotButton: React.FC<TimeslotButtonProps> = (props) => {
    return <Button className='timeslotBtn'
        type={props.isSelected ? 'primary' : 'default'}
        onClick={() => props.setSelectedTime(props.time)} 
    >
        {props.time}
    </Button>
}

const RegisterVisit: React.FC = () => {

    const { state } = useLocation();
    const { senior } = state
    const [loading, setLoading] = useState<boolean>(false)

    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    if (!token) {
        navigateToRoute('/', navigate)
    } 

    const [selectedTimeslot, setSelectedTimeslot] = useState<string>()

    const timeslots = ["8AM-11AM", "11AM-2PM", "2PM-5PM", "5PM-8PM"]

    const handleConfirmVisit: FormProps['onFinish'] = (fieldValues) => {
        const dateValue = fieldValues['visitDate']
        
        setLoading(true)
        const userId = localStorage.getItem('user_id');
        const visitDetails: VisitInterface = {
            date: dateValue.format('DD MMM YYYY'),
            time: selectedTimeslot!,
            senior_id: senior.senior_id,
            visitor_ids: [Number(userId)],
            status: VisitStatus.UPCOMING
        }
        
        const postData = async () => {
            try {
                await createVisit(visitDetails);
                const visitId = await getLatestVisitId();

                setLoading(false)
                console.log('loading', loading)

                message.success('Visit confirmed')

                navigateToRoute(`/visit-confirmed/${visitId}`, navigate)
            } catch (error) {
                console.error("Error fetching senior data:", error);
            }
        };

        postData();
    }

    const disabledDate: DatePickerProps['disabledDate'] = (current) => {
        // Can not select days before today
        return current < dayjs().subtract(1, 'day').endOf('day');
      };

    return (
        <div className={'registerContainer'}>
            <div className={'registerHeader'}>
                <h1>let's farm!</h1>
                <h3 style={{marginBottom: '0'}}>Register your visit</h3>
            </div>

            <div className={'register-visit'}>
                {senior && 
                <SeniorCard senior={senior} showDetails={true}/> }

                <Form
                    scrollToFirstError
                    onFinish={handleConfirmVisit}
                    name="register"
                    layout="inline"
                    labelCol={{ span: 6 }}
                    className='formInput'
                    colon={false}
                >
                    <Form.Item
                        label="Date"
                        name="visitDate"
                        rules={[{ required: true, message: 'Please input intended date of visit!' }]}
                    >
                        <DatePicker 
                            style={{width:'200px'}} 
                            disabledDate={disabledDate}
                        />
                    </Form.Item>

                    <Form.Item name='visitTime' label="Timeslot" required={true} rules={[{validator: () => {
                        if (selectedTimeslot) {
                            return Promise.resolve()
                        }

                        return Promise.reject(new Error('Please select a timeslot!'));
                    }}]}
                    >{
                        timeslots.map((time) => (
                            <TimeSlotButton 
                                key={time}
                                time={time} 
                                setSelectedTime={setSelectedTimeslot}
                                isSelected={time === selectedTimeslot}
                            />
                        ))
                    }
                    </Form.Item> 

                    <div className={'note'}>
                        <h3>Important Notes <InfoCircleTwoTone style={{fontSize: 14}}/></h3>
                        To ensure the well being of our seniors, please read the following terms of usage:
                        <ul>
                            <li>A social worker will accompany you for your first visit.</li>
                            <li>You do not have to visit for the entire duration of the timeslot. </li>
                            <li>During your visit, <b>do NOT</b> enter the senior's house at any point of time.</li>
                            <li><b>What you can do:</b> say hi, chat about interests, ask about their story.</li>
                            <li>Please show respect and refrain from speaking unkind words, do respect the senior's privacy.</li>
                            <li>Remember to mark your visit as completed and complete the post-visit form after your visit. </li>
                            <li>If you missed your visit, please indicate that you have missed it.</li>
                            <li>If you miss visits more than 5 times, you will be penalised.</li>
                        </ul>
                    </div>

                    <Form.Item
                        name="acknowledgement"
                        valuePropName="checked"
                        rules={[{
                            validator: (_, value) =>
                              value ? Promise.resolve() : Promise.reject(new Error('Please acknowledge agreement!')),
                          },]}
                    >
                        <Checkbox>I have read the <a>Terms & Conditions</a></Checkbox>
                    </Form.Item>


                    <Form.Item>
                        <Button 
                            type={'primary'}
                            className={'confirmButton'} 
                            htmlType='submit'
                        >
                            Confirm Visit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default RegisterVisit