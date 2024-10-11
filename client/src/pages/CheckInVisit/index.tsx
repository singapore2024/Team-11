import React, { useEffect, useState } from 'react'
import '../commonStyles.css'
import '../../App.css'
import './styles.css'
import { Button, Popover, } from 'antd'
import { CheckCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleCheckInVisit, navigateToRoute } from '../../components/utils'
import { VisitInterface } from '../../models/interfaces'
import { getVisitByIdData } from '../../api'
import { Scanner } from '@yudiel/react-qr-scanner';

const QrScanner: React.FC = () => {
    return (
        <div className='qr'>
            <Scanner onScan={(result) => console.log(result)} />
        </div>
    );
};

const CheckInVisit: React.FC = () => {

    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    if (!token) {
        navigateToRoute('/', navigate)
    }
    const visitId = Number(useLocation().pathname.split("/")[2]);

    const [visit, setVisit] = useState<VisitInterface>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const visitData = await getVisitByIdData(visitId);
                setVisit(visitData);
            } catch (error) {
                console.error("Error fetching visit data:", error);
            }
        };
        fetchData();
    }, [visitId])



    return (
        <div className={'container'} style={{ marginBottom: 0, paddingBottom: 0 }}>
            <div className={'header'}>
                <h1>let's kaypoh!</h1>
                <h3 style={{ marginBottom: '0' }}>Check in visit <Popover title="Note"
                    placement="bottom"
                    content={
                        <div style={{ maxWidth: '250px' }}>
                            For the purpose of this MVP, we do not have QR codes ready for you to scan but you can click on the "Check In" button to simulate check ins
                        </div>
                    }
                >
                    <InfoCircleTwoTone twoToneColor={'#8187f3'} style={{ marginLeft: '0.25rem', fontSize: '16px' }} />
                </Popover>
                </h3>
                <p>Scan QR code at the senior's location to check in</p>
            </div>

            <div className={'register-visit'}>
                <QrScanner />

                {visit &&
                    <Button className={'joinButton'} onClick={() => handleCheckInVisit(visit, navigate)}>
                        Check In <CheckCircleOutlined />
                    </Button>
                }
            </div>
        </div>
    )
}

export default CheckInVisit