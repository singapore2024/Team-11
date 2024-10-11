import { useState } from 'react'
import '../../App.css'
import './styles.css'
import '../commonStyles.css'
import { Button, Form, FormProps, Input, message, Radio, Select } from 'antd'
import { useNavigate } from 'react-router-dom';
import { SupportedLanguages, UserInterface } from '../../models/interfaces'
import { navigateToRoute } from '../../components/utils'
import { checkEmailExists, checkMobileExists, registerUser } from '../../api'
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

const Register = () => {
    const { Option } = Select;

    const [loading, setLoading] = useState<boolean>(false)
    const [emailExists, setEmailExists] = useState<boolean>(false);
    const [mobileExists, setMobileExists] = useState<boolean>(false);
    const [form] = Form.useForm();

    const navigate = useNavigate(); 

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }} >
            <Option value="65">+65</Option>
          </Select>
        </Form.Item>
      );

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setLoading(true)
        if (values.email !== "" && values.mobile !== "") {
            try {
                setEmailExists(await checkEmailExists(values.email));
                setMobileExists(await checkMobileExists(values.mobile));

                console.log(emailExists, mobileExists)
            } catch (error) {
                console.error("Error checking user mobile:", error);
                setEmailExists(true);
                setMobileExists(true);
                setLoading(false);
                return;
            }
        }
        if (emailExists || mobileExists) {
            return;
        } 

        const newUserDetails: UserInterface = (
            {
                name: values.name,
                nric: values.nric,
                email: values.email,
                mobile: values.mobile,
                age: Number(values.age),
                gender: values.gender,
                languages: values.languages,
                address: values.address,
                postal_code: Number(values.postal_code),
            }
        )

        localStorage.clear()
        localStorage.setItem('name', values.name)
        localStorage.setItem('nric', values.nric)
        localStorage.setItem('email', values.email)
        localStorage.setItem('age', values.age)
        localStorage.setItem('mobile', values.mobile)
        localStorage.setItem('gender', values.gender)
        localStorage.setItem('languages', JSON.stringify(values.languages))
        localStorage.setItem('address', values.address)
        localStorage.setItem('postal_code', values.postal_code)

        try {
            console.log('Registering new user', loading)
            const response = await registerUser(newUserDetails)
            message.success('Registration success')
            const { access_token, user } = response
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('user_id', user.user_id)
            localStorage.setItem('name', user.name)
            navigateToRoute('/register-success', navigate)
        } catch (error) {
            console.error("Error registering user:", error);
        }
        setLoading(false)
    };

    return (
        <div className={'container'}>
            <div className={'header'}>
                <img className={'registerBannerImg'} src={BannerImg} />
                <h1>let's farm!</h1>
                <h3>Register to be a farmer!</h3>
                <p>Thank you for your interest in farming with us!</p>
                <p>Just a couple more questions...</p>

                <p style={{marginTop: '2rem'}}>
                    Already have an account? {' '}
                    <a style={{ cursor: 'pointer' }} onClick={() => navigateToRoute('/login', navigate)}>Log in</a>
                </p>
            </div>

            <div className={'form'}>
                <Form
                    form={form}
                    scrollToFirstError
                    onFinish={onFinish}
                    initialValues={{
                        prefix: '+65'
                    }}
                    name="register"
                    layout="horizontal"
                    labelCol={{span: 10}}
                    wrapperCol={{ span: 14}}
                    className='formInput'
                    colon={false}
                >
                    <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Please input your full name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last 4 digits of NRIC/FIN"
                        name="nric"
                        rules={[{ required: true, message: 'Please input the last 4 digits of NRIC' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email' }]}
                    >
                        <Input />
                        {emailExists && <div style={{ color: 'red', marginTop: -10 }}><p>There is a user associated with this email address.</p></div>}
                    </Form.Item>
                    <Form.Item
                        label="Mobile No."
                        name="mobile"
                        rules={[{ required: true, message: 'Please input your mobile number' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        {mobileExists && <div style={{ color: 'red', marginTop: -10 }}><p>There is a user associated with this mobile number.</p></div>}
                    </Form.Item>
                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: 'Please input your gender' }]}
                    >
                        <Radio.Group>
                            <Radio value="M">Male</Radio>
                            <Radio value="F">Female</Radio>
                            <Radio value=" ">Prefer not to say</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Spoken Languages"
                        name="languages"
                        rules={[{ required: true, message: 'Please select your spoken languages' }]}
                    >
                        <Select mode="multiple" placeholder="Please select spoken languages">
                            {Object.values(SupportedLanguages).map((lang) => 
                                <Option value={lang}>{lang}</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your area'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Postal Code"
                        name="postalCode"
                        rules={[{ required: true, message: 'Please input your postal code' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Button className='joinButton' htmlType='submit'>
                        Register
                    </Button>

                    
                </Form>
            </div>
        </div>
    )
}

export default Register
