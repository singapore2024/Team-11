import { Button, Modal } from 'antd'
import React from 'react'
import './styles.css'
import Singpass from '../assets/Singpass.png'

interface Props {
    open: boolean
    handleClose: () => void
    onClickRegister: () => void
    onClickLogin: () => void
}

const LoginModal: React.FC<Props> = (props) => {
  return (
    <Modal 
        className={'registerModal'} 
        title={'Sign in to continue'} 
        open={props.open} 
        onCancel={props.handleClose} 
        footer={null}
        centered
        width={'400px'}
        >
        <div className={'modalContent'}>
           
            <Button onClick={props.onClickRegister} className={'registerButton'}>
                Sign Up
            </Button>

            <Button className={'registerButton'} onClick={props.onClickRegister}>
                Sign in with 
                <img src={Singpass} style={{marginTop: '2px'}} height={'20px'} />
            </Button>

            <p>
                Already have an account? {' '}
                <a style={{ cursor: 'pointer' }} onClick={props.onClickLogin}>Log in</a>
            </p>
        </div>
    </Modal>
  )
}

export default LoginModal