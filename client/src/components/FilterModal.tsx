import { Checkbox, CheckboxProps, Divider, Modal } from 'antd'
import React, { useState } from 'react'
import './styles.css'
import { FilterOutlined } from '@ant-design/icons'
import { SupportedLanguages } from '../models/interfaces'

interface Props {
    open: boolean
    handleClose: () => void
    onClickApply: (languages: string[]) => void
}

const FilterModal: React.FC<Props> = (props) => {
    const langOptions = Object.values(SupportedLanguages)
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(langOptions)

    const handleApplyFilter = () => {
        props.onClickApply(selectedLanguages)
    }

    const checkAll = langOptions.length === selectedLanguages.length;
    const indeterminate = selectedLanguages.length > 0 && selectedLanguages.length < langOptions.length;

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setSelectedLanguages(e.target.checked ? langOptions : []);
    };

    const onCheckLanguage = (checkedValues: string[]) => {
        setSelectedLanguages(checkedValues)
    }

    return (
        <Modal
            className={'registerModal'}
            title={<div className={'accent'}><FilterOutlined style={{ marginRight: '0.25rem' }} /> Filter search results</div>}
            open={props.open}
            onCancel={props.handleClose}
            onOk={handleApplyFilter}
            centered
            width={'400px'}
            okText={'Apply'}
        >
            <div className={'modalContent-left'}>
                <span className='filterTitle'>
                    Filter seniors by language
                </span>

                <Checkbox defaultChecked={true} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Select all
                </Checkbox>
                <Divider style={{ margin: '0.5rem' }} />
                <Checkbox.Group options={Object.values(SupportedLanguages)} value={selectedLanguages} onChange={onCheckLanguage} />
            </div>
        </Modal>
    )
}

export default FilterModal