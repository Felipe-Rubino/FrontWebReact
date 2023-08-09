import "../CadastroForms/index.css"
import React from "react"

const CadastroForm = (props) => {

    return(
        <div className="card">{props.children}</div>
    )
}

export default CadastroForm