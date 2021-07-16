import { Form, Select } from 'antd'
import _ from 'lodash'

function FormSelectInput({ field, formInst }) {
    let itemArgs = {}

    if (!_.isEmpty(field.helperText)) {
        itemArgs.extra = field.helperText
    }
    if (!_.isEmpty(field.dependencies)) {
        itemArgs.dependencies = field.dependencies
    }

    return (
        <Form.Item
            {...itemArgs}
            label={field.displayLabel && field.label}
            name={field.key}
            rules={field.rules}
            className={`pe-form-text-input`}
        >
            <Select placeholder={field.label} options={field.options} />
        </Form.Item>
    )
}

FormSelectInput.defaultProps = {
    field: {},
}

export default FormSelectInput
