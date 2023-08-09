import "../LoginForms/index.css"
import React from "react"

const LoginForm = (props) => {

    return(
        <div className="card">{props.children}</div>
    )
}

export default LoginForm