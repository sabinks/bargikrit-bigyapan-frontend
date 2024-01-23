import React from 'react'
type ErrorMessageProps = {
    name: string,
    errors: any
}
function ErrorMessage({ name, errors }: ErrorMessageProps) {
    return (
        <>
            {
                true && errors.hasOwnProperty(name) &&
                <div className="error-message">
                    {
                        errors[name].map((error: string, index: number) => {
                            return <React.Fragment>
                                <span className="text-xs text-red-600" key={index}>* {error}</span>
                                <br />
                            </React.Fragment>
                        })
                    }
                </div>
            }
        </>
    )
}

export default ErrorMessage