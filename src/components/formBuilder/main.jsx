import FormTextInput from './FormTextInput'
import _ from 'lodash'

function FormBuilder({ fieldsList, formInst = null, className = '' }) {
    return (
        <div className={'pm-form-builder ' + className}>
            {_.isArray(fieldsList) &&
                fieldsList.map((fl) => {
                    let render = ''

                    switch (fl.type) {
                        case 'text':
                            render = (
                                <FormTextInput
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break

                        default:
                            render = (
                                <p key={fl.label}>
                                    {fl.label} - "{fl.type}" field
                                </p>
                            )
                    }

                    return render
                })}
        </div>
    )
}

FormBuilder.defaultProps = {
    fieldsList: [],
}

export default FormBuilder
