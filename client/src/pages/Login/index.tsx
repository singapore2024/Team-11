import { useEffect, useState } from 'react'
import '../../App.css'
import './styles.css'
import '../commonStyles.css'
import { Button, Form, FormProps, Input, Select } from 'antd'
import { useNavigate } from 'react-router-dom';

import { navigateToRoute } from '../../components/utils'
import { checkMobileExists, loginUser } from '../../api'
import BannerImg from '../../assets/banner.png'

type FieldType = {
    name: string;
    nric: string;
    email: string;
    mobile: string;
    age: string;
    gender: string;
    languages: string[];
    address: string;
    postal_code: string;
  };

const Login = () => {
    const { Option } = Select;

    const [loading, setLoading] = useState<boolean>(false)
    const [mobileExists, setMobileExists] = useState<boolean>(true);
    const [form] = Form.useForm();
    const navigate = useNavigate(); 

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }} >
            <Option value="65">+65</Option>
          </Select>
        </Form.Item>
      );

    useEffect(() => {
        setMobileExists(true);
    },[loading]);
    
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setLoading(true);

        try {
            setMobileExists(await checkMobileExists(values.mobile));
        } catch (error) {
            console.error("Error checking user mobile:", error);
            setMobileExists(false);
            setLoading(false);
            form.resetFields();
            return;
        }

        if (!mobileExists) {
            form.resetFields();
            return;
        }

        try {
            console.log('Logging in', loading)
            localStorage.clear()
            const response = await loginUser(values.mobile)
            const { access_token, user } = response
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('user_id', user.user_id)
            localStorage.setItem('name', user.name)
            navigateToRoute('/home', navigate);
        } catch (error) {
            console.error("Error logging in:", error);
            form.resetFields();
        }
        setLoading(false);
        
    };

    return (
        <div className={'container-login'}>
            <div>
                <img className={'bannerImg'} src={BannerImg} />
                <h1 style={{marginTop: 0}}>let's farm!</h1>
                <p>Welcome back our fellow farmer!</p>
            </div>

            <div className={'form'}>
                <Form
                    scrollToFirstError
                    onFinish={onFinish}
                    initialValues={{
                        prefix: '+65'
                    }}
                    name="login"
                    layout="horizontal"
                    className='formInput'
                    form={form}
                >
                    <Form.Item
                        label="Mobile No."
                        name="mobile"
                        rules={[
                            { required: true, message: 'Please input your mobile number' }
                        ]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        {!mobileExists && <div style={{ color: 'red', marginTop: -10 }}><p>No user exists with this mobile number.</p></div>}
                    </Form.Item>
                    <Button htmlType='submit' className='joinButton' style={{width: '280px'}}>
                        Login
                    </Button>

                    <p style={{marginBottom: '3rem'}}>
                        Don't have an account? {' '}
                        <a style={{ cursor: 'pointer' }} onClick={() => navigateToRoute('/register', navigate)}>Register</a>
                    </p>
                </Form>
            </div>
        </div>
    )
}

export default Login
