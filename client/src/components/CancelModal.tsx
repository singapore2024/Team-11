import { Modal } from 'antd'
import React from 'react'
import './styles.css'
import {FrownTwoTone } from '@ant-design/icons'

interface Props {
    open: boolean
    handleClose: () => void
    onClickConfirm: () => void
}

const CancelModal: React.FC<Props> = (props) => {
    return (
        <Modal
            className={'registerModal'}
            title={<div className={'accent'}> Cancel visit?</div>}
            open={props.open}
            onCancel={props.handleClose}
            onOk={props.onClickConfirm}
            centered
            width={'400px'}
            okText={'Cancel Visit'}
            cancelText={'Go back'}
        >
            <div className={'modalContent'}>
            <div className='column'>
                Are you sure you want to cancel the visit? The senior will be disappointed... 
                <FrownTwoTone style={{fontSize: '50px', marginTop: '1rem'}} twoToneColor="#eb2f96" />
            </div>
            </div>
        </Modal>
    )
}

export default CancelModal