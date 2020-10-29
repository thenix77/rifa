class Salir extends React.Component {
    constructor(props) {
        super(props)

        Logout()
        props.auth(false)
        props.history.push('/wasiyux')
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

customElements.define("logout-page", Salir);